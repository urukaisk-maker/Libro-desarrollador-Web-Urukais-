# 15 — TypeScript

!!! quote "Ejercicio resuelto"
    Practica tipos, interfaces y genéricos.

---

## 🎯 Objetivo

Crea una función \`identidad<T>\` que:

1. Reciba cualquier tipo.
2. Devuelva el mismo tipo.
3. Use genéricos.

---

## 💡 Solución

\`\`\`typescript
function identidad<T>(valor: T): T {
  return valor;
}

// Uso
const texto = identidad<string>("hola");
const numero = identidad<number>(42);
const objeto = identidad({ nombre: "Ana", edad: 30 });

console.log(texto.toUpperCase()); // "HOLA"
console.log(numero.toFixed(2));   // "42.00"
\`\`\`

---

## 🧠 Conceptos clave

- \`<T>\`: parámetro de tipo genérico.
- TypeScript infiere el tipo automáticamente en muchos casos.
- Los genéricos permiten reutilizar funciones sin perder tipado.

---

## 🚀 Retos extra

- [ ] Crea un tipo \`Respuesta<T>\` con \`data\` y \`error\`.
- [ ] Crea una función \`primero<T>(arr: T[]): T | undefined\`.
- [ ] Usa \`Partial<Usuario>\` para hacer un tipo con todas las propiedades opcionales.

---

[← Ejercicio 14](14-accesibilidad.md){ .md-button }
[Volver al índice](index.md){ .md-button .md-button--primary }
