# Ejercicios resueltos — Capítulo 4

[Volver al índice](index.md) · [Capítulo original](../capitulos/04-javascript.md)

## Ejercicio 1: Botón que cambia el color de fondo

> Crea un botón que cambie el color de fondo del `body`.

### Solución

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Cambiar fondo</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      transition: background-color 300ms ease;
      padding: 2rem;
    }
    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      background: #6a5acd;
      color: white;
      cursor: pointer;
      font-size: 1rem;
    }
  </style>
</head>
<body>
  <button id="btn">Cambiar fondo</button>

  <script>
    const colores = ['#f8fafc', '#fef3c7', '#dbeafe', '#fce7f3', '#dcfce7'];
    let indice = 0;

    const btn = document.getElementById('btn');

    btn.addEventListener('click', () => {
      indice = (indice + 1) % colores.length;
      document.body.style.backgroundColor = colores[indice];
    });
  </script>
</body>
</html>
```

**Explicación:**

- Array de colores → alterna entre ellos con cada clic.
- `% colores.length` → reinicia al principio cuando llegue al final.
- `transition` en CSS → hace que el cambio sea suave.

---

## Ejercicio 2: Mensaje con prompt

> Muestra un mensaje con el nombre del usuario usando `prompt()`.

### Solución

```javascript
const nombre = prompt('¿Cómo te llamas?');

if (nombre) {
  alert(`¡Hola, ${nombre}! Bienvenido al libro.`);
} else {
  alert('No has escrito tu nombre.');
}
```

**Explicación:**

- `prompt()` → abre un cuadro de diálogo pidiendo texto.
- Devuelve `null` si el usuario cancela.
- Comprobamos con `if (nombre)` antes de usarlo.

!!! warning "`prompt()` es intrusivo"
    En proyectos reales, `prompt()` molesta al usuario. Usa un formulario o un modal propio.

---

## Ejercicio 3: Suma de un array

> Recorre un array de números y muestra la suma en consola.

### Solución

```javascript
const numeros = [5, 10, 15, 20, 25];

// Opción 1: bucle tradicional
let suma = 0;
for (let i = 0; i < numeros.length; i++) {
  suma += numeros[i];
}
console.log('Suma (for):', suma);

// Opción 2: forEach
let suma2 = 0;
numeros.forEach(n => suma2 += n);
console.log('Suma (forEach):', suma2);

// Opción 3: reduce (la más elegante)
const suma3 = numeros.reduce((acc, n) => acc + n, 0);
console.log('Suma (reduce):', suma3);
```

**Explicación:**

- **for clásico**: útil para controlar el índice.
- **forEach**: más limpio cuando solo recorres.
- **reduce**: la forma idiomática de acumular.

`reduce((acc, n) => acc + n, 0)` significa: empieza con `0`, y por cada número ve sumando.

---

## Ejercicio 4: Filtrar números pares

> Filtra los números pares de un array y muéstralos.

### Solución

```javascript
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const pares = numeros.filter(n => n % 2 === 0);
console.log(pares); // [2, 4, 6, 8, 10]

// Versión con map para multiplicar los pares
const dobles = pares.map(n => n * 2);
console.log(dobles); // [4, 8, 12, 16, 20]
```

**Explicación:**

- `filter()` → devuelve un nuevo array con los elementos que cumplen la condición.
- `n % 2 === 0` → el resto de dividir entre 2 es 0 → par.
- `map()` → transforma cada elemento.

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/04-javascript.md)
