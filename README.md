# Instituto Raízes - site institucional

Projeto da disciplina Desenvolvimento Front-end para Web (ADS, Cruzeiro do Sul Virtual).
Site de uma ONG fictícia de Fortaleza com três páginas (início, projetos e cadastro de voluntários),
HTML5 semântico, CSS com design system, Grid de 12 colunas, JavaScript modular, SPA com History API,
validação de formulário, localStorage e gráfico com Chart.js.

## Como rodar
Abra a pasta com um servidor HTTP (ex.: extensão Live Server do VS Code) e acesse `html/index.html`.
Os módulos ES e a SPA não funcionam abrindo o arquivo direto do disco.

## Estrutura
- `html/` páginas
- `css/` folha de estilos única
- `js/` módulos ES (entrada em `main.js`) e `js/vendor/` com o Chart.js
- `imagens/` imagens em JPG/PNG e WebP

## Fluxo de trabalho
GitFlow: `main` recebe só versões de lançamento (tags), `develop` integra o trabalho,
`feature/*` para cada funcionalidade e `hotfix/*` para correções urgentes a partir de `main`.
