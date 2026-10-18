# Galería de diagramas

Todos los diagramas visuales del libro, recopilados en una sola página.

!!! tip "Cómo están hechos"
    Todos los diagramas están hechos con [Mermaid](https://mermaid.js.org/), un lenguaje de diagramas basado en texto. Se renderizan automáticamente en el navegador.

## 1. Cómo funciona la web

[Ver en el capítulo original](capitulos/01-introduccion.md)

```mermaid
sequenceDiagram
    participant U as Usuario
    participant N as Navegador
    participant S as Servidor
    participant B as Base de datos

    U->>N: Introduce URL
    N->>S: Petición HTTP
    S->>B: Consulta
    B-->>S: Datos
    S-->>N: Respuesta HTML
    N-->>U: Página renderizada
```

## 2. Flujo de trabajo con Git

[Ver en el capítulo original](capitulos/07-git.md)

```mermaid
flowchart LR
    A[main] --> B[feature/nueva]
    B --> C[commits]
    C --> D[Pull Request]
    D --> E[merge a main]
    E --> F[main actualizado]
```

## 3. Capas de la cascada CSS

[Ver en el capítulo original](capitulos/11-css-moderno.md)

```mermaid
flowchart TB
    A[Navegador] --> B[Estilos del usuario]
    B --> C[!important]
    C --> D[Estilos inline]
    D --> E[Media queries]
    E --> F[Especificidad y @layer]
    F --> G[Estilos del navegador]
```

## 4. Qué hace un bundler

[Ver en el capítulo original](capitulos/13-modulos-bundlers.md)

```mermaid
flowchart LR
    A[módulo1.js] --> D[Bundler]
    B[módulo2.js] --> D
    C[módulo3.js] --> D
    D --> E[Tree shaking]
    E --> F[Minificación]
    F --> G[app.min.js único]
```

## 5. Pirámide de testing

[Ver en el capítulo original](capitulos/16-testing.md)

```mermaid
flowchart TB
    A[E2E<br/>pocos, lentos] --> B[Integración<br/>algunos]
    B --> C[Unitarios<br/>muchos, rápidos]

    style A fill:#dc2626,color:white
    style B fill:#f59e0b,color:white
    style C fill:#16a34a,color:white
```

## 6. Estructura feature-first

[Ver en el capítulo original](capitulos/18-arquitectura.md)

```mermaid
flowchart TB
    A[src/] --> B[features/]
    A --> C[shared/]
    A --> D[app/]
    B --> E[auth/]
    B --> F[carrito/]
    C --> G[components genéricos]
    D --> H[rutas, layouts]
```

## 7. Arquitectura full-stack

[Ver en el capítulo original](capitulos/19-fullstack-node.md)

```mermaid
flowchart LR
    A[Cliente<br/>Navegador] -->|HTTPS| B[Servidor<br/>Node.js + Express]
    B -->|Prisma| C[(PostgreSQL)]
    B -->|JWT| A
    B -->|API REST| D[Servicios externos]
```

## 8. Cómo funciona un Service Worker

[Ver en el capítulo original](capitulos/22-pwa.md)

```mermaid
sequenceDiagram
    participant U as Usuario
    participant N as Navegador
    participant SW as Service Worker
    participant C as Caché
    participant S as Servidor

    U->>N: Pide una URL
    N->>SW: Intercepta la petición
    SW->>C: ¿Está en caché?
    alt En caché
        C-->>SW: Sí
        SW-->>N: Sirve desde caché
    else No está
        SW->>S: Pide a la red
        S-->>SW: Respuesta
        SW->>C: Guarda en caché
        SW-->>N: Sirve respuesta
    end
    N-->>U: Muestra la página
```

## 9. HTTP vs WebSocket

[Ver en el capítulo original](capitulos/23-websockets.md)

```mermaid
sequenceDiagram
    participant C as Cliente
    participant S as Servidor

    Note over C,S: HTTP: conexión por cada petición
    C->>S: Petición 1
    S-->>C: Respuesta 1
    C->>S: Petición 2
    S-->>C: Respuesta 2

    Note over C,S: WebSocket: conexión persistente
    C->>S: Handshake (Upgrade)
    S-->>C: 101 Switching Protocols
    C->>S: Mensaje
    S-->>C: Mensaje
    S-->>C: Mensaje push
    C->>S: Mensaje
```

## 10. Pipeline de renderizado

[Ver en el capítulo original](capitulos/24-animaciones.md)

```mermaid
flowchart LR
    A[JavaScript] --> B[Style]
    B --> C[Layout]
    C --> D[Paint]
    D --> E[Composite]

    style A fill:#dc2626,color:white
    style E fill:#16a34a,color:white
```

## 11. Capas de seguridad

[Ver en el capítulo original](capitulos/26-seguridad.md)

```mermaid
flowchart TB
    A[Usuario] -->|HTTPS| B[CDN / Firewall]
    B --> C[Servidor]
    C -->|Validación Zod| D[Backend]
    D -->|Sanitización| E[(Base de datos)]

    style A fill:#a78bfa,color:white
    style E fill:#dc2626,color:white
```

## 12. Cómo se ejecuta WebAssembly

[Ver en el capítulo original](capitulos/27-webassembly.md)

```mermaid
sequenceDiagram
    participant U as Usuario
    participant N as Navegador
    participant JS as JavaScript
    participant W as WebAssembly

    U->>N: Carga la página
    N->>JS: Descarga app.js
    JS->>N: Pide modulo.wasm
    N-->>JS: Devuelve binario
    JS->>W: instantiate()
    JS->>W: Llama función exportada
    W-->>JS: Resultado
    JS-->>U: Actualiza la UI
```

## 13. Arquitectura WebXR

[Ver en el capítulo original](capitulos/29-webxr.md)

```mermaid
flowchart TB
    A[Navegador] --> B[navigator.xr]
    B --> C{Session?}
    C -->|immersive-vr| D[Gafas VR]
    C -->|immersive-ar| E[Cámara AR]
    C -->|inline| F[Modo 3D sin gafas]
    D --> G[Renderizado 3D]
    E --> G
    F --> G
```

## 14. Cómo interactúa una dApp

[Ver en el capítulo original](capitulos/30-web3.md)

```mermaid
sequenceDiagram
    participant U as Usuario
    participant W as Wallet
    participant D as dApp
    participant C as Contrato
    participant B as Blockchain

    U->>D: Clic en "Conectar wallet"
    D->>W: eth_requestAccounts
    W-->>U: Pide permiso
    U-->>W: Acepta
    W-->>D: Dirección 0x...
    D->>C: Llama función
    C->>B: Transacción firmada
    B-->>C: Confirmación
    C-->>D: Evento emitido
    D-->>U: Actualiza UI
```

---

## 🛠️ Cómo se hacen estos diagramas

Todos están escritos en **Mermaid**, un lenguaje que permite describir diagramas con texto plano. MkDocs Material los renderiza automáticamente al construir el sitio.

**Ventajas:**

- **Versionables** en Git como texto.
- **Editables** por cualquiera.
- **Sin imágenes** que actualizar.
- **Se adaptan** al modo claro y oscuro del sitio.

Más información: [mermaid.js.org](https://mermaid.js.org/)
