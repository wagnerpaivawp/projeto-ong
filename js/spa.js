// SPA: intercepta a navegação interna e troca só o <main>, sem recarregar a página
export function iniciarSPA(aoRenderizar) {
  var principal = document.querySelector('main');
  var menu = document.getElementById('menu');

  // Busca a página de destino, extrai o <main> e injeta no contêiner atual
  function renderizar(url, adicionarHistorico) {
    fetch(url)
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var novoMain = doc.querySelector('main');
        if (!novoMain) throw new Error('main nao encontrado');

        // 1. limpa o contêiner e injeta o novo conteúdo
        principal.replaceChildren.apply(principal, novoMain.childNodes);

        // 2. atualiza título e histórico
        document.title = doc.title;
        if (adicionarHistorico) history.pushState({ url: url }, '', url);

        // 3. marca o link ativo no menu
        document.querySelectorAll('nav a[aria-current]').forEach(function (a) { a.removeAttribute('aria-current'); });
        var arquivo = url.split('/').pop().split('#')[0];
        var ativo = document.querySelector('nav a[href="' + arquivo + '"]');
        if (ativo) ativo.setAttribute('aria-current', 'page');

        // 4. fecha o menu mobile e reinicia os módulos do conteúdo injetado
        menu.classList.remove('aberto');
        document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
        aoRenderizar();

        // 5. acessibilidade: foca o h1 e rola para a âncora, se houver
        var alvo = url.indexOf('#') > -1 ? document.getElementById(url.split('#')[1]) : principal.querySelector('h1');
        if (alvo) { alvo.setAttribute('tabindex', '-1'); alvo.focus(); alvo.scrollIntoView(); }
      })
      .catch(function () { window.location.href = url; }); // fallback: navegação normal
  }

  // Intercepta cliques em links internos .html
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!/\.html(#.*)?$/.test(href) || link.target === '_blank' || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    renderizar(href, true);
  });

  // Botões voltar/avançar do navegador
  window.addEventListener('popstate', function (e) {
    renderizar((e.state && e.state.url) || location.pathname.split('/').pop(), false);
  });

  // Só funciona servido por HTTP (file:// bloqueia fetch); nesse caso a navegação cai no fallback
}
