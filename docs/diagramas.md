cd ~/Libro-desarrollador-Web-Urukais-
python3 -c "
contenido = '''# 📊 Galería de diagramas

!!! quote \"Visualiza lo que aprendes\"
    Todos los diagramas visuales del libro, recopilados en una sola página. Cada uno acompaña a un capítulo y te ayuda a entender conceptos complejos de un vistazo.

!!! tip \"Cómo están hechos\"
    Todos los diagramas están hechos con [Mermaid](https://mermaid.js.org/), un lenguaje de diagramas basado en texto. Se renderizan automáticamente en el navegador, se adaptan al modo claro/oscuro y son versionables en Git.

---

## 🧭 Índice

- [Cómo funciona la web](#1-como-funciona-la-web)
- [Flujo de trabajo con Git](#2-flujo-de-trabajo-con-git)
- [Capas de la cascada CSS](#3-capas-de-la-cascada-css)
- [Qué hace un bundler](#4-que-hace-un-bundler)
- [Pirámide de testing](#5-piramide-de-testing)
- [Estructura feature-first](#6-estructura-feature-first)
- [Arquitectura full-stack](#7-arquitectura-full-stack)
- [Cómo funciona un Service Worker](#8-como-funciona-un-service-worker)
- [HTTP vs WebSocket](#9-http-vs-websocket)
- [Pipeline de renderizado](#10-pipeline-de-renderizado)
- [Capas de seguridad](#11-capas-de-seguridad)
- [Cómo se ejecuta WebAssembly](#12-como-se-ejecuta-webassembly)
- [Arquitectura WebXR](#13-arquitectura-webxr)
- [Cómo interactúa una dApp](#14-como-interactua-una-dapp)

---

## 1. Cómo funciona la web

[Ver en el capítulo original](capitulos/01-introduccion.md)

\`\`\`mermaid
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
\`\`\`

**Explicación**: el flujo básico de cualquier aplicación web. El usuario hace una petición, el servidor consulta la base de datos y devuelve el HTML renderizado.

---

## 2. Flujo de trabajo con Git

[Ver en el capítulo original](capitulos/07-git.md)

\`\`\`mermaid
flowchart LR
    A[main] --> B[feature/nueva]
    B --> C[commits]
    C --> D[Pull Request]
    D --> E[merge a main]
    E --> F[main actualizado]
\`\`\`

**Explicación**: el flujo típico de trabajo con Git en equipo. Se crea una rama, se hacen commits, se abre un Pull Request y se fusiona a main tras la revisión.

---

## 3. Capas de la cascada CSS

[Ver en el capítulo original](capitulos/11-css-moderno.md)

\`\`\`mermaid
flowchart TB
    A[Navegador] --> B[Estilos del usuario]
    B --> C[!important]
    C --> D[Estilos inline]
    D --> E[Media queries]
    E --> F[Especificidad y @layer]
    F --> G[Estilos del navegador]
\`\`\`

**Explicación**: el orden de prioridad de la cascada CSS, de menor a mayor. Los estilos del navegador son los más débiles; !important es el más fuerte.

---

## 4. Qué hace un bundler

[Ver en el capítulo original](capitulos/13-modulos-bundlers.md)

\`\`\`mermaid
flowchart LR
    A[módulo1.js] --> D[Bundler]
    B[módulo2.js] --> D
    C[módulo3.js] --> D
    D --> E[Tree shaking]
    E --> F[Minificación]
    F --> G[app.min.js único]
\`\`\`

**Explicación**: un bundler (Vite, Webpack, esbuild) coge todos los módulos, elimina el código no usado (tree shaking), minifica y genera un único archivo optimizado.

---

## 5. Pirámide de testing

[Ver en el capítulo original](capitulos/16-testing.md)

\`\`\`mermaid
flowchart TB
    A[E2E<br/>pocos, lentos] --> B[Integración<br/>algunos]
    B --> C[Unitarios<br/>muchos, rápidos]

    style A fill:#dc2626,color:white
    style B fill:#f59e0b,color:white
    style C fill:#16a34a,color:white
\`\`\`

**Explicación**: la pirámide de testing clásica. Muchos tests unitarios (rápidos), algunos de integración, pocos E2E (lentos).

---

## 6. Estructura feature-first

[Ver en el capítulo original](capitulos/18-arquitectura.md)

\`\`\`mermaid
flowchart TB
    A[src/] --> B[features/]
    A --> C[shared/]
    A --> D[app/]
    B --> E[auth/]
    B --> F[carrito/]
    C --> G[components genéricos]
    D --> H[rutas, layouts]
\`\`\`

**Explicación**: en arquitecturas feature-first, cada funcionalidad vive en su propia carpeta con todo lo que necesita.

---

## 7. Arquitectura full-stack

[Ver en el capítulo original](capitulos/19-fullstack-node.md)

\`\`\`mermaid
flowchart LR
    A[Cliente<br/>Navegador] -->|HTTPS| B[Servidor<br/>Node.js + Express]
    B -->|Prisma| C[(PostgreSQL)]
    B -->|JWT| A
    B -->|API REST| D[Servicios externos]
\`\`\`

**Explicación**: una arquitectura full-stack típica con Node.js + Express, base de datos PostgreSQL, autenticación con JWT y conexión a servicios externos.

---

## 8. Cómo funciona un Service Worker

[Ver en el capítulo original](capitulos/22-pwa.md)

\`\`\`mermaid
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
\`\`\`

**Explicación**: el Service Worker intercepta las peticiones y decide si sirve desde caché (rápido, offline) o desde la red.

---

## 9. HTTP vs WebSocket

[Ver en el capítulo original](capitulos/23-websockets.md)

\`\`\`mermaid
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
\`\`\`

**Explicación**: HTTP abre una conexión nueva por cada petición. WebSocket abre una conexión persistente y bidireccional.

---

## 10. Pipeline de renderizado

[Ver en el capítulo original](capitulos/24-animaciones.md)

\`\`\`mermaid
flowchart LR
    A[JavaScript] --> B[Style]
    B --> C[Layout]
    C --> D[Paint]
    D --> E[Composite]

    style A fill:#dc2626,color:white
    style E fill:#16a34a,color:white
\`\`\`

**Explicación**: cuando JavaScript cambia algo, el navegador recalcula estilos, layout, paint y composite. Las animaciones con transform y opacity se saltan layout y paint.

---

## 11. Capas de seguridad

[Ver en el capítulo original](capitulos/26-seguridad.md)

\`\`\`mermaid
flowchart TB
    A[Usuario] -->|HTTPS| B[CDN / Firewall]
    B --> C[Servidor]
    C -->|Validación Zod| D[Backend]
    D -->|Sanitización| E[(Base de datos)]

    style A fill:#a78bfa,color:white
    style E fill:#dc2626,color:white
\`\`\`

**Explicación**: la seguridad es defensa en profundidad. HTTPS en tránsito, firewall/CDN en el borde, validación de entrada en el backend, sanitización antes de guardar.

---

## 12. Cómo se ejecuta WebAssembly

[Ver en el capítulo original](capitulos/27-webassembly.md)

\`\`\`mermaid
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
\`\`\`

**Explicación**: JavaScript pide el binario .wasm, lo instancia y llama a las funciones exportadas.

---

## 13. Arquitectura WebXR

[Ver en el capítulo original](capitulos/29-webxr.md)

\`\`\`mermaid
flowchart TB
    A[Navegador] --> B[navigator.xr]
    B --> C{Session?}
    C -->|immersive-vr| D[Gafas VR]
    C -->|immersive-ar| E[Cámara AR]
    C -->|inline| F[Modo 3D sin gafas]
    D --> G[Renderizado 3D]
    E --> G
    F --> G
\`\`\`

**Explicación**: WebXR expone navigator.xr, que permite pedir sesiones de VR, AR o 3D inline.

---

## 14. Cómo interactúa una dApp

[Ver en el capítulo original](capitulos/30-web3.md)

\`\`\`mermaid
sequenceDiagram
    participant U as Usuario
    participant W as Wallet
    participant D as dApp
    participant C as Contrato
    participant B as Blockchain

    U->>D: Clic en Conectar wallet
    D->>W: eth_requestAccounts
    W-->>U: Pide permiso
    U-->>W: Acepta
    W-->>D: Dirección 0x...
    D->>C: Llama función
    C->>B: Transacción firmada
    B-->>C: Confirmación
    C-->>D: Evento emitido
    D-->>U: Actualiza UI
\`\`\`

**Explicación**: una dApp se conecta a la wallet del usuario, que firma las transacciones. La transacción viaja a la blockchain y la dApp actualiza la interfaz.

---

## 🛠️ Cómo se hacen estos diagramas

Todos están escritos en **Mermaid**, un lenguaje que permite describir diagramas con texto plano. MkDocs Material los renderiza automáticamente al construir el sitio.

**Ventajas:**

- **Versionables** en Git como texto.
- **Editables** por cualquiera.
- **Sin imágenes** que actualizar.
- **Se adaptan** al modo claro y oscuro del sitio.

Más información: [mermaid.js.org](https://mermaid.js.org/)

---

## ➡️ Siguientes pasos

[📖 Volver al índice](index.md){ .md-button .md-button--primary }
[🎯 Ver los retos semanales](retos.md){ .md-button }
[✅ Ver los ejercicios resueltos](ejercicios/index.md){ .md-button }
'''
open('docs/diagramas.md', 'w', encoding='utf-8').write(contenido)
print('OK:', len(contenido.splitlines()), 'líneas escritas')
"