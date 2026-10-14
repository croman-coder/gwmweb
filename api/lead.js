/** Reutiliza el esquema de reparto de las webs Santa Rosa y SOUEAST.
 * Pools GWM: Obsidian, Infraestructura y Conexiones, reparto por marca/sucursal (06/10/2026).
 * El webhook vive solo en BITRIX_WEBHOOK_URL del servidor. */
import { MODELOS } from '../src/js/modelos.js';
const SITE = "GWM";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const TIPOS = { cotizacion: "Cotización", testdrive: "Prueba de manejo" };
const DEFAULT_ALLOWED = ["gwmweb.santarosa.lat", "localhost", "127.0.0.1"];
const MAX_BODY = 20000;

const list = (v) => String(v || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
const idList = (v) => String(v || "").split(",").map((s) => s.trim()).filter((s) => /^\d+$/.test(s)).map(Number);

/**
 * Zonas entre las que elige el visitante (formulario y WhatsApp): Asunción, Ciudad del Este y otras zonas. Sin dato → se trata como
 * Asunción (el comportamiento de siempre). Solo CDE tiene equipo propio: "otras" se reparte como Asunción (mismo equipo y misma cola),
 * igual que "resto del país" hasta el 06/10/2026 (pedido de Marketing, el mismo que en santarosa.com.py).
 */
const SUCURSALES = { asuncion: "Asunción", cde: "Ciudad del Este", otras: "Otras zonas" };
const CDE_ALIAS = new Set(["cde", "ciudad del este", "ciudad-del-este", "ciudad_del_este"]);
const OTRAS_ALIAS = new Set(["otras", "otras zonas", "otras-zonas", "otras_zonas"]);
function parseSucursal(v) {
  const s = String(v == null ? "" : v).trim().toLowerCase();
  if (!s) return null;
  if (CDE_ALIAS.has(s)) return "cde";
  if (OTRAS_ALIAS.has(s)) return "otras";
  return "asuncion"; // también lo que mandaba el sitio antes del 06/10/2026 ("asuncion" con el rótulo "Asunción y resto del país")
}

function cfg(env) {
  return {
    webhook: String(env.BITRIX_WEBHOOK_URL || "").replace(/\/+$/, "") + "/",
    departmentId: Number(env.DEPARTMENT_ID || 19),
    sourceId: env.LEAD_SOURCE_ID || "WEB_SR_GWM",
    brandField: env.BRAND_FIELD || "UF_CRM_1775591500778",
    brandValue: Number(env.BRAND_VALUE || 297),
    fallbackAssignee: Number(env.FALLBACK_ASSIGNEE_ID || 45),
    advisorIds: idList(env.ADVISOR_IDS || "43,79,113,117,119,123,125,127,44489,44493"),
    cdeAdvisorIds: idList(env.CDE_ADVISOR_IDS || "121,42415,42413"),
    cdeDepartmentId: Number(env.CDE_DEPARTMENT_ID || 137),
    cdeFallbackAssignee: Number(env.CDE_FALLBACK_ASSIGNEE_ID || 21707),
    liveHosts: new Set(list(env.LIVE_HOSTS || "gwmweb.santarosa.lat,www.gwm.com.py,gwm.com.py")),
    allowedHosts: new Set([...list(env.LIVE_HOSTS || "gwmweb.santarosa.lat,www.gwm.com.py,gwm.com.py"), ...DEFAULT_ALLOWED, ...list(env.ALLOWED_HOSTS)]),
    stagingAssignee: Number(env.STAGING_ASSIGNEE_ID) || null,
    globalLimit: Number(env.GLOBAL_LIMIT || 40),
  };
}

export class LeadError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

/* ---- estado en memoria de la instancia (se limpia en los tests con resetState) ---- */
const advisorsCache = new Map(); // clave del pool → { at, list }
const hits = new Map();
let chain = Promise.resolve();
const rotation = new Map();      // clave del pool → vueltas del reparto local (solo si Bitrix no deja leer la cola)

export function resetState() {
  rotation.clear();
  advisorsCache.clear();
  hits.clear();
  chain = Promise.resolve();
}

/** Ejecuta fn de a una por vez: dos leads simultáneos no pueden leer la cola antes de que el otro se guarde. */
function serial(fn) {
  const run = chain.then(fn, fn);
  chain = run.then(() => {}, () => {});
  return run;
}

const defaultSleep = (ms) => new Promise((r) => setTimeout(r, ms));
const RETRY_STATUS = new Set([429, 502, 503, 504]);
const ATTEMPTS = 4;
const backoff = (attempt) => 1000 * attempt; // 1 s, 2 s, 3 s: Bitrix recupera el cupo en segundos

/** Llama a un método REST de Bitrix. Reintenta si Bitrix limita el ritmo (503/429, QUERY_LIMIT_EXCEEDED). */
async function b24(c, ctx, method, params) {
  if (!c.webhook.startsWith("http")) throw new LeadError(503, "Bitrix no configurado");
  const doFetch = ctx.fetch || globalThis.fetch;
  const sleep = ctx.sleep || defaultSleep;
  let lastErr;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    const disponible = ctx.deadline ? ctx.deadline - Date.now() : 15000;
    if (disponible <= 0) throw new LeadError(504, 'Bitrix: tiempo de recepción agotado');
    let res;
    try {
      res = await doFetch(`${c.webhook}${method}.json`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(params || {}), signal: AbortSignal.timeout(Math.min(disponible, method.endsWith(".add") ? 8000 : 3000)),
      });
    } catch (e) {
      lastErr = new LeadError(502, `Bitrix ${method}: sin conexión`);
      if (!method.endsWith(".add") && attempt < ATTEMPTS) { await sleep(backoff(attempt)); continue; }
      throw lastErr;
    }
    if (RETRY_STATUS.has(res.status) && attempt < ATTEMPTS) { await sleep(backoff(attempt)); continue; }
    let data;
    try { data = await res.json(); } catch { throw new LeadError(502, `Bitrix ${method}: respuesta no válida (HTTP ${res.status})`); }
    if (data.error === "QUERY_LIMIT_EXCEEDED" && attempt < ATTEMPTS) { await sleep(backoff(attempt)); continue; }
    if (data.error) throw new LeadError(502, `Bitrix ${method}: ${data.error}`);
    if (!res.ok || data.result === undefined) throw new LeadError(502, `Bitrix ${method}: respuesta sin resultado (HTTP ${res.status})`);
    return data.result;
  }
  throw lastErr || new LeadError(502, `Bitrix ${method}: sin respuesta`);
}

/** Equipo que recibe los leads de una sucursal: ids explícitos o, sin ids, departamento + cargo "ASESOR". */
function poolOf(c, sucursal) {
  if (sucursal === "cde") {
    return {
      key: c.cdeAdvisorIds.length ? `cde-ids:${c.cdeAdvisorIds.join(",")}` : `cde-dep:${c.cdeDepartmentId}`,
      ids: c.cdeAdvisorIds, dep: c.cdeDepartmentId, fallback: c.cdeFallbackAssignee,
    };
  }
  return {
    key: c.advisorIds.length ? `ids:${c.advisorIds.join(",")}` : `dep:${c.departmentId}`,
    ids: c.advisorIds, dep: c.departmentId, fallback: c.fallbackAssignee,
  };
}

/* ---- asesores (cache 10 min por instancia y por equipo) ---- */
async function advisors(c, ctx, pool) {
  const hit = advisorsCache.get(pool.key);
  if (hit && hit.list.length && Date.now() - hit.at < 600000) return hit.list;
  let users;
  if (pool.ids.length) users = await b24(c, ctx, "user.get", { filter: { ID: pool.ids, ACTIVE: true } });
  else {
    users = await b24(c, ctx, "user.get", { filter: { UF_DEPARTMENT: pool.dep, ACTIVE: true } });
    users = users.filter((u) => String(u.WORK_POSITION || "").toUpperCase().includes("ASESOR"));
  }
  const team = users.filter(u => !pool.ids.length || pool.ids.includes(Number(u.ID))).map((u) => ({ id: Number(u.ID), name: `${u.NAME || ""} ${u.LAST_NAME || ""}`.trim() }));
  if (team.length) advisorsCache.set(pool.key, { at: Date.now(), list: team });
  return team;
}

/**
 * El asesor cuyo último lead web es el más antiguo (o que nunca recibió; entre esos, el de ID más bajo).
 * sucursal "cde" → equipo de Ciudad del Este; cualquier otra cosa → el de siempre (Asunción).
 */
export async function nextAdvisor(env, ctx = {}, sucursal = null) {
  const c = cfg(env);
  const pool = poolOf(c, sucursal);
  const team = await advisors(c, ctx, pool);
  if (!team.length) return { id: pool.fallback, name: "" };
  const ids = new Set(team.map((a) => a.id));
  const recent = await b24(c, ctx, "crm.lead.list", {
    filter: { SOURCE_ID: c.sourceId }, order: { ID: "DESC" }, select: ["ID", "ASSIGNED_BY_ID"], start: 0,
  });
  const lastSeen = new Map(); // id → posición (0 = más reciente)
  recent.forEach((l, pos) => { const uid = Number(l.ASSIGNED_BY_ID || 0); if (ids.has(uid) && !lastSeen.has(uid)) lastSeen.set(uid, pos); });
  const never = team.filter((a) => !lastSeen.has(a.id)).sort((a, b) => a.id - b.id);
  if (never.length) return never[0];
  return team.reduce((best, a) => (lastSeen.get(a.id) > lastSeen.get(best.id) ? a : best), team[0]);
}

/** Si Bitrix no deja leer la cola: rota entre el último equipo conocido de ese pool; sin equipo, al responsable de reserva. */
function localAdvisor(pool) {
  const team = advisorsCache.get(pool.key)?.list || [];
  if (!team.length) return { id: pool.fallback, name: "" };
  const turn = rotation.get(pool.key) || 0;
  rotation.set(pool.key, turn + 1);
  return team[turn % team.length];
}

/* ---- validación / normalización ---- */
export function normalizePhone(raw) {
  const s = String(raw || "").trim();
  let digits = s.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  digits = digits.replace(/^5950+(?=\d{8,9}$)/, "595");
  if (s.startsWith("+")) return "+" + digits;
  if (digits.startsWith("595")) return "+" + digits;
  if (digits.startsWith("0") && (digits.length === 10 || digits.length === 9)) return "+595" + digits.slice(1);
  if (digits.length === 9 && digits.startsWith("9")) return "+595" + digits;
  return s;
}

const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export function validate(body) {
  const b = body && typeof body === "object" ? body : {};
  const str = (v, max) => (v == null ? "" : String(v)).replace(CONTROL, "").trim().slice(0, max);
  const tipo = str(b.tipo, 40);
  const lead = {
    nombre: str(b.nombre, 120), telefono: str(b.telefono, 40), email: str(b.email, 120) || null,
    // El chat de marcas (chat.santarosa.lat) manda `origen: "chat"` y el texto en `comentario`; el formulario del sitio, `mensaje`.
    pais: str(b.pais, 80) || null, mensaje: str(b.comentarios, 1500) || null, pagina: str(b.pagina, 300) || null,
    canal: str(b.origen, 20).toLowerCase() === "chat" ? "chat" : null,
    tipo: TIPOS[tipo],
    modelo: MODELOS.find(m => m.slug === b.slug)?.nombre || "",
    ciudad: str(b.ciudad, 80),
    version: str(b.version, 100),
    fecha: tipo === "testdrive" ? str(b.fecha, 10) : "",
    requestId: str(b.requestId, 50),
    sucursal: parseSucursal(str(b.ciudad, 80)), // "cde" | "asuncion" | "otras" | null (el formulario viejo no lo manda)
    idioma: str(b.idioma, 10).toLowerCase().slice(0, 2) || "es",
    website: str(b.website, 200), // honeypot: un humano no lo ve ni lo llena
  };
  for (const k of UTM_KEYS) { const v = str(b.campana?.[k], 160); if (v) lead[k] = v; }
  const errors = [];
  if (!TIPOS[tipo]) errors.push("tipo");
  if (!lead.modelo) errors.push("modelo");
  if (!["Asunción", "San Lorenzo", "Ciudad del Este"].includes(lead.ciudad)) errors.push("ciudad");
  if (!/^[a-f0-9-]{36}$/i.test(lead.requestId)) errors.push("identificador");
  if (lead.nombre.length < 2) errors.push("nombre");
  if (lead.telefono.replace(/\D/g, "").length < 6) errors.push("telefono");
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) errors.push("email");
  if (errors.length) throw new LeadError(422, "Datos inválidos: " + errors.join(", "));
  return lead;
}

/* ---- rate limit simple en memoria (ventana móvil por clave) ---- */
export function rateLimited(key, limit = 8, windowMs = 600000) {
  const now = Date.now();
  const q = (hits.get(key) || []).filter((t) => now - t < windowMs);
  if (q.length >= limit) { hits.set(key, q); return true; }
  q.push(now); hits.set(key, q);
  return false;
}

const hostOf = (v) => String(v || "").split(",")[0].trim().toLowerCase().replace(/:\d+$/, "");

/** Crea el lead. Devuelve {ok, leadId, asesorId}. ctx: { fetch, sleep, host, now } (todo opcional). */
export async function createLead(body, env, ctx = {}) {
  ctx = { ...ctx, deadline: Date.now() + 24000 };
  const c = cfg(env);
  const lead = validate(body);
  if (lead.website) return { ok: true, leadId: null }; // honeypot
  const host = hostOf(ctx.host) || "?";
  const staging = !c.liveHosts.has(host) && c.stagingAssignee != null;
  const when = (ctx.now ? ctx.now() : new Date()).toLocaleString("es-PY", { timeZone: "America/Asuncion" });

  const parts = lead.nombre.split(/\s+/);
  const [first, last] = parts.length > 1 ? [parts[0], parts.slice(1).join(" ")] : [lead.nombre, ""];
  const cde = lead.sucursal === "cde";
  const notes = [];
  if (staging) notes.push(`PRUEBA desde el sitio de muestra (${host}). No es un cliente real.`);
  notes.push(`Solicitud: ${lead.tipo}`);
  if (lead.sucursal) notes.push(`Sucursal elegida: ${SUCURSALES[lead.sucursal]}`);
  if (lead.modelo) notes.push(`Modelo: ${lead.modelo}`);
  if (lead.version) notes.push(`Versión: ${lead.version}`);
  if (lead.ciudad) notes.push(`Ciudad de atención: ${lead.ciudad}`);
  if (lead.fecha) notes.push(`Fecha preferida de test drive: ${lead.fecha}`);
  if (lead.pais) notes.push(`País: ${lead.pais}`);
  if (lead.canal === "chat") notes.push("Enviado desde: chat");
  if (lead.mensaje) notes.push(`Mensaje: ${lead.mensaje}`);
  if (lead.pagina) notes.push(`Página: ${lead.pagina}`);
  const utms = UTM_KEYS.filter((k) => lead[k]);
  if (utms.length) notes.push("UTM: " + utms.map((k) => `${k.slice(4)}=${lead[k]}`).join(", "));
  notes.push(`Origen: ${host} · ${when}`);

  const fields = {
    TITLE: `${staging ? "[PRUEBA] " : ""}${lead.nombre} - ${lead.modelo} - ${lead.tipo} - ${SITE} Web Santa Rosa`,
    NAME: first, LAST_NAME: last,
    STATUS_ID: "NEW", SOURCE_ID: c.sourceId, SOURCE_DESCRIPTION: `${host} · ${lead.tipo}${cde ? " · " + SUCURSALES.cde : ""}`,
    OPENED: "Y",
    ORIGINATOR_ID: "GWM_WEB", ORIGIN_ID: lead.requestId,
    PHONE: [{ VALUE: normalizePhone(lead.telefono), VALUE_TYPE: "MOBILE" }],
    COMMENTS: notes.join("\n"),
    [c.brandField]: c.brandValue,
  };
  fields.ADDRESS_CITY = lead.ciudad; // campo "Ciudad" del Prospecto: el equipo de CDE lo filtra en Bitrix
  if (lead.email) fields.EMAIL = [{ VALUE: lead.email, VALUE_TYPE: "WORK" }];
  for (const k of utms) fields[k.toUpperCase()] = lead[k];

  const create = async (assignee) => b24(c, ctx, "crm.lead.add", {
    fields: { ...fields, ASSIGNED_BY_ID: assignee }, params: { REGISTER_SONET_EVENT: "Y" },
  });
  if (staging) return { ok: true, leadId: await create(c.stagingAssignee), asesorId: c.stagingAssignee, sucursal: lead.sucursal, staging: true, canal: lead.canal };
  return serial(async () => {
    // Una respuesta perdida no debe duplicar el prospecto cuando el visitante reintenta.
    const anteriores = await b24(c, ctx, 'crm.lead.list', {
      filter: { ORIGINATOR_ID: 'GWM_WEB', ORIGIN_ID: lead.requestId }, select: ['ID'], start: 0,
    });
    if (anteriores.length) return { ok: true, leadId: Number(anteriores[0].ID), duplicado: true };
    let advisor;
    try { advisor = await nextAdvisor(env, ctx, lead.sucursal); } catch (e) {
      // Perder un lead es peor que repartirlo sin la cola justa: se crea igual.
      (ctx.log || console).error("cola de asesores no disponible, reparto local:", e.message);
      advisor = localAdvisor(poolOf(c, lead.sucursal));
    }
    const leadId = await create(advisor.id);
    return { ok: true, leadId, asesorId: advisor.id, sucursal: lead.sucursal, canal: lead.canal };
  });
}

/** Manejador HTTP común (Request → Response, estándar Fetch). Traefik saca el prefijo /api: llega /lead y /health. */
export async function handle(request, env, ctx = {}) {
  const c = cfg(env);
  const log = ctx.log || console;
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "");
  const json = (status, obj) => new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });

  if (request.method === "GET" && /\/health$/.test(path)) return json(200, { ok: true, source: c.sourceId, configured: c.webhook.startsWith("http") });
  if (!/\/lead$/.test(path)) return json(404, { ok: false, detail: "No encontrado" });
  if (request.method === "GET") {
    let conectado;
    if (url.searchParams.get('check') === '1') {
      try { await b24(c, ctx, 'crm.lead.list', { filter: { ID: 0 }, select: ['ID'] }); conectado = 'ok'; }
      catch { conectado = 'error'; }
    }
    return json(200, { ok: true, configured: c.webhook.startsWith('https://'), ...(conectado ? { bitrix: conectado } : {}) });
  }
  if (request.method !== "POST") return json(405, { ok: false, detail: "Método no permitido" });

  if (!/^application\/json\b/i.test(request.headers.get("content-type") || "")) return json(415, { ok: false, detail: "Se requiere JSON" });
  const origin = request.headers.get("origin");
  if (origin) {
    let oh = "";
    try { oh = new URL(origin).hostname.toLowerCase(); } catch { /* origin inválido */ }
    if (!c.allowedHosts.has(oh)) return json(403, { ok: false, detail: "Origen no permitido" });
  }
  const ip = request.headers.get("x-real-ip") || "?";
  if (rateLimited(`ip:${ip}`) || rateLimited("*", c.globalLimit)) {
    return json(429, { ok: false, detail: "Demasiados envíos. Pruebe de nuevo en unos minutos." });
  }
  let body;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY) return json(413, { ok: false, detail: "Solicitud demasiado grande" });
    body = JSON.parse(text);
  } catch { return json(400, { ok: false, detail: "JSON inválido" }); }

  const host = hostOf(request.headers.get("x-forwarded-host") || request.headers.get("host") || url.host);
  try {
    const result = await createLead(body, env, { ...ctx, host });
    if (result.leadId) log.log(`lead ${result.leadId} → asesor ${result.asesorId} host=${host}${result.sucursal ? ` sucursal=${result.sucursal}` : ""}${result.staging ? " (prueba)" : ""}`);
    // El id solo se devuelve al chat de marcas (chat.santarosa.lat), que lo usa para enlazar el prospecto en su panel: el formulario
    // público sigue sin saber a quién se le asignó ni con qué número quedó.
    return json(200, result.leadId && result.canal === "chat" ? { ok: true, leadId: result.leadId } : { ok: true });
  } catch (e) {
    log.error("lead error:", e.message);
    return json(e.status || 500, { ok: false, detail: e.status === 422 ? e.message : "No se pudo registrar la consulta" });
  }
}
