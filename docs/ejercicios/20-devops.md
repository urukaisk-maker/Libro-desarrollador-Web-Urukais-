# 20 — DevOps

!!! quote "Ejercicio resuelto"
    Practica la automatización con GitHub Actions.

---

## 🎯 Objetivo

Crea un workflow que se ejecute en cada push a \`main\` y:

1. Instale dependencias.
2. Ejecute tests.
3. Construya el proyecto.

---

## 💡 Solución

\`\`\`yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - run: npm ci
      - run: npm test
      - run: npm run build
\`\`\`

---

## 🧠 Conceptos clave

- \`on\`: eventos que disparan el workflow.
- \`jobs\`: tareas que se ejecutan.
- \`steps\`: pasos dentro de un job.
- \`actions/checkout\`: clona el repo.
- \`actions/setup-node\`: instala Node.js.

---

## 🚀 Retos extra

- [ ] Añade un paso de deploy a GitHub Pages.
- [ ] Usa una matriz para testear en Node 18 y 20.
- [ ] Añade un paso de linting con ESLint.

---

[← Ejercicio 19](19-fullstack-node.md){ .md-button }
[Volver al índice](index.md){ .md-button .md-button--primary }
