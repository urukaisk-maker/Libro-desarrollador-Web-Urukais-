# 📝 Changelog

!!! quote "Historial de cambios"
    Todas las modificaciones importantes del **Libro del Desarrollador Web** se documentan aquí. El formato sigue [Keep a Changelog](https://keepachangelog.com/es/1.0.0/) y el proyecto se adhiere a [Semantic Versioning](https://semver.org/lang/es/).

---

## 🏷️ Tipos de cambios

| Badge | Significado |
| :--- | :--- |
| 🆕 `Añadido` | Nueva funcionalidad, capítulo o recurso |
| 🔧 `Cambiado` | Cambio en funcionalidad existente |
| 🐛 `Corregido` | Corrección de errores |
| 🗑️ `Eliminado` | Funcionalidad o contenido eliminado |
| 🔒 `Seguridad` | Corrección de vulnerabilidades |
| 📝 `Documentación` | Mejoras en la documentación |
| 🎨 `Estilo` | Cambios visuales o de diseño |
| ⚡ `Rendimiento` | Mejoras de velocidad o eficiencia |

---

## [Unreleased]

### 🆕 Añadido
- Página de [Música para programar](musica.md) con playlists embebidas de YouTube.
- Página de [Prensa y medios](prensa.md) con kit de prensa completo.
- Página de [Contacto](contacto.md) con formulario y canales directos.
- Página de [Sobre el autor](autor.md) con biografía, stack y proyectos.
- Página de [Preguntas frecuentes](faq.md) con más de 40 preguntas.
- Página de [Contribuir](contribuir.md) con guía técnica y plantillas.
- Página de [Agradecimientos](agradecimientos.md) ampliada.
- Página de [Glosario](apendices/glosario.md) ampliada de ~35 a ~90 términos.
- Sistema de quizzes interactivos en los capítulos.
- Botones de compartir en redes sociales al final de cada capítulo.

### 🔧 Cambiado
- Header rediseñado en una sola línea (logo + título + Explorar + buscador + repo).
- Mega-menú "Explorar" integrado en el header (antes en la barra de tabs).
- Footer premium con 5 columnas y línea de acento superior.
- Mejora de la accesibilidad general del sitio.

### 🐛 Corregido
- Mega-menú visible en móvil (ahora se oculta correctamente con CSS y JS).
- Error MIME de FullCalendar CSS (URL inexistente eliminada).
- Quirks Mode por falta de `<!DOCTYPE html>` en `main.html`.
- Orden del footer en el DOM.
- Enlaces rotos en varios capítulos.

### 🎨 Estilo
- Paleta de colores unificada (morado `#6a5acd` + cyan `#00bcd4`).
- Tipografía Inter + JetBrains Mono.
- Modo oscuro con contraste WCAG AA.
- Animaciones sutiles en hover de enlaces y tarjetas.

### ⚡ Rendimiento
- Lazy loading en imágenes y iframes de YouTube.
- CSS crítico inline en el header.
- Eliminación de dependencias no usadas.

---

## [1.0.0] — 2026-10-18

### 🎉 Lanzamiento inicial

Primera versión pública del libro, con todo el contenido fundamental.

### 🆕 Añadido
- **38 capítulos** organizados en **7 niveles**:
  - 🟢 Principiante (capítulos 01–06)
  - 🟡 Intermedio (capítulos 07–10)
  - 🟠 Avanzado (capítulos 11–18)
  - 🔴 Profesional (capítulos 19–20)
  - 🟣 Experto (capítulos 21–25)
  - 🔵 Élite (capítulos 26–30)
  - 🚀 Vanguardia (capítulos 31–38)
- **30 ejercicios resueltos** con soluciones comentadas.
- **14 diagramas Mermaid** de arquitectura y flujo.
- **5 retos semanales** con validación automática.
- **Sistema de logros** con `localStorage`.
- **Quizzes interactivos** al final de cada capítulo.
- **Editores de código en vivo** con iframes seguros.
- **Laboratorios StackBlitz** para Node.js.
- **Comentarios Giscus** anclados a GitHub Discussions.
- **Modo oscuro y claro** con persistencia.
- **PWA** instalable con soporte offline.
- **Versión imprimible** en PDF.
- **Buscador** con sugerencias y resaltado.
- **Comando Ctrl+K** para búsqueda rápida.
- **Progreso de lectura** con barra superior.
- **Newsletter** con modal de suscripción.
- **Cookie banner** conforme a RGPD.

### 🎨 Estilo
- Diseño premium con glassmorphism y gradientes.
- Tipografía Inter + JetBrains Mono.
- Modo oscuro con paleta adaptada.
- Animaciones sutiles en hover.
- Layout responsive (móvil, tablet, escritorio).

### 🔧 Infraestructura
- **MkDocs + Material for MkDocs** como generador.
- **GitHub Actions** para despliegue automático.
- **GitHub Pages** como hosting.
- **Dominio personalizado**: `libro.urukais.com`.
- **Google Analytics 4** para analíticas.
- **Google Search Console** para SEO.

---

## [0.9.0] — 2026-10-10

### 🆕 Añadido
- Primeros 20 capítulos del libro.
- Sistema básico de navegación con tabs.
- Búsqueda con `mkdocs-material` search.
- Modo oscuro.

### 🐛 Corregido
- Enlaces rotos en el índice.
- Erratas en los capítulos 01–05.

---

## [0.5.0] — 2026-09-25

### 🆕 Añadido
- Estructura inicial del proyecto.
- 10 primeros capítulos del nivel principiante.
- Configuración de MkDocs.
- Repositorio en GitHub.

### 🎨 Estilo
- Tema Material con colores por defecto.
- Navegación lateral básica.

---

## [0.1.0] — 2026-09-01

### 🎉 Primer commit

- Creación del repositorio.
- Archivo `README.md` con la descripción del proyecto.
- Primeras notas en `docs/`.

---

## 📅 Calendario de versiones

| Versión | Fecha | Hitos |
| :--- | :--- | :--- |
| **1.1.0** | *Próximamente* | Traducción al inglés (i18n) |
| **1.2.0** | *Próximamente* | Sistema de cuentas y sincronización de logros |
| **1.3.0** | *Próximamente* | Certificados verificables con QR |
| **2.0.0** | *Próximamente* | Rediseño completo del sitio |

!!! note "Sin fechas comprometidas"
    Las fechas de las versiones futuras son **orientativas**. El proyecto se mantiene en el tiempo libre del autor, así que las prioridades pueden cambiar. La única fecha que puedo garantizar es la de las versiones **ya publicadas**.

---

## 🔗 Enlaces útiles

- **Repositorio**: [GitHub](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-)
- **Commits**: [Historial completo](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/commits/master)
- **Releases**: [Releases en GitHub](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/releases)
- **Issues**: [Issues abiertos](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues)
- **Roadmap**: [Roadmap del proyecto](roadmap.md)

---

## 🤝 Cómo contribuir al Changelog

Si haces un cambio importante (nuevo capítulo, corrección de bug, mejora de diseño), añade una entrada al Changelog en la sección `[Unreleased]`. Sigue el formato:

```markdown
### 🆕 Añadido
- Descripción breve del cambio.