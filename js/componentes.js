import { mostrarToast } from './toast.js';

export function iniciarComponentes() {
  // Formulário de cadastro: alerta de erro e toast de sucesso
  var formCadastro = document.querySelector('form');
  if (formCadastro) {
    var alertaErro = document.getElementById('alerta-erro');
    formCadastro.addEventListener('invalid', function () {
      alertaErro.hidden = false;
    }, true);
    formCadastro.addEventListener('submit', function (e) {
      e.preventDefault();
      alertaErro.hidden = true;
      mostrarToast('Cadastro enviado com sucesso. Em breve entraremos em contato.', 'sucesso');
      formCadastro.reset();
      formCadastro.classList.remove('validado');
    });
  }

  // Modal do PIX (elemento dialog nativo)
  var modal = document.getElementById('modal-pix');
  if (modal) {
    document.getElementById('abrir-pix').addEventListener('click', function () { modal.showModal(); });
    document.getElementById('fechar-pix').addEventListener('click', function () { modal.close(); });
  }
}
