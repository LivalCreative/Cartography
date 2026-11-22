// Cartography: datos del negocio, carrito y utilidades compartidas.
(function () {
  // ---- Datos del negocio ----
  const WHATSAPP = "4422791488";
  const CLABE = "012680004682074457";
  const BANCO = "BBVA";
  const TITULAR = "Lilian Valladares López";
  const PAGO_INICIAL = 0.7; // se cobra al ordenar, redondeado hacia arriba a la decena

  // Cruces de la frontera. Las fechas de entrega son estimadas.
  // corteEnLinea: último día para pedir productos que se compran en línea (llegan por paquetería a la bodega).
  // corteMismoDia: último día para pedir productos con entrega el mismo día desde la tienda de Mission, TX.
  const CRUCES = [
    { cruce: "2026-12-01", corteEnLinea: "2026-11-23", corteMismoDia: "2026-11-29", entrega: "10 al 14 de diciembre" },
    { cruce: "2026-12-13", corteEnLinea: "2026-12-05", corteMismoDia: "2026-12-11", entrega: "22 al 24 de diciembre", nota: "Llega justo para Navidad; si se retrasa, para Reyes" },
    { cruce: "2026-12-20", corteEnLinea: "2026-12-12", corteMismoDia: "2026-12-18", entrega: "2 al 5 de enero", nota: "La caja de Reyes" }
  ];

  const LUGARES = ["Uptown Juriquilla", "Urban Center Jurica", "Portal Querétaro", "UTEQ", "Santander de 5 de Febrero",
    "Walmart de Bernardo Quintana", "Plaza Esfera (McDonald's Plaza de Toros), solo domingo", "Arcos (Editorial Trillas), solo domingo"];

  const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

  const PRODUCTOS = window.CARTO_PRODUCTOS || [];
  const porId = id => PRODUCTOS.find(p => p.id === id);

  function fecha(iso) { return new Date(iso + "T12:00:00"); }
  function hoyISO() { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function bonita(iso, conDia) { const d = fecha(iso); return (conDia ? DIAS[d.getDay()] + " " : "") + d.getDate() + " de " + MESES[d.getMonth()]; }
  function dinero(n) { return "$" + Math.round(n).toLocaleString("es-MX"); }
  function pagoInicial(total) { return Math.min(total, Math.ceil(total * PAGO_INICIAL / 10) * 10); }

  // Cruce al que alcanza un producto si se pide hoy
  function cruceDe(p) {
    const hoy = hoyISO();
    for (const c of CRUCES) {
      const corte = p && p.mismoDia ? c.corteMismoDia : c.corteEnLinea;
      if (hoy <= corte) return Object.assign({ corte }, c);
    }
    return null;
  }
  function proximoCruce() {
    const hoy = hoyISO();
    return CRUCES.find(c => hoy <= c.corteMismoDia) || null;
  }

  // ---- Carrito (se guarda en este celular) ----
  const KEY = "carto_pedido_v1";
  function leer() {
    try { const o = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; Object.keys(o).forEach(k => { if (!porId(k.split("::")[0]) || !(o[k] > 0)) delete o[k]; }); return o; }
    catch (e) { return {}; }
  }
  function guardar(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} document.dispatchEvent(new CustomEvent("carto:pedido")); }
  function agregar(id, n) { const o = leer(); o[id] = (o[id] || 0) + (n || 1); guardar(o); }
  function cambiar(id, n) { const o = leer(); if (n > 0) o[id] = n; else delete o[id]; guardar(o); }
  function piezas() { const o = leer(); return Object.values(o).reduce((s, n) => s + n, 0); }
  function lineas() {
    const o = leer();
    return Object.keys(o).map(id => { const [b, op] = id.split("::"); const p = porId(b); const v = op && p.variantes ? p.variantes.find(x => (p.opciones.nombre + " " + x.n) === op) : null; const pu = v ? v.p : p.precio; return { p, key: id, opcion: op || "", n: o[id], precio: pu, sub: pu * o[id], foto: v ? v.f : p.fotos[0], cruce: cruceDe(p) }; });
  }

  function pintarContador() { document.querySelectorAll("[data-contador]").forEach(e => { e.textContent = piezas(); }); }
  document.addEventListener("carto:pedido", pintarContador);
  document.addEventListener("DOMContentLoaded", pintarContador);
  window.addEventListener("storage", pintarContador);

  window.CARTO = { WHATSAPP, CLABE, BANCO, TITULAR, CRUCES, LUGARES, PRODUCTOS, porId, bonita, dinero, pagoInicial, cruceDe, proximoCruce, leer, agregar, cambiar, piezas, lineas, hoyISO, fecha };
})();
