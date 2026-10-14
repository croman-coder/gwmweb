import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { createLead, nextAdvisor, validate, handle, resetState, normalizePhone } from '../api/lead.js';

const ASUNCION = [43,79,113,117,119,123,125,127,44489,44493];
const CDE = [121,42415,42413];
const env = { BITRIX_WEBHOOK_URL: 'https://bitrix.test/rest/19/test/' };
const log = { log() {}, error() {} };
const good = (overrides = {}) => ({ nombre: 'Prueba Técnica', telefono: '0981123456', ciudad: 'Asunción', tipo: 'testdrive', slug: 'ora-5-ev', modelo: 'Ora 5 EV', requestId: randomUUID(), ...overrides });

export function bitrixFalso({ activos = [...ASUNCION,...CDE], historial = [] } = {}) {
  const llamadas = [], leads = [];
  const fetch = async (url, init) => {
    const metodo = new URL(url).pathname.split('/').pop().replace('.json','');
    const datos = JSON.parse(init.body);
    llamadas.push({ metodo, datos });
    let result;
    if (metodo === 'user.get') result = activos.filter(id => datos.filter.ID.includes(id)).map(id => ({ ID: String(id) }));
    else if (metodo === 'crm.lead.list') {
      if (datos.filter.ID === 0) result = [];
      else if (datos.filter.ORIGIN_ID) result = leads.filter(l => l.ORIGIN_ID === datos.filter.ORIGIN_ID).map(l => ({ ID: l.ID }));
      else result = [...leads,...historial].filter(l => l.SOURCE_ID === datos.filter.SOURCE_ID).slice().reverse();
    } else if (metodo === 'crm.lead.add') {
      result = leads.length + 1000;
      leads.push({ ID: result, ...datos.fields });
    } else throw new Error('Método no esperado');
    return new Response(JSON.stringify({ result }), { status: 200 });
  };
  return { fetch, leads, llamadas, sleep: async () => {}, log };
}

beforeEach(resetState);

for (const [ciudad,pool] of [['Asunción',ASUNCION],['San Lorenzo',ASUNCION],['Ciudad del Este',CDE]]) {
  test(`${ciudad} crea el prospecto en el pool de asesores GWM correspondiente`, async () => {
    const bx = bitrixFalso();
    await createLead(good({ ciudad, ASSIGNED_BY_ID: 19, sucursal: ciudad === 'Ciudad del Este' ? 'asuncion' : 'cde', brand: 'JETOUR' }), env, bx);
    assert.equal(bx.leads.length, 1);
    assert.ok(pool.includes(bx.leads[0].ASSIGNED_BY_ID));
    assert.equal(bx.leads[0].SOURCE_ID, 'WEB_SR_GWM');
    assert.equal(bx.leads[0].UF_CRM_1775591500778, 297);
    assert.equal(bx.leads[0].ADDRESS_CITY, ciudad);
    assert.notEqual(bx.leads[0].ASSIGNED_BY_ID, 19);
  });
}

test('la cola usa el historial WEB_SR_GWM y asigna al que hace más tiempo no recibe', async () => {
  const bx = bitrixFalso({ historial: ASUNCION.map((id,i) => ({ ID:i+1, ASSIGNED_BY_ID:id, SOURCE_ID:'WEB_SR_GWM' })) });
  const asesor = await nextAdvisor(env, bx, 'asuncion');
  assert.equal(asesor.id, ASUNCION[0]);
  assert.equal(bx.llamadas.find(x => x.metodo === 'crm.lead.list').datos.filter.SOURCE_ID, 'WEB_SR_GWM');
});

test('no entrega un lead a un asesor inactivo', async () => {
  const bx = bitrixFalso({ activos: [79,121] });
  assert.equal((await nextAdvisor(env, bx, 'asuncion')).id, 79);
  assert.equal((await nextAdvisor(env, bx, 'cde')).id, 121);
});

test('usa las reservas de GWM o CDE si el pool está vacío', async () => {
  const bx = bitrixFalso({ activos: [] });
  assert.equal((await nextAdvisor(env, bx, 'asuncion')).id, 45);
  assert.equal((await nextAdvisor(env, bx, 'cde')).id, 21707);
});

test('dos solicitudes simultáneas respetan el reparto y no eligen al mismo asesor', async () => {
  const bx = bitrixFalso();
  await Promise.all([createLead(good(),env,bx),createLead(good(),env,bx)]);
  assert.equal(bx.leads.length, 2);
  assert.notEqual(bx.leads[0].ASSIGNED_BY_ID, bx.leads[1].ASSIGNED_BY_ID);
});

test('un reintento tras perder la respuesta no duplica el prospecto', async () => {
  const bx = bitrixFalso(), cuerpo = good();
  await Promise.all([createLead(cuerpo,env,bx),createLead(cuerpo,env,bx)]);
  resetState(); // también se detecta después de reiniciar la instancia
  await createLead(cuerpo,env,bx);
  assert.equal(bx.leads.length, 1);
});

test('conserva modelo, versión, fecha, comentarios y campaña en el CRM', async () => {
  const bx = bitrixFalso();
  await createLead(good({ version:'Quiero asesoramiento', fecha:'2026-10-20', comentarios:'Prefiero la tarde', email:'qa@example.com', pagina:'/modelos/ora-5-ev', campana:{utm_source:'google',utm_campaign:'ora5'} }),env,bx);
  const lead = bx.leads[0];
  for (const dato of ['Ora 5 EV','Quiero asesoramiento','2026-10-20','Prefiero la tarde','/modelos/ora-5-ev']) assert.ok(lead.COMMENTS.includes(dato),dato);
  assert.equal(lead.UTM_SOURCE,'google');
  assert.equal(lead.UTM_CAMPAIGN,'ora5');
  assert.equal(lead.PHONE[0].VALUE,'+595981123456');
  assert.equal(lead.EMAIL[0].VALUE,'qa@example.com');
});

test('cotización omite la fecha preferida de test drive', () => {
  assert.equal(validate(good({ tipo:'cotizacion', fecha:'2026-10-20' })).fecha,'');
});

test('rechaza ciudad, modelo y tipo desconocidos antes de contactar Bitrix', async () => {
  for (const invalido of [{ciudad:''},{ciudad:'no existe'},{slug:'otra-marca'},{tipo:'agendamiento'},{requestId:'incorrecto'}]) {
    const bx=bitrixFalso();
    await assert.rejects(createLead(good(invalido),env,bx),/Datos inválidos/);
    assert.equal(bx.llamadas.length,0);
  }
});

test('el honeypot no crea un prospecto', async () => {
  const bx=bitrixFalso();
  await createLead(good({website:'robot.test'}),env,bx);
  assert.equal(bx.leads.length,0);
});

test('no confirma recepción cuando Bitrix rechaza el alta', async () => {
  const bx=bitrixFalso();
  const fake=async(url,init)=>url.includes('crm.lead.add') ? new Response(JSON.stringify({error:'ERROR_CORE'}),{status:200}) : bx.fetch(url,init);
  const res=await handle(peticion(good()),env,{...bx,fetch:fake});
  assert.equal(res.status,502);
  assert.equal((await res.json()).ok,false);
});

test('no repite el alta automáticamente si la conexión pierde la respuesta', async () => {
  const bx=bitrixFalso();
  let altas=0;
  const fake=async(url,init)=> {
    if(url.includes('crm.lead.add')) { altas++; throw new Error('Respuesta perdida'); }
    return bx.fetch(url,init);
  };
  const res=await handle(peticion(good()),env,{...bx,fetch:fake});
  assert.equal(res.status,502);
  assert.equal(altas,1);
});

function peticion(body,headers={}) {
  return new Request('http://gwmweb.santarosa.lat/api/lead',{method:'POST',headers:{'content-type':'application/json','origin':'https://gwmweb.santarosa.lat','x-real-ip':'127.0.0.1',...headers},body:JSON.stringify(body)});
}

test('el endpoint rechaza origen ajeno y POST de texto sin tocar el CRM', async () => {
  const bx=bitrixFalso();
  assert.equal((await handle(peticion(good(),{origin:'https://otro.test'}),env,bx)).status,403);
  assert.equal((await handle(peticion(good(),{'content-type':'text/plain'}),env,bx)).status,415);
  assert.equal(bx.llamadas.length,0);
});

test('la salud comprueba Bitrix con una lectura y nunca expone el webhook', async () => {
  const bx=bitrixFalso();
  const res=await handle(new Request('http://localhost/api/lead?check=1'),env,bx);
  const cuerpo=await res.text();
  assert.deepEqual(JSON.parse(cuerpo),{ok:true,configured:true,bitrix:'ok'});
  assert.ok(!cuerpo.includes(env.BITRIX_WEBHOOK_URL));
  assert.ok(bx.llamadas.every(x=>!x.metodo.endsWith('.add')));
});

test('normaliza teléfonos de Paraguay sin duplicar el cero nacional', () => {
  for (const numero of ['0981 123 456','981123456','+595 0981 123 456','00595 981 123 456']) assert.equal(normalizePhone(numero),'+595981123456');
});
