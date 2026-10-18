# 🔥 Retos Semanales

Cada semana publicaré un nuevo desafío de código. Los retos se **desbloquean automáticamente** en su fecha indicada.

<div class="grid cards" markdown>

-   :material-fire:{ .lg .middle } __Reto #1: El botón camaleón__

    ---

    **Dificultad:** 🟢 Fácil · **Tema:** HTML y CSS

    Crea un botón con hover y transiciones suaves.

    [:octicons-arrow-right-24: Ver reto](retos/reto-1.md)

-   :material-lock:{ .lg .middle } __Reto #2: La tarjeta de presentación__ {: .reto-card data-release="2026-10-25" }

    ---

    **Dificultad:** 🟡 Medio · **Tema:** HTML y CSS

    Crea una tarjeta con hover y sombra.
    
    <span class="fecha-bloqueo">🔒 Disponible el 25 de octubre</span>

-   :material-lock:{ .lg .middle } __Reto #3: Contador de clics__ {: .reto-card data-release="2026-11-01" }

    ---

    **Dificultad:** 🟢 Fácil · **Tema:** JavaScript

    Aprende a manejar eventos y estado.
    
    <span class="fecha-bloqueo">🔒 Disponible el 1 de noviembre</span>

-   :material-lock:{ .lg .middle } __Reto #4: Galería responsive__ {: .reto-card data-release="2026-11-08" }

    ---

    **Dificultad:** 🟡 Medio · **Tema:** CSS Grid

    Domina CSS Grid con media queries.
    
    <span class="fecha-bloqueo">🔒 Disponible el 8 de noviembre</span>

-   :material-lock:{ .lg .middle } __Reto #5: Validador de formulario__ {: .reto-card data-release="2026-11-15" }

    ---

    **Dificultad:** 🔴 Difícil · **Tema:** JavaScript

    Valida formularios como un profesional.
    
    <span class="fecha-bloqueo">🔒 Disponible el 15 de noviembre</span>

</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const hoy = new Date();
  document.querySelectorAll('.reto-card[data-release]').forEach(card => {
    const release = new Date(card.dataset.release);
    if (hoy >= release) {
      // Quitar el bloqueo visual
      card.classList.remove('reto-card');
      // Ocultar el texto de bloqueo
      const bloqueo = card.querySelector('.fecha-bloqueo');
      if (bloqueo) bloqueo.style.display = 'none';
      
      // Añadir el enlace al final
      const num = card.querySelector('strong').textContent.match(/\d+/)[0];
      const link = document.createElement('a');
      link.href = `retos/reto-${num}.md`;
      link.innerHTML = '[:octicons-arrow-right-24: Ver reto]';
      card.appendChild(link);
    }
  });
});
</script>