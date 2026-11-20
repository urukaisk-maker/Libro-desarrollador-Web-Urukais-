---
description: "Chapter 19 of the Web Developer's Book: 19 — Full-Stack with Node.js. Learn step by step with examples, exercises, and quizzes."
---
# 19 — Full-Stack with Node.js

!!! abstract "What you will learn"
    - What Node.js is and why it is used on the server.
    - Creating an HTTP server with Express.
    - Routes, middlewares, and controllers.
    - Databases with PostgreSQL and Prisma.
    - Authentication with JWT.

---

## 🟢 What is Node.js?

**Node.js** is a runtime environment that lets you run JavaScript **outside the browser**, on the server. It uses Chrome's V8 engine and a non-blocking I/O model.

```bash
node --version   # v20.x or higher
npm --version
```

!!! quote "JavaScript everywhere"
    With Node.js you can use the same language on the frontend and backend. That reduces cognitive load and makes sharing code easier.

---

## ⚡ Your First Server with Express

```bash
mkdir mi-api && cd mi-api
npm init -y
npm install express
```

```javascript
// index.js
import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensaje: "Hola, mundo" });
});

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});
```

```bash
node index.js
```

---

## 🛣 Routes and Middlewares

```javascript
app.get("/usuarios", (req, res) => {
  res.json([{ id: 1, nombre: "Ana" }]);
});

app.get("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  res.json({ id, nombre: "Ana" });
});

app.post("/usuarios", (req, res) => {
  const { nombre } = req.body;
  res.status(201).json({ id: Date.now(), nombre });
});

app.delete("/usuarios/:id", (req, res) => {
  res.status(204).end();
});
```

### Logging Middleware

```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

### Error Middleware

```javascript
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Algo salió mal" });
});
```

---

## 🗄 Database with Prisma

```bash
npm install prisma @prisma/client
npx prisma init
```

```prisma
// prisma/schema.prisma
model Usuario {
  id        Int      @id @default(autoincrement())
  nombre    String
  email     String   @unique
  password  String
  creadoEn  DateTime @default(now())
}
```

```bash
npx prisma migrate dev --name init
npx prisma generate
```

```javascript
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

app.get("/usuarios", async (req, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
});
```

---

## 🔐 Authentication with JWT

```bash
npm install jsonwebtoken bcryptjs
```

```javascript
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET = process.env.JWT_SECRET;

// Register
app.post("/registro", async (req, res) => {
  const { nombre, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const usuario = await prisma.usuario.create({
    data: { nombre, email, password: hash }
  });
  res.status(201).json({ id: usuario.id });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario) return res.status(401).json({ error: "Credenciales inválidas" });

  const valido = await bcrypt.compare(password, usuario.password);
  if (!valido) return res.status(401).json({ error: "Credenciales inválidas" });

  const token = jwt.sign({ id: usuario.id }, SECRET, { expiresIn: "7d" });
  res.json({ token });
});
```

### Authentication Middleware

```javascript
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "Sin token" });

  const token = header.split(" ")[1];
  try {
    req.usuario = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
}

// Protected route
app.get("/perfil", auth, async (req, res) => {
  const usuario = await prisma.usuario.findUnique({
    where: { id: req.usuario.id },
    select: { id: true, nombre: true, email: true }
  });
  res.json(usuario);
});
```

!!! warning "Never store JWT_SECRET in code"
    Use environment variables (.env) and never push them to GitHub. Add .env to .gitignore.

---

## 🚀 Deploying the Backend

| Platform | Best for |
| :--- | :--- |
| **Railway** | Node.js + PostgreSQL, very easy |
| **Render** | Node.js + PostgreSQL, limited free tier |
| **Fly.io** | Node.js + Docker, global |
| **Vercel** | Serverless functions (no persistent server) |

```bash
# Railway
npm install -g @railway/cli
railway login
railway init
railway up
```

---

## 📁 Full-Stack Project Structure

```
mi-api/
├── src/
│   ├── routes/
│   │   ├── usuarios.js
│   │   └── auth.js
│   ├── middlewares/
│   │   └── auth.js
│   ├── controllers/
│   ├── services/
│   └── index.js
├── prisma/
│   └── schema.prisma
├── .env
├── .gitignore
└── package.json
```

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-19">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> What is Node.js?</p>
<button class="quiz-option" data-opt="a">A) A frontend framework</button>
<button class="quiz-option" data-opt="b">B) A runtime to execute JavaScript on the server</button>
<button class="quiz-option" data-opt="c">C) A database</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> Which framework is used to build APIs in Node.js?</p>
<button class="quiz-option" data-opt="a">A) Express</button>
<button class="quiz-option" data-opt="b">B) React</button>
<button class="quiz-option" data-opt="c">C) Vue</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> Which standard is used for token-based authentication?</p>
<button class="quiz-option" data-opt="a">A) CSS</button>
<button class="quiz-option" data-opt="b">B) HTML</button>
<button class="quiz-option" data-opt="c">C) JWT</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2019%3A%20Full-Stack%20with%20Node.js&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F19-fullstack-node%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F19-fullstack-node%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%2019%3A%20Full-Stack%20with%20Node.js%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F19-fullstack-node%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/19-fullstack-node/" aria-label="Copy link">Copy link</button>
</div>

---

## ➡ Next Step

[Go to Chapter 20 — DevOps para frontend](20-devops.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }



---

## 🔐 Authentication with JWT

**JWT** (JSON Web Token) is the standard for authenticating users in APIs. The server signs a token that the client sends on every request.

### Installation

~~~bash
npm install jsonwebtoken bcrypt
~~~

### Register User (Password Hashing)

~~~javascript
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET; // never in code

app.post("/api/registro", async (req, res) => {
    const { email, password } = req.body;

    // Check if it already exists
    const existe = await db.usuarios.findOne({ email });
    if (existe) return res.status(409).json({ error: "Email ya registrado" });

    // Hash password (10 rounds)
    const hash = await bcrypt.hash(password, 10);

    const usuario = await db.usuarios.create({ email, password: hash });

    // Create token (expires in 7 days)
    const token = jwt.sign({ id: usuario.id, email }, SECRET, { expiresIn: "7d" });

    res.status(201).json({ token, usuario: { id: usuario.id, email } });
});
~~~

### Login

~~~javascript
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    const usuario = await db.usuarios.findOne({ email });
    if (!usuario) return res.status(401).json({ error: "Credenciales inválidas" });

    const valida = await bcrypt.compare(password, usuario.password);
    if (!valida) return res.status(401).json({ error: "Credenciales inválidas" });

    const token = jwt.sign({ id: usuario.id, email }, SECRET, { expiresIn: "7d" });
    res.json({ token });
});
~~~

### Authentication Middleware

~~~javascript
function autenticar(req, res, next) {
    const auth = req.headers.authorization || "";
    const token = auth.replace("Bearer ", "");

    if (!token) return res.status(401).json({ error: "Token requerido" });

    try {
        req.usuario = jwt.verify(token, SECRET);
        next();
    } catch (err) {
        res.status(401).json({ error: "Token inválido o expirado" });
    }
}

// Protected route
app.get("/api/perfil", autenticar, (req, res) => {
    res.json({ usuario: req.usuario });
});
~~~

!!! warning "Never store passwords in plain text"
    Always **hash** with `bcrypt` (or `argon2`). Never store the raw password. And never return the hash in the API response.

!!! tip "Keep the JWT secret in an environment variable"
    `JWT_SECRET` must be a long, random string stored in `.env` (never in code). If it leaks, anyone can sign valid tokens.

---

## ✅ Validation with Zod

**Zod** validates input data using a declarative schema. Essential for APIs: never trust data coming from the client.

### Installation

~~~bash
npm install zod
~~~

### Registration Schema

~~~javascript
import { z } from "zod";

const registroSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Mínimo 8 caracteres").max(100),
    nombre: z.string().min(2, "Mínimo 2 caracteres").optional(),
});

app.post("/api/registro", async (req, res) => {
    const resultado = registroSchema.safeParse(req.body);

    if (!resultado.success) {
        return res.status(400).json({ errores: resultado.error.errors });
    }

    const { email, password, nombre } = resultado.data;
    // ... continue with registration
});
~~~

### Query Params Validation

~~~javascript
const listadoSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    q: z.string().optional(),
});

app.get("/api/usuarios", (req, res) => {
    const { page, limit, q } = listadoSchema.parse(req.query);
    // page and limit are numbers, q is string or undefined
});
~~~

!!! tip "Validate at the boundary of the application"
    Validate **in the controller** (when receiving the request), not inside business logic. That way the rest of the code can assume valid data without filling up with `if` checks.

---

## 🏗 Scalable Project Structure

A growing full-stack project needs a clear structure. This is the one I use:

~~~text
mi-app/
├── src/
│   ├── config/
│   │   └── env.js            # validated environment variables
│   ├── db/
│   │   ├── schema.js         # tables / models
│   │   └── index.js          # DB connection
│   ├── middlewares/
│   │   ├── auth.js           # JWT authentication
│   │   └── error.js          # error handling
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── usuarios.routes.js
│   ├── controllers/
│   │   └── usuarios.controller.js
│   ├── services/
│   │   └── usuarios.service.js
│   ├── schemas/
│   │   └── usuarios.schema.js # Zod
│   └── app.js                # Express setup
├── tests/
├── .env
├── package.json
└── server.js
~~~

### Separation of Concerns

| Layer | Responsibility |
| :--- | :--- |
| **routes** | Define URLs and HTTP methods |
| **controllers** | Validate input, call services, return response |
| **services** | Business logic (reusable, testable) |
| **db** | Data access (queries, ORM) |

~~~javascript
// routes/usuarios.routes.js
import { Router } from "express";
import { autenticar } from "../middlewares/auth.js";
import * as ctrl from "../controllers/usuarios.controller.js";

const router = Router();
router.get("/", autenticar, ctrl.listar);
router.get("/:id", autenticar, ctrl.obtener);
router.post("/", ctrl.crear);

export default router;
~~~

~~~javascript
// controllers/usuarios.controller.js
import * as service from "../services/usuarios.service.js";
import { registroSchema } from "../schemas/usuarios.schema.js";

export async function listar(req, res, next) {
    try {
        const usuarios = await service.listar();
        res.json(usuarios);
    } catch (err) {
        next(err);
    }
}

export async function crear(req, res, next) {
    try {
        const datos = registroSchema.parse(req.body);
        const usuario = await service.crear(datos);
        res.status(201).json(usuario);
    } catch (err) {
        next(err);
    }
}
~~~

!!! tip "Services don't know about HTTP"
    A `service` receives data, does its work, and returns the result. It doesn't touch `req` or `res`. That lets you reuse it from a CLI, a job, or a test without starting the server.

---

## 🚨 Centralized Error Handling

~~~javascript
// middlewares/error.js
export function errorHandler(err, req, res, next) {
    console.error(err);

    if (err.name === "ZodError") {
        return res.status(400).json({ errores: err.errors });
    }

    if (err.code === "P2002") {
        return res.status(409).json({ error: "Recurso duplicado" });
    }

    res.status(err.status || 500).json({
        error: err.message || "Error interno del servidor",
    });
}

// app.js
app.use(errorHandler); // always at the end
~~~

!!! warning "Never return stack traces in production"
    In development it's fine for debugging, but in production it exposes sensitive info (paths, versions, internal logic). Return a generic message and log details on the server.

---

## 🧠 Review Quiz

!!! question "Check what you learned"

??? success "1. Why hash passwords with bcrypt instead of storing them as-is?"
    Because if the database leaks, passwords aren't exposed. `bcrypt` adds a unique **salt** per password and is intentionally slow, making brute-force attacks harder.

??? success "2. Where should the JWT secret be stored?"
    In an **environment variable** (`.env`), never in code. If it leaks, anyone can sign valid tokens and impersonate any user.

??? success "3. What is the advantage of validating with Zod in the controller?"
    The rest of the application can **assume valid data**. When you validate at the boundary (the controller), services and business logic don't fill up with type-checking `if` statements.

??? success "4. Why shouldn't services touch `req` or `res`?"
    Because that keeps them **reusable** anywhere (tests, CLI, jobs) without depending on HTTP. Business logic stays isolated from Express.

---

## 📚 Resources

- [jsonwebtoken — Docs](https://github.com/auth0/node-jsonwebtoken)
- [bcrypt — Docs](https://github.com/kelektiv/node.bcrypt.js)
- [Zod — Docs](https://zod.dev/)
- [Express — Middleware](https://expressjs.com/en/guide/using-middleware.html)
- [OWASP — Authentication](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Prisma — Docs (Modern ORM)](https://www.prisma.io/docs)

---

➡ Next chapter: [20 — DevOps para frontend](20-devops.md)