# 07 — Git

!!! quote "Ejercicio resuelto"
    Practica los comandos básicos de Git.

---

## 🎯 Objetivo

Simula el flujo básico de Git:

1. Inicializa un repositorio.
2. Crea un archivo \`index.html\`.
3. Haz un commit.
4. Crea una rama \`feature\`.
5. Añade un archivo \`style.css\` y haz commit.
6. Fusiona la rama en \`main\`.

---

## 💡 Solución

\`\`\`bash
# 1. Inicializar
git init
git config user.name "Tu Nombre"
git config user.email "tu@email.com"

# 2. Crear archivo y commit
echo "<h1>Hola</h1>" > index.html
git add index.html
git commit -m "feat: añadir index.html"

# 3. Rama
git checkout -b feature

# 4. Añadir CSS
echo "h1 { color: red; }" > style.css
git add style.css
git commit -m "feat: añadir estilos"

# 5. Volver a main y fusionar
git checkout main
git merge feature
\`\`\`

---

## 🧠 Conceptos clave

- \`git init\`: crea un repositorio vacío.
- \`git add\`: añade al staging.
- \`git commit -m\`: crea un commit.
- \`git checkout -b\`: crea y cambia a una rama.
- \`git merge\`: fusiona ramas.

---

## 🚀 Retos extra

- [ ] Sube el repositorio a GitHub con \`git remote add\` y \`git push\`.
- [ ] Crea un conflicto y resuélvelo.
- [ ] Usa \`git log --oneline --graph\` para ver el historial.

---

[← Ejercicio 06](06-formularios.md){ .md-button }
[Ir al ejercicio 08 →](08-apis.md){ .md-button .md-button--primary }
