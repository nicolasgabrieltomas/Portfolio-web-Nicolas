/* ==========================================================================
   Efeitos de cursor (opcionais)
   Iluminação ambiente que acompanha o mouse, borda iluminada nos cards e
   profundidade leve na composição do topo.
   Só roda com mouse ou cursor preciso e sem preferência por movimento reduzido.
   Tudo é atualizado em requestAnimationFrame e o laço para quando o cursor para.
   ========================================================================== */
(() => {
  "use strict";

  const cursorPreciso = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!cursorPreciso || semMovimento) return;

  /* ---------- Iluminação ambiente ---------- */
  const ambiente = document.createElement("div");
  ambiente.className = "ambient";
  ambiente.setAttribute("aria-hidden", "true");
  const luz = document.createElement("div");
  luz.className = "ambient__light";
  ambiente.append(luz);
  document.body.prepend(ambiente);

  let alvoX = window.innerWidth / 2;
  let alvoY = window.innerHeight / 3;
  let x = alvoX;
  let y = alvoY;
  let quadroLuz = 0;

  const moverLuz = () => {
    // aproxima 14% da distância por quadro: movimento suave, sem atraso perceptível
    x += (alvoX - x) * 0.14;
    y += (alvoY - y) * 0.14;
    luz.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    quadroLuz = Math.abs(alvoX - x) > 0.4 || Math.abs(alvoY - y) > 0.4 ? requestAnimationFrame(moverLuz) : 0;
  };

  window.addEventListener(
    "pointermove",
    (evento) => {
      if (evento.pointerType !== "mouse" && evento.pointerType !== "pen") return;
      alvoX = evento.clientX;
      alvoY = evento.clientY;
      ambiente.classList.add("is-on");
      if (!quadroLuz) quadroLuz = requestAnimationFrame(moverLuz);
    },
    { passive: true }
  );

  // apaga a luz quando o cursor sai da janela
  document.addEventListener("mouseout", (evento) => {
    if (!evento.relatedTarget) ambiente.classList.remove("is-on");
  });

  /* ---------- Borda e brilho seguindo o cursor nos cards ---------- */
  document.querySelectorAll("[data-spotlight]").forEach((card) => {
    let pendente = false;
    let px = 0;
    let py = 0;
    card.addEventListener(
      "pointermove",
      (evento) => {
        px = evento.clientX;
        py = evento.clientY;
        if (pendente) return;
        pendente = true;
        requestAnimationFrame(() => {
          const caixa = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${(px - caixa.left).toFixed(0)}px`);
          card.style.setProperty("--my", `${(py - caixa.top).toFixed(0)}px`);
          pendente = false;
        });
      },
      { passive: true }
    );
  });

  /* ---------- Profundidade na composição do topo ---------- */
  const palco = document.getElementById("hero-stage");
  const hero = palco?.closest(".hero");
  if (palco && hero) {
    const camadas = Array.from(palco.querySelectorAll("[data-depth]")).map((el) => ({
      el,
      profundidade: Number(el.dataset.depth) || 0,
    }));
    let gx = 0;
    let gy = 0;
    let sx = 0;
    let sy = 0;
    let quadro = 0;

    const mover = () => {
      sx += (gx - sx) * 0.1;
      sy += (gy - sy) * 0.1;
      // deslocamento máximo de metade da profundidade em px (16 px na camada mais próxima)
      camadas.forEach(({ el, profundidade }) => {
        el.style.transform = `translate3d(${(sx * profundidade).toFixed(2)}px, ${(sy * profundidade).toFixed(2)}px, 0)`;
      });
      quadro = Math.abs(gx - sx) > 0.002 || Math.abs(gy - sy) > 0.002 ? requestAnimationFrame(mover) : 0;
    };

    hero.addEventListener(
      "pointermove",
      (evento) => {
        const caixa = palco.getBoundingClientRect();
        const limite = (v) => Math.max(-0.5, Math.min(0.5, v));
        gx = limite((evento.clientX - (caixa.left + caixa.width / 2)) / caixa.width);
        gy = limite((evento.clientY - (caixa.top + caixa.height / 2)) / caixa.height);
        if (!quadro) quadro = requestAnimationFrame(mover);
      },
      { passive: true }
    );
    hero.addEventListener("pointerleave", () => {
      gx = 0;
      gy = 0;
      if (!quadro) quadro = requestAnimationFrame(mover);
    });
  }
})();
