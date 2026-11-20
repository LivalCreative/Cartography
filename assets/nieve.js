// Nieve que cae suavemente sobre la página (tema navideño). Respeta "reducir movimiento".
(function () {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c = document.createElement("canvas");
  c.id = "nieve"; c.setAttribute("aria-hidden", "true");
  document.addEventListener("DOMContentLoaded", () => document.body.appendChild(c));
  const ctx = c.getContext("2d");
  let W = 0, H = 0, copos = [], dpr = Math.min(window.devicePixelRatio || 1, 2);
  function tam() {
    W = window.innerWidth; H = window.innerHeight;
    c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = W < 700 ? 45 : 90;
    while (copos.length < n) copos.push(nuevo(true));
    copos.length = n;
  }
  function nuevo(arriba) {
    return { x: Math.random() * W, y: arriba ? Math.random() * H : -10, r: 1.6 + Math.random() * 3,
             v: 0.35 + Math.random() * 0.9, d: Math.random() * Math.PI * 2, o: 0.55 + Math.random() * 0.4 };
  }
  function paso() {
    ctx.clearRect(0, 0, W, H);
    for (const f of copos) {
      f.y += f.v; f.d += 0.012; f.x += Math.sin(f.d) * 0.4;
      if (f.y > H + 10) Object.assign(f, nuevo(false));
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255," + f.o + ")";
      ctx.shadowColor = "rgba(142,90,168,.55)"; ctx.shadowBlur = 4;
      ctx.fill();
    }
    requestAnimationFrame(paso);
  }
  window.addEventListener("resize", tam);
  tam(); requestAnimationFrame(paso);
})();

// Decoraciones navideñas: gorro de Santa en el logo, esferas colgando, montaña de nieve y pueblo nevado al pie.
(function () {
  const GORRO = '<svg class="gorro" viewBox="0 0 60 48" aria-hidden="true"><path d="M8 38C14 16 30 4 46 8c6 2 8 10 4 18-4-6-10-8-14-4-2 6-2 12-2 16z" fill="#c3313d"/><path d="M20 20c6-6 14-9 22-8" stroke="#9c2230" stroke-width="2" fill="none" opacity=".5"/><rect x="3" y="33" width="38" height="11" rx="5.5" fill="#fff" stroke="#efe7e4"/><circle cx="51" cy="28" r="6.5" fill="#fff" stroke="#efe7e4"/></svg>';
  function esfera(h, c) {
    return '<svg width="34" height="' + (h + 40) + '" viewBox="0 0 34 ' + (h + 40) + '" aria-hidden="true"><line x1="17" y1="0" x2="17" y2="' + h + '" stroke="#b9a7a0" stroke-width="1.2"/><rect x="12" y="' + h + '" width="10" height="7" rx="2" fill="#e8b04b"/><circle cx="17" cy="' + (h + 22) + '" r="15" fill="' + c + '"/><path d="M9 ' + (h + 18) + 'a9 9 0 0 1 6-7" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/><path d="M3 ' + (h + 24) + 'h28" stroke="#fff" stroke-width="1.4" stroke-dasharray="2 3" opacity=".55"/></svg>';
  }
  const NIEVE = '<svg class="nieve-borde" viewBox="0 0 1200 46" preserveAspectRatio="none" aria-hidden="true"><path d="M0 46V22c60-14 110-16 170-6s120 18 190 4 130-22 210-8 140 20 220 6 130-18 210-6 120 12 200 2v32z" fill="#fff" opacity=".85"/><path d="M0 46V32c80-8 150-4 230 2s160 6 240-4 150-10 240 0 150 8 240-2 150-6 250 2v18z" fill="#fff"/></svg>';
  function casa(x, w, h, c) {
    const t = 110 - 26;
    return '<g><rect x="' + x + '" y="' + (t - h) + '" width="' + w + '" height="' + h + '" fill="' + c + '"/><path d="M' + (x - 5) + ' ' + (t - h) + 'L' + (x + w / 2) + ' ' + (t - h - w * 0.55) + 'L' + (x + w + 5) + ' ' + (t - h) + 'z" fill="' + c + '"/><path d="M' + (x - 5) + ' ' + (t - h) + 'L' + (x + w / 2) + ' ' + (t - h - w * 0.55) + 'L' + (x + w + 5) + ' ' + (t - h) + '" stroke="#fff" stroke-width="4" fill="none" stroke-linejoin="round"/><rect x="' + (x + w * 0.2) + '" y="' + (t - h * 0.7) + '" width="' + w * 0.22 + '" height="' + w * 0.22 + '" fill="#ffd97a"/><rect x="' + (x + w * 0.58) + '" y="' + (t - h * 0.7) + '" width="' + w * 0.22 + '" height="' + w * 0.22 + '" fill="#ffd97a"/><rect x="' + (x + w * 0.4) + '" y="' + (t - h * 0.38) + '" width="' + w * 0.2 + '" height="' + h * 0.38 + '" fill="#c3313d"/></g>';
  }
  function pino(x, s) {
    const b = 110 - 26;
    return '<g fill="#2f6b4f"><path d="M' + x + ' ' + (b - 46 * s) + 'l' + 14 * s + ' ' + 20 * s + 'h-' + 7 * s + 'l' + 11 * s + ' ' + 16 * s + 'h-' + 8 * s + 'l' + 10 * s + ' ' + 10 * s + 'h-' + 40 * s + 'l' + 10 * s + '-' + 10 * s + 'h-' + 8 * s + 'l' + 11 * s + '-' + 16 * s + 'h-' + 7 * s + 'z"/><rect x="' + (x - 2.5 * s) + '" y="' + b + '" width="' + 5 * s + '" height="4" fill="#5b3b2a"/><path d="M' + (x - 6 * s) + ' ' + (b - 30 * s) + 'h' + 12 * s + 'M' + (x - 10 * s) + ' ' + (b - 16 * s) + 'h' + 20 * s + '" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".85"/></g>';
  }
  function pueblo() {
    let g = "";
    const items = [["p", 40, 1], ["c", 90, 46, 34, "#7a4e8f"], ["p", 170, 0.8], ["c", 220, 56, 44, "#9c2230"], ["p", 310, 1.1], ["c", 360, 40, 30, "#2f6b4f"],
      ["p", 450, 0.9], ["c", 520, 60, 46, "#7a4e8f"], ["p", 620, 1.2], ["c", 680, 44, 34, "#c3313d"], ["p", 770, 0.85], ["c", 830, 52, 40, "#2f6b4f"],
      ["p", 920, 1.05], ["c", 980, 46, 36, "#9c2230"], ["p", 1070, 0.9], ["c", 1120, 40, 30, "#7a4e8f"]];
    for (const it of items) g += it[0] === "p" ? pino(it[1], it[2]) : casa(it[1], it[2], it[3], it[4]);
    return '<svg class="pueblo" viewBox="0 0 1200 110" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' + g +
      '<path d="M0 110V86c100-10 180-8 300 0s200 6 300-2 200-8 300 0 200 6 300-2v28z" fill="#fff"/><path d="M0 110v-12c150-6 300-4 600 0s450 4 600-2v14z" fill="#3e2c47"/></svg>';
  }
  document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector(".barra .logo");
    if (logo) logo.insertAdjacentHTML("afterbegin", GORRO);
    const sello = document.querySelector(".portada .sello");
    if (sello) { const w = document.createElement("span"); w.className = "sello-wrap"; sello.replaceWith(w); w.appendChild(sello); w.insertAdjacentHTML("afterbegin", GORRO); }
    const portada = document.querySelector(".portada");
    if (portada) {
      portada.insertAdjacentHTML("afterbegin", '<div class="esferas">' + esfera(30, "#c3313d") + esfera(58, "#2f6b4f") + esfera(18, "#e8b04b") + esfera(44, "#c3313d") + "</div>");
      portada.insertAdjacentHTML("afterend", NIEVE);
      const h = portada.querySelector("h1.grande");
      if (h) h.innerHTML = h.innerHTML.replace("casa.", '<span class="rojo">casa.</span>');
    }
    const pie = document.querySelector(".pie");
    if (pie) pie.insertAdjacentHTML("afterbegin", pueblo());
  });
})();
