*(Guarda con `Ctrl+S`)*

---

### Paso 5: Actualiza el menú (`mkdocs.yml`)

En VS Code, abre el archivo `mkdocs.yml` que está en la raíz del proyecto.

Busca la sección `Nivel élite:` (usa `Ctrl+F` para encontrarlo rápido).
Justo debajo de la última línea de ese bloque (que es `- "30 — Web3": capitulos/30-web3.md`), añade estas líneas:

```yaml
  - Nivel vanguardia:
      - "31 — Testing E2E con Playwright": capitulos/31-testing-e2e.md
      - "32 — Server Components": capitulos/32-server-components.md
      - "33 — Edge Computing": capitulos/33-edge-computing.md

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz-container" data-correct="b">
  <p class="quiz-question">¿Qué framework populariza los React Server Components?</p>
  <div class="quiz-options">
    <button class="quiz-option" data-option="a">A) Angular</button>
    <button class="quiz-option" data-option="b">B) Next.js (App Router)</button>
    <button class="quiz-option" data-option="c">C) Svelte</button>
  </div>
  <div class="quiz-feedback"></div>
</div>