# Ejercicios resueltos — Capítulo 18

[Volver al índice](index.md) · [Capítulo original](../capitulos/18-arquitectura.md)

## Ejercicio 1: Reorganizar a feature-first

> Reorganiza un proyecto de `type-first` a `feature-first`.

### Antes (type-first)

```
src/
├── components/
│   ├── Producto.jsx
│   ├── Carrito.jsx
│   └── Perfil.jsx
├── hooks/
│   ├── useProductos.js
│   └── useCarrito.js
├── api/
│   ├── productos.js
│   └── carrito.js
└── utils/
    └── formato.js
```

### Solución (feature-first)

```
src/
├── features/
│   ├── productos/
│   │   ├── components/
│   │   │   └── Producto.jsx
│   │   ├── hooks/
│   │   │   └── useProductos.js
│   │   ├── api.js
│   │   └── index.js
│   ├── carrito/
│   │   ├── components/
│   │   │   └── Carrito.jsx
│   │   ├── hooks/
│   │   │   └── useCarrito.js
│   │   └── index.js
│   └── perfil/
│       └── components/
│           └── Perfil.jsx
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
│       └── formato.js
└── app/
    ├── rutas.js
    └── layouts/
```

**Regla de oro**: `shared/` no puede importar nada de `features/`.

---

## Ejercicio 2: Clasificar estados

> Identifica tres estados en tu app y clasifícalos.

### Solución

| Estado | Tipo | Dónde va |
|---|---|---|
| Menú abierto/cerrado | Local | `useState` del componente |
| Usuario logueado | Global | Context o store |
| Lista de productos desde API | Servidor | React Query / SWR |

**Regla**: empieza local, sube solo si es necesario.

---

## Ejercicio 3: React Query para estado del servidor

> Sustituye un store global con estado del servidor por React Query.

### Antes

```javascript
// ❌ Antipatrón: el servidor en un store global
const useStore = create((set) => ({
  productos: [],
  cargarProductos: async () => {
    const res = await fetch('/api/productos');
    set({ productos: await res.json() });
  },
}));
```

### Solución

```javascript
import { useQuery } from '@tanstack/react-query';

function useProductos() {
  return useQuery({
    queryKey: ['productos'],
    queryFn: async () => {
      const res = await fetch('/api/productos');
      if (!res.ok) throw new Error('Error al cargar');
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // 5 min
  });
}

// En el componente
function ListaProductos() {
  const { data, isLoading, error } = useProductos();

  if (isLoading) return <Spinner />;
  if (error) return <Error />;
  return <Lista items={data} />;
}
```

React Query se encarga de caché, revalidación y reintentos.

---

## Ejercicio 4: Compound component

> Escribe un componente `Tabs` con compound components.

### Solución

**React:**

```jsx
import { createContext, useContext, useState } from 'react';

const TabsContext = createContext();

function Tabs({ defaultValue, children }) {
  const [activo, setActivo] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activo, setActivo }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

Tabs.List = function List({ children }) {
  return <div className="tabs-list">{children}</div>;
};

Tabs.Trigger = function Trigger({ value, children }) {
  const { activo, setActivo } = useContext(TabsContext);
  return (
    <button
      className={activo === value ? 'activo' : ''}
      onClick={() => setActivo(value)}
    >
      {children}
    </button>
  );
};

Tabs.Panel = function Panel({ value, children }) {
  const { activo } = useContext(TabsContext);
  return activo === value ? <div>{children}</div> : null;
};
```

**Uso:**

```jsx
<Tabs defaultValue="perfil">
  <Tabs.List>
    <Tabs.Trigger value="perfil">Perfil</Tabs.Trigger>
    <Tabs.Trigger value="cuenta">Cuenta</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Panel value="perfil">Contenido del perfil</Tabs.Panel>
  <Tabs.Panel value="cuenta">Contenido de la cuenta</Tabs.Panel>
</Tabs>
```

---

## Ejercicio 5: Lazy loading por rutas

> Configura lazy loading por rutas.

### Solución

```jsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Inicio = lazy(() => import('./paginas/Inicio'));
const Productos = lazy(() => import('./paginas/Productos'));
const Perfil = lazy(() => import('./paginas/Perfil'));

function App() {
  return (
    <Suspense fallback={<div>Cargando…</div>}>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Suspense>
  );
}
```

Cada ruta genera un chunk separado que se carga solo cuando se visita.

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/18-arquitectura.md)
