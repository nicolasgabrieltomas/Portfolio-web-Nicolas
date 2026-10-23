# Portfólio de Nicolas Gabriel Tomás

Site pessoal publicado em https://portfolio-nicolastomas.netlify.app/

Página única em HTML, CSS e JavaScript puros, sem framework, build ou dependências.
O que carrega de fora são apenas as fontes do Google Fonts.

## Estrutura

```
Meu Portofolio/
├── index.html          # conteúdo e estrutura (seções marcadas por comentários)
├── css/styles.css      # design system em :root + estilos por seção
├── js/main.js          # menu, seção ativa, animações, detalhes dos projetos,
│                       # escolha do tipo de site (WhatsApp/email) e copiar email
├── js/efeitos.js       # efeitos de cursor (opcional: o site funciona sem ele)
├── assets/
│   ├── projetos/       # capturas reais: nome.webp (1200×750) e nome-mobile.webp (440×952)
│   ├── nicolas-hero.webp
│   ├── og-image.jpg    # imagem de compartilhamento social
│   ├── favicon.svg
│   └── Curriculo Nicolas.pdf
└── robots.txt
netlify.toml            # pasta publicada + headers de cache e segurança
```

## Rodar localmente

```bash
npx serve "Meu Portofolio"
```

Não há etapa de build: o que está na pasta é o que vai para o ar.

## Como atualizar

### Adicionar um projeto

1. Salve as capturas em `assets/projetos/`: `nome.webp` (computador, 1200×750) e
   `nome-mobile.webp` (celular, 440×952).
2. Em `index.html`, duplique um `<article class="proj ...">` dentro de `.proj-grid`
   (ou um `<article class="other">` em "Outros projetos") e troque textos, links e imagens.
   - Na grade, use `proj--wide` e `proj--narrow` em pares, alternando a ordem a cada linha.
3. Cada card tem um `<template class="detail-tpl">` com o conteúdo da janela de detalhes
   (contexto, solução, o que foi desenvolvido, tecnologias). O botão "Conhecer o projeto"
   aparece sozinho quando o template existe.
4. Atualize a ficha técnica do topo (número de sites e setores).

Regra do projeto: não usar numeração decorativa (01, 02, círculos numerados) em lugar nenhum.

### Escolha do tipo de site e WhatsApp

Os textos de cada opção, as mensagens e o número ficam no objeto `OPCOES` e nas constantes
`WHATSAPP` e `EMAIL` em `js/main.js`. A conversa só abre quando o visitante clica no botão,
e nada é armazenado.

### Efeitos de cursor

Ficam em `js/efeitos.js`: iluminação que acompanha o mouse, borda iluminada nos cards
(`data-spotlight`) e profundidade na composição do topo (`data-depth`).
Só rodam com mouse e sem preferência por movimento reduzido. Para desligar tudo,
basta remover a linha do `efeitos.js` no fim do `index.html`.

### Cores e fontes

Variáveis no `:root`, no início de `css/styles.css`. A cor de destaque é `--accent`.

### Capturar a tela de um site

```bash
chrome --headless=new --hide-scrollbars --window-size=1440,900 --screenshot=saida.png https://site.com
```

Se o site tiver animações de entrada, acrescente `--force-prefers-reduced-motion`.

## Publicação

Deploy automático na Netlify a cada push na branch `main`.
A pasta publicada (`Meu Portofolio`) está fixada em `netlify.toml`.
