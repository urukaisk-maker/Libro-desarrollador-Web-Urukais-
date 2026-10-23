# 31 — Testing E2E

!!! abstract "Qué vas a aprender"
    - Qué es un test End-to-End y en qué se diferencia del unitario y del de integración.
    - Las herramientas principales: Playwright, Cypress, Selenium.
    - Cómo escribir tu primer test E2E.
    - Patrones: Page Object Model, fixtures, esperas.
    - Cuándo usar E2E y cuándo NO.

---

## 🎯 ¿Qué es un test E2E?

Un test **End-to-End** (E2E) simula a un **usuario real** interactuando con tu aplicación: abre el navegador, hace clic, escribe, navega, y verifica que el resultado es el esperado.

!!! quote "La analogía del piloto de pruebas"
    Un test unitario es como revisar cada pieza de un coche por separado. Un test E2E es como **subir a un piloto de pruebas** y dar una vuelta completa por carretera: comprueba que todo funciona junto, en condiciones reales.

~~~mermaid
graph LR
    A[Test E2E] --> B[Abre navegador]
    B --> C[Navega a la app]
    C --> D[Interactúa: clic, teclado, scroll]
    D --> E[Verifica resultados]
    E --> F[✅ Pasa / ❌ Falla]
~~~

---

## 🏛 E2E vs Unitario vs Integración

| Tipo | Qué prueba | Velocidad | Coste | Ejemplo |
| :--- | :--- | :--- | :--- | :--- |
| **Unitario** | Una función o componente aislado | ⚡ Muy rápido (ms) | Bajo | `sum(2,2) === 4` |
| **Integración** | Varios módulos juntos | 🚀 Rápido (100ms) | Medio | API + DB + servicio |
| **E2E** | La app **completa** desde el navegador | 🐢 Lento (segundos) | Alto | Login → carrito → pago |

!!! tip "La pirámide de tests"
    **Muchos unitarios, algunos de integración, pocos E2E**. Los E2E son lentos y frágiles; reservarlos para los **flujos críticos**: login, checkout, registro, pago.

---

## 🛠 Herramientas principales

| Herramienta | Lenguaje | Velocidad | Multi-navegador | Notas |
| :--- | :--- | :--- | :--- | :--- |
| **Playwright** | JS/TS, Python, C#, Java | ⚡ Muy rápido | ✅ Chromium, Firefox, WebKit | Microsoft, muy activo |
| **Cypress** | JS/TS | 🚀 Rápido | ⚠️ Solo Chromium (y Firefox experimental) | DX excelente, popular |
| **Selenium** | Múltiples | 🐢 Lento | ✅ Todos | El clásico, más verboso |
| **Puppeteer** | JS/TS | 🚀 Rápido | ⚠️ Solo Chromium | Solo Chrome/Edge |
| **WebdriverIO** | JS/TS | 🐢 Medio | ✅ Todos | Sobre WebDriver |

!!! tip "Recomendación 2026"
    **Playwright** si necesitas multi-navegador o tests rápidos en CI. **Cypress** si priorizas DX y solo te importa Chromium. **Selenium** solo si tienes legacy o necesitas navegadores muy antiguos.

---

## 📝 Tu primer test con Playwright

### Instalación

~~~bash
npm init playwright@latest
~~~

Elige TypeScript, carpeta `tests/`, y GitHub Actions si quieres CI.

### Test básico

~~~javascript
// tests/login.spec.js
import { test, expect } from "@playwright/test";

test("login con credenciales válidas", async ({ page }) => {
    await page.goto("https://mi-app.com/login");
    await page.fill('input[name="email"]', "user@example.com");
    await page.fill('input[name="password"]', "secreto123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL("https://mi-app.com/dashboard");
    await expect(page.locator("h1")).toHaveText("Bienvenido");
});
~~~

### Ejecutar

~~~bash
npx playwright test
npx playwright test --headed        # ver el navegador
npx playwright test --ui             # modo interactivo
npx playwright show-report           # ver el informe HTML
~~~

---

## 🧩 Patrones clave

### 1. Page Object Model (POM)

Encapsula las interacciones con una página en una clase. Evita duplicar selectores en cada test.

~~~javascript
// pages/LoginPage.js
export class LoginPage {
    constructor(page) {
        this.page = page;
        this.email = 'input[name="email"]';
        this.password = 'input[name="password"]';
        this.submit = 'button[type="submit"]';
    }

    async goto() {
        await this.page.goto("/login");
    }

    async login(email, pass) {
        await this.page.fill(this.email, email);
        await this.page.fill(this.password, pass);
        await this.page.click(this.submit);
    }
}
~~~

~~~javascript
// tests/login.spec.js
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("login válido", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login("user@example.com", "secreto123");
    await expect(page).toHaveURL(/dashboard/);
});
~~~

### 2. Fixtures

Playwright inyecta `page`, `context`, `browser` automáticamente. Puedes crear fixtures propias:

~~~javascript
// fixtures.js
import { test as base } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";

export const test = base.extend({
    loginPage: async ({ page }, use) => {
        const login = new LoginPage(page);
        await login.goto();
        await use(login);
    },
});
~~~

~~~javascript
import { test, expect } from "./fixtures";

test("login", async ({ loginPage, page }) => {
    await loginPage.login("user@example.com", "secreto123");
    await expect(page).toHaveURL(/dashboard/);
});
~~~

### 3. Esperas automáticas

Playwright **espera automáticamente** a que los elementos estén visibles, habilitados y estables. **No uses `sleep()`**.

~~~javascript
// ✅ Playwright espera solo
await page.click('button[type="submit"]');

// ❌ No hagas esto
await page.waitForTimeout(2000);
~~~

### 4. Selectores recomendados

| Selector | Cuándo usarlo |
| :--- | :--- |
| `getByRole('button', { name: 'Enviar' })` | ✅ **Recomendado** (accesible y robusto) |
| `getByLabel('Email')` | Formularios con label |
| `getByText('Bienvenido')` | Texto visible |
| `getByTestId('login-btn')` | Cuando no hay rol/label claro |
| `locator('css=.btn-primary')` | CSS (más frágil) |

!!! tip "Usa `getByRole` primero"
    Los selectores basados en **rol accesible** (`getByRole`) son los más robustos: sobreviven a cambios de clase, ID o estructura. Y de paso verifican accesibilidad.

---

## 🏗 Ejemplo: flujo de checkout

~~~javascript
import { test, expect } from "@playwright/test";

test("checkout completo", async ({ page }) => {
    // 1. Login
    await page.goto("/login");
    await page.getByLabel("Email").fill("user@example.com");
    await page.getByLabel("Contraseña").fill("secreto123");
    await page.getByRole("button", { name: "Entrar" }).click();

    // 2. Añadir al carrito
    await page.goto("/productos");
    await page.getByRole("button", { name: "Añadir al carrito" }).first().click();

    // 3. Ir al carrito
    await page.getByRole("link", { name: "Carrito" }).click();
    await expect(page.getByText("Teclado mecánico")).toBeVisible();

    // 4. Checkout
    await page.getByRole("button", { name: "Pagar" }).click();
    await page.getByLabel("Tarjeta").fill("4242424242424242");
    await page.getByLabel("Caducidad").fill("12/30");
    await page.getByLabel("CVC").fill("123");
    await page.getByRole("button", { name: "Confirmar pago" }).click();

    // 5. Verificar
    await expect(page.getByText("Pago exitoso")).toBeVisible();
});
~~~

---

## ⚠️ Cuándo NO usar E2E

| Caso | Por qué |
| :--- | :--- |
| Lógica de negocio compleja | Mejor cubrirla con unitarios rápidos |
| Validaciones de formulario | Unitarios de validadores |
| Componentes aislados | Storybook + tests de componente |
| Rendimiento | Usa Lighthouse o k6, no E2E |
| Cada commit | E2E es lento; en CI corre en paralelo o solo en PRs |

!!! warning "E2E frágil = E2E que se ignora"
    Un test E2E que falla aleatoriamente (flaky) es **peor que no tener test**: el equipo aprende a ignorar los fallos. Invierte en estabilidad: selectores robustos, esperas automáticas, datos de test aislados.

---

## 🚀 E2E en CI

~~~yaml
# .github/workflows/e2e.yml
name: E2E
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
~~~

**Buenas prácticas en CI:**
- Ejecutar en **paralelo** (`--workers=4`).
- **Reintentar** fallos sospechosos (`--retries=2`).
- Subir el **informe HTML** como artefacto cuando falla.
- Cachear dependencias de Playwright.

---

## 🧪 Ejercicio práctico

!!! example "Test de login con 3 casos"
    Escribe tests E2E para el login de una app con:

    - **Caso 1:** credenciales válidas → redirige a `/dashboard`.
    - **Caso 2:** contraseña incorrecta → muestra "Credenciales inválidas".
    - **Caso 3:** email vacío → el botón está deshabilitado o muestra error.

??? success "Solución"
    ~~~javascript
    import { test, expect } from "@playwright/test";

    test.describe("Login", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/login");
        });

        test("credenciales válidas", async ({ page }) => {
            await page.getByLabel("Email").fill("user@example.com");
            await page.getByLabel("Contraseña").fill("secreto123");
            await page.getByRole("button", { name: "Entrar" }).click();
            await expect(page).toHaveURL(/dashboard/);
        });

        test("contraseña incorrecta", async ({ page }) => {
            await page.getByLabel("Email").fill("user@example.com");
            await page.getByLabel("Contraseña").fill("mal");
            await page.getByRole("button", { name: "Entrar" }).click();
            await expect(page.getByText("Credenciales inválidas")).toBeVisible();
        });

        test("email vacío deshabilita el botón", async ({ page }) => {
            await page.getByLabel("Contraseña").fill("secreto123");
            await expect(
                page.getByRole("button", { name: "Entrar" })
            ).toBeDisabled();
        });
    });
    ~~~

---

## 🧠 Quiz

!!! question "Comprueba lo aprendido"

??? success "1. ¿Qué diferencia hay entre un test unitario y un E2E?"
    Unitario: prueba una función o componente aislado, milisegundos. E2E: prueba la app completa desde el navegador, segundos o minutos.

??? success "2. ¿Cuál es la recomendación general (pirámide de tests)?"
    Muchos unitarios, algunos de integración, pocos E2E. Los E2E solo para flujos críticos.

??? success "3. ¿Qué es el Page Object Model?"
    Un patrón que encapsula las interacciones con una página en una clase, evitando duplicar selectores y facilitando el mantenimiento.

??? success "4. ¿Por qué no usar `sleep()` o `waitForTimeout()` en Playwright?"
    Porque Playwright ya espera automáticamente a que los elementos estén listos. Los `sleep` fijos hacen los tests lentos y frágiles.

??? success "5. ¿Qué es un test "flaky"?"
    Un test que a veces pasa y a veces falla sin cambios en el código. Es peor que no tener test, porque enseña al equipo a ignorar los fallos.

---

## 📚 Recursos

- [Playwright — Docs oficiales](https://playwright.dev/)
- [Cypress — Docs oficiales](https://docs.cypress.io/)
- [Selenium — Docs](https://www.selenium.dev/documentation/)
- [Testing Library — Guía de selectores](https://testing-library.com/docs/queries/about/#priority)
- [web.dev — Testing](https://web.dev/learn/testing)
- [Test Pyramid — Martin Fowler](https://martinfowler.com/articles/practical-test-pyramid.html)

---

➡️ Siguiente capítulo: [32 — Server Components](32-server-components.md)


---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-31">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué prueba un test E2E?</p>
<button class="quiz-option" data-opt="a">A) Una función aislada</button>
<button class="quiz-option" data-opt="b">B) La app completa desde el navegador</button>
<button class="quiz-option" data-opt="c">C) Un componente</button>
</div>
<div class="quiz-question" data-answer="b">
<p><strong>2.</strong> ¿Qué herramienta es recomendada en 2026 para E2E?</p>
<button class="quiz-option" data-opt="a">A) Selenium</button>
<button class="quiz-option" data-opt="b">B) Playwright</button>
<button class="quiz-option" data-opt="c">C) Puppeteer</button>
</div>
<div class="quiz-question" data-answer="b">
<p><strong>3.</strong> ¿Qué es un test flaky?</p>
<button class="quiz-option" data-opt="a">A) Un test que falla siempre</button>
<button class="quiz-option" data-opt="b">B) Un test que a veces pasa y a veces falla</button>
<button class="quiz-option" data-opt="c">C) Un test que no se ejecuta</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2031%3A%20Testing%20E2E&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F31-testing-e2e%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F31-testing-e2e%2F" target="_blank" rel="noopener">LinkedIn</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/31-testing-e2e/" aria-label="Copiar enlace">Copiar enlace</button>
</div>
