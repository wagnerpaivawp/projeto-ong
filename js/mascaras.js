// Máscaras de entrada para CPF, telefone e CEP + classe de validação
function aplicarMascara(campo, formatar) {
  if (!campo) return;
  campo.addEventListener('input', function () {
    var digitos = campo.value.replace(/\D/g, '');
    campo.value = formatar(digitos);
  });
}

export function iniciarMascaras() {
  aplicarMascara(document.getElementById('cpf'), function (d) {
    d = d.slice(0, 11);
    return d
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  });

  aplicarMascara(document.getElementById('telefone'), function (d) {
    d = d.slice(0, 11);
    if (d.length <= 10) {
      return d.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2');
    }
    return d.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
  });

  aplicarMascara(document.getElementById('cep'), function (d) {
    d = d.slice(0, 8);
    return d.replace(/(\d{5})(\d)/, '$1-$2');
  });

  // Marca o formulário como "validado" na primeira tentativa de envio inválida,
  // liberando o feedback visual (verde/vermelho) para todos os campos
  var form = document.querySelector('form');
  if (form) {
    form.addEventListener('invalid', function () {
      form.classList.add('validado');
    }, true);
  }
}
