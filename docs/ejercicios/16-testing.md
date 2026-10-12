# Ejercicios resueltos — Capítulo 16

[Volver al índice](index.md) · [Capítulo original](../capitulos/16-testing.md)

## Ejercicio 1: Tests de `formatearPrecio`

> Escribe tests unitarios para una función `formatearPrecio(n)`.

### Solución

```javascript
// precios.js
export function formatearPrecio(n) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(n);
}
```

```javascript
// precios.test.js
import { describe, it, expect } from 'vitest';
import { formatearPrecio } from './precios.js';

describe('formatearPrecio', () => {
  it('formatea un número entero', () => {
    expect(formatearPrecio(10)).toContain('10,00');
  });

  it('formatea decimales', () => {
    expect(formatearPrecio(29.99)).toContain('29,99');
  });

  it('incluye el símbolo del euro', () => {
    expect(formatearPrecio(100)).toContain('€');
  });

  it('maneja el cero', () => {
    expect(formatearPrecio(0)).toContain('0,00');
  });
});
```

---

## Ejercicio 2: Tests de `validarEmail`

> Cubre con Vitest una función `validarEmail(email)`.

### Solución

```javascript
// validacion.js
export function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```

```javascript
// validacion.test.js
import { describe, it, expect } from 'vitest';
import { validarEmail } from './validacion.js';

describe('validarEmail', () => {
  it('acepta emails válidos', () => {
    expect(validarEmail('usuario@ejemplo.com')).toBe(true);
    expect(validarEmail('a.b@sub.dominio.es')).toBe(true);
  });

  it('rechaza emails sin @', () => {
    expect(validarEmail('usuario.com')).toBe(false);
  });

  it('rechaza emails sin dominio', () => {
    expect(validarEmail('usuario@')).toBe(false);
  });

  it('rechaza emails con espacios', () => {
    expect(validarEmail('usuario @ejemplo.com')).toBe(false);
  });

  it('rechaza strings vacíos', () => {
    expect(validarEmail('')).toBe(false);
  });
});
```

---

## Ejercicio 3: Test de formulario con Testing Library

> Rellena y envía un formulario con Testing Library.

### Solución

```html
<form>
  <label for="nombre">Nombre</label>
  <input type="text" id="nombre" required>

  <label for="email">Email</label>
  <input type="email" id="email" required>

  <button type="submit">Enviar</button>
</form>
```

```javascript
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { it, expect, vi } from 'vitest';

it('rellena y envía el formulario', async () => {
  document.body.innerHTML = `
    <form>
      <label for="nombre">Nombre</label>
      <input type="text" id="nombre" required>
      <label for="email">Email</label>
      <input type="email" id="email" required>
      <button type="submit">Enviar</button>
    </form>
  `;

  const enviar = vi.fn();
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    enviar();
  });

  await userEvent.type(screen.getByLabelText('Nombre'), 'Urukais');
  await userEvent.type(screen.getByLabelText('Email'), 'urukaisk@gmail.com');
  await userEvent.click(screen.getByRole('button', { name: 'Enviar' }));

  expect(enviar).toHaveBeenCalledTimes(1);
});
```

---

## Ejercicio 4: Mock de API con MSW

> Mockea una API con MSW y prueba un componente que la consume.

### Solución

```javascript
// mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/usuarios', () => {
    return HttpResponse.json([
      { id: 1, nombre: 'Urukais' },
      { id: 2, nombre: 'Ana' },
    ]);
  }),
];
```

```javascript
// mocks/server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers.js';

export const server = setupServer(...handlers);
```

```javascript
// usuarios.test.js
import { beforeAll, afterAll, afterEach, it, expect } from 'vitest';
import { server } from './mocks/server.js';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('carga la lista de usuarios', async () => {
  const res = await fetch('/api/usuarios');
  const usuarios = await res.json();

  expect(usuarios).toHaveLength(2);
  expect(usuarios[0].nombre).toBe('Urukais');
});
```

---

## Ejercicio 5: Test E2E con Playwright

> Escribe un test E2E para "buscar producto → añadir al carrito".

### Solución

```javascript
// e2e/carrito.spec.js
import { test, expect } from '@playwright/test';

test('buscar producto y añadir al carrito', async ({ page }) => {
  await page.goto('/');

  // Buscar
  await page.getByPlaceholder('Buscar productos').fill('camiseta');
  await page.getByRole('button', { name: 'Buscar' }).click();

  // Ver resultados
  await expect(page.getByText('Camiseta')).toBeVisible();

  // Añadir al carrito
  await page.getByRole('button', { name: 'Añadir al carrito' }).first().click();

  // Verificar contador
  await expect(page.getByTestId('carrito-contador')).toHaveText('1');
});
```

---

## Ejercicio 6: Cobertura

> Configura `npm run test:coverage` y analiza el informe.

### Solución

Instala:

```bash
npm install -D @vitest/coverage-v8
```

Añade a `package.json`:

```json
{
  "scripts": {
    "test:coverage": "vitest run --coverage"
  }
}
```

Configura en `vite.config.js`:

```javascript
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['**/*.test.js', '**/node_modules/**'],
    },
  },
});
```

Ejecuta:

```bash
npm run test:coverage
```

---

## Ejercicio 7: GitHub Action de tests

> Añade un workflow que ejecute los tests en cada PR.

### Solución

`.github/workflows/test.yml`:

```yaml
name: Tests

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run test:run
```

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/16-testing.md)
