# Portfólio — Nicolas Gabriel Tomás

Site pessoal publicado em https://portfolio-nicolastomas.netlify.app/

Feito em HTML, CSS e JavaScript puros, sem frameworks ou dependências de build.

## Estrutura

```
Meu Portofolio/
├── index.html        # conteúdo e estrutura da página
├── css/styles.css    # design system (tokens no :root) e estilos por seção
├── js/main.js        # header, menu mobile, seção ativa, animações, copiar email
├── assets/           # fotos, imagens dos projetos, favicon, currículo
└── robots.txt
```

## Como editar

- **Textos**: direto no `index.html`, cada seção está marcada com um comentário (`HERO`, `SOBRE`, `PROJETOS`...).
- **Novo projeto**: na seção `PROJETOS` há um bloco comentado `MODELO PARA NOVOS PROJETOS`. Copie, cole e preencha. Imagens de projeto em `assets/`, idealmente 1000×625 (16:10) em `.webp`.
- **Experiência / formação**: há comentários indicando onde acrescentar atividades e a instituição de ensino.
- **Cores e fontes**: variáveis em `:root` no início de `css/styles.css`.

## Rodar localmente

Basta abrir `Meu Portofolio/index.html` no navegador, ou servir a pasta:

```bash
npx serve "Meu Portofolio"
```

## Publicação

Deploy automático na Netlify a cada push na branch `main` (pasta publicada: `Meu Portofolio`).
