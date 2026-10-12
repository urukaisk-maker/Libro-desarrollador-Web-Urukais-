# Ejercicios resueltos — Capítulo 15

[Volver al índice](index.md) · [Capítulo original](../capitulos/15-typescript.md)

## Ejercicio 1: Función tipada

> Convierte una función JavaScript sin tipos a TypeScript con parámetros y retorno tipados.

### Antes

```javascript
function sumar(a, b) {
  return a + b;
}
```

### Solución

```typescript
function sumar(a: number, b: number): number {
  return a + b;
}

// Con parámetros opcionales
function saludar(nombre: string, saludo?: string): string {
  return `${saludo ?? 'Hola'}, ${nombre}`;
}

// Arrow function tipada
const multiplicar = (a: number, b: number): number => a * b;
```

---

## Ejercicio 2: Interface Producto

> Crea una interface `Producto` con `id`, `nombre`, `precio` y `categorias` (array).

### Solución

```typescript
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categorias: string[];
  descripcion?: string; // opcional
  readonly creado: Date; // no modificable
}

const camiseta: Producto = {
  id: 1,
  nombre: 'Camiseta',
  precio: 29.99,
  categorias: ['ropa', 'hombre'],
  creado: new Date(),
};
```

---

## Ejercicio 3: Genérico `ultimo`

> Escribe una función genérica `ultimo<T>(array: T[]): T | undefined`.

### Solución

```typescript
function ultimo<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}

ultimo([1, 2, 3]); // number | undefined → 3
ultimo(['a', 'b']); // string | undefined → 'b'
ultimo([{ id: 1 }, { id: 2 }]); // { id: number } | undefined
```

---

## Ejercicio 4: Type unión `Resultado`

> Define un type unión `Resultado`.

### Solución

```typescript
type Resultado =
  | { ok: true; datos: string }
  | { ok: false; error: string };

function procesar(resultado: Resultado) {
  if (resultado.ok) {
    console.log('Datos:', resultado.datos); // TS sabe que es { ok: true, datos }
  } else {
    console.error('Error:', resultado.error); // TS sabe que es { ok: false, error }
  }
}
```

---

## Ejercicio 5: `Partial<Producto>`

> Usa `Partial<Producto>` para escribir una función `actualizarProducto`.

### Solución

```typescript
function actualizarProducto(
  id: number,
  cambios: Partial<Producto>
): Producto {
  const producto = obtenerProducto(id);

  return {
    ...producto,
    ...cambios,
    id: producto.id, // el id no se puede cambiar
  };
}

// Uso: solo pasas los campos que cambian
actualizarProducto(1, { precio: 24.99 });
actualizarProducto(2, { nombre: 'Nuevo nombre', categorias: ['oferta'] });
```

---

## Ejercicio 6: Clase Carrito

> Escribe una clase `Carrito` con métodos `añadir`, `total` y `vaciar`.

### Solución

```typescript
interface Item {
  nombre: string;
  precio: number;
}

class Carrito {
  private items: Item[] = [];

  añadir(item: Item): void {
    this.items.push(item);
  }

  total(): number {
    return this.items.reduce((sum, item) => sum + item.precio, 0);
  }

  vaciar(): void {
    this.items = [];
  }

  get cantidad(): number {
    return this.items.length;
  }
}

const carrito = new Carrito();
carrito.añadir({ nombre: 'Camiseta', precio: 29.99 });
carrito.añadir({ nombre: 'Pantalón', precio: 49.99 });

console.log(carrito.total()); // 79.98
console.log(carrito.cantidad); // 2
```

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/15-typescript.md)
