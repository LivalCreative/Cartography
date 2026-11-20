// Catálogo público de Cartography.
// Aquí solo va lo que ven las clientas: nombre, fotos, textos y precio final en pesos.
// El precio en dólares, el link de la tienda y la fórmula de costos NO van aquí (este repositorio es público).
//
// mismoDia: true  → hay existencia en la tienda de Mission, TX y se compra con entrega el mismo día (corte tardío).
// mismoDia: false → se compra en línea y llega por paquetería (corte normal).
window.CARTO_PRODUCTOS = [
  {
    id: "medicube-glow-de-noche",
    marca: "medicube",
    nombre: "Kit Glow de Noche · 3 piezas",
    categoria: "Belleza",
    badge: "Edición navideña",
    fotos: ["img/medicube-glow-de-noche.jpg"],
    precio: 700,
    mismoDia: true,
    que: "Tu spa de noche en una caja de regalo. Trae la Collagen Jelly Cream de medicube en tamaño completo (50 ml) y 2 mascarillas de gel con colágeno, listas para regalar… o para consentirte tú, que también cuenta.",
    para: "Para despertar con la piel hidratada, firme y con ese brillo de “dormí 10 horas”, aunque no haya sido así.",
    usos: [
      { icono: "luna", titulo: "La crema", texto: "cada noche como último paso. Textura de gel ligero, se absorbe rápido y no deja la cara pegajosa." },
      { icono: "brillo", titulo: "Las mascarillas", texto: "para tus noches de consentirte, 1 o 2 veces por semana. Hidratan a fondo y amaneces con la piel suave y luminosa." }
    ],
    ideal: "tu intercambio, tu mamá, tu suegra, tu amiga fan del skincare… o para ti."
  }
];
