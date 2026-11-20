// Sistema de logros basado en localStorage — Libro del Desarrollador Web
(function () {
    const KEY_LOGROS = 'urukais_logros';
    const KEY_CAPITULOS = 'urukais_cap_completados';
    const KEY_EJERCICIOS = 'urukais_ejercicios_completados';
    const KEY_RETOS = 'urukais_retos_completados';

    const LOGRO_POR_CAPITULO = {
        1: 'primer-paso',
        7: 'git-master',
        8: 'api-explorer',
        15: 'typescript',
        16: 'testing',
        19: 'fullstack',
        20: 'devops',
        21: 'web-components',
        22: 'pwa',
        23: 'websockets',
        26: 'seguridad',
        27: 'wasm',
        28: 'ia-frontend',
        31: 'playwright',
        33: 'edge',
        37: 'ia-generativa'
    };

    function leerArray(key) {
        try {
            const data = JSON.parse(localStorage.getItem(key));
            return Array.isArray(data) ? data : [];
        } catch (e) {
            return [];
        }
    }

    function guardarArray(key, arr) {
        try {
            localStorage.setItem(key, JSON.stringify(arr));
        } catch (e) {
            console.warn('No se pudo guardar en localStorage:', e);
        }
    }

    function getLogros() {
        return leerArray(KEY_LOGROS);
    }

    function guardarLogros(logros) {
        guardarArray(KEY_LOGROS, logros);
    }

    function evaluarLogrosDeNivel(caps, logros) {
        const capNums = new Set(caps.map(Number));

        if ([2, 3, 4].every((n) => capNums.has(n)) && !logros.includes('bases-html')) {
            logros.push('bases-html');
        }
        if ([1, 2, 3, 4, 5, 6].every((n) => capNums.has(n)) && !logros.includes('principiante-completo')) {
            logros.push('principiante-completo');
        }
        if ([7, 8, 9, 10].every((n) => capNums.has(n)) && !logros.includes('intermedio-completo')) {
            logros.push('intermedio-completo');
        }
        if ([11, 12, 13, 14, 15, 16, 17, 18].every((n) => capNums.has(n)) && !logros.includes('avanzado-completo')) {
            logros.push('avanzado-completo');
        }
        if ([21, 22, 23, 24, 25].every((n) => capNums.has(n)) && !logros.includes('experto-completo')) {
            logros.push('experto-completo');
        }
        if ([26, 27, 28, 29, 30].every((n) => capNums.has(n)) && !logros.includes('elite-completo')) {
            logros.push('elite-completo');
        }
        if ([31, 32, 33, 34, 35, 36, 37, 38].every((n) => capNums.has(n)) && !logros.includes('vanguardia-completo')) {
            logros.push('vanguardia-completo');
        }
    }

    window.desbloquearLogro = function (id) {
        if (!id) return false;
        const logros = getLogros();
        if (!logros.includes(id)) {
            logros.push(id);
            guardarLogros(logros);
            console.log('🏅 Logro desbloqueado:', id);
            actualizarUI();
            return true;
        }
        return false;
    };

    window.tieneLogro = function (id) {
        return getLogros().includes(id);
    };

    window.marcarCapituloCompletado = function (num) {
        const n = parseInt(num, 10);
        if (!n) return;
        const caps = leerArray(KEY_CAPITULOS);
        if (!caps.includes(n)) {
            caps.push(n);
            guardarArray(KEY_CAPITULOS, caps);
        }
        const logros = getLogros();
        const logroDirecto = LOGRO_POR_CAPITULO[n];
        if (logroDirecto && !logros.includes(logroDirecto)) {
            logros.push(logroDirecto);
        }
        evaluarLogrosDeNivel(caps, logros);
        guardarLogros(logros);
        actualizarUI();
    };

    window.resetearProgresoLogros = function () {
        guardarLogros([]);
        guardarArray(KEY_CAPITULOS, []);
        guardarArray(KEY_EJERCICIOS, []);
        guardarArray(KEY_RETOS, []);
        actualizarUI();
    };

    function detectarRutaActual() {
        const path = window.location.pathname || '/';

        const matchCap = path.match(/capitulos\/0?(\d+)/);
        if (matchCap && matchCap[1]) {
            window.marcarCapituloCompletado(parseInt(matchCap[1], 10));
        }

        const matchEj = path.match(/ejercicios\/0?(\d+)/);
        if (matchEj && matchEj[1]) {
            const numEj = parseInt(matchEj[1], 10);
            const ejs = leerArray(KEY_EJERCICIOS);
            if (!ejs.includes(numEj)) {
                ejs.push(numEj);
                guardarArray(KEY_EJERCICIOS, ejs);
            }
        }

        const matchReto = path.match(/retos\/reto-?(\d+)/);
        if (matchReto && matchReto[1]) {
            const numReto = parseInt(matchReto[1], 10);
            const retos = leerArray(KEY_RETOS);
            if (!retos.includes(numReto)) {
                retos.push(numReto);
                guardarArray(KEY_RETOS, retos);
            }
        }
    }

    function actualizarUI() {
        const logros = getLogros();
        const caps = leerArray(KEY_CAPITULOS);
        const ejs = leerArray(KEY_EJERCICIOS);
        const retos = leerArray(KEY_RETOS);

        const cards = document.querySelectorAll('.logro-card[data-logro]');
        const totalCards = cards.length;
        let desbloqueadosEnPagina = 0;

        cards.forEach((card) => {
            const id = card.getAttribute('data-logro');
            const desbloqueado = logros.includes(id);
            if (desbloqueado) {
                desbloqueadosEnPagina += 1;
            }
            card.classList.toggle('is-unlocked', desbloqueado);
            card.classList.toggle('is-locked', !desbloqueado);

            const estadoEl = card.querySelector('.logro-card__estado');
            if (estadoEl) {
                estadoEl.textContent = desbloqueado ? '✅' : '🔒';
            }
        });

        const capEl = document.getElementById('logros-cap-completados');
        const ejEl = document.getElementById('logros-ejercicios');
        const retoEl = document.getElementById('logros-retos');
        const totalEl = document.getElementById('logros-total');
        const fillEl = document.getElementById('logros-progreso-fill');

        if (capEl) capEl.textContent = String(caps.length);
        if (ejEl) ejEl.textContent = String(ejs.length);
        if (retoEl) retoEl.textContent = String(retos.length);

        const totalReferencia = totalCards > 0 ? totalCards : 23;
        const obtenidosReferencia = totalCards > 0 ? desbloqueadosEnPagina : logros.length;

        if (totalEl) {
            totalEl.textContent = `${obtenidosReferencia}/${totalReferencia}`;
        }

        if (fillEl) {
            const pct = totalReferencia > 0 ? Math.min(100, Math.round((obtenidosReferencia / totalReferencia) * 100)) : 0;
            fillEl.style.width = `${pct}%`;
        }
    }

    function init() {
        detectarRutaActual();
        actualizarUI();
    }

    if (typeof document$ !== 'undefined' && document$.subscribe) {
        document$.subscribe(function () {
            init();
        });
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    function mostrarToastLogro(titulo) {
        if (!titulo) return;
        let toast = document.getElementById('uru-logro-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'uru-logro-toast';
            toast.className = 'uru-logro-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = `🏅 ¡Logro desbloqueado: ${titulo}!`;
        toast.classList.add('is-visible');
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => {
            toast.classList.remove('is-visible');
        }, 3400);
    }

    const originalDesbloquear = window.desbloquearLogro;
    window.desbloquearLogro = function (id) {
        const nuevo = originalDesbloquear(id);
        if (nuevo) {
            const card = document.querySelector(`.logro-card[data-logro="${id}"] h3`);
            const nombre = card ? card.textContent.trim() : id;
            mostrarToastLogro(nombre);
        }
        return nuevo;
    };

    function insertarControlesCapitulo() {
        const path = window.location.pathname || '/';
        const matchCap = path.match(/capitulos\/0?(\d+)/);
        if (!matchCap || !matchCap[1]) return;

        const numCap = parseInt(matchCap[1], 10);
        const article = document.querySelector('article.md-content__inner');
        if (!article || document.getElementById('uru-cap-completar-box')) return;

        const caps = JSON.parse(localStorage.getItem('urukais_cap_completados') || '[]');
        const completado = caps.includes(numCap);

        const box = document.createElement('div');
        box.id = 'uru-cap-completar-box';
        box.className = 'uru-cap-completar';
        box.innerHTML = `
            <div class="uru-cap-completar__texto">
                <strong>Progreso del capítulo ${String(numCap).padStart(2, '0')}</strong>
                <span>${completado ? 'Ya marcaste este capítulo como completado.' : 'Márcalo como completado al terminar de leerlo y practicar.'}</span>
            </div>
            <button type="button" id="uru-btn-completar-cap" class="md-button ${completado ? '' : 'md-button--primary'}">
                ${completado ? '✅ Completado' : 'Marcar como completado'}
            </button>
        `;

        article.appendChild(box);

        const btn = document.getElementById('uru-btn-completar-cap');
        if (btn) {
            btn.addEventListener('click', function () {
                if (typeof window.marcarCapituloCompletado === 'function') {
                    window.marcarCapituloCompletado(numCap);
                }
                btn.textContent = '✅ Completado';
                btn.classList.remove('md-button--primary');
                const desc = box.querySelector('.uru-cap-completar__texto span');
                if (desc) desc.textContent = 'Ya marcaste este capítulo como completado.';
            });
        }
    }

    function insertarControlesGestionLogros() {
        const progreso = document.querySelector('.logros-progreso');
        if (!progreso || document.getElementById('uru-logros-toolbar')) return;

        const toolbar = document.createElement('div');
        toolbar.id = 'uru-logros-toolbar';
        toolbar.className = 'uru-logros-toolbar';
        toolbar.innerHTML = `
            <div class="uru-logros-filtros" role="group" aria-label="Filtrar logros">
                <button type="button" class="uru-filtro-btn is-active" data-filtro="todos">Todos</button>
                <button type="button" class="uru-filtro-btn" data-filtro="desbloqueados">Desbloqueados</button>
                <button type="button" class="uru-filtro-btn" data-filtro="bloqueados">Bloqueados</button>
            </div>
            <div class="uru-logros-acciones">
                <button type="button" id="uru-btn-exportar-logros" class="md-button">Exportar JSON</button>
                <button type="button" id="uru-btn-reset-logros" class="md-button">Reiniciar progreso</button>
            </div>
        `;

        progreso.insertAdjacentElement('afterend', toolbar);

        toolbar.querySelectorAll('.uru-filtro-btn').forEach((btn) => {
            btn.addEventListener('click', function () {
                toolbar.querySelectorAll('.uru-filtro-btn').forEach((b) => b.classList.remove('is-active'));
                btn.classList.add('is-active');
                const modo = btn.getAttribute('data-filtro');
                document.querySelectorAll('.logro-card[data-logro]').forEach((card) => {
                    const esOk = card.classList.contains('is-unlocked');
                    if (modo === 'todos') {
                        card.style.display = '';
                    } else if (modo === 'desbloqueados') {
                        card.style.display = esOk ? '' : 'none';
                    } else if (modo === 'bloqueados') {
                        card.style.display = !esOk ? '' : 'none';
                    }
                });
            });
        });

        const expBtn = document.getElementById('uru-btn-exportar-logros');
        if (expBtn) {
            expBtn.addEventListener('click', function () {
                const payload = {
                    logros: JSON.parse(localStorage.getItem('urukais_logros') || '[]'),
                    capitulos: JSON.parse(localStorage.getItem('urukais_cap_completados') || '[]'),
                    ejercicios: JSON.parse(localStorage.getItem('urukais_ejercicios_completados') || '[]'),
                    retos: JSON.parse(localStorage.getItem('urukais_retos_completados') || '[]')
                };
                const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'urukais-progreso-logros.json';
                a.click();
                URL.revokeObjectURL(url);
            });
        }

        const rstBtn = document.getElementById('uru-btn-reset-logros');
        if (rstBtn) {
            rstBtn.addEventListener('click', function () {
                if (typeof window.resetearProgresoLogros === 'function') {
                    window.resetearProgresoLogros();
                }
            });
        }
    }

    const _origInitHook = document.addEventListener;
    if (typeof document$ !== 'undefined' && document$.subscribe) {
        document$.subscribe(function () {
            insertarControlesCapitulo();
            insertarControlesGestionLogros();
        });
    } else {
        document.addEventListener('DOMContentLoaded', function () {
            insertarControlesCapitulo();
            insertarControlesGestionLogros();
        });
    }
})();