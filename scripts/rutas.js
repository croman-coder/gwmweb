/** URLs relevadas del HTML del sitio anterior. Los modelos retirados sin equivalente dan 404. */
export const PRODUCTOS_ANTERIORES = {
  3: "wingle-7",
  5: "tank-300-phev-4x4",
  7: "h9-diesel-24",
  8: "h6-gt-phev",
  10: "h7-phev",
  12: "new-h6-hev",
  13: "poer-diesel",
  14: "jolion-pro-hev",
  15: "new-h6-phev",
  16: "tank-400-phev-4x4",
  17: "tank-500-hev-4x4",
  18: "poer-diesel",
  21: "poer-p500",
  22: "tank-700-phev-4x4",
};
export function redireccion(ruta) {
  const producto = ruta.match(/^\/producto\/(\d+)(?:\/[^/]+)?\/?$/);
  if (producto && PRODUCTOS_ANTERIORES[producto[1]])
    return `/modelos/${PRODUCTOS_ANTERIORES[producto[1]]}`;
  if (ruta.endsWith("/") && ruta !== "/") return ruta.slice(0, -1);
  return null;
}
