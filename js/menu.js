// Menu hambúrguer: alterna a visibilidade da nav no celular
export function iniciarMenu() {
  var botao = document.querySelector('.menu-toggle');
  var menu = document.getElementById('menu');
  botao.addEventListener('click', function () {
    var aberto = botao.getAttribute('aria-expanded') === 'true';
    botao.setAttribute('aria-expanded', String(!aberto));
    botao.setAttribute('aria-label', aberto ? 'Abrir menu' : 'Fechar menu');
    menu.classList.toggle('aberto');
  });
}
