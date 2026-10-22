# 19 — Full-stack con Node.js

!!! abstract "Qué vas a aprender"
    - Qué es Node.js y por qué se usa en el servidor.
    - Crear un servidor HTTP con Express.
    - Rutas, middlewares y controladores.
    - Bases de datos con PostgreSQL y Prisma.
    - Autenticación con JWT.

---

## 🟢 ¿Qué es Node.js?

**Node.js** es un entorno que permite ejecutar JavaScript **fuera del navegador**, en el servidor. Usa el motor V8 de Chrome y un modelo de I/O no bloqueante.

```bash
node --version   # v20.x o superior
npm --version
```

!!! quote "JavaScript en todas partes"
    Con Node.js puedes usar el mismo lenguaje en el frontend y el backend. Eso reduce la carga cognitiva y facilita compartir código.

---

## ⚡ Tu primer servidor con Express

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

## 🛣️ Rutas y middlewares

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

### Middleware de logging

```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

### Middleware de errores

```javascript
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Algo salió mal" });
});
```

---

## 🗄️ Base de datos con Prisma

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

## 🔐 Autenticación con JWT

```bash
npm install jsonwebtoken bcryptjs
```

```javascript
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET = process.env.JWT_SECRET;

// Registro
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

### Middleware de autenticación

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

// Ruta protegida
app.get("/perfil", auth, async (req, res) => {
  const usuario = await prisma.usuario.findUnique({
    where: { id: req.usuario.id },
    select: { id: true, nombre: true, email: true }
  });
  res.json(usuario);
});
```

!!! warning "Nunca guardes el JWT_SECRET en el código"
    Usa variables de entorno (.env) y nunca las subas a GitHub. Añade .env al .gitignore.

---

## 🚀 Despliegue del backend

| Plataforma | Ideal para |
| :--- | :--- |
| **Railway** | Node.js + PostgreSQL, muy fácil |
| **Render** | Node.js + PostgreSQL, tier gratis limitado |
| **Fly.io** | Node.js + Docker, global |
| **Vercel** | Serverless functions (sin servidor persistente) |

```bash
# Railway
npm install -g @railway/cli
railway login
railway init
railway up
```

---

## 📁 Estructura de un proyecto full-stack

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

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-19">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué es Node.js?</p>
<button class="quiz-option" data-opt="a">A) Un framework de frontend</button>
<button class="quiz-option" data-opt="b">B) Un entorno para ejecutar JavaScript en el servidor</button>
<button class="quiz-option" data-opt="c">C) Una base de datos</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué framework se usa para crear APIs en Node.js?</p>
<button class="quiz-option" data-opt="a">A) Express</button>
<button class="quiz-option" data-opt="b">B) React</button>
<button class="quiz-option" data-opt="c">C) Vue</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué estándar se usa para autenticación con tokens?</p>
<button class="quiz-option" data-opt="a">A) CSS</button>
<button class="quiz-option" data-opt="b">B) HTML</button>
<button class="quiz-option" data-opt="c">C) JWT</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2019%3A%20Full-stack%20con%20Node.js&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F19-fullstack-node%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F19-fullstack-node%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2019%3A%20Full-stack%20con%20Node.js%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F19-fullstack-node%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/19-fullstack-node/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 20 — DevOps para frontend](20-devops.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
