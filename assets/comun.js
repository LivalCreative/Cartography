// Piezas de pantalla compartidas: pasos de "Así llega tu pedido", tarjetas de producto y aviso.
(function () {
  const C = window.CARTO;
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const sv = 'fill="none" stroke="#8e5aa8" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"';
  const ICO = {
    bolsa: '<svg ' + sv + '><path d="M6 8h12l-1 12H7z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    avion: '<svg ' + sv + '><path d="M10.5 3.8a1.5 1.5 0 0 1 3 0V9l7 4v2l-7-2v4.5l2 1.5v1.5l-3.5-1-3.5 1V19l2-1.5V13l-7 2v-2l7-4z"/></svg>',
    caja: '<svg ' + sv + '><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5"/><path d="M12 12v9"/><path d="M12 12L4 7.5"/></svg>',
    regalo: '<svg ' + sv + '><path d="M4 11h16v9H4z"/><path d="M3 7h18v4H3z"/><path d="M12 7v13"/><path d="M12 7c-2-3-5-3-5-1s3 1 5 1c2 0 5 1 5-1s-3-2-5 1"/></svg>'
  };
  const PASOS = [["bolsa", "Haces tu pedido"], ["avion", "Viaja de USA a MEX"], ["caja", "Se importa"], ["regalo", "Te lo entregamos"]];
  const USO = { luna: "☾", brillo: "✦" };

  function pasosHTML() {
    return PASOS.map((p, i) => (i ? '<div class="dash"></div>' : "") + '<div class="st"><div class="ic">' + ICO[p[0]] + "</div>" + p[1] + "</div>").join("");
  }
  function tarjetaHTML(p, base) {
    return '<a class="prod" href="' + base + encodeURIComponent(p.id) + '"><div class="foto"><img loading="lazy" src="' + esc(p.fotos[0]) + '" alt="' + esc(p.nombre) + '">' +
      (p.fotos[1] ? '<img class="alt" loading="lazy" src="' + esc(p.fotos[1]) + '" alt="">' : "") +
      (p.badge ? '<span class="badge">' + esc(p.badge) + "</span>" : "") + '</div><div class="info"><span class="marca">' + esc(p.marca) +
      '</span><span class="nom">' + esc(p.nombre) + '</span><span class="pre">' + C.dinero(p.precio) + "</span></div></a>";
  }
  function aviso(texto, href, accion) {
    const a = document.getElementById("aviso"); if (!a) return;
    a.innerHTML = "<span>" + esc(texto) + "</span>" + (href ? '<a href="' + href + '">' + esc(accion) + "</a>" : "");
    a.hidden = false; clearTimeout(window.__avisoT); window.__avisoT = setTimeout(() => { a.hidden = true; }, 5000);
  }
  document.addEventListener("DOMContentLoaded", () => {
    const b = document.getElementById("banda"), pc = C.proximoCruce && C.proximoCruce();
    if (b && pc) b.innerHTML = "Edición navideña · Pide antes del <b>" + C.bonita(pc.corteMismoDia) + "</b> y recíbelo del " + esc(pc.entrega);
  });
  window.CARTO_UI = { esc, pasosHTML, tarjetaHTML, aviso, USO };
})();
