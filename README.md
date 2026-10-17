# Portfólio de Nicolas Gabriel Tomás

Site pessoal publicado em https://portfolio-nicolastomas.netlify.app/

Página única em HTML, CSS e JavaScript puros, sem framework, build ou dependências.
O que carrega de fora são apenas as fontes do Google Fonts.

## Estrutura

```
Meu Portofolio/
├── index.html          # conteúdo e estrutura (seções marcadas por comentários)
├── css/styles.css      # design system em :root + estilos por seção
├── js/main.js          # header, menu mobile, seção ativa, vitrine, animações, copiar email
├── assets/
│   ├── projetos/       # capturas dos sites dos clientes (webp, 1200×750)
│   ├── nicolas-hero.webp
│   ├── og-image.jpg    # imagem de compartilhamento social
│   ├── favicon.svg
│   └── Curriculo Nicolas.pdf
└── robots.txt
netlify.toml            # pasta publicada + headers de cache e segurança
```

## Rodar localmente

Abra `Meu Portofolio/index.html` no navegador, ou sirva a pasta:

```bash
npx serve "Meu Portofolio"
```

Não há etapa de build: o que está na pasta é o que vai para o ar.

## Como atualizar

### Adicionar um projeto em destaque

1. Gere a captura do site em 1200×750 e salve em `assets/projetos/nome.webp`.
2. Em `index.html`, duplique um bloco `<article class="work reveal">` dentro de `.works`
   e preencha: número/setor (`work__index`), nome, linha de apoio, descrição,
   lista do que foi feito, tecnologias (`stack`) e o link do site.
3. Para alternar o lado da imagem não é preciso fazer nada, o CSS inverte
   automaticamente nos itens pares.

### Adicionar um projeto complementar

Duplique um `<li>` dentro de `.mini-grid` e preencha os mesmos campos, em versão curta.

### Trocar cores e fontes

Tudo fica nas variáveis do `:root`, no início de `css/styles.css`.
A cor de destaque é `--accent`.

### Capturar a tela de um site

Com o Chrome instalado:

```bash
chrome --headless=new --hide-scrollbars --window-size=1440,900 --screenshot=saida.png https://site.com
```

Se o site tiver animações de entrada, acrescente `--force-prefers-reduced-motion`.

## Publicação

Deploy automático na Netlify a cada push na branch `main`.
A pasta publicada (`Meu Portofolio`) está fixada em `netlify.toml`, então não depende
da configuração do painel.
