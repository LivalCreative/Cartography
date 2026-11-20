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
