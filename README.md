# Instituto Raízes - site institucional

Site de uma ONG fictícia de Fortaleza (CE) com três páginas: apresentação, projetos e cadastro de voluntários.
Projeto da disciplina Desenvolvimento Front-end para Web, curso de Análise e Desenvolvimento de Sistemas
da Cruzeiro do Sul Virtual, construído em HTML5, CSS3 e JavaScript puro, sem framework.

Site no ar: https://wagnerpaivawp.github.io/projeto-ong/

## Sobre o projeto

Organizações do terceiro setor costumam ter pouca presença digital. O objetivo foi construir uma plataforma
clara, acessível e bem estruturada, que apresente a ONG, mostre seus projetos e formas de doação e permita
o cadastro de voluntários com dados íntegros.

## Tecnologias

- HTML5 semântico (header, nav, main, section, article, form, fieldset, template, dialog)
- CSS3: variáveis customizadas (design system), Grid de 12 colunas, Flexbox, media queries, transições
- JavaScript ES6+: ES Modules, History API, DOM, Constraint Validation API, localStorage, FormData
- Chart.js 4.5.1 (gráfico de impacto), vendorizado em `js/vendor/`
- Git e GitHub (GitFlow, issues, milestones, pull requests, tags, GitHub Pages)

## Funcionalidades

- Menu responsivo com dropdown no desktop e hambúrguer no celular, acessível por teclado
- Design system com 11 cores (contraste AA verificado), 5 tamanhos de texto e escala de espaçamento de 8px
- Layout responsivo com Grid de 12 colunas e 5 breakpoints (480, 768, 1024, 1280 e 1536px)
- Cards de projetos gerados a partir de um array de dados via elemento `template`
- Formulário de voluntariado com máscaras (CPF, telefone, CEP), validação nativa e validação em JS
  (dígito verificador do CPF, idade mínima), mensagens de erro ligadas por `aria-describedby`
- Rascunho do formulário e histórico de cadastros persistidos em localStorage
- Componentes de feedback: badges, alertas, toast e modal (`dialog` nativo)
- Navegação SPA: troca só o `main` com fetch e History API, com fallback para navegação tradicional

## Pré-requisitos

- Um navegador moderno (Chrome, Edge, Firefox ou Safari atuais)
- Um servidor HTTP local para desenvolvimento. Os ES Modules e a SPA não funcionam abrindo os arquivos
  direto do disco (`file://`). Opções: extensão Live Server do VS Code, `python -m http.server` ou `npx serve`
- Git, para clonar e contribuir

Não há dependências para instalar com npm: o único pacote externo (Chart.js) já está no repositório.

## Instalação e execução

```bash
git clone https://github.com/wagnerpaivawp/projeto-ong.git
cd projeto-ong
python -m http.server 8080
```

Abra http://localhost:8080/html/index.html no navegador.
Com o VS Code, basta abrir a pasta e clicar em "Go Live" (Live Server).

## Testes e validação

- HTML e CSS validados no W3C Validator (https://validator.w3.org) e no Jigsaw CSS Validator
- Contraste das cores verificado pela fórmula WCAG 2.1 (todos os pares acima de 4,5:1)
- Fluxo de formulário, SPA, localStorage e gráfico testados em navegador headless (Playwright)
- Para rodar o validador localmente: `pip install html5validator` e `html5validator --root . --also-check-css --ignore-re vendor`

## Estrutura de pastas

```
projeto-ong/
├── index.html        redireciona para html/index.html (GitHub Pages)
├── html/             index.html, projetos.html, cadastro.html
├── css/style.css     design system, layout, componentes e estados
├── js/
│   ├── main.js       ponto de entrada (type="module")
│   ├── menu.js, toast.js, mascaras.js, validacao.js, armazenamento.js,
│   │   componentes.js, projetos.js, graficos.js, spa.js
│   └── vendor/chart.umd.js
└── imagens/          JPG/PNG com versão WebP
```

## Versionamento e fluxo de trabalho

O repositório segue o GitFlow:

- `main`: só versões de lançamento, sempre com tag (v1.0.0, v1.0.1)
- `develop`: integração do trabalho em andamento
- `feature/*`: uma branch por funcionalidade, criada de `develop` e mesclada de volta por pull request
- `release/*`: preparação de versão, mesclada em `main` e `develop`
- `hotfix/*`: correções urgentes a partir de `main`, mescladas em `main` e `develop`

Mensagens de commit no padrão Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`)
e versionamento semântico (MAJOR.MINOR.PATCH). Tarefas são registradas em issues agrupadas por milestone.

## Autor

Wagner Paiva · https://github.com/wagnerpaivawp
