// Dados de origem dos projetos (viriam de uma API ou banco no futuro)
var projetos = [
  { id: 'reforco-escolar', nome: 'Reforço Escolar', categoria: 'Educação', classe: 'badge-educacao',
    imagem: 'educacao', alt: 'Crianças estudando em sala de aula comunitária',
    descricao: 'Aulas de português e matemática para crianças do ensino fundamental, três vezes por semana.' },
  { id: 'casa-segura', nome: 'Casa Segura', categoria: 'Moradia', classe: 'badge-moradia',
    imagem: 'moradia', alt: 'Voluntários reformando o telhado de uma casa',
    descricao: 'Pequenas reformas em casas com risco estrutural, com material doado e mão de obra voluntária.' },
  { id: 'maos-que-produzem', nome: 'Mãos que Produzem', categoria: 'Renda', classe: 'badge-renda',
    imagem: 'renda', alt: 'Oficina de costura com mulheres da comunidade',
    descricao: 'Oficinas de costura e artesanato para geração de renda de mulheres chefes de família.' }
];

// Clona o <template> uma vez por projeto e preenche os campos
function criarCardProjeto(tpl, projeto) {
  var card = tpl.content.cloneNode(true);
  var article = card.querySelector('article');
  article.id = projeto.id;
  var badge = card.querySelector('.categoria');
  badge.textContent = projeto.categoria;
  badge.classList.add(projeto.classe);
  card.querySelector('h3').textContent = projeto.nome;
  card.querySelector('source').srcset = '../imagens/' + projeto.imagem + '.webp';
  var img = card.querySelector('img');
  img.src = '../imagens/' + projeto.imagem + '.jpg';
  img.alt = projeto.alt;
  card.querySelector('.descricao').textContent = projeto.descricao;
  return card;
}

export function iniciarProjetos() {
  var lista = document.getElementById('lista-projetos');
  var tpl = document.getElementById('tpl-projeto');
  if (!lista || !tpl) return;
  var fragmento = document.createDocumentFragment();
  projetos.forEach(function (p) { fragmento.appendChild(criarCardProjeto(tpl, p)); });
  lista.replaceChildren(fragmento);
}
