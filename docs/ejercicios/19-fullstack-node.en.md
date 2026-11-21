---
description: "Solved exercise 19: 19 — Full-stack with Node.js. Step-by-step annotated solution from the Web Developer Book."
---
# 19 — Full-stack with Node.js

!!! quote "Solved exercise"
    Practice building a REST API with Express.

---

## 🎯 Goal

Create a REST API with:

1. `GET /api/tareas`: returns all tasks.
2. `POST /api/tareas`: creates a task.
3. `DELETE /api/tareas/:id`: deletes a task.

---

## 💡 Solution

```bash
npm init -y
npm install express
```

```javascript
// server.js
import express from 'express';

const app = express();
app.use(express.json());

let tareas = [
  { id: 1, texto: 'Aprender Node.js', completada: false }
];

app.get('/api/tareas', (req, res) => {
  res.json(tareas);
});

app.post('/api/tareas', (req, res) => {
  const nueva = {
    id: Date.now(),
    texto: req.body.texto,
    completada: false
  };
  tareas.push(nueva);
  res.status(201).json(nueva);
});

app.delete('/api/tareas/:id', (req, res) => {
  const id = Number(req.params.id);
  tareas = tareas.filter(t => t.id !== id);
  res.status(204).end();
});

app.listen(3000, () => console.log('http://localhost:3000'));
```

```bash
node server.js
```

---

## 🧠 Key concepts

- `express.json()`: middleware to parse JSON.
- `req.body`: data sent in the request body.
- `req.params`: URL route parameters.
- HTTP status codes: 200, 201, 204.

---

## 🚀 Bonus challenges

- [ ] Add a `PUT /api/tareas/:id` endpoint to update tasks.
- [ ] Persist tasks to a JSON file.
- [ ] Connect to PostgreSQL and Prisma.

---

[← Exercise 18](18-arquitectura.md){ .md-button }
[Go to exercise 20 →](20-devops.md){ .md-button .md-button--primary }
