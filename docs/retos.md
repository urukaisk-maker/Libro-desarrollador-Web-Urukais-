
---

### 📄 Archivo 7: `docs/retos.md` (El índice de los retos)

```markdown
# 🔥 Retos Semanales

Cada semana publicaré un nuevo desafío de código. Los retos se **desbloquean automáticamente** en su fecha indicada.

<div class="grid cards retos-grid" markdown>

-   :material-fire:{ .lg .middle } __Reto #1: El botón camaleón__

    ---

    **Dificultad:** 🟢 Fácil · **Tema:** HTML y CSS

    Crea un botón con hover y transiciones suaves.

    [:octicons-arrow-right-24: Ver reto](retos/reto-1.md)

-   <div class="reto-card" data-release="2026-10-25">:material-lock:{ .lg .middle } __Reto #2: La tarjeta de presentación__

    ---

    **Dificultad:** 🟡 Medio · **Tema:** HTML y CSS

    Crea una tarjeta con hover y sombra.

    🔒 Disponible el 25 de octubre</div>

-   <div class="reto-card" data-release="2026-11-01">:material-lock:{ .lg .middle } __Reto #3: Contador de clics__

    ---

    **Dificultad:** 🟢 Fácil · **Tema:** JavaScript

    Aprende a manejar eventos y estado.

    🔒 Disponible el 1 de noviembre</div>

-   <div class="reto-card" data-release="2026-11-08">:material-lock:{ .lg .middle } __Reto #4: Galería responsive__

    ---

    **Dificultad:** 🟡 Medio · **Tema:** CSS Grid

    Domina CSS Grid con media queries.

    🔒 Disponible el 8 de noviembre</div>

-   <div class="reto-card" data-release="2026-11-15">:material-lock:{ .lg .middle } __Reto #5: Validador de formulario__

    ---

    **Dificultad:** 🔴 Difícil · **Tema:** JavaScript

    Valida formularios como un profesional.

    🔒 Disponible el 15 de noviembre</div>

</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const hoy = new Date();
  document.querySelectorAll('.reto-card[data-release]').forEach(card => {
    const release = new Date(card.dataset.release);
    if (hoy >= release) {
      // Desbloquear: convertir en tarjeta clickable
      card.classList.remove('reto-card');
      const link = document.createElement('a');
      const num = card.querySelector('strong').textContent.match(/\d+/)[0];
      link.href = `retos/reto-${num}.md`;
      link.className = 'desbloqueado';
      link.innerHTML = '[:octicons-arrow-right-24: Ver reto]';
      // Sustituir el 🔒 por el enlace
      const ultimo = card.lastElementChild;
      if (ultimo) ultimo.replaceWith(link);
    }
  });
});
</script>
---

### 📄 Archivo 7: `docs/retos.md` (El índice de los retos)

```markdown
# 🔥 Retos Semanales

Cada semana publicaré un nuevo desafío de código. Los retos se **desbloquean automáticamente** en su fecha indicada.

<div class="grid cards retos-grid" markdown>

-   :material-fire:{ .lg .middle } __Reto #1: El botón camaleón__

    ---

    **Dificultad:** 🟢 Fácil · **Tema:** HTML y CSS

    Crea un botón con hover y transiciones suaves.

    [:octicons-arrow-right-24: Ver reto](retos/reto-1.md)

-   <div class="reto-card" data-release="2026-10-25">:material-lock:{ .lg .middle } __Reto #2: La tarjeta de presentación__

    ---

    **Dificultad:** 🟡 Medio · **Tema:** HTML y CSS

    Crea una tarjeta con hover y sombra.

    🔒 Disponible el 25 de octubre</div>

-   <div class="reto-card" data-release="2026-11-01">:material-lock:{ .lg .middle } __Reto #3: Contador de clics__

    ---

    **Dificultad:** 🟢 Fácil · **Tema:** JavaScript

    Aprende a manejar eventos y estado.

    🔒 Disponible el 1 de noviembre</div>

-   <div class="reto-card" data-release="2026-11-08">:material-lock:{ .lg .middle } __Reto #4: Galería responsive__

    ---

    **Dificultad:** 🟡 Medio · **Tema:** CSS Grid

    Domina CSS Grid con media queries.

    🔒 Disponible el 8 de noviembre</div>

-   <div class="reto-card" data-release="2026-11-15">:material-lock:{ .lg .middle } __Reto #5: Validador de formulario__

    ---

    **Dificultad:** 🔴 Difícil · **Tema:** JavaScript

    Valida formularios como un profesional.

    🔒 Disponible el 15 de noviembre</div>

</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const hoy = new Date();
  document.querySelectorAll('.reto-card[data-release]').forEach(card => {
    const release = new Date(card.dataset.release);
    if (hoy >= release) {
      // Desbloquear: convertir en tarjeta clickable
      card.classList.remove('reto-card');
      const link = document.createElement('a');
      const num = card.querySelector('strong').textContent.match(/\d+/)[0];
      link.href = `retos/reto-${num}.md`;
      link.className = 'desbloqueado';
      link.innerHTML = '[:octicons-arrow-right-24: Ver reto]';
      // Sustituir el 🔒 por el enlace
      const ultimo = card.lastElementChild;
      if (ultimo) ultimo.replaceWith(link);
    }
  });
});
</script>
---

### 📄 Archivo 7: `docs/retos.md` (El índice de los retos)

```markdown
# 🔥 Retos Semanales

Cada semana publicaré un nuevo desafío de código. Los retos se **desbloquean automáticamente** en su fecha indicada.

<div class="grid cards retos-grid" markdown>

-   :material-fire:{ .lg .middle } __Reto #1: El botón camaleón__

    ---

    **Dificultad:** 🟢 Fácil · **Tema:** HTML y CSS

    Crea un botón con hover y transiciones suaves.

    [:octicons-arrow-right-24: Ver reto](retos/reto-1.md)

-   <div class="reto-card" data-release="2026-10-25">:material-lock:{ .lg .middle } __Reto #2: La tarjeta de presentación__

    ---

    **Dificultad:** 🟡 Medio · **Tema:** HTML y CSS

    Crea una tarjeta con hover y sombra.

    🔒 Disponible el 25 de octubre</div>

-   <div class="reto-card" data-release="2026-11-01">:material-lock:{ .lg .middle } __Reto #3: Contador de clics__

    ---

    **Dificultad:** 🟢 Fácil · **Tema:** JavaScript

    Aprende a manejar eventos y estado.

    🔒 Disponible el 1 de noviembre</div>

-   <div class="reto-card" data-release="2026-11-08">:material-lock:{ .lg .middle } __Reto #4: Galería responsive__

    ---

    **Dificultad:** 🟡 Medio · **Tema:** CSS Grid

    Domina CSS Grid con media queries.

    🔒 Disponible el 8 de noviembre</div>

-   <div class="reto-card" data-release="2026-11-15">:material-lock:{ .lg .middle } __Reto #5: Validador de formulario__

    ---

    **Dificultad:** 🔴 Difícil · **Tema:** JavaScript

    Valida formularios como un profesional.

    🔒 Disponible el 15 de noviembre</div>

</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const hoy = new Date();
  document.querySelectorAll('.reto-card[data-release]').forEach(card => {
    const release = new Date(card.dataset.release);
    if (hoy >= release) {
      // Desbloquear: convertir en tarjeta clickable
      card.classList.remove('reto-card');
      const link = document.createElement('a');
      const num = card.querySelector('strong').textContent.match(/\d+/)[0];
      link.href = `retos/reto-${num}.md`;
      link.className = 'desbloqueado';
      link.innerHTML = '[:octicons-arrow-right-24: Ver reto]';
      // Sustituir el 🔒 por el enlace
      const ultimo = card.lastElementChild;
      if (ultimo) ultimo.replaceWith(link);
    }
  });
});
</script>