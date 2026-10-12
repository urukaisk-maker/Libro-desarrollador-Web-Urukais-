# Ejercicios resueltos — Capítulo 7

[Volver al índice](index.md) · [Capítulo original](../capitulos/07-git.md)

## Ejercicio 1: Crear un repositorio y subirlo

> Crea un repositorio nuevo en GitHub y súbelo desde tu ordenador.

### Solución

```bash
# En GitHub: crear repositorio vacío (sin README, sin .gitignore)

# En local:
mkdir mi-proyecto && cd mi-proyecto
git init
git branch -M main

echo "# Mi proyecto" > README.md
git add README.md
git commit -m "chore: primer commit"

git remote add origin https://github.com/TU_USUARIO/mi-proyecto.git
git push -u origin main
```

**Explicación:**
- `git init` → crea el repositorio local.
- `git branch -M main` → renombra la rama a `main` (estándar actual).
- `git push -u origin main` → sube y establece el upstream.

---

## Ejercicio 2: Crear rama, cambio y merge

> Crea una rama, haz un cambio, fusiónala con `main`.

### Solución

```bash
git checkout -b feature/saludo
echo "Hola" > saludo.txt
git add saludo.txt
git commit -m "feat: añadir saludo"

git checkout main
git merge feature/saludo
git push
```

**Explicación:**
- `-b` → crea y cambia a la rama nueva.
- El merge se hace desde `main` (la rama destino).
- Después puedes borrar la rama: `git branch -d feature/saludo`.

---

## Ejercicio 3: Ver el historial

> Practica `git log --graph --oneline --all`.

### Solución

```bash
git log --graph --oneline --all
```

Salida típica:

```
* 3a4b5c6 (HEAD -> main) feat: añadir saludo
* 1f2e3d4 chore: primer commit
```

Con ramas y merges se ve más útil:

```
*   merge commit
|\
| * feat: nueva funcionalidad
|/
* chore: base
```

---

## Ejercicio 4: `.gitignore`

> Añade un `.gitignore` que excluya `node_modules/` y `.env`.

### Solución

Archivo `.gitignore`:

```
# Dependencias
node_modules/

# Variables de entorno
.env
.env.local

# Sistema
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/

# Build
dist/
build/
```

**Comandos para aplicarlo:**

```bash
git add .gitignore
git commit -m "chore: añadir .gitignore"
git push
```

!!! warning "Si ya has subido algo por error"
    ```bash
    git rm --cached archivo-indeseado.txt
    git commit -m "chore: quitar archivo del repo"
    ```
    El `--cached` mantiene el archivo en disco pero lo quita del control de versiones.

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/07-git.md)
