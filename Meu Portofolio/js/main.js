/* ==========================================================================
   Portfólio — Nicolas Gabriel Tomás
   Header, menu mobile, seção ativa, animações de entrada, copiar email
   ========================================================================== */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header: fundo ao rolar ---------- */
  const header = document.getElementById("header");

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ---------- Menu mobile ---------- */
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = Array.from(nav.querySelectorAll(".nav__link"));

  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    header.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.style.overflow = open ? "hidden" : "";
  };

  navToggle.addEventListener("click", () => {
    setMenu(!nav.classList.contains("is-open"));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setMenu(false);
      navToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (nav.classList.contains("is-open") && !header.contains(event.target)) setMenu(false);
  });

  // fecha o menu se a janela crescer para o layout desktop
  const desktopQuery = window.matchMedia("(min-width: 901px)");
  desktopQuery.addEventListener("change", (event) => {
    if (event.matches) setMenu(false);
  });

  /* ---------- Seção ativa no menu ---------- */
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setActive = (id) => {
    navLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };

  if ("IntersectionObserver" in window) {
    const visible = new Map();
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry.intersectionRatio));
        let bestId = null;
        let bestRatio = 0;
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        if (bestId) setActive(bestId);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ---------- Animações de entrada ---------- */
  const revealItems = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    revealItems.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- Spotlight nos cards de projeto (só com mouse) ---------- */
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".project").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    });
  }

  /* ---------- Copiar email ---------- */
  const copyStatus = document.getElementById("copy-status");

  const copyFallback = (text) => {
    // para navegadores antigos ou quando a Clipboard API é bloqueada
    const area = document.createElement("textarea");
    area.value = text;
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
    if (!ok) throw new Error("copy failed");
  };

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch {
        /* cai no fallback abaixo */
      }
    }
    copyFallback(text);
  };

  document.querySelectorAll(".copy-btn").forEach((button) => {
    const label = button.querySelector(".copy-btn__text");
    const original = label.textContent;
    let timer;

    button.addEventListener("click", async () => {
      try {
        await copyText(button.dataset.copy);
        button.classList.add("is-copied");
        label.textContent = "Copiado!";
        if (copyStatus) copyStatus.textContent = "Email copiado para a área de transferência.";
      } catch {
        label.textContent = "Erro";
        if (copyStatus) copyStatus.textContent = "Não foi possível copiar o email.";
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        button.classList.remove("is-copied");
        label.textContent = original;
        if (copyStatus) copyStatus.textContent = "";
      }, 2200);
    });
  });

  /* ---------- Ano no rodapé ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = String(Math.max(2026, new Date().getFullYear()));
})();
