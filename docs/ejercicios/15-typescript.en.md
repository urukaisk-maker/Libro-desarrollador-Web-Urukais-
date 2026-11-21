---
description: "Solved exercise 15: 15 — TypeScript. Step-by-step annotated solution from the Web Developer's Book."
---
# 15 — TypeScript

!!! quote "Solved exercise"
    Practice types, interfaces, and generics.

---

## 🎯 Goal

Create a function `identidad<T>` that:

1. Accepts any type.
2. Returns the same type.
3. Uses generics.

---

## 💡 Solution

```typescript
function identidad<T>(valor: T): T {
  return valor;
}

// Usage
const texto = identidad<string>("hola");
const numero = identidad<number>(42);
const objeto = identidad({ nombre: "Ana", edad: 30 });

console.log(texto.toUpperCase()); // "HOLA"
console.log(numero.toFixed(2));   // "42.00"
```

---

## 🧠 Key Concepts

- `<T>`: generic type parameter.
- TypeScript infers the type automatically in many cases.
- Generics let you reuse functions without losing type safety.

---

## 🚀 Extra Challenges

- [ ] Create a `Respuesta<T>` type with `data` and `error`.
- [ ] Create a function `primero<T>(arr: T[]): T | undefined`.
- [ ] Use `Partial<Usuario>` to create a type with all properties optional.

---

[← Exercise 14](14-accesibilidad.md){ .md-button }
[Back to index](index.md){ .md-button .md-button--primary }