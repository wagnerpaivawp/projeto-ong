// Ponto de entrada: importa os módulos e define a ordem de inicialização
import { iniciarTema } from './tema.js';
import { iniciarMenu } from './menu.js';
import { iniciarMascaras } from './mascaras.js';
import { iniciarValidacao } from './validacao.js';
import { iniciarArmazenamento } from './armazenamento.js';
import { iniciarComponentes } from './componentes.js';
import { iniciarProjetos } from './projetos.js';
import { iniciarGraficos } from './graficos.js';
import { iniciarSPA } from './spa.js';

// Módulos ligados ao conteúdo do <main>: rodam no carregamento e a cada troca de página na SPA.
// A ordem importa: armazenamento registra o submit antes de componentes, que faz o reset do form.
function iniciarPagina() {
  iniciarMascaras();
  iniciarValidacao();
  iniciarArmazenamento();
  iniciarComponentes();
  iniciarProjetos();
  iniciarGraficos();
}

iniciarTema();          // antes de tudo, para não piscar o tema errado
iniciarMenu();          // header é permanente: uma vez só
iniciarPagina();
iniciarSPA(iniciarPagina);
