import { mostrarToast } from './toast.js';

// Persistência local: rascunho do formulário e histórico de cadastros enviados
var CHAVE_RASCUNHO = 'raizes:rascunho';
var CHAVE_CADASTROS = 'raizes:cadastros';

// Leitura segura: localStorage pode estar desativado ou conter dado corrompido
function lerJSON(chave, padrao) {
  try {
    var bruto = localStorage.getItem(chave);
    return bruto ? JSON.parse(bruto) : padrao;
  } catch (e) { return padrao; }
}
function gravarJSON(chave, valor) {
  try { localStorage.setItem(chave, JSON.stringify(valor)); } catch (e) { /* sem espaço ou bloqueado */ }
}

// Converte o form em objeto simples {nome: '...', disp: ['manha', 'tarde'], ...}
function lerFormulario(form) {
  var dados = {};
  new FormData(form).forEach(function (valor, nome) {
    if (nome === 'lgpd') return;                       // consentimento não é persistido
    if (nome === 'disp') { (dados.disp = dados.disp || []).push(valor); }
    else dados[nome] = valor;
  });
  return dados;
}

// Fluxo inverso: devolve o objeto aos campos
function preencherFormulario(form, dados) {
  Object.keys(dados).forEach(function (nome) {
    if (nome === 'disp') {
      dados.disp.forEach(function (v) {
        var cb = form.querySelector('input[name="disp"][value="' + v + '"]');
        if (cb) cb.checked = true;
      });
    } else if (form.elements[nome]) {
      form.elements[nome].value = dados[nome];
    }
  });
}

// Lista dos cadastros já enviados neste navegador
function renderizarHistorico() {
  var lista = document.getElementById('historico-cadastros');
  if (!lista) return;
  var cadastros = lerJSON(CHAVE_CADASTROS, []);
  lista.replaceChildren();
  cadastros.forEach(function (c) {
    var li = document.createElement('li');
    li.textContent = c.nome + ' (' + c.area + ') em ' + new Date(c.data).toLocaleDateString('pt-BR');
    lista.appendChild(li);
  });
  document.getElementById('bloco-historico').hidden = cadastros.length === 0;
}

export function iniciarArmazenamento() {
  var form = document.querySelector('form');
  if (!form) return;

  // 1. Restaura o rascunho ao carregar
  var rascunho = lerJSON(CHAVE_RASCUNHO, null);
  if (rascunho) {
    preencherFormulario(form, rascunho);
    mostrarToast('Recuperamos o que você já tinha preenchido.', 'sucesso');
  }

  // 2. Grava o rascunho a cada alteração (delegação: um listener para todos os campos)
  form.addEventListener('input', function () { gravarJSON(CHAVE_RASCUNHO, lerFormulario(form)); });

  // 3. No envio válido, move o rascunho para o histórico e limpa
  form.addEventListener('submit', function (e) {
    if (e.defaultPrevented) return;                   // validacao.js barrou
    var cadastros = lerJSON(CHAVE_CADASTROS, []);
    var dados = lerFormulario(form);
    dados.data = new Date().toISOString();
    cadastros.push(dados);
    gravarJSON(CHAVE_CADASTROS, cadastros);
    localStorage.removeItem(CHAVE_RASCUNHO);
    renderizarHistorico();
  });

  // 4. Limpar rascunho manualmente
  var btn = document.getElementById('limpar-rascunho');
  if (btn) btn.addEventListener('click', function () {
    localStorage.removeItem(CHAVE_RASCUNHO);
    form.reset();
    form.querySelectorAll('.valido, .invalido').forEach(function (c) { c.classList.remove('valido', 'invalido'); });
    form.querySelectorAll('.mensagem-erro').forEach(function (m) { m.textContent = ''; });
  });

  renderizarHistorico();
}
