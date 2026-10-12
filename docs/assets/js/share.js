(function () {
  'use strict';

  function crearBoton(texto, clase, href) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'share-btn ' + clase;
    btn.textContent = texto;
    if (href) {
      btn.addEventListener('click', function () {
        window.open(href, '_blank', 'noopener,noreferrer,width=600,height=500');
      });
    }
    return btn;
  }

  function inyectar() {
    var article = document.querySelector('.md-content__inner');
    if (!article) return false;
    if (article.querySelector('.share-buttons')) return true;

    var url = encodeURIComponent(location.href);
    var title = encodeURIComponent(document.title);
    var text = encodeURIComponent('Mira este capítulo del Libro del Desarrollador Web: ' + document.title);

    var box = document.createElement('div');
    box.className = 'share-buttons';

    var titulo = document.createElement('p');
    titulo.className = 'share-buttons__title';
    titulo.textContent = '📢 Comparte este capítulo';
    box.appendChild(titulo);

    var lista = document.createElement('div');
    lista.className = 'share-buttons__list';

    lista.appendChild(crearBoton('𝕏 Twitter', 'share-twitter',
      'https://twitter.com/intent/tweet?text=' + text + '&url=' + url));

    lista.appendChild(crearBoton('💼 LinkedIn', 'share-linkedin',
      'https://www.linkedin.com/sharing/share-offsite/?url=' + url));

    lista.appendChild(crearBoton('💬 WhatsApp', 'share-whatsapp',
      'https://api.whatsapp.com/send?text=' + text + '%20' + url));

    lista.appendChild(crearBoton('👽 Reddit', 'share-reddit',
      'https://www.reddit.com/submit?url=' + url + '&title=' + title));

    lista.appendChild(crearBoton('📧 Email', 'share-email',
      'mailto:?subject=' + title + '&body=' + text + '%20' + url));

    var copiar = crearBoton('🔗 Copiar enlace', 'share-copy', null);
    copiar.addEventListener('click', function () {
      navigator.clipboard.writeText(location.href).then(function () {
        var orig = copiar.textContent;
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
    return true;
  }

  // Ejecutar cuando el DOM esté listo, y reintentar por si Material tarda
  document.addEventListener('DOMContentLoaded', function () {
    if (!inyectar()) {
      var intentos = 0;
      var timer = setInterval(function () {
        if (inyectar() || ++intentos > 25) clearInterval(timer);
      }, 200);
    }
  });

})();
