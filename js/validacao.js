// Validação do formulário de cadastro: regras extras + mensagens injetadas no DOM

// Verifica os dígitos verificadores do CPF
function cpfValido(cpf) {
  var d = cpf.replace(/\D/g, '');
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  for (var t = 9; t < 11; t++) {
    var soma = 0;
    for (var i = 0; i < t; i++) soma += d[i] * (t + 1 - i);
    var dv = (soma * 10) % 11 % 10;
    if (dv !== Number(d[t])) return false;
  }
  return true;
}

// Regras que o HTML nativo não cobre
var regrasExtras = {
  cpf: function (campo) { return cpfValido(campo.value) ? '' : 'CPF inválido: os dígitos verificadores não conferem.'; },
  nascimento: function (campo) {
    if (!campo.value) return '';
    var idade = (Date.now() - new Date(campo.value)) / 31557600000;
    return idade >= 18 ? '' : 'É preciso ter 18 anos ou mais para ser voluntário.';
  },
  nome: function (campo) { return /\s/.test(campo.value.trim()) ? '' : 'Informe nome e sobrenome.'; }
};

// Mensagens amigáveis para os erros nativos
function mensagemNativa(campo) {
  var v = campo.validity;
  if (v.valueMissing) return 'Este campo é obrigatório.';
  if (v.typeMismatch) return 'Informe um e-mail válido, como nome@exemplo.com.';
  if (v.patternMismatch) return campo.title || 'Formato inválido.';
  if (v.tooShort) return 'Digite pelo menos ' + campo.minLength + ' caracteres.';
  if (v.rangeOverflow) return 'A data não pode ser futura.';
  return '';
}

// Cria, uma vez por campo, o espaço reservado da mensagem (evita o layout pular ao validar)
function criarSlotMensagem(campo) {
  var msg = document.createElement('p');
  msg.className = 'mensagem-erro';
  msg.id = campo.id + '-erro';
  campo.setAttribute('aria-describedby', msg.id);
  campo.parentElement.appendChild(msg);
  return msg;
}

// Preenche ou limpa a mensagem e troca as classes de estado
function mostrarEstado(campo, erro) {
  var msg = document.getElementById(campo.id + '-erro') || criarSlotMensagem(campo);
  msg.textContent = erro;
  campo.setCustomValidity(erro);
  if (erro) {
    campo.classList.add('invalido');
    campo.classList.remove('valido');
    campo.setAttribute('aria-invalid', 'true');
  } else {
    campo.removeAttribute('aria-invalid');
    campo.classList.remove('invalido');
    campo.classList.toggle('valido', campo.value !== '');
  }
}

function validarCampo(campo) {
  campo.setCustomValidity('');                 // limpa antes de reavaliar
  var erro = mensagemNativa(campo);            // 1. regras do HTML (required, type, pattern, min/max)
  if (!erro && regrasExtras[campo.id]) erro = regrasExtras[campo.id](campo); // 2. regras de negócio
  mostrarEstado(campo, erro);
  return !erro;
}

export function iniciarValidacao() {
  var form = document.querySelector('form');
  if (!form) return;
  var campos = form.querySelectorAll('input:not([type=checkbox]), select');

  campos.forEach(function (campo) {
    if (campo.id) criarSlotMensagem(campo);
    campo.addEventListener('blur', function () { validarCampo(campo); });       // ao sair do campo
    campo.addEventListener('input', function () {                                // em tempo real, só se já estava com erro
      if (campo.classList.contains('invalido')) validarCampo(campo);
    });
  });

  // Quando o navegador barra o envio, injeta a mensagem em cada campo inválido
  form.addEventListener('invalid', function (e) { validarCampo(e.target); }, true);

  form.addEventListener('submit', function (e) {
    var ok = true;
    campos.forEach(function (campo) { if (!validarCampo(campo)) ok = false; });
    if (!ok) {
      e.preventDefault();
      e.stopImmediatePropagation();            // impede o toast de sucesso do componentes.js
      form.classList.add('validado');
      document.getElementById('alerta-erro').hidden = false;
      form.querySelector('.invalido').focus();
    }
  });
}
