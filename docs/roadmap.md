# 🗺️ Roadmap del libro

!!! quote "Hacia dónde va este proyecto"
    Este es el plan de futuro del **Libro del Desarrollador Web**. No es una promesa contractual: es una **hoja de ruta abierta** que puede cambiar según las prioridades, el tiempo disponible y las sugerencias de la comunidad.

---

## 🎯 Filosofía del roadmap

Antes de ver las listas, conviene entender **cómo se prioriza** en este proyecto:

| Prioridad | Criterio |
| :--- | :--- |
| 🔴 **Alta** | Contenido que falta, errores que afectan al aprendizaje, accesibilidad |
| 🟠 **Media** | Mejoras de UX, nuevas funcionalidades, traducciones |
| 🟡 **Baja** | Extras, experimentos, ideas a largo plazo |

!!! warning "Sin fechas comprometidas"
    El proyecto se mantiene en el tiempo libre del autor. **No hay fechas de entrega**. Las versiones se publican cuando están listas, no cuando toca. Si algo aparece como "Q1 2027" es una estimación, no una obligación.

---

## ✅ Completado

Todo lo que ya está disponible en el libro:

### Contenido
- [x] **38 capítulos** organizados en 7 niveles
- [x] **30 ejercicios resueltos** con soluciones comentadas
- [x] **14 diagramas Mermaid** de arquitectura y flujo
- [x] **5 retos semanales** con validación automática
- [x] **Glosario** con ~90 términos
- [x] **Chuletas rápidas** de HTML, CSS, JS y Git
- [x] **Recursos por nivel** con recomendaciones

### Funcionalidades
- [x] **Sistema de logros** con `localStorage`
- [x] **Quizzes interactivos** al final de cada capítulo
- [x] **Editores de código en vivo** con iframes seguros
- [x] **Laboratorios StackBlitz** para Node.js
- [x] **Comentarios Giscus** anclados a GitHub Discussions
- [x] **Modo oscuro y claro** con persistencia
- [x] **PWA** instalable con soporte offline
- [x] **Versión imprimible** en PDF
- [x] **Buscador** con sugerencias y resaltado
- [x] **Comando Ctrl+K** para búsqueda rápida
- [x] **Progreso de lectura** con barra superior
- [x] **Newsletter** con modal de suscripción
- [x] **Cookie banner** conforme a RGPD

### Diseño
- [x] **Mega-menú "Explorar"** en el header (escritorio)
- [x] **Header en una sola línea** (logo + título + menú + buscador + repo)
- [x] **Footer premium** de 5 columnas
- [x] **Diseño responsive** (móvil, tablet, escritorio)
- [x] **Paleta de colores unificada** (morado + cyan)
- [x] **Tipografía premium** (Inter + JetBrains Mono)
- [x] **Animaciones sutiles** en hover

### Infraestructura
- [x] **MkDocs + Material for MkDocs**
- [x] **GitHub Actions** para despliegue automático
- [x] **GitHub Pages** como hosting
- [x] **Dominio personalizado**: `libro.urukais.com`
- [x] **Google Analytics 4** para analíticas
- [x] **Google Search Console** para SEO

---

## 🚧 En progreso

Lo que está actualmente en desarrollo:

### Contenido
- [ ] **Ampliación de páginas vacías**: `logros.md`, `agenda.md`, `entrevistas.md`, `musica.md`, `proyectos-guiados.md`, `hall-of-fame.md`, `certificado.md`, `apoya.md`, `recursos.md`
- [ ] **Revisión de los 38 capítulos** para corregir erratas y actualizar ejemplos
- [ ] **Más ejercicios resueltos** (objetivo: 50)

### Funcionalidades
- [ ] **Búsqueda semántica** con embeddings (experimental)
- [ ] **Comentarios anidados** en Giscus (actualmente planos)
- [ ] **Modo "solo lectura"** para imprimir sin distracciones

---

## 📅 Planeado

Lo que está en la hoja de ruta a medio plazo:

### Q4 2026 (octubre–diciembre)

- [ ] **Traducción al inglés** con `mkdocs-static-i18n`
  - Prioridad: 🔴 Alta
  - Impacto: llegar a más audiencia
  - Estimación: 2–3 meses
- [ ] **Certificados verificables** con código QR
  - Prioridad: 🟠 Media
  - Impacto: dar valor tangible al completar el libro
  - Estimación: 1 mes
- [ ] **Sistema de cuentas** para sincronizar logros entre dispositivos
  - Prioridad: 🟠 Media
  - Impacto: evitar perder el progreso al cambiar de navegador
  - Estimación: 2 meses

### Q1 2027 (enero–marzo)

- [ ] **Más laboratorios interactivos** con StackBlitz y CodeSandbox
  - Prioridad: 🟠 Media
  - Impacto: mejorar la práctica de backend y DevOps
- [ ] **Racha de días** estilo Duolingo
  - Prioridad: 🟡 Baja
  - Impacto: incentivar la constancia
- [ ] **Hall of Fame** con perfiles de lectores que completen el libro
  - Prioridad: 🟡 Baja
  - Impacto: crear comunidad

### Q2 2027 (abril–junio)

- [ ] **Rediseño completo del sitio** (versión 2.0)
  - Prioridad: 🟡 Baja
  - Impacto: mejorar la experiencia general
- [ ] **Capítulos invitados** de otros autores de la comunidad
  - Prioridad: 🟡 Baja
  - Impacto: diversificar perspectivas
- [ ] **Vídeos explicativos** embebidos en algunos capítulos
  - Prioridad: 🟡 Baja
  - Impacto: llegar a quienes prefieren aprender viendo

---

## 💡 Ideas a largo plazo

Cosas que me gustaría hacer, pero que no tienen fecha ni prioridad definida:

- [ ] **Modo offline completo** con Service Worker avanzado
- [ ] **Aplicación móvil nativa** (PWA ya lo cubre parcialmente)
- [ ] **Sistema de mentorías** uno a uno
- [ ] **Comunidad en Discord** con canales por nivel
- [ ] **Certificados verificables** con blockchain (sí, en serio)
- [ ] **Integración con GitHub Classroom** para profesores
- [ ] **Traducciones a otros idiomas**: portugués, francés, italiano
- [ ] **Generación de PDF** con portada personalizada
- [ ] **Modo "profesor"** con ejercicios auto-corregidos
- [ ] **API pública** para consultar el contenido del libro

!!! tip "¿Tienes una idea?"
    Si crees que falta algo importante, abre un [issue en GitHub](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues/new) con la etiqueta `enhancement`. Las ideas de la comunidad se revisan cada semana.

---

## 📊 Línea temporal visual

```mermaid
gantt
    title Roadmap del Libro del Desarrollador Web
    dateFormat YYYY-MM-DD
    axisFormat %b %Y

    section Completado
    Lanzamiento v1.0           :done, v1, 2026-10-18, 2026-10-18
    Header en una línea         :done, h1, 2026-10-22, 2026-10-22

    section En progreso
    Ampliar páginas vacías      :active, p1, 2026-10-22, 2026-12-31
    Revisión de 38 capítulos    :active, p2, 2026-10-22, 2026-12-31

    section Planeado
    Traducción al inglés        :p3, 2026-11-01, 2027-01-31
    Certificados verificables   :p4, 2026-12-01, 2027-01-31
    Sistema de cuentas          :p5, 2027-01-01, 2027-03-31
    Rediseño v2.0               :p6, 2027-04-01, 2027-06-30