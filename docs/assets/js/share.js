(function () {
  function crearBoton(texto, clase) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'share-btn ' + clase;
    btn.textContent = texto;
    return btn;
  }

  function initShare() {
    const article = document.querySelector('article.md-content__inner');
    if (!article || article.querySelector('.share-buttons')) return;

    const box = document.createElement('div');
    box.className = 'share-buttons';

    const titulo = document.createElement('p');
    titulo.className = 'share-buttons__title';
    titulo.textContent = '📢 Comparte este capítulo';
    box.appendChild(titulo);

    const lista = document.createElement('div');
    lista.className = 'share-buttons__list';

    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const text = encodeURIComponent('Mira este capítulo del Libro del Desarrollador Web: ' + document.title);

    const redes = [
      { texto: '𝕏 Twitter',  clase: 'share-twitter',  href: 'https://twitter.com/intent/tweet?text=' + text + '&url=' + url },
      { texto: '💼 LinkedIn', clase: 'share-linkedin', href: 'https://www.linkedin.com/sharing/share-offsite/?url=' + url },
      { texto: '💬 WhatsApp', clase: 'share-whatsapp', href: 'https://api.whatsapp.com/send?text=' + text + '%20' + url },
      { texto: '👽 Reddit',   clase: 'share-reddit',   href: 'https://www.reddit.com/submit?url=' + url + '&title=' + title },
      { texto: '📧 Email',    clase: 'share-email',    href: 'mailto:?subject=' + title + '&body=' + text + '%20' + url }
    ];

    redes.forEach(function (r) {
      const btn = crearBoton(r.texto, r.clase);
      btn.addEventListener('click', function () {
        window.open(r.href, '_blank', 'noopener,noreferrer,width=600,height=500');
      });
      lista.appendChild(btn);
    });

    const copiar = crearBoton('🔗 Copiar enlace', 'share-copy');
    copiar.addEventListener('click', function () {
      navigator.clipboard.writeText(window.location.href).then(function () {
        const orig = copiar.textContent;
        copiar.textContent = '✅ Copiado';
        copiar.classList.add('copied');
        setTimeout(function () {
          copiar.textContent = orig;
          copiar.classList.remove('copied');
        }, 2000);
      });
    });
    lista.appendChild(copiar);

    box.appendChild(lista);
    article.appendChild(box);
  }

  if (typeof document$ !== 'undefined') {
    document$.subscribe(initShare);
  } else {
    document.addEventListener('DOMContentLoaded', initShare);
  }
})();
