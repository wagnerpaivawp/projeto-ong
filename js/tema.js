// Tema claro/escuro: respeita o sistema por padrão e guarda a escolha manual
var CHAVE_TEMA = 'raizes:tema';

function aplicarTema(tema) {
  if (tema === 'dark' || tema === 'light') {
    document.documentElement.setAttribute('data-theme', tema);
  } else {
    document.documentElement.removeAttribute('data-theme'); // volta a seguir o sistema
  }
  var botao = document.querySelector('.tema-toggle');
  if (botao) {
    var escuro = tema === 'dark' || (tema !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches);
    botao.setAttribute('aria-pressed', String(escuro));
    botao.setAttribute('aria-label', escuro ? 'Ativar modo claro' : 'Ativar modo escuro');
  }
}

export function iniciarTema() {
  var salvo = null;
  try { salvo = localStorage.getItem(CHAVE_TEMA); } catch (e) {}
  aplicarTema(salvo);

  var botao = document.querySelector('.tema-toggle');
  if (!botao) return;
  botao.addEventListener('click', function () {
    var escuro = botao.getAttribute('aria-pressed') === 'true';
    var novo = escuro ? 'light' : 'dark';
    try { localStorage.setItem(CHAVE_TEMA, novo); } catch (e) {}
    aplicarTema(novo);
  });

  // Se o sistema mudar e o usuário não tiver escolhido, acompanha
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
    var escolha = null;
    try { escolha = localStorage.getItem(CHAVE_TEMA); } catch (e) {}
    if (!escolha) aplicarTema(null);
  });
}
