<div align="center">

# 📘 Libro del Desarrollador Web — Urukais

**El manual definitivo para aprender desarrollo web en español. Desde los cimientos hasta la vanguardia tecnológica.**

[![MkDocs](https://img.shields.io/badge/MkDocs-1.6-blue?logo=markdown&logoColor=white)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material_for_MkDocs-9.7-6a5acd?logo=materialdesign&logoColor=white)](https://squidfunk.github.io/mkdocs-material/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-live-success?logo=github)](https://libro.urukais.com)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/releases)
[![Python 3.12](https://img.shields.io/badge/Python-3.12-blue?logo=python&logoColor=white)](https://www.python.org/)

[🌐 Ver el libro](https://libro.urukais.com) · [📖 Documentación](https://libro.urukais.com/introduccion/) · [🐛 Reportar error](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues/new) · [💬 Discussions](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/discussions)

</div>

---

## 🎉 Estado del proyecto: **COMPLETO** ✅

| Métrica | Valor |
| :--- | :--- |
| **Capítulos** | 38 / 38 ✅ |
| **Ejercicios resueltos** | 30 / 30 ✅ |
| **Retos semanales** | 5 / 5 ✅ |
| **Niveles** | 7 / 7 ✅ |
| **Diagramas Mermaid** | 14 ✅ |
| **Páginas principales** | 25+ ✅ |
| **Apéndices** | 4 ✅ |
| **Versión** | 1.0.0 🎉 |

> *"Aprender a programar es como aprender a tocar un instrumento: hace falta practicar, equivocarse y volver a intentarlo."*

---

## 🚀 Sobre el proyecto

**Libro del Desarrollador Web** es una plataforma educativa de código abierto diseñada para llevar a cualquier persona desde sus primeros pasos en HTML hasta las arquitecturas más complejas del desarrollo moderno.

No es solo un libro de texto; es un **entorno de aprendizaje interactivo** con quizzes, editores de código en vivo, sistema de logros y certificados.

---

## ✨ Características principales

- **📚 38 capítulos** organizados en **7 niveles** (desde Principiante hasta Vanguardia).
- **✅ 30 ejercicios resueltos**: soluciones comentadas para practicar.
- **🧠 Quizzes interactivos**: tests al final de cada capítulo.
- **💻 Editores de código en vivo**: prueba HTML, CSS y JS directamente en la página.
- **🧪 Laboratorios StackBlitz**: entornos Node.js reales en el navegador.
- **🏆 Sistema de logros y certificación**: genera tu certificado en PDF.
- **📁 Proyectos guiados**: tutoriales paso a paso (Lista de Tareas, Portfolio, El Niño…).
- **📊 14 diagramas de arquitectura**: creados con Mermaid.js.
- **💬 Comentarios (Giscus)**: debate en cada capítulo usando GitHub Discussions.
- **🌙 Modo oscuro/claro**: con diseño Ultra-Premium (glassmorphism, gradientes).
- **📱 PWA**: instalable y funcional sin conexión.
- **🌍 Comunidad activa**: Diario, Agenda, Retos Semanales y Hall of Fame.

---

## 🗺️ Niveles del libro

| Nivel | Capítulos | Descripción |
| :--- | :--- | :--- |
| 🟢 **Principiante** | 01–06 | HTML, CSS, JavaScript, responsive, formularios. |
| 🟡 **Intermedio** | 07–10 | Git, APIs, despliegue, portfolio. |
| 🟠 **Avanzado** | 11–18 | CSS moderno, JS asíncrono, TypeScript, testing, arquitectura. |
| 🔴 **Profesional** | 19–20 | Full-stack con Node.js y DevOps para frontend. |
| 🟣 **Experto** | 21–25 | Web Components, PWA, WebSockets, animaciones, design systems. |
| 🔵 **Élite** | 26–30 | Seguridad, WebAssembly, IA, WebXR y Web3. |
| 🚀 **Vanguardia** | 31–38 | Testing E2E, Server Components, Edge Computing, Docker, GraphQL, Micro-frontends, IA Generativa y Seguridad Avanzada. |

---

## 🛠️ Stack tecnológico

| Tecnología | Uso |
| :--- | :--- |
| **MkDocs + Material for MkDocs** | Generación del sitio estático y diseño premium. |
| **Python 3.12** | Motor de construcción y scripts de automatización. |
| **HTML/CSS/JS** | Personalización de la UI, lógica de quizzes, sandbox y gamificación. |
| **GitHub Actions** | CI/CD automatizado para despliegues. |
| **GitHub Pages** | Alojamiento con dominio personalizado. |
| **Giscus** | Comentarios anclados a GitHub Discussions. |
| **Mermaid.js** | Diagramas de arquitectura y flujo. |
| **FullCalendar** | Calendario de eventos de la agenda. |
| **Google Analytics 4** | Analíticas de visitas. |

---

## 📂 Estructura del proyecto

\`\`\`
Libro-desarrollador-Web-Urukais-/
├── docs/                          # Contenido en Markdown
│   ├── assets/                    # CSS, JS, imágenes y fuentes
│   │   ├── css/                   # Estilos personalizados
│   │   ├── js/                    # Lógica de quizzes, mega-menú, etc.
│   │   └── favicon.svg            # Logo del sitio
│   ├── apendices/                 # Glosario, chuletas, recursos por nivel
│   ├── capitulos/                 # Los 38 capítulos del libro
│   ├── ejercicios/                # 30 ejercicios resueltos
│   ├── retos/                     # 5 retos semanales
│   └── index.md                   # Portada del libro
├── overrides/                     # Personalización del tema Material
│   ├── main.html                  # Plantilla principal
│   └── partials/                  # Parciales (footer, etc.)
├── .github/workflows/             # CI/CD (GitHub Actions)
│   └── deploy.yml                 # Workflow de despliegue
├── mkdocs.yml                     # Configuración del sitio
├── requirements.txt               # Dependencias de Python
├── README.md                      # Este archivo
└── LICENSE                        # Licencia MIT
\`\`\`

---

## 🚀 Cómo ejecutar el libro en local

### Requisitos previos

- **Python 3.12+** (recomendado, aunque funciona con 3.10+)
- **Git**
- Un editor de código (recomendado: [VS Code](https://code.visualstudio.com/))

### Instalación

\`\`\`bash
# 1. Clona el repositorio
git clone https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-.git
cd Libro-desarrollador-Web-Urukais-

# 2. Crea un entorno virtual
python3 -m venv .venv

# 3. Actívalo
# En Linux/macOS:
source .venv/bin/activate
# En Fish shell:
source .venv/bin/activate.fish
# En Windows:
.venv\Scripts\activate

# 4. Instala las dependencias
pip install -r requirements.txt

# 5. Arranca el servidor de desarrollo
mkdocs serve
\`\`\`

Abre tu navegador en **[http://127.0.0.1:8000](http://127.0.0.1:8000)**.

### Comandos útiles

| Comando | Uso |
| :--- | :--- |
| \`mkdocs serve\` | Servidor de desarrollo con live-reload |
| \`mkdocs build\` | Construir el sitio estático en \`site/\` |
| \`mkdocs gh-deploy\` | Desplegar a GitHub Pages manualmente |
| \`mkdocs build --clean\` | Limpiar y reconstruir el sitio |

---

## 🤝 Cómo contribuir

¡Las contribuciones son bienvenidas! Hay muchas formas de ayudar, incluso sin saber programar:

- 🐛 **Reportar errores**: abre un [issue](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues/new).
- 💡 **Sugerir mejoras**: abre un issue con la etiqueta \`enhancement\`.
- 🔧 **Enviar correcciones**: haz un fork, crea una rama y abre un PR.
- 🌍 **Traducir**: estamos trabajando en la traducción al inglés.
- 📣 **Compartir**: comparte el libro en redes sociales o con quien esté aprendiendo.
- ⭐ **Dar una estrella**: es gratis y ayuda a que más gente lo descubra.

Para más detalles, consulta la guía de [Contribuir](https://libro.urukais.com/contribuir/).

### Convención de commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/es/):

\`\`\`
feat: nueva funcionalidad o capítulo
fix: corrección de errores
docs: cambios en documentación
style: cambios de diseño (CSS)
perf: mejoras de rendimiento
refactor: reestructuración sin cambiar comportamiento
chore: tareas de mantenimiento
\`\`\`

---

## 📊 Estado del proyecto

| Métrica | Valor |
| :--- | :--- |
| **Capítulos** | 38 |
| **Niveles** | 7 |
| **Ejercicios resueltos** | 30 |
| **Diagramas Mermaid** | 14 |
| **Retos semanales** | 5 |
| **Commits** | ![GitHub commits since latest release](https://img.shields.io/github/commits-since/urukaisk-maker/Libro-desarrollador-Web-Urukais-/v1.0.0) |
| **Licencia** | MIT |
| **Coste mensual** | 0 € |

Consulta el [Roadmap](https://libro.urukais.com/roadmap/) para ver qué viene a continuación y el [Changelog](https://libro.urukais.com/changelog/) para ver el historial de versiones.

---

## 📸 Capturas

> *Próximamente: capturas del modo claro, oscuro y móvil.*

---

## 📜 Licencia

Este proyecto está bajo la **Licencia MIT**. Puedes usar, copiar, modificar y distribuir el contenido libremente, siempre que mantengas la atribución.

Consulta el archivo [LICENSE](./LICENSE) para más detalles.

---

## 🙏 Agradecimientos

Este libro no sería posible sin el trabajo de miles de personas que comparten su conocimiento libremente en internet. Un agradecimiento especial a:

- **[MDN Web Docs](https://developer.mozilla.org/es/)** — la referencia más completa del desarrollo web.
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** — el mejor tema de documentación que existe.
- **[javascript.info](https://es.javascript.info/)** — el mejor tutorial de JavaScript.
- **La comunidad hispanohablante** que comparte, corrige y difunde.

Consulta la página completa de [Agradecimientos](https://libro.urukais.com/agradecimientos/).

---

## 📬 Contacto

- **Web**: [libro.urukais.com](https://libro.urukais.com)
- **Email**: [contacto@urukais.com](mailto:contacto@urukais.com)
- **GitHub**: [@urukaisk-maker](https://github.com/urukaisk-maker)
- **Twitter / X**: [@urukaisk](https://twitter.com/urukaisk)
- **Newsletter**: [urukaisklick.substack.com](https://urukaisklick.substack.com)

---

<div align="center">

**Hecho con ❤️ y mucho ☕ por [Manuel Casimiro Carrasco (Urukais)](https://libro.urukais.com/autor/)**

⭐ Si este proyecto te resulta útil, dale una estrella en GitHub. Ayuda a que más personas lo descubran.

</div>
