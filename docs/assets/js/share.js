(function () {
  // Función que crea un botón
  function crearBoton(texto, clase) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'share-btn ' + clase;
    btn.textContent = texto;
    return btn;
  }

  // Función principal que inyecta el bloque de compartir
  function initShare() {
    // Selector oficial del contenedor de contenido en Material
    var article = document.querySelector('.md-content__inner');
    if (!article || article.querySelector('.share-buttons')) return;

    var box = document.createElement('div');
    box.className = 'share-buttons';

    var titulo = document.createElement('p');
    titulo.className = 'share-buttons__title';
    titulo.textContent = '📢 Comparte este capítulo';
    box.appendChild(titulo);

    var lista = document.createElement('div');
    lista.className = 'share-buttons__list';

    var url = encodeURIComponent(window.location.href);
    var title = encodeURIComponent(document.title);
    var text = encodeURIComponent('Mira este capítulo del Libro del Desarrollador Web: ' + document.title);

    var redes = [
      { texto: '𝕏 Twitter',  clase: 'share-twitter',  href: 'https://twitter.com/intent/tweet?text=' + text + '&url=' + url },
      { texto: '💼 LinkedIn', clase: 'share-linkedin', href: 'https://www.linkedin.com/sharing/share-offsite/?url=' + url },
      { texto: '💬 WhatsApp', clase: 'share-whatsapp', href: 'https://api.whatsapp.com/send?text=' + text + '%20' + url },
      { texto: '👽 Reddit',   clase: 'share-reddit',   href: 'https://www.reddit.com/submit?url=' + url + '&title=' + title },
      { texto: '📧 Email',    clase: 'share-email',    href: 'mailto:?subject=' + title + '&body=' + text + '%20' + url }
    ];

    redes.forEach(function (r) {
      var b = crearBoton(r.texto, r.clase);
      b.addEventListener('click', function () {
        window.open(r.href, '_blank', 'noopener,noreferrer,width=600,height=500');
      });
      lista.appendChild(b);
    });

    var copiar = crearBoton('🔗 Copiar enlace', 'share-copy');
    copiar.addEventListener('click', function () {
      navigator.clipboard.writeText(window.location.href).then(function () {
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
  }

  // --- Bucle de espera para document$ ---
  function waitForDocument$(callback) {
    if (typeof document$ !== 'undefined') {
      // Si ya está disponible, suscribirse inmediatamente
      document$.subscribe(callback);
      return;
    }
    // Si no, comprobar cada 100ms hasta que aparezca
    var checkInterval = setInterval(function () {
      if (typeof document$ !== 'undefined') {
        clearInterval(checkInterval);
        document$.subscribe(callback);
      }
    }, 100);
  }

  // Iniciar el proceso
  waitForDocument$(initShare);

  // Fallback por si document$ nunca aparece (poco probable)
  setTimeout(function () {
    if (typeof document$ === 'undefined') {
      document.addEventListener('DOMContentLoaded', initShare);
    }
  }, 2000);

})();
