// Abrir enlaces externos en pestaña nueva
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[href^="http"]');

    links.forEach(function (link) {
        // No tocar los que ya tienen target
        if (link.getAttribute('target')) return;
        // No tocar los del mismo dominio
        if (link.hostname === window.location.hostname) return;

        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
});
