/* ==========================================================================
   Portfólio de Nicolas Gabriel Tomás
   Header, menu mobile, seção ativa, vitrine, animações de entrada e copiar email
   ========================================================================== */
(() => {
  "use strict";

  const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header: fundo ao rolar ---------- */
  const header = document.getElementById("header");
  const atualizarHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
  atualizarHeader();
  window.addEventListener("scroll", atualizarHeader, { passive: true });

  /* ---------- Menu mobile ---------- */
  const nav = document.getElementById("nav");
  const botaoMenu = document.getElementById("nav-toggle");
  const links = Array.from(nav.querySelectorAll(".nav__link"));

  const definirMenu = (aberto) => {
    nav.classList.toggle("is-open", aberto);
    header.classList.toggle("is-open", aberto);
    botaoMenu.setAttribute("aria-expanded", String(aberto));
    botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    document.body.style.overflow = aberto ? "hidden" : "";
  };

  botaoMenu.addEventListener("click", () => definirMenu(!nav.classList.contains("is-open")));

  nav.addEventListener("click", (evento) => {
    if (evento.target.closest("a")) definirMenu(false);
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && nav.classList.contains("is-open")) {
      definirMenu(false);
      botaoMenu.focus();
    }
  });

  document.addEventListener("click", (evento) => {
    if (nav.classList.contains("is-open") && !header.contains(evento.target)) definirMenu(false);
  });

  window.matchMedia("(min-width: 921px)").addEventListener("change", (evento) => {
    if (evento.matches) definirMenu(false);
  });

  /* ---------- Seção ativa no menu ---------- */
  const secoes = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const marcarAtivo = (id) => {
    links.forEach((link) => {
      const ativo = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", ativo);
      if (ativo) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };

  if ("IntersectionObserver" in window && secoes.length) {
    const visiveis = new Map();
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => visiveis.set(e.target.id, e.intersectionRatio));
        let melhorId = null;
        let melhorRazao = 0;
        visiveis.forEach((razao, id) => {
          if (razao > melhorRazao) {
            melhorRazao = razao;
            melhorId = id;
          }
        });
        if (melhorId) marcarAtivo(melhorId);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );
    secoes.forEach((secao) => observador.observe(secao));
  }

  /* ---------- Vitrine em movimento ---------- */
  // duplica as capturas para o laço ficar contínuo (o CSS desloca -50%)
  const trilho = document.getElementById("reel-track");
  if (trilho && !semMovimento) {
    trilho.append(...Array.from(trilho.children).map((item) => item.cloneNode(true)));
  }

  /* ---------- Animações de entrada ---------- */
  const itens = document.querySelectorAll(".reveal");

  if (semMovimento || !("IntersectionObserver" in window)) {
    itens.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observador = new IntersectionObserver(
      (entradas, obs) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("is-visible");
            obs.unobserve(entrada.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    itens.forEach((el) => observador.observe(el));
  }

  /* ---------- Copiar email ---------- */
  const aviso = document.getElementById("copy-status");

  const copiarAlternativo = (texto) => {
    const area = document.createElement("textarea");
    area.value = texto;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } finally {
      area.remove();
    }
    if (!ok) throw new Error("falha ao copiar");
  };

  const copiar = async (texto) => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(texto);
        return;
      } catch {
        /* cai no método alternativo */
      }
    }
    copiarAlternativo(texto);
  };

  document.querySelectorAll(".copy-btn").forEach((botao) => {
    const rotulo = botao.querySelector(".copy-btn__text");
    const original = rotulo.textContent;
    let timer;

    botao.addEventListener("click", async () => {
      try {
        await copiar(botao.dataset.copy);
        botao.classList.add("is-copied");
        rotulo.textContent = "Copiado!";
        if (aviso) aviso.textContent = "Email copiado para a área de transferência.";
      } catch {
        rotulo.textContent = "Erro";
        if (aviso) aviso.textContent = "Não foi possível copiar o email.";
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        botao.classList.remove("is-copied");
        rotulo.textContent = original;
        if (aviso) aviso.textContent = "";
      }, 2200);
    });
  });

  /* ---------- Ano no rodapé ---------- */
  const ano = document.getElementById("year");
  if (ano) ano.textContent = String(new Date().getFullYear());
})();
