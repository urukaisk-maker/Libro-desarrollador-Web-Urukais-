# 📊 Diagrams Gallery

!!! quote "Visualize what you learn"
    All visual diagrams from the book gathered on a single page. Each one accompanies a chapter and helps you grasp complex concepts at a glance.

!!! tip "How they are built"
    All diagrams are written in [Mermaid](https://mermaid.js.org/), a text-based diagramming language. They render automatically in the browser, adapt to light/dark mode, and can be version-controlled in Git.

---

## 🧭 Table of Contents

- [How the web works](#1-how-the-web-works)
- [Git workflow](#2-git-workflow)
- [CSS cascade layers](#3-css-cascade-layers)
- [What a bundler does](#4-what-a-bundler-does)
- [Testing pyramid](#5-testing-pyramid)
- [Feature-first structure](#6-feature-first-structure)
- [Full-stack architecture](#7-full-stack-architecture)
- [How a Service Worker works](#8-how-a-service-worker-works)
- [HTTP vs WebSocket](#9-http-vs-websocket)
- [Rendering pipeline](#10-rendering-pipeline)
- [Security layers](#11-security-layers)
- [How WebAssembly runs](#12-how-webassembly-runs)
- [WebXR architecture](#13-webxr-architecture)
- [How a dApp interacts](#14-how-a-dapp-interacts)

---

## 1. How the Web Works

[View in the original chapter](capitulos/01-introduccion.md)

```mermaid
sequenceDiagram
    participant U as User
    participant N as Browser
    participant S as Server
    participant B as Database

    U->>N: Enter URL
    N->>S: HTTP Request
    S->>B: Query
    B-->>S: Data
    S-->>N: HTML Response
    N-->>U: Rendered Page
```

**Explanation**: the basic flow of any web application. The user makes a request, the server queries the database, and returns the rendered HTML.

---

## 2. Git Workflow

[View in the original chapter](capitulos/07-git.md)

```mermaid
flowchart LR
    A[main] --> B[feature/new]
    B --> C[commits]
    C --> D[Pull Request]
    D --> E[merge into main]
    E --> F[updated main]
```

**Explanation**: a typical team Git workflow. You create a branch, make commits, open a Pull Request, and merge into main after review.

---

## 3. CSS Cascade Layers

[View in the original chapter](capitulos/11-css-moderno.md)

```mermaid
flowchart TB
    A[Browser] --> B[User styles]
    B --> C[!important]
    C --> D[Inline styles]
    D --> E[Media queries]
    E --> F[Specificity and @layer]
    F --> G[Browser defaults]
```

**Explanation**: the priority order of the CSS cascade, from lowest to highest. Browser defaults are weakest; !important is strongest.

---

## 4. What a Bundler Does

[View in the original chapter](capitulos/13-modulos-bundlers.md)

```mermaid
flowchart LR
    A[module1.js] --> D[Bundler]
    B[module2.js] --> D
    C[module3.js] --> D
    D --> E[Tree shaking]
    E --> F[Minification]
    F --> G[Single app.min.js]
```

**Explanation**: a bundler (Vite, Webpack, esbuild) takes all modules, removes unused code (tree shaking), minifies, and outputs a single optimized bundle.

---

## 5. Testing Pyramid

[View in the original chapter](capitulos/16-testing.md)

```mermaid
flowchart TB
    A[E2E<br/>few, slow] --> B[Integration<br/>some]
    B --> C[Unit<br/>many, fast]

    style A fill:#dc2626,color:white
    style B fill:#f59e0b,color:white
    style C fill:#16a34a,color:white
```

**Explanation**: the classic testing pyramid. Many unit tests (fast), some integration tests, a few E2E tests (slow).

---

## 6. Feature-First Structure

[View in the original chapter](capitulos/18-arquitectura.md)

```mermaid
flowchart TB
    A[src/] --> B[features/]
    A --> C[shared/]
    A --> D[app/]
    B --> E[auth/]
    B --> F[cart/]
    C --> G[shared components]
    D --> H[routes, layouts]
```

**Explanation**: in feature-first architectures, each feature lives in its own folder with everything it needs.

---

## 7. Full-Stack Architecture

[View in the original chapter](capitulos/19-fullstack-node.md)

```mermaid
flowchart LR
    A[Client<br/>Browser] -->|HTTPS| B[Server<br/>Node.js + Express]
    B -->|Prisma| C[(PostgreSQL)]
    B -->|JWT| A
    B -->|REST API| D[External Services]
```

**Explanation**: a typical full-stack architecture with Node.js + Express, PostgreSQL database, JWT authentication, and connections to external services.

---

## 8. How a Service Worker Works

[View in the original chapter](capitulos/22-pwa.md)

```mermaid
sequenceDiagram
    participant U as User
    participant N as Browser
    participant SW as Service Worker
    participant C as Cache
    participant S as Server

    U->>N: Request URL
    N->>SW: Intercept request
    SW->>C: In cache?
    alt Cached
        C-->>SW: Yes
        SW-->>N: Serve from cache
    else Not cached
        SW->>S: Fetch from network
        S-->>SW: Response
        SW->>C: Store in cache
        SW-->>N: Serve response
    end
    N-->>U: Display page
```

**Explanation**: the Service Worker intercepts requests and decides whether to serve from cache (fast, offline) or from the network.

---

## 9. HTTP vs WebSocket

[View in the original chapter](capitulos/23-websockets.md)

```mermaid
sequenceDiagram
    participant C as Client
    participant S as Server

    Note over C,S: HTTP: one connection per request
    C->>S: Request 1
    S-->>C: Response 1
    C->>S: Request 2
    S-->>C: Response 2

    Note over C,S: WebSocket: persistent connection
    C->>S: Handshake (Upgrade)
    S-->>C: 101 Switching Protocols
    C->>S: Message
    S-->>C: Message
    S-->>C: Push message
    C->>S: Message
```

**Explanation**: HTTP opens a new connection per request. WebSocket opens a persistent, bidirectional connection.

---

## 10. Rendering Pipeline

[View in the original chapter](capitulos/24-animaciones.md)

```mermaid
flowchart LR
    A[JavaScript] --> B[Style]
    B --> C[Layout]
    C --> D[Paint]
    D --> E[Composite]

    style A fill:#dc2626,color:white
    style E fill:#16a34a,color:white
```

**Explanation**: when JavaScript changes something, the browser recalculates styles, layout, paint, and composite. Animations using transform and opacity skip layout and paint.

---

## 11. Security Layers

[View in the original chapter](capitulos/26-seguridad.md)

```mermaid
flowchart TB
    A[User] -->|HTTPS| B[CDN / Firewall]
    B --> C[Server]
    C -->|Zod Validation| D[Backend]
    D -->|Sanitization| E[(Database)]

    style A fill:#a78bfa,color:white
    style E fill:#dc2626,color:white
```

**Explanation**: security is defense in depth. HTTPS in transit, firewall/CDN at the edge, input validation in the backend, sanitization before saving.

---

## 12. How WebAssembly Runs

[View in the original chapter](capitulos/27-webassembly.md)

```mermaid
sequenceDiagram
    participant U as User
    participant N as Browser
    participant JS as JavaScript
    participant W as WebAssembly

    U->>N: Load page
    N->>JS: Download app.js
    JS->>N: Request module.wasm
    N-->>JS: Return binary
    JS->>W: instantiate()
    JS->>W: Call exported function
    W-->>JS: Result
    JS-->>U: Update UI
```

**Explanation**: JavaScript fetches the .wasm binary, instantiates it, and calls exported functions.

---

## 13. WebXR Architecture

[View in the original chapter](capitulos/29-webxr.md)

```mermaid
flowchart TB
    A[Browser] --> B[navigator.xr]
    B --> C{Session?}
    C -->|immersive-vr| D[VR Headset]
    C -->|immersive-ar| E[AR Camera]
    C -->|inline| F[3D Mode without Headset]
    D --> G[3D Rendering]
    E --> G
    F --> G
```

**Explanation**: WebXR exposes navigator.xr, letting you request VR, AR, or inline 3D sessions.

---

## 14. How a dApp Interacts

[View in the original chapter](capitulos/30-web3.md)

```mermaid
sequenceDiagram
    participant U as User
    participant W as Wallet
    participant D as dApp
    participant C as Contract
    participant B as Blockchain

    U->>D: Click Connect Wallet
    D->>W: eth_requestAccounts
    W-->>U: Request permission
    U-->>W: Approve
    W-->>D: Address 0x...
    D->>C: Call function
    C->>B: Signed transaction
    B-->>C: Confirmation
    C-->>D: Emitted event
    D-->>U: Update UI
```

**Explanation**: a dApp connects to the user's wallet, which signs transactions. The transaction travels to the blockchain and the dApp updates the UI.

---

## 🛠 How These Diagrams Are Made

All of them are written in **Mermaid**, a language for describing diagrams with plain text. MkDocs Material renders them automatically when building the site.

**Benefits:**

- **Version-controllable** in Git as text.
- **Editable** by anyone.
- **No images** to update manually.
- **Adapts** to the site's light and dark modes.

Learn more: [mermaid.js.org](https://mermaid.js.org/)

---

## ➡ Next Steps

[📖 Back to index](index.md){ .md-button .md-button--primary }
[🎯 View weekly challenges](retos.md){ .md-button }
[✅ View solved exercises](ejercicios/index.md){ .md-button }