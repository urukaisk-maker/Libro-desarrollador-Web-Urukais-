# 09 — Despliegue

!!! quote "Ejercicio resuelto"
    Practica el despliegue de una web estática en GitHub Pages.

---

## 🎯 Objetivo

1. Crea un repositorio en GitHub.
2. Sube un \`index.html\` con un "Hola, mundo".
3. Activa GitHub Pages.
4. Verifica que la web es accesible.

---

## 💡 Solución

\`\`\`bash
# 1. Crear repo local
mkdir mi-web && cd mi-web
echo "<h1>Hola, mundo</h1>" > index.html

# 2. Inicializar git
git init
git add index.html
git commit -m "feat: primera versión"

# 3. Crear repo remoto en GitHub y conectar
git remote add origin https://github.com/tu-usuario/mi-web.git
git branch -M main
git push -u origin main
\`\`\`

**En GitHub**:

1. Settings → Pages.
2. Source: Deploy from a branch.
3. Branch: main, carpeta / (root).
4. Save.

Tu web estará en \`https://tu-usuario.github.io/mi-web/\`.

---

## 🧠 Conceptos clave

- GitHub Pages aloja sitios estáticos gratis.
- Necesitas un repositorio público (o Pro para privados).
- La rama y carpeta se configuran en Settings → Pages.

---

## 🚀 Retos extra

- [ ] Añade un dominio personalizado.
- [ ] Añade un archivo \`CNAME\`.
- [ ] Configura un workflow de GitHub Actions para desplegar automáticamente.

---

[← Ejercicio 08](08-apis.md){ .md-button }
[Ir al ejercicio 10 →](10-proyecto-final.md){ .md-button .md-button--primary }
