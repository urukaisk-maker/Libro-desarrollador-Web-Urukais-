# 32 — Server Components

!!! abstract "Qué vas a aprender"
    - Qué son los React Server Components (RSC) y qué problema resuelven.
    - La diferencia entre componentes de servidor y de cliente.
    - Cómo funciona el modelo de renderizado híbrido.
    - Cuándo usar cada tipo de componente.
    - Errores comunes y buenas prácticas.

---

## 🌐 ¿Qué son los Server Components?

Los **React Server Components (RSC)** son componentes que se ejecutan **en el servidor** y envían al cliente un árbol de React ya serializado, sin incluir el código JavaScript de esos componentes en el bundle del navegador.

!!! quote "La analogía del restaurante"
    Un **Client Component** es como cocinar en casa: tienes todos los ingredientes y utensilios (JavaScript) en tu cocina (navegador), aunque no los uses todos. Un **Server Component** es como pedir a domicilio: el restaurante (servidor) cocina y te envía el plato listo (HTML/React serializado), sin que tengas que cargar con la cocina entera.

~~~mermaid
graph LR
    A[Código fuente] --> B{¿Server o Client?}
    B -->|Server Component| C[Ejecuta en servidor]
    B -->|Client Component| D[Ejecuta en navegador]
    C --> E[Serializa a RSC Payload]
    D --> F[Envía JS al bundle]
    E --> G[Renderiza en navegador]
    F --> G
~~~

---

## 🏛 Server vs Client Components

| Característica | **Server Component** | **Client Component** |
| :--- | :--- | :--- |
| Directiva | Ninguna (por defecto en App Router) | `"use client"` al inicio del archivo |
| Se ejecuta en | Servidor | Navegador (y servidor en SSR) |
| Acceso a backend | ✅ Directo (base de datos, FS, secrets) | ❌ Solo vía API |
| Hooks (`useState`, `useEffect`) | ❌ No | ✅ Sí |
| Event handlers (`onClick`, etc.) | ❌ No | ✅ Sí |
| APIs del navegador (`window`, `localStorage`) | ❌ No | ✅ Sí |
| Añade peso al bundle JS | ❌ No | ✅ Sí |
| Puede importar Client Components | ✅ Sí | ✅ Sí |
| Puede importar Server Components | ❌ No (pero puede recibirlos como `children`) | ❌ No |

!!! tip "Regla mental"
    **Server Component por defecto**. Solo añade `"use client"` cuando necesites interactividad (hooks, eventos, APIs del navegador).

---

## 🔄 El modelo híbrido

En Next.js App Router (y frameworks similares), los componentes son **Server por defecto**. La comunicación fluye así:

~~~mermaid
sequenceDiagram
    participant C as Cliente (navegador)
    participant S as Servidor
    participant DB as Base de datos
    C->>S: Petición de página
    S->>DB: Query directa
    DB->>S: Datos
    S->>S: Renderiza Server Components
    S->>C: RSC Payload + HTML + JS de Client Components
    C->>C: Hidrata Client Components
~~~

**Flujo:**
1. El navegador pide una ruta.
2. El servidor ejecuta los Server Components (incluyendo queries a la base de datos).
3. El servidor serializa el resultado y envía:
   - El **HTML inicial** (para pintar rápido).
   - El **RSC Payload** (estructura de componentes para hidratar).
   - El **JS de los Client Components** (para la interactividad).
4. El navegador **hidrata** los Client Components.

---

## 🏷 La directiva `"use client"`

Es una **cadena de texto** al inicio del archivo (antes de cualquier import) que marca el punto de entrada del código cliente:

~~~javascript
"use client";

import { useState } from "react";

export default function Contador() {
    const [n, setN] = useState(0);
    return <button onClick={() => setN(n + 1)}>Clicks: {n}</button>;
}
~~~

!!! warning "No es una directiva mágica"
    `"use client"` **no** significa "esto se ejecuta solo en el navegador". El componente también se renderiza en el servidor (SSR), pero su **código JS** se envía al navegador para la hidratación. Lo que cambia es que puede usar hooks y eventos.

**Reglas de propagación:**
- Un Client Component **no puede** importar un Server Component.
- Pero sí puede **recibirlo como `children`** o como prop (patrón "children pattern").

~~~javascript
// page.js (Server Component)
import ClientWrapper from "./client-wrapper";
import ServerChart from "./server-chart"; // es Server Component

export default function Page() {
    return (
        <ClientWrapper>
            <ServerChart />
        </ClientWrapper>
    );
}
~~~

~~~javascript
// client-wrapper.js
"use client";
export default function ClientWrapper({ children }) {
    return <div onClick={() => console.log("click")}>{children}</div>;
}
~~~

---

## 🎯 Cuándo usar cada uno

### Server Component (por defecto)

- ✅ Fetching de datos (DB, APIs externas, FS).
- ✅ Acceso a variables de entorno y secrets.
- ✅ Renderizar contenido estático o dependiente de datos.
- ✅ Componentes grandes sin interactividad (listas, layouts, páginas).
- ✅ Reducir el bundle JS del cliente.

### Client Component (`"use client"`)

- ✅ `useState`, `useEffect`, `useReducer`, `useContext`.
- ✅ Event handlers (`onClick`, `onChange`, `onSubmit`).
- ✅ APIs del navegador (`window`, `document`, `localStorage`, `IntersectionObserver`).
- ✅ Librerías que dependen del DOM (chart.js, mapbox, etc.).

!!! tip "Aísla la interactividad"
    Un buen patrón es tener **páginas server** con **islas client**: la página renderiza en el servidor, y solo los componentes interactivos (botones, formularios, modales) llevan `"use client"`. Así el bundle JS se mantiene pequeño.

---

## 📝 Ejemplo completo: dashboard

~~~javascript
// app/dashboard/page.js  (Server Component)
import { db } from "@/lib/db";
import BotonRefrescar from "./boton-refrescar";

export default async function Dashboard() {
    const ventas = await db.ventas.findMany(); // query directa
    const total = ventas.reduce((s, v) => s + v.monto, 0);

    return (
        <div>
            <h1>Ventas totales: {total} €</h1>
            <ul>
                {ventas.map((v) => (
                    <li key={v.id}>{v.producto}: {v.monto} €</li>
                ))}
            </ul>
            <BotonRefrescar />
        </div>
    );
}
~~~

~~~javascript
// app/dashboard/boton-refrescar.js  (Client Component)
"use client";

import { useRouter } from "next/navigation";

export default function BotonRefrescar() {
    const router = useRouter();
    return <button onClick={() => router.refresh()}>Refrescar</button>;
}
~~~

**Lo que consigues:**
- La query a la DB se ejecuta **en el servidor** (el cliente nunca ve las credenciales).
- El bundle JS del navegador **no incluye** el código del dashboard, solo el del botón.
- El botón sí es interactivo (Client Component).

---

## ⚠️ Errores comunes

| Error | Qué pasa | Solución |
| :--- | :--- | :--- |
| Usar `useState` en un Server Component | Error en build | Añadir `"use client"` al archivo |
| Importar `fs` o `pg` en un Client Component | Error en build (módulos no disponibles) | Mover la lógica a un Server Component |
| Importar un Server Component desde un Client Component | Error en build | Pasarlo como `children` o prop |
| Olvidar `"use client"` en un componente con `onClick` | Error: "Event handlers cannot be passed to Client Component props" | Añadir `"use client"` |
| Usar `window` en el primer render | Error de hidratación | Envolver en `useEffect` o `typeof window !== "undefined"` |

!!! warning "El error más común"
    `Event handlers cannot be passed to Client Component props`. Ocurre cuando intentas pasar una función (como `onClick`) desde un Server Component a un Client Component. Las props que pasan de Server a Client deben ser **serializables** (números, strings, arrays, objetos planos). No funciones.

---

## 🏗 Arquitectura recomendada

~~~mermaid
graph TD
    A[app/layout.js] -->|Server| B[app/page.js]
    B -->|Server| C[Lista de productos]
    B -->|Server| D[Detalle del producto]
    C -->|Client island| E[Boton añadir al carrito]
    D -->|Client island| F[Selector de cantidad]
    E --> G[Cart context]
    F --> G
~~~

**Regla:** Server arriba, Client en las hojas (islas).

---

## 🧪 Ejercicio práctico

!!! example "Convertir un componente interactivo en híbrido"
    Tienes este componente con un contador. Divídelo en:

    - Un **Server Component** `Producto` que cargue los datos de un producto (simulados con `fetch` a una API).
    - Un **Client Component** `Contador` con un botón que sume 1 al hacer clic.

    El Server Component debe renderizar el nombre del producto y el Client Component debajo.

??? success "Solución"
    ~~~javascript
    // app/producto/page.js  (Server Component)
    import Contador from "./contador";

    async function getProducto() {
        return { id: 1, nombre: "Teclado mecánico", precio: 89 };
    }

    export default async function Producto() {
        const prod = await getProducto();
        return (
            <div>
                <h1>{prod.nombre}</h1>
                <p>Precio: {prod.precio} €</p>
                <Contador />
            </div>
        );
    }
    ~~~

    ~~~javascript
    // app/producto/contador.js  (Client Component)
    "use client";
    import { useState } from "react";

    export default function Contador() {
        const [n, setN] = useState(0);
        return (
            <div>
                <p>Cantidad: {n}</p>
                <button onClick={() => setN(n + 1)}>Añadir uno</button>
            </div>
        );
    }
    ~~~

---

## 🧠 Quiz

!!! question "Comprueba lo aprendido"

??? success "1. ¿Los Server Components se envían al bundle del navegador?"
    No. Solo se envía el **RSC Payload** (representación serializada). El código JS del componente se queda en el servidor.

??? success "2. ¿Para qué sirve `"use client"`?"
    Marca el punto de entrada del código cliente. Indica que el componente y sus imports pueden usar hooks, event handlers y APIs del navegador. También hace que su JS se incluya en el bundle.

??? success "3. ¿Puede un Client Component importar un Server Component?"
    No directamente. Pero puede recibirlo como `children` o como prop desde un Server Component padre.

??? success "4. ¿Qué tipo de props pueden pasar de Server a Client?"
    Solo props **serializables**: strings, números, booleanos, arrays, objetos planos, fechas, `null`. No funciones, clases, símbolos ni `undefined` (aunque este último se permite).

??? success "5. ¿Cuál es el patrón recomendado de arquitectura?"
    **Server arriba, Client en las hojas**: páginas y layouts en el servidor, islas interactivas (botones, formularios, modales) como Client Components.

---

## 📚 Recursos

- [React — Server Components (docs oficiales)](https://react.dev/reference/rsc/server-components)
- [Next.js — Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Next.js — Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [RFC original de React Server Components](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md)
- [Patrones de composición Server/Client](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)

---

➡️ Siguiente capítulo: [33 — Edge Computing](33-edge-computing.md)