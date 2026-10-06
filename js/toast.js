// Toast: mensagem temporária, não bloqueia a página
export function mostrarToast(texto, tipo) {
  var toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = texto;
  toast.className = 'toast toast-' + tipo + ' visivel';
  setTimeout(function () { toast.classList.remove('visivel'); }, 4000);
}
