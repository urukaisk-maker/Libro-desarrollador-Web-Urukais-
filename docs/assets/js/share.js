(function () {
  function crearBoton(texto, clase) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'share-btn ' + clase;
    btn.textContent = texto;
    return btn;
  }

  function crearWidget() {
    var article = document.querySelector('.md-content__inner');
    if (!article) return false;
    if (article.querySelector('.share-buttons')) return true;

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
    console.log('[share] Widget inyectado');
    return true;
  }

  // Bucle: intenta inyectar cada 200 ms hasta 20 veces (4 segundos)
  var intentos = 0;
  var timer = setInterval(function () {
    if (crearWidget() || intentos > 20) {
      clearInterval(timer);
    }
    intentos++;
  }, 200);

  // Si cambia la URL (navegación SPA de Material), reiniciar
  var lastUrl = location.href;
  setInterval(function () {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      setTimeout(crearWidget, 300);
    }
  }, 500);
})();
