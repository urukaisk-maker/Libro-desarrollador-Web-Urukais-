# Capítulo 7 — Git y control de versiones

## ¿Qué es Git?

Git es un **sistema de control de versiones distribuido**. Guarda un historial de todos los cambios de un proyecto y permite volver atrás, trabajar en paralelo con otras personas y fusionar contribuciones sin pisarse.

!!! info "Git vs GitHub"
    **Git** es la herramienta que corre en tu ordenador. **GitHub** (o GitLab, Bitbucket…) es un servicio en la nube donde alojas tus repositorios Git. Puedes usar Git sin GitHub, pero no al revés.

## Conceptos clave

| Concepto | Qué es |
|---|---|
| **Repositorio** | Carpeta con historial de cambios (`.git/`) |
| **Commit** | Una "foto" del proyecto en un momento dado |
| **Rama (branch)** | Línea de desarrollo independiente |
| **Remote** | Repositorio remoto (ej. GitHub) |
| **Merge** | Fusionar una rama con otra |
| **Pull request** | Propuesta de fusionar cambios en GitHub |

## Configuración inicial

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
git config --global init.defaultBranch main
```

## Flujo básico

### Crear un repositorio

```bash
git init
```

### Ver el estado

```bash
git status
```

### Añadir cambios al "stage"

```bash
git add archivo.txt
git add .              # todo
```

### Confirmar los cambios

```bash
git commit -m "Mensaje descriptivo"
```

### Ver el historial

```bash
git log --oneline
git log --graph --oneline --all
```

### Subir a GitHub

```bash
git remote add origin https://github.com/usuario/repo.git
git push -u origin main
```

## Ramas

```bash
git branch                    # listar ramas
git checkout -b nueva-rama    # crear y cambiar
git switch nueva-rama         # cambiar (moderno)
git merge nueva-rama          # fusionar en la actual
git branch -d nueva-rama      # borrar
```

## Trabajar con repos existentes

```bash
git clone https://github.com/usuario/repo.git
git pull    # traer cambios del remoto
git fetch   # traer sin fusionar
```

## Buenas prácticas

- **Commits pequeños y atómicos**: un cambio lógico por commit.
- **Mensajes claros**: `feat: añadir login`, `fix: corregir typo en header`.
- **Conventional Commits**: usa prefijos (`feat`, `fix`, `docs`, `chore`, `refactor`, `test`).
- **Ramas con nombres descriptivos**: `feature/login`, `fix/menu-movil`.
- **Nunca subas secretos**: `.env`, claves API, contraseñas.

!!! warning "Cuidado con `git push --force`"
    Reescribe el historial remoto. Si otras personas están trabajando en la misma rama, puedes causarles conflictos graves. Úsalo solo en tus ramas personales.

## Ejercicios

1. Crea un repositorio nuevo en GitHub y súbelo desde tu ordenador.
2. Crea una rama, haz un cambio, fusiónala con `main`.
3. Practica `git log --graph --oneline --all` para visualizar el historial.
4. Añade un `.gitignore` que excluya `node_modules/` y `.env`.

---

⬅ [Capítulo 6 — Formularios HTML](06-formularios.md) | ➡ [Capítulo 8 — Consumo de APIs](08-apis.md)


## Diagrama: flujo de trabajo con Git

\`\`\`mermaid
gitGraph
    commit id: "init"
    commit id: "feat: capítulo 1"
    branch feature/apis
    checkout feature/apis
    commit id: "feat: capítulo 8"
    commit id: "test: API"
    checkout main
    merge feature/apis
    commit id: "docs: apéndices"
\`\`\`

Así se ve el flujo de trabajo típico con ramas: se crea una rama para una funcionalidad, se trabaja en ella, y se fusiona con la principal.
