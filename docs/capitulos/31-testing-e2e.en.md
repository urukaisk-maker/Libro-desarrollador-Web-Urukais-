---
description: "Chapter 31 of the Web Developer's Book: 31 — E2E Testing. Learn step by step with examples, exercises, and quizzes."
---
# 31 — E2E Testing

!!! abstract "What you will learn"
    - What an End-to-End test is and how it differs from unit and integration tests.
    - Main tools: Playwright, Cypress, Selenium.
    - How to write your first E2E test.
    - Patterns: Page Object Model, fixtures, waits.
    - When to use E2E and when NOT to.

---

## 🎯 What is an E2E Test?

An **End-to-End** (E2E) test simulates a **real user** interacting with your application: it opens the browser, clicks, types, navigates, and verifies that the outcome matches expectations.

!!! quote "The test driver analogy"
    A unit test is like inspecting every car part in isolation. An E2E test is like **putting a test driver behind the wheel** for a full road lap: it verifies everything works together under real conditions.

~~~mermaid
graph LR
    A[E2E Test] --> B[Opens browser]
    B --> C[Navigates to app]
    C --> D[Interacts: click, keyboard, scroll]
    D --> E[Verifies results]
    E --> F[✅ Passes / ❌ Fails]
~~~

---

## 🏛 E2E vs. Unit vs. Integration

| Type | What It Tests | Speed | Cost | Example |
| :--- | :--- | :--- | :--- | :--- |
| **Unit** | A single function or isolated component | ⚡ Very fast (ms) | Low | `sum(2,2) === 4` |
| **Integration** | Multiple modules working together | 🚀 Fast (100ms) | Medium | API + DB + service |
| **E2E** | The **full** app from the browser | 🐢 Slow (seconds) | High | Login → cart → checkout |

!!! tip "The testing pyramid"
    **Many unit tests, some integration tests, few E2E tests**. E2E tests are slow and fragile; reserve them for **critical flows**: login, checkout, signup, payment.

---

## 🛠 Main Tools

| Tool | Language | Speed | Cross-Browser | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Playwright** | JS/TS, Python, C#, Java | ⚡ Very fast | ✅ Chromium, Firefox, WebKit | Microsoft, very active |
| **Cypress** | JS/TS | 🚀 Fast | ⚠ Chromium only (Firefox experimental) | Great DX, popular |
| **Selenium** | Multiple | 🐢 Slow | ✅ All | The classic, more verbose |
| **Puppeteer** | JS/TS | 🚀 Fast | ⚠ Chromium only | Chrome/Edge only |
| **WebdriverIO** | JS/TS | 🐢 Medium | ✅ All | Built on WebDriver |

!!! tip "2026 Recommendation"
    **Playwright** if you need cross-browser support or fast CI runs. **Cypress** if you prioritize DX and only care about Chromium. **Selenium** only for legacy systems or very old browsers.

---

## 📝 Your First Test with Playwright

### Installation

~~~bash
npm init playwright@latest
~~~

Choose TypeScript, `tests/` folder, and GitHub Actions if you want CI.

### Basic Test

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

### Running Tests

~~~bash
npx playwright test
npx playwright test --headed        # show the browser
npx playwright test --ui             # interactive mode
npx playwright show-report           # view HTML report
~~~

---

## 🧩 Key Patterns

### 1. Page Object Model (POM)

Encapsulates interactions with a page inside a class. Avoids duplicating selectors across tests.

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

Playwright injects `page`, `context`, and `browser` automatically. You can define custom fixtures:

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

### 3. Auto-Waits

Playwright **automatically waits** for elements to be visible, enabled, and actionable. **Never use `sleep()`**.

~~~javascript
// ✅ Playwright waits on its own
await page.click('button[type="submit"]');

// ❌ Don't do this
await page.waitForTimeout(2000);
~~~

### 4. Recommended Selectors

| Selector | When to Use It |
| :--- | :--- |
| `getByRole('button', { name: 'Enviar' })` | ✅ **Recommended** (accessible and resilient) |
| `getByLabel('Email')` | Form inputs with a label |
| `getByText('Bienvenido')` | Visible text |
| `getByTestId('login-btn')` | When there's no clear role/label |
| `locator('css=.btn-primary')` | CSS (more brittle) |

!!! tip "Use `getByRole` first"
    Selectors based on **accessible role** (`getByRole`) are the most resilient: they survive class, ID, or markup changes, while also checking accessibility.

---

## 🏗 Example: Checkout Flow

~~~javascript
import { test, expect } from "@playwright/test";

test("checkout completo", async ({ page }) => {
    // 1. Login
    await page.goto("/login");
    await page.getByLabel("Email").fill("user@example.com");
    await page.getByLabel("Contraseña").fill("secreto123");
    await page.getByRole("button", { name: "Entrar" }).click();

    // 2. Add to cart
    await page.goto("/productos");
    await page.getByRole("button", { name: "Añadir al carrito" }).first().click();

    // 3. Go to cart
    await page.getByRole("link", { name: "Carrito" }).click();
    await expect(page.getByText("Teclado mecánico")).toBeVisible();

    // 4. Checkout
    await page.getByRole("button", { name: "Pagar" }).click();
    await page.getByLabel("Tarjeta").fill("4242424242424242");
    await page.getByLabel("Caducidad").fill("12/30");
    await page.getByLabel("CVC").fill("123");
    await page.getByRole("button", { name: "Confirmar pago" }).click();

    // 5. Verify
    await expect(page.getByText("Pago exitoso")).toBeVisible();
});
~~~

---

## ⚠ When NOT to Use E2E

| Case | Why |
| :--- | :--- |
| Complex business logic | Better covered by fast unit tests |
| Form validations | Validator unit tests |
| Isolated components | Storybook + component tests |
| Performance | Use Lighthouse or k6, not E2E |
| Every commit | E2E is slow; in CI run in parallel or on PRs only |

!!! warning "Fragile E2E = ignored E2E"
    An E2E test that fails randomly (flaky) is **worse than having no test**: the team learns to ignore failures. Invest in stability: resilient selectors, auto-waits, isolated test data.

---

## 🚀 E2E in CI

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

**CI best practices:**
- Run in **parallel** (`--workers=4`).
- **Retry** suspicious failures (`--retries=2`).
- Upload the **HTML report** as an artifact on failure.
- Cache Playwright dependencies.

---

## 🧪 Hands-On Exercise

!!! example "Login test with 3 cases"
    Write E2E tests for an app's login flow covering:

    - **Case 1:** valid credentials → redirects to `/dashboard`.
    - **Case 2:** wrong password → shows "Credenciales inválidas".
    - **Case 3:** empty email → button is disabled or shows an error.

??? success "Solution"
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

!!! question "Check what you learned"

??? success "1. What is the difference between a unit test and an E2E test?"
    Unit: tests an isolated function or component, milliseconds. E2E: tests the full app from the browser, seconds or minutes.

??? success "2. What is the general recommendation (testing pyramid)?"
    Many unit tests, some integration tests, few E2E tests. E2E only for critical flows.

??? success "3. What is the Page Object Model?"
    A pattern that encapsulates page interactions in a class, avoiding duplicate selectors and making maintenance easier.

??? success "4. Why shouldn't you use `sleep()` or `waitForTimeout()` in Playwright?"
    Because Playwright already waits automatically for elements to be ready. Fixed sleeps make tests slow and brittle.

??? success "5. What is a "flaky" test?"
    A test that sometimes passes and sometimes fails with no code changes. Worse than no test, because it teaches the team to ignore failures.

---

## 📚 Resources

- [Playwright — Docs oficiales](https://playwright.dev/)
- [Cypress — Docs oficiales](https://docs.cypress.io/)
- [Selenium — Docs](https://www.selenium.dev/documentation/)
- [Testing Library — Guía de selectores](https://testing-library.com/docs/queries/about/#priority)
- [web.dev — Testing](https://web.dev/learn/testing)
- [Test Pyramid — Martin Fowler](https://martinfowler.com/articles/practical-test-pyramid.html)

---

➡ Next chapter: [32 — Server Components](32-server-components.md)


---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-31">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> What does an E2E test verify?</p>
<button class="quiz-option" data-opt="a">A) An isolated function</button>
<button class="quiz-option" data-opt="b">B) The full app from the browser</button>
<button class="quiz-option" data-opt="c">C) A single component</button>
</div>
<div class="quiz-question" data-answer="b">
<p><strong>2.</strong> Which tool is recommended in 2026 for E2E?</p>
<button class="quiz-option" data-opt="a">A) Selenium</button>
<button class="quiz-option" data-opt="b">B) Playwright</button>
<button class="quiz-option" data-opt="c">C) Puppeteer</button>
</div>
<div class="quiz-question" data-answer="b">
<p><strong>3.</strong> What is a flaky test?</p>
<button class="quiz-option" data-opt="a">A) A test that always fails</button>
<button class="quiz-option" data-opt="b">B) A test that sometimes passes and sometimes fails</button>
<button class="quiz-option" data-opt="c">C) A test that never runs</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2031%3A%20E2E%20Testing&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F31-testing-e2e%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F31-testing-e2e%2F" target="_blank" rel="noopener">LinkedIn</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/31-testing-e2e/" aria-label="Copy link">Copy link</button>
</div>