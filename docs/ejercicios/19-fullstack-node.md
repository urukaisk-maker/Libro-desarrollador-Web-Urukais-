# 19 — Full-stack con Node.js

!!! quote "Ejercicio resuelto"
    Practica la creación de una API REST con Express.

---

## 🎯 Objetivo

Crea una API REST con:

1. \`GET /api/tareas\`: devuelve todas las tareas.
2. \`POST /api/tareas\`: crea una tarea.
3. \`DELETE /api/tareas/:id\`: elimina una tarea.

---

## 💡 Solución

\`\`\`bash
npm init -y
npm install express
\`\`\`

\`\`\`javascript
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
\`\`\`

\`\`\`bash
node server.js
\`\`\`

---

## 🧠 Conceptos clave

- \`express.json()\`: middleware para parsear JSON.
- \`req.body\`: datos enviados en el body.
- \`req.params\`: parámetros de la URL.
- Códigos HTTP: 200, 201, 204.

---

## 🚀 Retos extra

- [ ] Añade un \`PUT /api/tareas/:id\` para actualizar.
- [ ] Persiste las tareas en un archivo JSON.
- [ ] Conecta con PostgreSQL y Prisma.

---

[← Ejercicio 18](18-arquitectura.md){ .md-button }
[Ir al ejercicio 20 →](20-devops.md){ .md-button .md-button--primary }
