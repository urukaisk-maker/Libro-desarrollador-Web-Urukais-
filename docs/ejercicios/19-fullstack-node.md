# Ejercicios resueltos — Capítulo 19

[Volver al índice](index.md) · [Capítulo original](../capitulos/19-fullstack-node.md)

## Ejercicio 1: Endpoint GET

> Crea una API con un endpoint `GET /api/saludo`.

### Solución

```javascript
// src/server.js
import express from 'express';

const app = express();

app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: 'Hola desde Node.js' });
});

app.listen(3000, () => console.log('http://localhost:3000'));
```

Ejecuta:

```bash
npm run dev
curl http://localhost:3000/api/saludo
```

---

## Ejercicio 2: POST con validación Zod

> Añade una ruta `POST /api/usuarios` con validación Zod.

### Solución

```javascript
import express from 'express';
import { z } from 'zod';

const app = express();
app.use(express.json());

const schemaUsuario = z.object({
  nombre: z.string().min(2).max(50),
  email: z.string().email(),
});

app.post('/api/usuarios', (req, res) => {
  const resultado = schemaUsuario.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({
      errores: resultado.error.issues.map(i => ({
        campo: i.path.join('.'),
        mensaje: i.message,
      })),
    });
  }

  res.status(201).json({
    mensaje: 'Usuario creado',
    usuario: resultado.data,
  });
});
```

---

## Ejercicio 3: Modelo Tarea con Prisma

> Conecta PostgreSQL con Prisma y crea un modelo `Tarea`.

### Solución

`prisma/schema.prisma`:

```prisma
model Tarea {
  id        Int      @id @default(autoincrement())
  titulo    String
  completada Boolean @default(false)
  creadaEn  DateTime @default(now())
}
```

Migración:

```bash
npx prisma migrate dev --name add-tarea
```

Endpoints:

```javascript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

app.get('/api/tareas', async (req, res) => {
  const tareas = await prisma.tarea.findMany();
  res.json(tareas);
});

app.post('/api/tareas', async (req, res) => {
  const tarea = await prisma.tarea.create({
    data: { titulo: req.body.titulo },
  });
  res.status(201).json(tarea);
});

app.patch('/api/tareas/:id', async (req, res) => {
  const tarea = await prisma.tarea.update({
    where: { id: Number(req.params.id) },
    data: { completada: req.body.completada },
  });
  res.json(tarea);
});

app.delete('/api/tareas/:id', async (req, res) => {
  await prisma.tarea.delete({ where: { id: Number(req.params.id) } });
  res.status(204).end();
});
```

---

## Ejercicio 4: Registro y login con JWT

> Implementa registro y login con JWT.

### Solución

```javascript
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

app.post('/api/auth/registro', async (req, res) => {
  const { nombre, email, password } = req.body;

  const existe = await prisma.usuario.findUnique({ where: { email } });
  if (existe) return res.status(409).json({ error: 'Email en uso' });

  const hash = await bcrypt.hash(password, 12);
  const usuario = await prisma.usuario.create({
    data: { nombre, email, password: hash },
  });

  const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.status(201).json({ token, usuario: { id: usuario.id, nombre, email } });
});

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

---

## Ejercicio 5: Middleware de autenticación

> Protege una ruta `GET /api/perfil`.

### Solución

```javascript
import jwt from 'jsonwebtoken';

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

app.get('/api/perfil', autenticar, async (req, res) => {
  const usuario = await prisma.usuario.findUnique({
    where: { id: req.usuario.id },
    select: { id: true, nombre: true, email: true },
  });
  res.json(usuario);
});
```

---

## Ejercicio 6: CORS

> Añade CORS para permitir peticiones desde `localhost:5173`.

### Solución

```javascript
import cors from 'cors';

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://libro.urukais.com',
  ],
  credentials: true,
}));
```

---

## Ejercicio 7: Desplegar en Railway

> Despliega la API en Railway.

### Solución

1. **Crea cuenta** en [railway.app](https://railway.app).
2. **New Project** → **Deploy from GitHub repo**.
3. Selecciona tu repo.
4. **Add plugin** → **PostgreSQL**.
5. Railway añade `DATABASE_URL` automáticamente.
6. Configura variables extra (`JWT_SECRET`, `PORT`).
7. Railway despliega en cada push.

---

## Ejercicio 8: Conectar la API al frontend

> Conecta esta API a tu frontend del Capítulo 10.

### Solución

```javascript
// cliente.js
const API = 'https://tu-api.up.railway.app';

export async function login(email, password) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Credenciales inválidas');
  const { token } = await res.json();
  localStorage.setItem('token', token);
  return token;
}

export async function obtenerPerfil() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/api/perfil`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('No autorizado');
  return res.json();
}
```

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/19-fullstack-node.md)
