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
      (p.badge ? '<span class="badge">' + esc(p.badge) + "</span>" : "") + (p.variantes && p.variantes.length > 1 ? '<span class="nvar">' + p.variantes.length + " opciones</span>" : "") + '</div><div class="info"><span class="marca">' + esc(p.marca) +
      '</span><span class="nom">' + esc(p.nombre) + '</span><span class="pre">' + C.dinero(p.precio) + "</span></div></a>";
  }

  // Categorías de la tienda: id (para la URL), nombre (igual a p.categoria), texto, orden de subsecciones y portada
  const CATEGORIAS = [
    { id: "holidays", icono: "holidays", nombre: "Holidays", sub: "Dulces, chocolates y antojos de temporada que solo salen en Navidad en Estados Unidos.",
      grupos: ["Chocolates", "Gomitas y dulces", "Galletas, cereal y botanas", "Café, té y chocolate caliente", "Bebidas", "Papelería navideña"], portada: ["t1011368150"], fotosGrupo: { "Papelería navideña": "t1011839307" } },
    { id: "belleza", icono: "belleza", nombre: "Belleza y cuidado", sub: "Skincare, kits de regalo, cuidado del bebé y sets para él de las marcas favoritas de Estados Unidos.",
      grupos: ["Kits de skincare", "Cuidado facial", "Cuerpo y baño", "Bebé", "Para él", "Labios y manos", "Bienestar infantil", "Suplementos"], portada: ["t93592823"], fotosGrupo: { "Suplementos": "w17003869306", "Cuerpo y baño": "t95248090", "Kits de skincare": "t95251971", "Para él": "t1011891866" } },
    { id: "juguetes", icono: "juguetes", nombre: "Juguetes", sub: "LEGO, peluches, squishies, manualidades y los juguetes más pedidos de Estados Unidos, para Navidad y Reyes.",
      grupos: ["LEGO", "Peluches", "Squishies y antiestrés", "Manualidades y arte", "Juegos y coleccionables", "Juguetes y playsets", "Accesorios"], portada: ["t1006979445"], fotosGrupo: { "LEGO": "t95046299" } },
    { id: "accesorios", icono: "accesorios", nombre: "Accesorios", sub: "Broches, diademas, pinzas y todo para peinar a las niñas, con los diseños de Cat & Jack de Target.",
      grupos: ["Para el cabello", "Navideños"], portada: ["t95118563"], fotosGrupo: { "Navideños": "t95294219" } },
    { id: "ropa", nombre: "Ropa", sub: "Sudaderas, pijamas y conjuntos para bebés, niñas y niños de Walmart, en tallas de Estados Unidos.",
      grupos: ["Bebé", "Niñas", "Niños", "Pijamas"], portada: ["w20229720529"], icono: "ropa", iconosGrupo: { "Bebé": "bebe", "Niñas": "ninas", "Niños": "ninos", "Pijamas": "pijamas" } },
    { id: "loncheras", icono: "loncheras", nombre: "Loncheras", sub: "Loncheras y mochilas Bentgo para niños y adultos, termos y contenedores para llevar la comida a donde sea.",
      grupos: ["Para niños", "Para adultos", "Mochilas", "Contenedores y accesorios"], portada: ["t76556680"], fotosGrupo: { "Para adultos": "t94858670" } },
  ];
  const catPorId = id => CATEGORIAS.find(c => c.id === id);
  const catDe = p => CATEGORIAS.find(c => c.nombre === (p.categoria || "Holidays"));
  const productosDe = c => C.PRODUCTOS.filter(p => (p.categoria || "Holidays") === c.nombre);
  // Círculo estilo Target: foto redonda + nombre
  function circuloHTML(href, foto, nombre, activo) {
    return '<a class="circulo' + (activo ? " activo" : "") + '" href="' + href + '"' + (activo ? ' aria-current="page"' : "") +
      '><span class="bola"><img loading="lazy" src="' + esc(foto) + '" alt=""></span><span class="nombre">' + esc(nombre) + "</span></a>";
  }
  function fotoCategoria(c) {
    if (c.icono) return (document.querySelector('script[src*="comun.js"]').getAttribute("src").replace(/assets\/comun\.js.*$/, "")) + "img/iconos/" + c.icono + ".svg";
    const ps = productosDe(c);
    const p = ps.find(x => x.id === c.portada[0]) || ps[0];
    return p ? p.fotos[0] : "";
  }
  function fotoGrupo(c, g) {
    if (c.iconosGrupo && c.iconosGrupo[g]) return (document.querySelector('script[src*="comun.js"]').getAttribute("src").replace(/assets\/comun\.js.*$/, "")) + "img/iconos/" + c.iconosGrupo[g] + ".svg";
    const ps = productosDe(c).filter(p => p.grupo === g);
    const p = ps.find(x => (c.fotosGrupo || {})[g] === x.id) || ps[0];
    return p ? p.fotos[0] : "";
  }

  // Marcas destacadas: nombre igual a p.marca; logo opcional en img/marcas/ (si no hay, se muestra el nombre con estilo)
  const MARCAS = [
    { nombre: "Bentgo", logo: "img/marcas/bentgo.png", fondo: "#48a5dc" },
    { nombre: "LEGO", logo: "img/marcas/lego.png", fondo: "#ffffff" },
    { nombre: "HERSHEY'S", logo: "img/marcas/hersheys.png", fondo: "#43141a" },
    { nombre: "Lindt", logo: "img/marcas/lindt.png", fondo: "#ffffff" },
    { nombre: "Ghirardelli", logo: "img/marcas/ghirardelli.png", fondo: "#20356b" },
    { nombre: "Sol de Janeiro", logo: "img/marcas/sol-de-janeiro.png", fondo: "#fcb616" },
    { nombre: "Cat & Jack", logo: "img/marcas/cat-jack.png", fondo: "#b2dee4" },
    { nombre: "Squishmallows", logo: "img/marcas/squishmallows.png", fondo: "#ffffff" },
    { nombre: "Post-it", logo: "img/marcas/post-it.png", fondo: "#ffffff" },
    { nombre: "The Honest Company", logo: "img/marcas/honest.png", fondo: "#f3e7db" },
    { nombre: "Burt's Bees", logo: "img/marcas/burts-bees.png", fondo: "#ffffff" },
  ];
  const slugMarca = m => m.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const productosMarca = m => C.PRODUCTOS.filter(p => slugMarca(p.marca) === slugMarca(m));
  function marcaHTML(m, base) {
    const n = productosMarca(m.nombre).length; if (!n) return "";
    return '<a class="marca-card" href="' + base + "?marca=" + slugMarca(m.nombre) + '">' +
      (m.logo ? '<span class="marca-logo" style="background:' + (m.fondo || "#fff") + '"><img loading="lazy" src="' + esc(base.replace(/categoria\/$/, "") + m.logo) + '" alt="' + esc(m.nombre) + '"></span>' : '<span class="marca-nom">' + esc(m.nombre) + "</span>") +
      "</a>";
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
  window.CARTO_UI = { esc, pasosHTML, tarjetaHTML, aviso, USO, CATEGORIAS, catPorId, catDe, productosDe, circuloHTML, fotoCategoria, fotoGrupo, MARCAS, slugMarca, productosMarca, marcaHTML };
})();
