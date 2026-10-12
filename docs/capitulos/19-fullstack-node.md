# Capítulo 19 — Full-stack con Node.js

## Introducción

Hasta ahora has construido el **frontend**: la parte que ve el usuario. Pero una aplicación web real necesita también un **backend**: el que guarda datos, autentica usuarios y expone APIs.

En este capítulo vas a construir un backend completo con **Node.js** y **Express**, conectar una base de datos **PostgreSQL** usando **Prisma** y desplegarlo en producción.

## ¿Qué es Node.js?

Node.js es un entorno que permite ejecutar JavaScript **fuera del navegador**, en el servidor. Está construido sobre el motor V8 de Chrome y usa un modelo **asíncrono no bloqueante** que lo hace muy eficiente para I/O.

### Qué puedes hacer con Node.js

- Servidores web y APIs REST.
- WebSockets y aplicaciones en tiempo real.
- CLIs y herramientas de línea de comandos.
- Procesos de build y automatización.

### Lo que NO es Node.js

- No es un lenguaje (es JavaScript o TypeScript).
- No es un framework (Express, Fastify, NestJS son frameworks).
- No es un navegador (no tiene DOM).

## Instalación

Descarga Node.js desde [nodejs.org](https://nodejs.org/) (versión LTS). Comprueba:

```bash
node --version    # v20.x o superior
npm --version     # 10.x o superior
```

O usa un gestor de versiones como **nvm** o **fnm** para cambiar entre versiones.

## Tu primer servidor

```javascript
// server.js
import http from 'node:http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hola desde Node.js');
});

server.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
```

Ejecuta con:

```bash
node server.js
```

!!! tip "Módulos ES en Node"
    Añade `"type": "module"` a tu `package.json` para usar `import`/`export` en lugar de `require`. Es el estándar moderno.

## Express: el framework estándar

Express es minimalista, flexible y el más usado. Perfecto para aprender y para producir.

### Instalación

```bash
mkdir mi-api && cd mi-api
npm init -y
npm install express
```

Añade a `package.json`:

```json
{
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "node --watch src/server.js"
  }
}
```

### Servidor básico

```javascript
// src/server.js
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json({ mensaje: 'API funcionando' });
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
```

Ejecuta:

```bash
npm run dev
```

### Métodos HTTP

```javascript
app.get('/usuarios', listarUsuarios);
app.get('/usuarios/:id', obtenerUsuario);
app.post('/usuarios', crearUsuario);
app.put('/usuarios/:id', actualizarUsuario);
app.patch('/usuarios/:id', actualizarParcial);
app.delete('/usuarios/:id', borrarUsuario);
```

### Middleware

Un **middleware** es una función que se ejecuta entre la petición y la respuesta.

```javascript
app.use(express.json()); // parsea JSON del body

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // pasa al siguiente middleware
});
```

### Middleware de error

```javascript
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Error del servidor',
  });
});
```

### Rutas organizadas

```javascript
// src/routes/usuarios.js
import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => res.json({ usuarios: [] }));
router.post('/', (req, res) => res.status(201).json({ creado: true }));

export default router;
```

```javascript
// src/server.js
import usuariosRouter from './routes/usuarios.js';
app.use('/api/usuarios', usuariosRouter);
```

## Variables de entorno

Nunca metas secretos en el código. Usa `.env`:

```
PORT=3000
DATABASE_URL=postgresql://usuario:pass@localhost:5432/miapp
JWT_SECRET=algo-muy-largo-y-aleatorio
```

Carga con **dotenv**:

```bash
npm install dotenv
```

```javascript
import 'dotenv/config';
const port = process.env.PORT || 3000;
```

!!! warning "Nunca subas .env a Git"
    Añade `.env` a `.gitignore`. En producción, las variables se configuran en el hosting (Railway, Vercel, etc.).

## Base de datos con PostgreSQL

**PostgreSQL** es la base de datos relacional de referencia. Robusta, gratuita, con años de desarrollo.

### Instalación local

- **Linux**: `sudo pacman -S postgresql` (Arch) o `sudo apt install postgresql` (Debian/Ubuntu).
- **macOS**: `brew install postgresql`.
- **Docker** (más fácil y portable):

```bash
docker run --name postgres -e POSTGRES_PASSWORD=pass -p 5432:5432 -d postgres
```

## Prisma: el ORM moderno

**Prisma** es un ORM (Object-Relational Mapping) que te permite trabajar con la base de datos usando TypeScript/JavaScript con tipado automático.

### Instalación

```bash
npm install -D prisma
npm install @prisma/client
npx prisma init
```

Esto crea `prisma/schema.prisma` y añade `DATABASE_URL` a `.env`.

### Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Usuario {
  id        Int      @id @default(autoincrement())
  nombre    String
  email     String   @unique
  password  String
  posts     Post[]
  creadoEn  DateTime @default(now())
}

model Post {
  id        Int      @id @default(autoincrement())
  titulo    String
  contenido String
  autor     Usuario  @relation(fields: [autorId], references: [id])
  autorId   Int
  creadoEn  DateTime @default(now())
}
```

### Migraciones

```bash
npx prisma migrate dev --name init
```

Crea la base de datos y genera el cliente.

### Uso en código

```javascript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Crear
const usuario = await prisma.usuario.create({
  data: { nombre: 'Urukais', email: 'urukaisk@gmail.com', password: 'hash' },
});

// Leer
const usuarios = await prisma.usuario.findMany();
const uno = await prisma.usuario.findUnique({ where: { id: 1 } });

// Actualizar
await prisma.usuario.update({
  where: { id: 1 },
  data: { nombre: 'Nuevo nombre' },
});

// Borrar
await prisma.usuario.delete({ where: { id: 1 } });
```

### Prisma Studio

Interfaz visual para inspeccionar la base de datos:

```bash
npx prisma studio
```

## Autenticación con JWT

**JSON Web Tokens** son la forma estándar de autenticar APIs.

```bash
npm install jsonwebtoken bcrypt
```

### Registrar usuario

```javascript
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

app.post('/api/auth/registro', async (req, res) => {
  const { nombre, email, password } = req.body;

  const existe = await prisma.usuario.findUnique({ where: { email } });
  if (existe) return res.status(409).json({ error: 'Email ya registrado' });

  const hash = await bcrypt.hash(password, 10);
  const usuario = await prisma.usuario.create({
    data: { nombre, email, password: hash },
  });

  const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.status(201).json({ token, usuario: { id: usuario.id, nombre, email } });
});
```

### Login

```javascript
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario) return res.status(401).json({ error: 'Credenciales inválidas' });

  const ok = await bcrypt.compare(password, usuario.password);
  if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' });

  const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.json({ token });
});
```

### Middleware de autenticación

```javascript
function autenticar(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const token = auth.slice(7);
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
}

// Ruta protegida
app.get('/api/perfil', autenticar, async (req, res) => {
  const usuario = await prisma.usuario.findUnique({
    where: { id: req.usuario.id },
    select: { id: true, nombre: true, email: true },
  });
  res.json(usuario);
});
```

## Validación con Zod

Valida los datos de entrada antes de tocar la base de datos:

```bash
npm install zod
```

```javascript
import { z } from 'zod';

const esquemaRegistro = z.object({
  nombre: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
});

app.post('/api/auth/registro', async (req, res) => {
  const resultado = esquemaRegistro.safeParse(req.body);
  if (!resultado.success) {
    return res.status(400).json({ errores: resultado.error.issues });
  }
  // ...
});
```

## CORS

Para que el frontend pueda llamar a la API desde otro dominio:

```bash
npm install cors
```

```javascript
import cors from 'cors';

app.use(cors({
  origin: ['http://localhost:5173', 'https://miapp.com'],
  credentials: true,
}));
```

## Estructura recomendada

```
mi-api/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── usuarios.js
│   │   └── posts.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   └── error.js
│   ├── lib/
│   │   └── prisma.js
│   └── server.js
├── .env
├── .gitignore
└── package.json
```

## Despliegue

### Railway (recomendado para empezar)

1. Crea cuenta en [railway.app](https://railway.app/).
2. Nuevo proyecto → **Deploy from GitHub repo**.
3. Añade un plugin **PostgreSQL**.
4. Configura las variables (`DATABASE_URL`, `JWT_SECRET`, `PORT`).
5. Railway despliega automáticamente en cada push.

### Fly.io

```bash
fly launch
fly postgres create
fly postgres attach
fly secrets set JWT_SECRET=xxx
fly deploy
```

### Dockerfile mínimo

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["node", "src/server.js"]
```

## Diagrama: arquitectura full-stack

```mermaid
flowchart LR
    A[Cliente<br/>Navegador] -->|HTTPS| B[Servidor<br/>Node.js + Express]
    B -->|Prisma| C[(PostgreSQL)]
    B -->|JWT| A
    B -->|API REST| D[Servicios externos]
```

Arquitectura típica: el navegador se comunica con el backend vía APIs REST, el backend gestiona la base de datos y devuelve respuestas en JSON.

## Buenas prácticas

- **Nunca guardes contraseñas en texto plano**. Usa `bcrypt` o `argon2`.
- **Valida todos los datos de entrada**. Zod o Joi.
- **Usa HTTPS siempre** en producción.
- **Rate limiting** en endpoints sensibles:

```bash
npm install express-rate-limit
```

```javascript
import rateLimit from 'express-rate-limit';
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, max: 20 }));
```

- **Logs estructurados**: `pino`, `winston`.
- **Manejo de errores centralizado**. Un middleware al final.
- **Nunca expongas stack traces** en producción.
- **Migraciones versionadas** con Prisma.
- **Tests de integración** con Vitest + Supertest.

## Ejercicios

1. Crea una API con un endpoint `GET /api/saludo` que devuelva un JSON.
2. Añade una ruta `POST /api/usuarios` con validación Zod.
3. Conecta PostgreSQL con Prisma y crea un modelo `Tarea`.
4. Implementa registro y login con JWT.
5. Protege una ruta `GET /api/perfil` con middleware de autenticación.
6. Añade CORS para permitir peticiones desde `localhost:5173`.
7. Despliega la API en Railway y pruébala con Postman o `curl`.
8. Conecta esta API a tu frontend del Capítulo 10.

---

⬅️ [Capítulo 18 — Arquitectura frontend](18-arquitectura.md) | ➡️ [Capítulo 20 — DevOps para frontend](20-devops.md)


## Diagrama: arquitectura full-stack

\`\`\`mermaid
flowchart LR
    A[Cliente<br/>Navegador] -->|HTTPS| B[Servidor<br/>Node.js + Express]
    B -->|Prisma| C[(PostgreSQL)]
    B -->|JWT| A
    B -->|API REST| D[Servicios externos]
\`\`\`

Flujo típico de una aplicación full-stack: el navegador se comunica con el backend mediante APIs REST, el backend gestiona la base de datos y devuelve respuestas en JSON.
