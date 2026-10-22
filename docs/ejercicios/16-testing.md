# 16 — Testing

!!! quote "Ejercicio resuelto"
    Practica testing unitario con Vitest.

---

## 🎯 Objetivo

Escribe tests para una función \`esPar(n)\` que devuelve \`true\` si \`n\` es par.

---

## 💡 Solución

\`\`\`javascript
// esPar.js
export function esPar(n) {
  return n % 2 === 0;
}
\`\`\`

\`\`\`javascript
// esPar.test.js
import { describe, it, expect } from 'vitest';
import { esPar } from './esPar.js';

describe('esPar', () => {
  it('devuelve true para 2', () => {
    expect(esPar(2)).toBe(true);
  });

  it('devuelve false para 3', () => {
    expect(esPar(3)).toBe(false);
  });

  it('devuelve true para 0', () => {
    expect(esPar(0)).toBe(true);
  });

  it('devuelve true para números negativos pares', () => {
    expect(esPar(-4)).toBe(true);
  });
});
\`\`\`

\`\`\`bash
npx vitest run
\`\`\`

---

## 🧠 Conceptos clave

- \`describe\`: agrupa tests.
- \`it\`: define un test.
- \`expect(...).toBe(...)\`: aserción.
- Casos límite: 0, negativos.

---

## 🚀 Retos extra

- [ ] Añade un test para \`null\` y \`undefined\`.
- [ ] Usa \`toThrow\` para una función que lance error.
- [ ] Mide la cobertura con \`npx vitest run --coverage\`.

---

[← Ejercicio 15](15-typescript.md){ .md-button }
[Ir al ejercicio 17 →](17-rendimiento.md){ .md-button .md-button--primary }
