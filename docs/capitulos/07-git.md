# 07 — Git y control de versiones

!!! abstract "Qué vas a aprender"
    - Qué es el control de versiones y por qué es imprescindible.
    - Los comandos básicos de Git.
    - Cómo trabajar con ramas.
    - Cómo conectar con GitHub.
    - Resolver conflictos.

---

## 🌳 ¿Qué es Git?

**Git** es un sistema de control de versiones distribuido. Guarda un historial de todos los cambios de un proyecto, permite volver atrás, trabajar en paralelo con otras personas y fusionar cambios sin perder nada.

!!! quote "Sin Git, estás perdido"
    Si alguna vez has tenido archivos como \`proyecto-final-v2-ahora-si-que-si.docx\`, Git es la solución. Un solo historial, todos los cambios, sin duplicados.

---

## ⚙️ Configuración inicial

\`\`\`bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
git config --global init.defaultBranch main
git config --global core.editor "code --wait"
\`\`\`

Esto se hace **una sola vez** en cada equipo.

---

## 📦 Comandos básicos

| Comando | Uso |
| :--- | :--- |
| \`git init\` | Inicializar un repositorio |
| \`git clone <url>\` | Clonar un repositorio remoto |
| \`git status\` | Ver el estado de los archivos |
| \`git add <file>\` | Añadir al staging |
| \`git add .\` | Añadir todo |
| \`git commit -m "mensaje"\` | Crear un commit |
| \`git log --oneline\` | Ver el historial compacto |
| \`git diff\` | Ver cambios sin stage |
| \`git diff --staged\` | Ver cambios en stage |

---

## 🔄 El flujo básico

\`\`\`bash
# 1. Ver qué ha cambiado
git status

# 2. Añadir cambios al staging
git add archivo.txt

# 3. Crear un commit con un mensaje descriptivo
git commit -m "feat: añadir página de contacto"

# 4. Subir al repositorio remoto
git push origin main
\`\`\`

!!! tip "Buenos mensajes de commit"
    - \`feat:\` nueva funcionalidad
    - \`fix:\` corrección de bug
    - \`docs:\` cambios en documentación
    - \`style:\` cambios de formato (no afectan al comportamiento)
    - \`refactor:\` reestructuración sin cambiar comportamiento
    - \`test:\` añadir o modificar tests

---

## 🌿 Ramas

Las **ramas** permiten trabajar en paralelo sin afectar a \`main\`.

\`\`\`bash
# Crear y cambiar a una rama nueva
git checkout -b feature/nueva-funcionalidad

# Ver todas las ramas
git branch

# Cambiar de rama
git checkout main

# Fusionar una rama en la actual
git merge feature/nueva-funcionalidad

# Eliminar una rama (ya fusionada)
git branch -d feature/nueva-funcionalidad
\`\`\`

| Comando | Uso |
| :--- | :--- |
| \`git branch\` | Listar ramas |
| \`git branch nombre\` | Crear rama |
| \`git checkout nombre\` | Cambiar de rama |
| \`git checkout -b nombre\` | Crear y cambiar |
| \`git merge rama\` | Fusionar rama en la actual |
| \`git branch -d rama\` | Eliminar rama |

---

## ☁️ GitHub

**GitHub** es una plataforma para alojar repositorios Git y colaborar.

\`\`\`bash
# Conectar un repo local con GitHub
git remote add origin https://github.com/usuario/repo.git

# Subir la rama main por primera vez
git push -u origin main

# Descargar cambios
git pull origin main

# Ver remotos configurados
git remote -v
\`\`\`

!!! tip "Pull Requests"
    En GitHub, un **Pull Request (PR)** es una propuesta de fusionar los cambios de una rama en otra. Permite revisar el código, comentar y aprobar antes de fusionar.

---

## ⚔️ Resolver conflictos

Un **conflicto** ocurre cuando dos ramas modifican la misma línea de un archivo. Git no sabe cuál elegir y te pide que decidas tú.

\`\`\`
<<<<<<< HEAD
tu versión
=======
versión de la otra rama
>>>>>>> feature/otra-rama
\`\`\`

Para resolverlo:

1. Abre el archivo y elige la versión correcta (o combina ambas).
2. Elimina las marcas \`<<<<<<<\`, \`=======\`, \`>>>>>>>\`.
3. \`git add archivo\`
4. \`git commit\`

!!! warning "No entres en pánico"
    Los conflictos son normales. Léelos con calma, entiende qué cambió cada rama y decide. Git nunca pierde información: si algo sale mal, puedes volver atrás con \`git merge --abort\`.

---

## ↩️ Deshacer cambios

\`\`\`bash
# Descartar cambios sin stage
git restore archivo.txt

# Quitar del stage
git restore --staged archivo.txt

# Deshacer el último commit (mantiene los cambios)
git reset HEAD~1

# Deshacer el último commit (elimina los cambios)
git reset --hard HEAD~1

# Revertir un commit concreto (crea otro commit)
git revert <hash>
\`\`\`

!!! warning "Cuidado con --hard"
    \`git reset --hard\` **borra** los cambios sin posibilidad de recuperarlos. Úsalo solo cuando estés seguro.

---

## 🧰 Stash

El **stash** guarda cambios temporalmente para que puedas cambiar de rama sin commitear.

\`\`\`bash
git stash              # guardar cambios
git stash list         # listar stashes
git stash pop          # recuperar y eliminar
git stash apply        # recuperar sin eliminar
git stash drop         # eliminar un stash
\`\`\`

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-7">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué comando crea un commit?</p>
<button class="quiz-option" data-opt="a">A) git add</button>
<button class="quiz-option" data-opt="b">B) git commit -m "mensaje"</button>
<button class="quiz-option" data-opt="c">C) git push</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué comando crea y cambia a una rama nueva?</p>
<button class="quiz-option" data-opt="a">A) git checkout -b nombre</button>
<button class="quiz-option" data-opt="b">B) git branch nombre</button>
<button class="quiz-option" data-opt="c">C) git merge nombre</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué comando sube los cambios al repositorio remoto?</p>
<button class="quiz-option" data-opt="a">A) git pull</button>
<button class="quiz-option" data-opt="b">B) git commit</button>
<button class="quiz-option" data-opt="c">C) git push</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%207%3A%20Git%20y%20control%20de%20versiones&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F07-git%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F07-git%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%207%3A%20Git%20y%20control%20de%20versiones%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F07-git%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/07-git/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 8 — Consumo de APIs con fetch](08-apis.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
