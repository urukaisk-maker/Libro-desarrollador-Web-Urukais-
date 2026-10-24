// Sistema de logros basado en localStorage
(function () {
    const KEY = 'urukais_logros';

    function getLogros() {
        try {
            return JSON.parse(localStorage.getItem(KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function guardarLogros(logros) {
        localStorage.setItem(KEY, JSON.stringify(logros));
    }

    window.desbloquearLogro = function (id) {
        const logros = getLogros();
        if (!logros.includes(id)) {
            logros.push(id);
            guardarLogros(logros);
            console.log('🏅 Logro desbloqueado:', id);
        }
    };

    window.tieneLogro = function (id) {
        return getLogros().includes(id);
    };

    // Auto-desbloquear logro al visitar ciertas páginas
    const path = window.location.pathname;
    if (path.includes('/capitulos/')) {
        const num = (path.match(/capitulos\/(\d+)/) || [])[1];
        if (num) {
            window.desbloquearLogro('capitulo-' + parseInt(num, 10));
        }
    }
})();
