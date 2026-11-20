---
description: "Solved exercise 16: 16 — Testing. Step-by-step annotated solution from the Web Developer's Book."
---
# 16 — Testing

!!! quote "Solved exercise"
    Practice unit testing with Vitest.

---

## 🎯 Goal

Write tests for a function `esPar(n)` that returns `true` if `n` is even.

---

## 💡 Solution

```javascript
// esPar.js
export function esPar(n) {
  return n % 2 === 0;
}
```

```javascript
// esPar.test.js
import { describe, it, expect } from 'vitest';
import { esPar } from './esPar.js';

describe('esPar', () => {
  it('returns true for 2', () => {
    expect(esPar(2)).toBe(true);
  });

  it('returns false for 3', () => {
    expect(esPar(3)).toBe(false);
  });

  it('returns true for 0', () => {
    expect(esPar(0)).toBe(true);
  });

  it('returns true for negative even numbers', () => {
    expect(esPar(-4)).toBe(true);
  });
});
```

```bash
npx vitest run
```

---

## 🧠 Key Concepts

- `describe`: groups tests together.
- `it`: defines a test case.
- `expect(...).toBe(...)`: assertion.
- Edge cases: `0`, negative numbers.

---

## 🚀 Extra Challenges

- [ ] Add a test for `null` and `undefined`.
- [ ] Use `toThrow` for a function that throws an error.
- [ ] Measure coverage with `npx vitest run --coverage`.

---

[← Exercise 15](15-typescript.md){ .md-button }
[Go to exercise 17 →](17-rendimiento.md){ .md-button .md-button--primary }