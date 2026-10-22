# 31 — Testing E2E con Playwright

!!! abstract "Qué vas a aprender"
    - Qué es el testing E2E y por qué es importante.
    - Instalar y configurar Playwright.
    - Escribir tu primer test E2E.
    - Selectores, acciones y aserciones.
    - Debugging y CI.

---

## 🎭 ¿Qué es el testing E2E?

El **testing End-to-End (E2E)** simula a un usuario real interactuando con tu aplicación en un **navegador de verdad**. Abre la página, hace clic, rellena formularios y comprueba que todo funciona.

```
Unitario     → prueba una función
Integración  → prueba varios módulos
E2E          → prueba la app completa en el navegador
```

!!! quote "El test más realista"
    Los tests E2E son los más lentos pero los más cercanos a la experiencia real del usuario. Si un E2E pasa, es muy probable que el flujo funcione.

---

## 📦 Instalar Playwright

```bash
npm init playwright@latest
```

Esto crea:

- `playwright.config.js` — configuración
- `tests/` — carpeta de tests
- `tests-examples/` — ejemplos

```bash
npx playwright install
```

---

## ✍️ Tu primer test

```javascript
// tests/ejemplo.spec.js
import { test, expect } from "@playwright/test";

test("la home carga correctamente", async ({ page }) => {
  await page.goto("https://libro.urukais.com");
  await expect(page).toHaveTitle(/Libro del Desarrollador/);
  await expect(page.locator("h1")).toBeVisible();
});
```

```bash
npx playwright test
npx playwright test --ui
npx playwright show-report
```

---

## 🎯 Selectores

| Selector | Ejemplo |
| :--- | :--- |
| Por rol (recomendado) | `page.getByRole("button", { name: "Enviar" })` |
| Por texto | `page.getByText("Hola")` |
| Por label | `page.getByLabel("Email")` |
| Por placeholder | `page.getByPlaceholder("Tu nombre")` |
| Por test id | `page.getByTestId("mi-boton")` |
| CSS | `page.locator(".boton")` |
| XPath | `page.locator("//button")` |

!!! tip "Usa selectores accesibles"
    Prioriza `getByRole`, `getByLabel` y `getByText`. Son más resistentes a cambios de implementación y comprueban accesibilidad de paso.

---

## 🎬 Acciones

```javascript
await page.goto("/login");
await page.fill("#email", "ana@ejemplo.com");
await page.fill("#password", "12345678");
await page.click("button[type=submit]");
await page.check("#acepto");
await page.selectOption("#pais", "es");
await page.hover(".menu");
await page.keyboard.press("Enter");
```

---

## ✅ Aserciones

```javascript
await expect(page).toHaveURL(/dashboard/);
await expect(page.locator("h1")).toHaveText("Bienvenida");
await expect(page.locator(".error")).toBeVisible();
await expect(page.locator(".modal")).toBeHidden();
await expect(page.getByRole("button")).toBeEnabled();
await expect(page).toHaveScreenshot("home.png");
```

---

## 🐛 Debugging

```bash
npx playwright test --debug
npx playwright test --ui
npx playwright codegen https://libro.urukais.com
```

`codegen` abre un navegador y graba tus acciones en un test. Ideal para empezar.

---

## 🔄 CI con GitHub Actions

```yaml
name: E2E
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-31">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué prueba el testing E2E?</p>
<button class="quiz-option" data-opt="a">A) Una función aislada</button>
<button class="quiz-option" data-opt="b">B) La app completa en un navegador real</button>
<button class="quiz-option" data-opt="c">C) La base de datos</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué herramienta es el estándar para E2E?</p>
<button class="quiz-option" data-opt="a">A) Playwright</button>
<button class="quiz-option" data-opt="b">B) Vitest</button>
<button class="quiz-option" data-opt="c">C) Jest</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué comando graba tus acciones en un test?</p>
<button class="quiz-option" data-opt="a">A) npx playwright test</button>
<button class="quiz-option" data-opt="b">B) npx playwright install</button>
<button class="quiz-option" data-opt="c">C) npx playwright codegen</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2031%3A%20Testing%20E2E%20con%20Playwright&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F31-testing-e2e%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F31-testing-e2e%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2031%3A%20Testing%20E2E%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F31-testing-e2e%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/31-testing-e2e/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 32 — Server Components](32-server-components.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
