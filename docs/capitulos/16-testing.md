# 16 — Testing frontend

!!! abstract "Qué vas a aprender"
    - Por qué testear es importante.
    - Tipos de tests: unitarios, integración, E2E.
    - Vitest: el framework de testing moderno.
    - Testing Library: testear como un usuario.
    - Buenas prácticas de testing.

---

## 🧪 ¿Por qué testear?

Los tests automáticos te permiten **cambiar código sin miedo**. Si algo se rompe, el test te avisa antes de que llegue a producción.

!!! quote "Los tests son tu red de seguridad"
    Sin tests, cada cambio es una apuesta. Con tests, cada cambio es una verificación.

---

## 📊 La pirámide de testing

```
        /\
       /E2E\      <- pocos, lentos, frágiles
      /------\
     /Integración\  <- algunos, más rápidos
    /--------------\
   /   Unitarios    \ <- muchos, rápidos, aislados
  /------------------\
```

| Tipo | Qué prueba | Velocidad | Cantidad |
| :--- | :--- | :--- | :--- |
| **Unitario** | Una función o componente aislado | ⚡ Muy rápido | Muchos |
| **Integración** | Varios módulos juntos | 🚀 Rápido | Algunos |
| **E2E** | La app completa en un navegador | 🐢 Lento | Pocos |

---

## ⚡ Vitest

**Vitest** es el framework de testing moderno, basado en Vite. Es ultrarrápido y compatible con la API de Jest.

```bash
npm install -D vitest
```

### Tu primer test

```javascript
// sumar.js
export function sumar(a, b) {
  return a + b;
}

// sumar.test.js
import { describe, it, expect } from "vitest";
import { sumar } from "./sumar.js";

describe("sumar", () => {
  it("suma dos números positivos", () => {
    expect(sumar(2, 3)).toBe(5);
  });

  it("suma números negativos", () => {
    expect(sumar(-2, -3)).toBe(-5);
  });

  it("suma cero", () => {
    expect(sumar(0, 5)).toBe(5);
  });
});
```

### Ejecutar los tests

```bash
npx vitest          # modo watch
npx vitest run      # una vez
npx vitest --coverage # con cobertura
```

---

## 🎯 Matchers más usados

| Matcher | Qué comprueba |
| :--- | :--- |
| `toBe(valor)` | Igualdad estricta (===) |
| `toEqual(valor)` | Igualdad profunda (objetos, arrays) |
| `toBeTruthy()` | Valor truthy |
| `toBeFalsy()` | Valor falsy |
| `toContain(item)` | Array o string contiene |
| `toThrow()` | Función lanza error |
| `toHaveLength(n)` | Longitud |
| `toMatch(regex)` | Coincide con regex |

---

## 🧩 Testing Library

**Testing Library** te ayuda a testear componentes **como un usuario real**, no como un programador.

```bash
npm install -D @testing-library/dom @testing-library/user-event
```

```javascript
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

// El HTML de tu componente
document.body.innerHTML = `
  <button id="btn">Haz clic</button>
  <p id="resultado">0</p>
`;

let clicks = 0;
document.getElementById("btn").addEventListener("click", () => {
  clicks++;
  document.getElementById("resultado").textContent = clicks;
});

// Test
const btn = screen.getByText("Haz clic");
await userEvent.click(btn);
expect(screen.getByText("1")).toBeTruthy();
```

!!! tip "Testea como un usuario"
    No testees detalles de implementación (nombres de variables, estructura del DOM). Testea lo que el usuario ve y hace: textos, roles, clics.

---

## 🎭 Testing E2E con Playwright

**Playwright** permite automatizar un navegador real: abrir páginas, hacer clic, rellenar formularios, comprobar resultados.

```bash
npm install -D @playwright/test
npx playwright install
```

```javascript
// tests/ejemplo.spec.js
import { test, expect } from "@playwright/test";

test("flujo de login", async ({ page }) => {
  await page.goto("https://mi-app.com/login");
  await page.fill("#email", "ana@ejemplo.com");
  await page.fill("#password", "12345678");
  await page.click("button[type=submit]");
  await expect(page).toHaveURL("https://mi-app.com/dashboard");
  await expect(page.locator("h1")).toContainText("Bienvenida");
});
```

### Ejecutar los tests

```bash
npx playwright test
npx playwright test --ui
npx playwright show-report
```

!!! tip "Playwright vs Cypress"
    Ambos son geniales. Playwright soporta más navegadores (Chromium, Firefox, WebKit), es más rápido y tiene mejor API para testing paralelo. Cypress tiene mejor DX para debugging visual.

---

## ✅ Buenas prácticas de testing

- ✅ **Testea comportamiento, no implementación**. Si refactorizas y los tests fallan, están mal escritos.
- ✅ **Un test, una cosa**. Si un test comprueba 5 cosas, cuando falla no sabes qué se rompió.
- ✅ **Nombres descriptivos**. `"debería sumar dos números positivos"` mejor que `"test 1"`.
- ✅ **Sigue el patrón AAA**: Arrange (preparar), Act (actuar), Assert (comprobar).
- ✅ **Testea los casos límite**: vacío, null, undefined, negativos, muy grandes.
- ✅ **No testees la librería**. No testees que `Array.push` funciona.
- ❌ **No persigas el 100% de cobertura**. El 80% bien hecho vale más que el 100% mal hecho.

---

## 📊 Cobertura de tests

```bash
npx vitest run --coverage
```

| Métrica | Qué mide |
| :--- | :--- |
| **Statements** | Líneas ejecutadas |
| **Branches** | Ramas if/else cubiertas |
| **Functions** | Funciones llamadas |
| **Lines** | Líneas cubiertas |

!!! warning "La cobertura no lo es todo"
    Un 100% de cobertura no significa que los tests sean buenos. Puedes tener un test que ejecute una línea sin comprobar su resultado.

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-16">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué tipo de test es más rápido?</p>
<button class="quiz-option" data-opt="a">A) E2E</button>
<button class="quiz-option" data-opt="b">B) Unitario</button>
<button class="quiz-option" data-opt="c">C) Integración</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué framework de testing está basado en Vite?</p>
<button class="quiz-option" data-opt="a">A) Vitest</button>
<button class="quiz-option" data-opt="b">B) Jest</button>
<button class="quiz-option" data-opt="c">C) Mocha</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué herramienta se usa para testing E2E?</p>
<button class="quiz-option" data-opt="a">A) Vitest</button>
<button class="quiz-option" data-opt="b">B) Testing Library</button>
<button class="quiz-option" data-opt="c">C) Playwright</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2016%3A%20Testing%20frontend&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F16-testing%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F16-testing%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2016%3A%20Testing%20frontend%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F16-testing%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/16-testing/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 17 — Rendimiento web](17-rendimiento.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
