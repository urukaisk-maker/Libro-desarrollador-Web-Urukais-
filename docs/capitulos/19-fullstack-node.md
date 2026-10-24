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


---

## 🔐 Autenticación con JWT

**JWT** (JSON Web Token) es el estándar para autenticar usuarios en APIs. El servidor firma un token que el cliente envía en cada petición.

### Instalación

~~~bash
npm install jsonwebtoken bcrypt
~~~

### Registrar usuario (hash de contraseña)

~~~javascript
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET; // nunca en el código

app.post("/api/registro", async (req, res) => {
    const { email, password } = req.body;

    // Validar que no exista
    const existe = await db.usuarios.findOne({ email });
    if (existe) return res.status(409).json({ error: "Email ya registrado" });

    // Hash de la contraseña (10 rondas)
    const hash = await bcrypt.hash(password, 10);

    const usuario = await db.usuarios.create({ email, password: hash });

    // Crear token (expira en 7 días)
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

### Middleware de autenticación

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

// Ruta protegida
app.get("/api/perfil", autenticar, (req, res) => {
    res.json({ usuario: req.usuario });
});
~~~

!!! warning "Nunca guardes contraseñas en texto plano"
    Siempre **hash** con `bcrypt` (o `argon2`). Nunca guardes la contraseña original. Y nunca devuelvas el hash en la respuesta de la API.

!!! tip "El secreto JWT va en variable de entorno"
    `JWT_SECRET` debe ser una cadena larga y aleatoria, guardada en `.env` (nunca en el código). Si se filtra, cualquiera puede firmar tokens válidos.

---

## ✅ Validación con Zod

**Zod** valida datos de entrada con un esquema declarativo. Ideal para APIs: nunca confíes en lo que llega del cliente.

### Instalación

~~~bash
npm install zod
~~~

### Esquema de registro

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
    // ... continuar con el registro
});
~~~

### Validación de query params

~~~javascript
const listadoSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    q: z.string().optional(),
});

app.get("/api/usuarios", (req, res) => {
    const { page, limit, q } = listadoSchema.parse(req.query);
    // page y limit son números, q es string o undefined
});
~~~

!!! tip "Valida en el borde de la aplicación"
    Valida **en el controlador** (al recibir la petición), no dentro de la lógica de negocio. Así el resto del código puede asumir datos válidos y no llenarse de `if`.

---

## 🏗 Estructura de proyecto escalable

Un proyecto fullstack que crece necesita una estructura clara. Esta es la que uso:

~~~text
mi-app/
├── src/
│   ├── config/
│   │   └── env.js            # variables de entorno validadas
│   ├── db/
│   │   ├── schema.js         # tablas / modelos
│   │   └── index.js          # conexión a la BD
│   ├── middlewares/
│   │   ├── auth.js           # autenticación JWT
│   │   └── error.js          # manejo de errores
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── usuarios.routes.js
│   ├── controllers/
│   │   └── usuarios.controller.js
│   ├── services/
│   │   └── usuarios.service.js
│   ├── schemas/
│   │   └── usuarios.schema.js # Zod
│   └── app.js                # configuración de Express
├── tests/
├── .env
├── package.json
└── server.js
~~~

### Separación de responsabilidades

| Capa | Responsabilidad |
| :--- | :--- |
| **routes** | Definir URLs y métodos |
| **controllers** | Validar entrada, llamar a services, devolver respuesta |
| **services** | Lógica de negocio (reutilizable, testeable) |
| **db** | Acceso a datos (queries, ORM) |

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

!!! tip "Los servicios no saben de HTTP"
    Un `service` recibe datos, hace su trabajo y devuelve el resultado. No toca `req` ni `res`. Así puedes reutilizarlo desde una CLI, un job, o un test sin levantar el servidor.

---

## 🚨 Manejo de errores centralizado

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
app.use(errorHandler); // siempre al final
~~~

!!! warning "Nunca devuelvas el stack trace en producción"
    En desarrollo está bien para depurar, pero en producción expone información sensible (rutas, versiones, lógica interna). Devuelve un mensaje genérico y loguea el detalle en el servidor.

---

## 🧠 Quiz de repaso

!!! question "Comprueba lo aprendido"

??? success "1. ¿Por qué hashear la contraseña con bcrypt en lugar de guardarla tal cual?"
    Porque si la base de datos se filtra, las contraseñas no quedan expuestas. `bcrypt` añade una **sal** única por contraseña y es lento a propósito, lo que dificulta ataques de fuerza bruta.

??? success "2. ¿Dónde debe guardarse el secreto JWT?"
    En una **variable de entorno** (`.env`), nunca en el código. Si se filtra, cualquiera puede firmar tokens válidos y hacerse pasar por cualquier usuario.

??? success "3. ¿Qué ventaja tiene validar con Zod en el controlador?"
    Que el resto de la aplicación puede **asumir datos válidos**. Si validas en el borde (el controlador), los services y la lógica de negocio no necesitan llenarse de `if` comprobando tipos.

??? success "4. ¿Por qué los servicios no deben tocar `req` ni `res`?"
    Porque así son **reutilizables** desde cualquier sitio (tests, CLI, jobs) sin depender de HTTP. La lógica de negocio queda aislada de Express.

---

## 📚 Recursos

- [jsonwebtoken — Docs](https://github.com/auth0/node-jsonwebtoken)
- [bcrypt — Docs](https://github.com/kelektiv/node.bcrypt.js)
- [Zod — Docs](https://zod.dev/)
- [Express — Middleware](https://expressjs.com/en/guide/using-middleware.html)
- [OWASP — Autenticación](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Prisma — Docs (ORM moderno)](https://www.prisma.io/docs)

---

➡️ Siguiente capítulo: [20 — DevOps para frontend](20-devops.md)
