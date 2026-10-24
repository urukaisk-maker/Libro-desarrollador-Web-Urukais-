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



---

## ⚡ Testing moderno con Vitest

**Vitest** es el framework de testing que se ha convertido en el estándar para proyectos con Vite. Es rápido, compatible con la API de Jest, y funciona sin configuración.

### Instalación

~~~bash
npm install -D vitest @testing-library/dom @testing-library/user-event jsdom
~~~

### Configuración básica (`vite.config.js`)

~~~javascript
import { defineConfig } from "vite";

export default defineConfig({
    test: {
        environment: "jsdom",   // simula el DOM del navegador
        globals: true,          // describe, it, expect sin importar
        coverage: {
            provider: "v8",
            reporter: ["text", "html"],
        },
    },
});
~~~

### Tu primer test con Vitest

~~~javascript
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
        expect(sumar(-1, -2)).toBe(-3);
    });

    it("suma cero", () => {
        expect(sumar(0, 5)).toBe(5);
    });
});
~~~

Ejecuta:

~~~bash
npx vitest          # modo watch
npx vitest run      # una sola vez (CI)
npx vitest --ui     # interfaz gráfica
~~~

!!! tip "Vitest vs Jest"
    Vitest es **mucho más rápido** que Jest en proyectos Vite (no transpila con Babel). La API es casi idéntica, así que migrar es trivial. Si empiezas un proyecto nuevo con Vite, usa Vitest.

---

## 🧪 Testing de componentes con Testing Library

**Testing Library** es la librería estándar para testear componentes desde el punto de vista del usuario. No testea implementación, testea **comportamiento**.

### Ejemplo con DOM puro

~~~javascript
// contador.js
export function crearContador(container) {
    let n = 0;
    const boton = document.createElement("button");
    const display = document.createElement("span");

    boton.textContent = "Incrementar";
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
    it("incrementa al hacer clic", async () => {
        const container = document.createElement("div");
        crearContador(container);
        document.body.appendChild(container);

        const boton = screen.getByRole("button", { name: /incrementar/i });
        expect(screen.getByText("0")).toBeTruthy();

        await userEvent.click(boton);
        expect(screen.getByText("1")).toBeTruthy();
    });
});
~~~

### Selectores recomendados (por prioridad)

| Selector | Cuándo usarlo |
| :--- | :--- |
| `getByRole` | ✅ **Primero** (botones, enlaces, headings) |
| `getByLabelText` | Formularios con label |
| `getByPlaceholderText` | Inputs sin label (menos accesible) |
| `getByText` | Texto visible |
| `getByTestId` | Cuando no hay otra opción (último recurso) |

!!! warning "No testees implementación"
    ❌ `expect(component.state.count).toBe(1)` — testea el estado interno.  
    ✅ `expect(screen.getByText("1")).toBeTruthy()` — testea lo que ve el usuario.  
    Si cambias el estado interno pero el comportamiento es el mismo, el test no debe romperse.

---

## 🎭 Mocking: simular dependencias

**Mockear** es sustituir una dependencia real (API, base de datos, módulo) por una falsa controlada. Es clave para testear sin depender de servicios externos.

### Mock de funciones con `vi.fn()`

~~~javascript
import { vi, describe, it, expect } from "vitest";

const enviarEmail = vi.fn(() => Promise.resolve({ ok: true }));

describe("registro", () => {
    it("envía email al registrar usuario", async () => {
        await registrarUsuario({ email: "ana@example.com" }, enviarEmail);

        expect(enviarEmail).toHaveBeenCalledTimes(1);
        expect(enviarEmail).toHaveBeenCalledWith("ana@example.com");
    });
});
~~~

### Mock de módulos con `vi.mock()`

~~~javascript
import { vi, describe, it, expect } from "vitest";

// Mockear el módulo completo antes de importar el que lo usa
vi.mock("./api.js", () => ({
    obtenerUsuario: vi.fn(() => Promise.resolve({ id: 1, nombre: "Ana" })),
}));

import { obtenerUsuario } from "./api.js";
import { cargarPerfil } from "./perfil.js";

describe("perfil", () => {
    it("carga el perfil del usuario", async () => {
        const perfil = await cargarPerfil(1);
        expect(perfil.nombre).toBe("Ana");
        expect(obtenerUsuario).toHaveBeenCalledWith(1);
    });
});
~~~

### Mock de fetch (API real)

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

it("obtiene el usuario de la API", async () => {
    const user = await fetchUsuario(1);
    expect(user.nombre).toBe("Ana");
    expect(fetch).toHaveBeenCalledWith("/api/usuarios/1");
});
~~~

!!! tip "Mockea lo mínimo necesario"
    Mockear todo hace tests frágiles. Mockea solo lo que sea **lento**, **caro** o **no determinista** (APIs, fechas, `Math.random`, `localStorage`).

---

## 📊 Cobertura de tests

La **cobertura** mide qué porcentaje del código ejecutan tus tests. No es una métrica perfecta (100% cobertura no significa 0 bugs), pero ayuda a detectar zonas sin testear.

~~~bash
npx vitest run --coverage
~~~

Salida típica:



### Umbrales recomendados

| Proyecto | Cobertura mínima |
| :--- | :--- |
| Prototipo | 30-50% |
| Proyecto personal | 60-70% |
| Producción | 80%+ |
| Librería | 90%+ |

!!! warning "La cobertura no lo es todo"
    Un test puede ejecutar una línea y no comprobar nada. La cobertura mide **ejecución**, no **calidad**. Combínala con tests que verifiquen comportamiento real.

---

## 🧠 Quiz de repaso

!!! question "Comprueba lo aprendido"

??? success "1. ¿Qué ventaja tiene Vitest sobre Jest?"
    Es **mucho más rápido** en proyectos con Vite (no transpila con Babel) y su API es casi idéntica a Jest, así que migrar es trivial.

??? success "2. ¿Por qué `getByRole` es el selector recomendado?"
    Porque testea desde el punto de vista del usuario y verifica **accesibilidad**. Si un botón tiene `role="button"` y nombre accesible, es usable por lectores de pantalla.

??? success "3. ¿Qué es mockear y cuándo hacerlo?"
    Sustituir una dependencia real por una falsa controlada. Se hace con dependencias **lentas** (APIs), **caras** (servicios de pago) o **no deterministas** (fechas, `Math.random`).

??? success "4. ¿Qué significa 100% de cobertura?"
    Que tus tests **ejecutan** todas las líneas del código. No significa que no haya bugs: un test puede ejecutar una línea sin comprobar su resultado.

---

## 📚 Recursos

- [Vitest — Docs oficiales](https://vitest.dev/)
- [Testing Library — Docs](https://testing-library.com/docs/)
- [Testing Library — Prioridad de selectores](https://testing-library.com/docs/queries/about/#priority)
- [Vitest — Mocking](https://vitest.dev/guide/mocking.html)
- [Kent C. Dodds — Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)
- [web.dev — Learn Testing](https://web.dev/learn/testing)

---

➡️ Siguiente capítulo: [17 — Rendimiento web](17-rendimiento.md)
