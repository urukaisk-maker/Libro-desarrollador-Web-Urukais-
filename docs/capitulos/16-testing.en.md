---
description: "Chapter 16 of the Web Developer's Book: 16 — Frontend Testing. Learn step by step with examples, exercises, and quizzes."
---
# 16 — Frontend Testing

!!! abstract "What you will learn"
    - Why testing matters.
    - Test types: unit, integration, E2E.
    - Vitest: the modern testing framework.
    - Testing Library: testing like a user.
    - Testing best practices.

---

## 🧪 Why Test?

Automated tests let you **change code without fear**. If something breaks, the test warns you before it reaches production.

!!! quote "Tests are your safety net"
    Without tests, every change is a gamble. With tests, every change is a verification.

---

## 📊 The Testing Pyramid

```
        /\
       /E2E\      <- few, slow, brittle
      /------\
     /Integrat.\  <- some, faster
    /------------\
   /     Unit     \ <- many, fast, isolated
  /----------------\
```

| Type | What it tests | Speed | Volume |
| :--- | :--- | :--- | :--- |
| **Unit** | A single function or isolated component | ⚡ Very fast | Many |
| **Integration** | Multiple modules working together | 🚀 Fast | Some |
| **E2E** | The full app in a real browser | 🐢 Slow | Few |

---

## ⚡ Vitest

**Vitest** is the modern testing framework built on Vite. It is blazing fast and compatible with the Jest API.

```bash
npm install -D vitest
```

### Your First Test

```javascript
// sumar.js
export function sumar(a, b) {
  return a + b;
}

// sumar.test.js
import { describe, it, expect } from "vitest";
import { sumar } from "./sumar.js";

describe("sumar", () => {
  it("adds two positive numbers", () => {
    expect(sumar(2, 3)).toBe(5);
  });

  it("adds negative numbers", () => {
    expect(sumar(-2, -3)).toBe(-5);
  });

  it("adds zero", () => {
    expect(sumar(0, 5)).toBe(5);
  });
});
```

### Running Tests

```bash
npx vitest          # watch mode
npx vitest run      # single run
npx vitest --coverage # with coverage
```

---

## 🎯 Most Used Matchers

| Matcher | What it checks |
| :--- | :--- |
| `toBe(value)` | Strict equality (===) |
| `toEqual(value)` | Deep equality (objects, arrays) |
| `toBeTruthy()` | Truthy value |
| `toBeFalsy()` | Falsy value |
| `toContain(item)` | Array or string contains item |
| `toThrow()` | Function throws an error |
| `toHaveLength(n)` | Length |
| `toMatch(regex)` | Matches regex |

---

## 🧩 Testing Library

**Testing Library** helps you test components **like a real user**, not like a programmer.

```bash
npm install -D @testing-library/dom @testing-library/user-event
```

```javascript
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

// Your component HTML
document.body.innerHTML = `
  <button id="btn">Click me</button>
  <p id="resultado">0</p>
`;

let clicks = 0;
document.getElementById("btn").addEventListener("click", () => {
  clicks++;
  document.getElementById("resultado").textContent = clicks;
});

// Test
const btn = screen.getByText("Click me");
await userEvent.click(btn);
expect(screen.getByText("1")).toBeTruthy();
```

!!! tip "Test like a user"
    Don't test implementation details (variable names, DOM structure). Test what the user sees and does: text, roles, clicks.

---

## 🎭 E2E Testing with Playwright

**Playwright** lets you automate a real browser: open pages, click, fill forms, and verify results.

```bash
npm install -D @playwright/test
npx playwright install
```

```javascript
// tests/ejemplo.spec.js
import { test, expect } from "@playwright/test";

test("login flow", async ({ page }) => {
  await page.goto("[https://mi-app.com/login](https://mi-app.com/login)");
  await page.fill("#email", "ana@ejemplo.com");
  await page.fill("#password", "12345678");
  await page.click("button[type=submit]");
  await expect(page).toHaveURL("[https://mi-app.com/dashboard](https://mi-app.com/dashboard)");
  await expect(page.locator("h1")).toContainText("Welcome");
});
```

### Running Tests

```bash
npx playwright test
npx playwright test --ui
npx playwright show-report
```

!!! tip "Playwright vs. Cypress"
    Both are great. Playwright supports more browsers (Chromium, Firefox, WebKit), is faster, and has a better API for parallel testing. Cypress has a nicer DX for visual debugging.

---

## ✅ Testing Best Practices

- ✅ **Test behavior, not implementation**. If you refactor and tests fail, they are poorly written.
- ✅ **One test, one thing**. If a test checks 5 things, when it fails you won't know what broke.
- ✅ **Descriptive names**. `"should add two positive numbers"` is better than `"test 1"`.
- ✅ **Follow the AAA pattern**: Arrange, Act, Assert.
- ✅ **Test edge cases**: empty, null, undefined, negative, very large.
- ✅ **Don't test the library**. Don't test that `Array.push` works.
- ❌ **Don't chase 100% coverage**. 80% done well is worth more than 100% done poorly.

---

## 📊 Test Coverage

```bash
npx vitest run --coverage
```

| Metric | What it measures |
| :--- | :--- |
| **Statements** | Executed statements |
| **Branches** | Covered if/else branches |
| **Functions** | Called functions |
| **Lines** | Covered lines |

!!! warning "Coverage isn't everything"
    100% coverage does not mean good tests. You can have a test that runs a line without asserting its result.

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-16">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> Which type of test is fastest?</p>
<button class="quiz-option" data-opt="a">A) E2E</button>
<button class="quiz-option" data-opt="b">B) Unit</button>
<button class="quiz-option" data-opt="c">C) Integration</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> Which testing framework is built on Vite?</p>
<button class="quiz-option" data-opt="a">A) Vitest</button>
<button class="quiz-option" data-opt="b">B) Jest</button>
<button class="quiz-option" data-opt="c">C) Mocha</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> Which tool is used for E2E testing?</p>
<button class="quiz-option" data-opt="a">A) Vitest</button>
<button class="quiz-option" data-opt="b">B) Testing Library</button>
<button class="quiz-option" data-opt="c">C) Playwright</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2016%3A%20Frontend%20Testing&url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F16-testing%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F16-testing%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%2016%3A%20Frontend%20Testing%20https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F16-testing%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/16-testing/" aria-label="Copy link">Copy link</button>
</div>

---

## ➡ Next Step

[Go to Chapter 17 — Rendimiento web](17-rendimiento.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }



---

## ⚡ Modern Testing with Vitest

**Vitest** is the testing framework that has become the standard for Vite projects. It is fast, compatible with the Jest API, and works with zero configuration.

### Installation

~~~bash
npm install -D vitest @testing-library/dom @testing-library/user-event jsdom
~~~

### Basic Configuration (`vite.config.js`)

~~~javascript
import { defineConfig } from "vite";

export default defineConfig({
    test: {
        environment: "jsdom",   // simulates browser DOM
        globals: true,          // describe, it, expect without importing
        coverage: {
            provider: "v8",
            reporter: ["text", "html"],
        },
    },
});
~~~

### Your First Test with Vitest

~~~javascript
// sumar.js
export function sumar(a, b) {
    return a + b;
}

// sumar.test.js
import { describe, it, expect } from "vitest";
import { sumar } from "./sumar.js";

describe("sumar", () => {
    it("adds two positive numbers", () => {
        expect(sumar(2, 3)).toBe(5);
    });

    it("adds negative numbers", () => {
        expect(sumar(-1, -2)).toBe(-3);
    });

    it("adds zero", () => {
        expect(sumar(0, 5)).toBe(5);
    });
});
~~~

Run it:

~~~bash
npx vitest          # watch mode
npx vitest run      # single run (CI)
npx vitest --ui     # graphical UI
~~~

!!! tip "Vitest vs. Jest"
    Vitest is **much faster** than Jest in Vite projects (it doesn't transpile with Babel). The API is nearly identical, so migrating is trivial. If you start a new project with Vite, use Vitest.

---

## 🧪 Component Testing with Testing Library

**Testing Library** is the standard library for testing components from the user's perspective. It doesn't test implementation, it tests **behavior**.

### Plain DOM Example

~~~javascript
// contador.js
export function crearContador(container) {
    let n = 0;
    const boton = document.createElement("button");
    const display = document.createElement("span");

    boton.textContent = "Increment";
    display.textContent = n;
    boton.addEventListener("click", () => {
        n++;
        display.textContent = n;
    });

    container.appendChild(boton);
    container.appendChild(display);
}

// contador.test.js
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { crearContador } from "./contador.js";

describe("contador", () => {
    it("increments on click", async () => {
        const container = document.createElement("div");
        crearContador(container);
        document.body.appendChild(container);

        const boton = screen.getByRole("button", { name: /increment/i });
        expect(screen.getByText("0")).toBeTruthy();

        await userEvent.click(boton);
        expect(screen.getByText("1")).toBeTruthy();
    });
});
~~~

### Recommended Queries (By Priority)

| Query | When to use it |
| :--- | :--- |
| `getByRole` | ✅ **First** (buttons, links, headings) |
| `getByLabelText` | Forms with labels |
| `getByPlaceholderText` | Inputs without labels (less accessible) |
| `getByText` | Visible text |
| `getByTestId` | When there is no other option (last resort) |

!!! warning "Don't test implementation"
    ❌ `expect(component.state.count).toBe(1)` — tests internal state.
    ✅ `expect(screen.getByText("1")).toBeTruthy()` — tests what the user sees.
    If you change internal state but behavior stays the same, the test shouldn't break.

---

## 🎭 Mocking: Simulating Dependencies

**Mocking** means replacing a real dependency (API, database, module) with a controlled fake. It is key for testing without relying on external services.

### Mocking Functions with `vi.fn()`

~~~javascript
import { vi, describe, it, expect } from "vitest";

const enviarEmail = vi.fn(() => Promise.resolve({ ok: true }));

describe("registro", () => {
    it("sends email when registering a user", async () => {
        await registrarUsuario({ email: "ana@example.com" }, enviarEmail);

        expect(enviarEmail).toHaveBeenCalledTimes(1);
        expect(enviarEmail).toHaveBeenCalledWith("ana@example.com");
    });
});
~~~

### Mocking Modules with `vi.mock()`

~~~javascript
import { vi, describe, it, expect } from "vitest";

// Mock the full module before importing the consumer
vi.mock("./api.js", () => ({
    obtenerUsuario: vi.fn(() => Promise.resolve({ id: 1, nombre: "Ana" })),
}));

import { obtenerUsuario } from "./api.js";
import { cargarPerfil } from "./perfil.js";

describe("perfil", () => {
    it("loads user profile", async () => {
        const perfil = await cargarPerfil(1);
        expect(perfil.nombre).toBe("Ana");
        expect(obtenerUsuario).toHaveBeenCalledWith(1);
    });
});
~~~

### Mocking fetch (Real API)

~~~javascript
import { vi, describe, it, expect, beforeEach } from "vitest";

beforeEach(() => {
    global.fetch = vi.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ id: 1, nombre: "Ana" }),
        })
    );
});

it("fetches user from API", async () => {
    const user = await fetchUsuario(1);
    expect(user.nombre).toBe("Ana");
    expect(fetch).toHaveBeenCalledWith("/api/usuarios/1");
});
~~~

!!! tip "Mock the minimum necessary"
    Mocking everything makes tests brittle. Mock only what is **slow**, **expensive**, or **non-deterministic** (APIs, dates, `Math.random`, `localStorage`).

---

## 📊 Test Coverage

**Coverage** measures what percentage of code your tests execute. It isn't a perfect metric (100% coverage doesn't mean 0 bugs), but it helps spot untested areas.

~~~bash
npx vitest run --coverage
~~~

Typical output:



### Recommended Thresholds

| Project | Minimum coverage |
| :--- | :--- |
| Prototype | 30-50% |
| Personal project | 60-70% |
| Production | 80%+ |
| Library | 90%+ |

!!! warning "Coverage isn't everything"
    A test can run a line without asserting anything. Coverage measures **execution**, not **quality**. Combine it with tests that verify real behavior.

---

## 🧠 Review Quiz

!!! question "Check what you learned"

??? success "1. What advantage does Vitest have over Jest?"
    It is **much faster** in Vite projects (no Babel transpilation) and its API is nearly identical to Jest, so migrating is trivial.

??? success "2. Why is `getByRole` the recommended query?"
    Because it tests from the user's perspective and verifies **accessibility**. If a button has `role="button"` and an accessible name, screen readers can use it.

??? success "3. What is mocking and when should you do it?"
    Replacing a real dependency with a controlled fake. Use it for **slow** dependencies (APIs), **expensive** ones (payment services), or **non-deterministic** ones (dates, `Math.random`).

??? success "4. What does 100% coverage mean?"
    That your tests **execute** every line of code. It doesn't mean there are no bugs: a test can execute a line without checking its result.

---

## 📚 Resources

- [Vitest — Official Docs](https://vitest.dev/)
- [Testing Library — Docs](https://testing-library.com/docs/)
- [Testing Library — Query Priority](https://testing-library.com/docs/queries/about/#priority)
- [Vitest — Mocking](https://vitest.dev/guide/mocking.html)
- [Kent C. Dodds — Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)
- [web.dev — Learn Testing](https://web.dev/learn/testing)

---

➡ Next chapter: [17 — Rendimiento web](17-rendimiento.md)