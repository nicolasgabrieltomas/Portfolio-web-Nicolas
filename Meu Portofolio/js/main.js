/* ==========================================================================
   Portfólio de Nicolas Gabriel Tomás
   Navegação, seção ativa, animações de entrada, detalhes dos projetos,
   escolha do tipo de site (mensagem para WhatsApp e email) e copiar email.
   Os efeitos de cursor ficam em efeitos.js: o site funciona sem eles.
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

  /* ---------- Detalhes do projeto ---------- */
  // Cada card guarda o próprio conteúdo num <template>. O botão só aparece
  // quando o navegador suporta <dialog>; sem isso, o card continua com o link do site.
  const dialogo = document.getElementById("detalhe");
  const conteudo = document.getElementById("detalhe-conteudo");
  const fechar = document.getElementById("detalhe-fechar");
  let origem = null;

  if (dialogo && typeof dialogo.showModal === "function") {
    document.querySelectorAll("[data-detail]").forEach((botao) => {
      const modelo = botao.closest("article")?.querySelector("template.detail-tpl");
      if (!modelo) return;
      botao.hidden = false;
      botao.setAttribute("aria-haspopup", "dialog");
      botao.addEventListener("click", () => {
        origem = botao;
        conteudo.replaceChildren(modelo.content.cloneNode(true));
        const titulo = conteudo.querySelector(".detail__title");
        if (titulo) titulo.id = "detalhe-titulo";
        dialogo.showModal();
        dialogo.querySelector(".detail__inner").scrollTop = 0;
        fechar.focus();
      });
    });

    fechar.addEventListener("click", () => dialogo.close());
    // clique no fundo escurecido fecha (o alvo é o próprio <dialog>)
    dialogo.addEventListener("click", (evento) => {
      if (evento.target === dialogo) dialogo.close();
    });
    dialogo.addEventListener("close", () => {
      conteudo.replaceChildren();
      if (origem) origem.focus();
      origem = null;
    });
  }

  /* ---------- Que tipo de site você precisa? ---------- */
  const WHATSAPP = "5549998356772";
  const EMAIL = "nic.gabriel.tom@gmail.com";
  const ABERTURA = "Olá, Nicolas! Conheci seu portfólio e gostaria de conversar sobre";

  // trechos entre colchetes viram links para os cards dos projetos
  const OPCOES = {
    padrao: {
      titulo: "Fale direto comigo",
      dica: ["Escolha uma opção ao lado para a mensagem já chegar com o contexto, ou comece a conversa agora."],
      assunto: "um projeto",
      email: "Projeto de site",
    },
    institucional: {
      titulo: "Site institucional",
      dica: ["Para apresentar a empresa, os serviços e as formas de contato. Exemplos no portfólio: ",
        ["sabor", "Sabor & Saúde"], ", ", ["lg2", "LG2 Produções"], " e ", ["movimento", "Movimento"], "."],
      assunto: "o desenvolvimento de um site institucional para a minha empresa",
      email: "Projeto: site institucional",
    },
    landing: {
      titulo: "Landing page",
      dica: ["Uma página com um objetivo só, como apresentar um serviço ou uma campanha. Exemplos: ",
        ["proinlead", "Pró Inlead"], " e ", ["credlaux", "CredLaux"], "."],
      assunto: "o desenvolvimento de uma landing page",
      email: "Projeto: landing page",
    },
    loja: {
      titulo: "Loja virtual",
      dica: ["Catálogo, carrinho, pagamento, frete e um painel para gerenciar os pedidos. Exemplo: a loja da ",
        ["brandao", "Brandão Store"], "."],
      assunto: "o desenvolvimento de uma loja virtual",
      email: "Projeto: loja virtual",
    },
    redesign: {
      titulo: "Redesign de site",
      dica: ["Para modernizar um site que já existe. Na conversa, mande o endereço do site atual."],
      assunto: "o redesign do site da minha empresa",
      email: "Projeto: redesign de site",
    },
    outro: {
      titulo: "Outro projeto",
      dica: ["Me conte o que você precisa. Áreas administrativas, catálogos e integrações sob medida também entram aqui."],
      assunto: "um projeto sob medida para a minha empresa",
      email: "Projeto sob medida",
    },
  };

  const briefing = document.getElementById("briefing");
  if (briefing) {
    const elTitulo = document.getElementById("briefing-title");
    const elDica = document.getElementById("briefing-hint");
    const elMensagem = document.getElementById("briefing-msg");
    const balao = elMensagem.closest(".bubble");
    const linkWhats = document.getElementById("briefing-whatsapp");
    const linkEmail = document.getElementById("briefing-email");

    const montarDica = (partes) => {
      const fragmento = document.createDocumentFragment();
      partes.forEach((parte) => {
        if (typeof parte === "string") {
          fragmento.append(parte);
        } else {
          const a = document.createElement("a");
          a.href = `#projeto-${parte[0]}`;
          a.textContent = parte[1];
          fragmento.append(a);
        }
      });
      return fragmento;
    };

    const aplicar = (chave) => {
      const opcao = OPCOES[chave] || OPCOES.padrao;
      const mensagem = `${ABERTURA} ${opcao.assunto}.`;
      elTitulo.textContent = opcao.titulo;
      elDica.replaceChildren(montarDica(opcao.dica));
      elMensagem.textContent = mensagem;
      linkWhats.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
      linkEmail.href = `mailto:${EMAIL}?subject=${encodeURIComponent(opcao.email)}&body=${encodeURIComponent(mensagem)}`;
      if (!semMovimento) {
        balao.classList.remove("is-updated");
        void balao.offsetWidth; // reinicia a animação
        balao.classList.add("is-updated");
      }
    };

    briefing.addEventListener("change", (evento) => {
      if (evento.target.name === "tipo") aplicar(evento.target.value);
    });

    // botões dos serviços já chegam com a opção escolhida
    document.querySelectorAll("[data-servico]").forEach((link) => {
      link.addEventListener("click", () => {
        const radio = briefing.querySelector(`input[name="tipo"][value="${link.dataset.servico}"]`);
        if (!radio) return;
        radio.checked = true;
        aplicar(radio.value);
        setTimeout(() => radio.focus({ preventScroll: true }), 60);
      });
    });

    // o navegador pode restaurar a opção marcada ao voltar para a página
    const marcada = briefing.querySelector('input[name="tipo"]:checked');
    if (marcada) aplicar(marcada.value);
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
