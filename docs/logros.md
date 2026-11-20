# 🏆 Mis Logros

!!! quote "Aprender también es un juego"
    Cada capítulo que completas, cada ejercicio que resuelves y cada reto que superas desbloquea un logro. Es una forma de **visualizar tu progreso** y mantener la motivación. Todo se guarda en tu navegador, sin cuentas ni servidores.

---

## 📊 Tu progreso

<div class="logros-hero">

<div class="progress-ring-wrap">

<div class="progress-ring">
<svg viewBox="0 0 160 160">
<defs>
<linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="#6366f1"/>
<stop offset="100%" stop-color="#f59e0b"/>
</linearGradient>
</defs>
<circle class="progress-ring__track" cx="80" cy="80" r="70"/>
<circle class="progress-ring__fill" id="logros-ring-fill" cx="80" cy="80" r="70"/>
</svg>
<span class="milestone" data-milestone="25" style="top: 50%; left: 100%;"></span>
<span class="milestone" data-milestone="50" style="top: 100%; left: 50%;"></span>
<span class="milestone" data-milestone="75" style="top: 50%; left: 0%;"></span>
<div class="progress-ring__label">
<span class="progress-ring__percent" id="logros-ring-percent">0%</span>
<span class="progress-ring__caption">Completado</span>
</div>
</div>

<div class="level-badge" id="logros-level-badge">
<span class="level-badge__icon">🥚</span>
<span class="level-badge__name">Novato</span>
</div>

</div>

<div class="logros-hero__right">

<div class="xp-bar">
<div class="xp-bar__header">
<span class="xp-bar__label">⚡ Experiencia</span>
<span class="xp-bar__value"><strong id="logros-xp">0</strong> / <span id="logros-xp-max">860</span> XP</span>
</div>
<div class="xp-bar__track">
<div class="xp-bar__fill" id="logros-xp-fill" style="width: 0%"></div>
</div>
</div>

<div class="logros-stats-grid">
<div class="logros-stat">
<span class="logros-stat__icon">📚</span>
<span class="logros-stat__num" id="logros-cap-completados">0</span>
<span class="logros-stat__label">Capítulos</span>
</div>
<div class="logros-stat">
<span class="logros-stat__icon">✏️</span>
<span class="logros-stat__num" id="logros-ejercicios">0</span>
<span class="logros-stat__label">Ejercicios</span>
</div>
<div class="logros-stat">
<span class="logros-stat__icon">🎯</span>
<span class="logros-stat__num" id="logros-retos">0</span>
<span class="logros-stat__label">Retos</span>
</div>
<div class="logros-stat">
<span class="logros-stat__icon">🏅</span>
<span class="logros-stat__num" id="logros-total">0/23</span>
<span class="logros-stat__label">Logros</span>
</div>
</div>

</div>

<!-- Barra legacy oculta (logros.js la usa para calcular %) -->
<div class="logros-progreso" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;">
<div class="logros-progreso__bar">
<div class="logros-progreso__fill" id="logros-progreso-fill" style="width: 0%"></div>
</div>
</div>

</div>

<div id="logros-ultimo" class="logros-ultimo" style="display:none;"></div>

---

## 🎯 Cómo funciona

1. **Completa** un capítulo, ejercicio o reto.
2. **Marca** la casilla de verificación al final de la página (o visita la sección correspondiente).
3. **Desbloquea** el logro correspondiente.
4. **Comparte** tus logros en la comunidad.

!!! tip "Sin cuentas, sin servidores"
    Todo se guarda en tu navegador con `localStorage`. No se envía nada a ningún servidor. Si borras los datos del navegador, pierdes el progreso.

---

## 🏅 Logros desbloqueables

### 🟢 Principiante

<div class="logros-grid">

<div class="logro-card logro-card--locked" data-logro="primer-paso">
<div class="logro-card__icon">🚀</div>
<div class="logro-card__info">
<h3>Primer Paso</h3>
<p>Completa el capítulo 01 — Introducción al desarrollo web</p>
<div class="logro-card__recompensa">+10 XP</div>
</div>
<div class="logro-card__estado" data-estado="primer-paso">🔒</div>
</div>

<div class="logro-card logro-card--locked" data-logro="bases-html">
<div class="logro-card__icon">🌐</div>
<div class="logro-card__info">
<h3>Constructor de Bases</h3>
<p>Completa los capítulos 02, 03 y 04 (HTML, CSS y JS)</p>
<div class="logro-card__recompensa">+30 XP</div>
</div>
<div class="logro-card__estado" data-estado="bases-html">🔒</div>
</div>

<div class="logro-card logro-card--locked" data-logro="principiante-completo">
<div class="logro-card__icon">🟢</div>
<div class="logro-card__info">
<h3>Nivel Principiante</h3>
<p>Completa los 6 capítulos del nivel principiante</p>
<div class="logro-card__recompensa">+50 XP</div>
</div>
<div class="logro-card__estado" data-estado="principiante-completo">🔒</div>
</div>

</div>

### 🟡 Intermedio

<div class="logros-grid">

<div class="logro-card logro-card--locked" data-logro="git-master">
<div class="logro-card__icon">🔀</div>
<div class="logro-card__info">
<h3>Git Master</h3>
<p>Completa el capítulo 07 — Git y control de versiones</p>
<div class="logro-card__recompensa">+15 XP</div>
</div>
<div class="logro-card__estado" data-estado="git-master">🔒</div>
</div>

<div class="logro-card logro-card--locked" data-logro="api-explorer">
<div class="logro-card__icon">🔌</div>
<div class="logro-card__info">
<h3>API Explorer</h3>
<p>Completa el capítulo 08 — Consumo de APIs con fetch</p>
<div class="logro-card__recompensa">+15 XP</div>
</div>
<div class="logro-card__estado" data-estado="api-explorer">🔒</div>
</div>

<div class="logro-card logro-card--locked" data-logro="intermedio-completo">
<div class="logro-card__icon">🟡</div>
<div class="logro-card__info">
<h3>Nivel Intermedio</h3>
<p>Completa los 4 capítulos del nivel intermedio</p>
<div class="logro-card__recompensa">+40 XP</div>
</div>
<div class="logro-card__estado" data-estado="intermedio-completo">🔒</div>
</div>

</div>

### 🟠 Avanzado

<div class="logros-grid">

<div class="logro-card logro-card--locked" data-logro="typescript">
<div class="logro-card__icon">🔷</div>
<div class="logro-card__info">
<h3>TypeScript Hero</h3>
<p>Completa el capítulo 15 — TypeScript desde cero</p>
<div class="logro-card__recompensa">+20 XP</div>
</div>
<div class="logro-card__estado" data-estado="typescript">🔒</div>
</div>

<div class="logro-card logro-card--locked" data-logro="testing">
<div class="logro-card__icon">🧪</div>
<div class="logro-card__info">
<h3>Testing Master</h3>
<p>Completa el capítulo 16 — Testing frontend</p>
<div class="logro-card__recompensa">+20 XP</div>
</div>
<div class="logro-card__estado" data-estado="testing">🔒</div>
</div>

<div class="logro-card logro-card--locked" data-logro="avanzado-completo">
<div class="logro-card__icon">🟠</div>
<div class="logro-card__info">
<h3>Nivel Avanzado</h3>
<p>Completa los 8 capítulos del nivel avanzado</p>
<div class="logro-card__recompensa">+80 XP</div>
</div>
<div class="logro-card__estado" data-estado="avanzado-completo">🔒</div>
</div>

</div>

### 🔴 Profesional

<div class="logros-grid">

<div class="logro-card logro-card--locked" data-logro="fullstack">
<div class="logro-card__icon">🔴</div>
<div class="logro-card__info">
<h3>Full-stack</h3>
<p>Completa el capítulo 19 — Full-stack con Node.js</p>
<div class="logro-card__recompensa">+25 XP</div>
</div>
<div class="logro-card__estado" data-estado="fullstack">🔒</div>
</div>

<div class="logro-card logro-card--locked" data-logro="devops">
<div class="logro-card__icon">⚙</div>
<div class="logro-card__info">
<h3>DevOps</h3>
<p>Completa el capítulo 20 — DevOps para frontend</p>
<div class="logro-card__recompensa">+25 XP</div>
</div>
<div class="logro-card__estado" data-estado="devops">🔒</div>
</div>

</div>

### 🟣 Experto

<div class="logros-grid">

<div class="logro-card logro-card--locked" data-logro="web-components">
<div class="logro-card__icon">🟣</div>
<div class="logro-card__info">
<h3>Web Components</h3>
<p>Completa el capítulo 21 — Web Components</p>
<div class="logro-card__recompensa">+20 XP</div>
</div>
<div class="logro-card__estado" data-estado="web-components">🔒</div>
</div>

<div class="logro-card logro-card--locked" data-logro="pwa">
<div class="logro-card__icon">📱</div>
<div class="logro-card__info">
<h3>PWA Master</h3>
<p>Completa el capítulo 22 — Progressive Web Apps</p>
<div class="logro-card__recompensa">+20 XP</div>
</div>
<div class="logro-card__estado" data-estado="pwa">🔒</div>
</div>

<div class="logro-card logro-card--locked" data-logro="websockets">
<div class="logro-card__icon">🔌</div>
<div class="logro-card__info">
<h3>WebSockets</h3>
<p>Completa el capítulo 23 — WebSockets y tiempo real</p>
<div class="logro-card__recompensa">+20 XP</div>
</div>
<div class="logro-card__estado" data-estado="websockets">🔒</div>
</div>

<div class="logro-card logro-card--locked" data-logro="experto-completo">
<div class="logro-card__icon">🏅</div>
<div class="logro-card__info">
<h3>Nivel Experto</h3>
<p>Completa los 5 capítulos del nivel experto</p>
<div class="logro-card__recompensa">+100 XP</div>
</div>
<div class="logro-card__estado" data-estado="experto-completo">🔒</div>
</div>

</div>

### 🔵 Élite

<div class="logros-grid">

<div class="logro-card logro-card--locked" data-logro="seguridad">
<div class="logro-card__icon">🔒</div>
<div class="logro-card__info">
<h3>Seguridad Web</h3>
<p>Completa el capítulo 26 — Seguridad web</p>
<div class="logro-card__recompensa">+20 XP</div>
</div>
<div class="logro-card__estado" data-estado="seguridad">🔒</div>
</div>

<div class="logro-card logro-card--locked" data-logro="wasm">
<div class="logro-card__icon">⚡</div>
<div class="logro-card__info">
<h3>WebAssembly</h3>
<p>Completa el capítulo 27 — WebAssembly</p>
<div class="logro-card__recompensa">+20 XP</div>
</div>
<div class="logro-card__estado" data-estado="wasm">🔒</div>
</div>

<div class="logro-card logro-card--locked" data-logro="ia-frontend">
<div class="logro-card__icon">🤖</div>
<div class="logro-card__info">
<h3>IA en el Frontend</h3>
<p>Completa el capítulo 28 — IA en el frontend</p>
<div class="logro-card__recompensa">+20 XP</div>
</div>
<div class="logro-card__estado" data-estado="ia-frontend">🔒</div>
</div>

<div class="logro-card logro-card--locked" data-logro="elite-completo">
<div class="logro-card__icon">🔵</div>
<div class="logro-card__info">
<h3>Nivel Élite</h3>
<p>Completa los 5 capítulos del nivel élite</p>
<div class="logro-card__recompensa">+100 XP</div>
</div>
<div class="logro-card__estado" data-estado="elite-completo">🔒</div>
</div>

</div>

### 🚀 Vanguardia

<div class="logros-grid">

<div class="logro-card logro-card--locked" data-logro="playwright">
<div class="logro-card__icon">🎭</div>
<div class="logro-card__info">
<h3>E2E Master</h3>
<p>Completa el capítulo 31 — Testing E2E con Playwright</p>
<div class="logro-card__recompensa">+20 XP</div>
</div>
<div class="logro-card__estado" data-estado="playwright">🔒</div>
</div>

<div class="logro-card logro-card--locked" data-logro="edge">
<div class="logro-card__icon">☁</div>
<div class="logro-card__info">
<h3>Edge Computing</h3>
<p>Completa el capítulo 33 — Edge Computing</p>
<div class="logro-card__recompensa">+20 XP</div>
</div>
<div class="logro-card__estado" data-estado="edge">🔒</div>
</div>

<div class="logro-card logro-card--locked" data-logro="ia-generativa">
<div class="logro-card__icon">✨</div>
<div class="logro-card__info">
<h3>IA Generativa</h3>
<p>Completa el capítulo 37 — Introducción a la IA Generativa</p>
<div class="logro-card__recompensa">+20 XP</div>
</div>
<div class="logro-card__estado" data-estado="ia-generativa">🔒</div>
</div>

<div class="logro-card logro-card--locked" data-logro="vanguardia-completo">
<div class="logro-card__icon">🚀</div>
<div class="logro-card__info">
<h3>Nivel Vanguardia</h3>
<p>Completa los 8 capítulos del nivel vanguardia</p>
<div class="logro-card__recompensa">+150 XP</div>
</div>
<div class="logro-card__estado" data-estado="vanguardia-completo">🔒</div>
</div>

</div>

---

## 👑 Hall of Fame

<div class="hall-of-fame">

### ¿Has completado el libro?

Si has llegado al final, entra en el **Hall of Fame** y comparte tu logro con la comunidad.

[🏅 Ver Hall of Fame](hall-of-fame.md){ .md-button .md-button--primary }

</div>

---

## ⚙️ Gestionar mis logros

<div class="logros-acciones">

[🔄 Recargar progreso](#){ .md-button id="logros-reload" }
[🗑️ Borrar todo el progreso](#){ .md-button .md-button--danger id="logros-reset" }

</div>

!!! warning "Cuidado al borrar"
    El botón "Borrar todo el progreso" elimina **todos** tus logros y datos de `localStorage`. No se puede deshacer.

---

## ❓ Preguntas frecuentes

??? question "¿Dónde se guarda mi progreso?"
    En tu navegador, en `localStorage`, bajo las claves `uru-*`. No se envía nada a ningún servidor. Si borras los datos del navegador, pierdes el progreso.

??? question "¿Puedo sincronizar entre dispositivos?"
    No, por ahora es local. Si quieres, puedes hacer una copia exportando `localStorage` manualmente (F12 → Application → Local Storage).

??? question "¿Los logros caducan?"
    No. Se guardan indefinidamente hasta que los borres tú.

??? question "¿Cómo se calcula el porcentaje?"
    Según el número de logros desbloqueados sobre el total (23 logros). El anillo circular se actualiza automáticamente.