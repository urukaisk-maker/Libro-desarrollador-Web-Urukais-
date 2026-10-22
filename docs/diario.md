# 📰 Diario de Desarrollo

!!! quote "El detrás de escena"
    Un espacio para compartir notas, ideas, decisiones técnicas y el proceso de creación de este libro. Sin filtros, sin marketing: lo que funciona, lo que no, y por qué.

---

## 🚀 18 de Octubre, 2026 — El día que el libro cobró vida

![Mi espacio de trabajo](https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=80)
*Mi espacio de trabajo, después de semanas de café y código.*

Hoy es un día especial. Después de semanas de trabajo, el libro ya no es solo una idea. Tiene **36 capítulos**, diagramas interactivos, ejercicios resueltos y hasta un sistema de logros para que aprendas jugando.

La idea nació de mis propias notas. Me di cuenta de que en internet faltaba un recurso en español que no tuviera miedo de hablar de **arquitectura, rendimiento y seguridad**. Quería crear algo que yo mismo hubiera querido leer cuando empecé.

### 🛠️ El stack detrás del libro

Para los curiosos, este libro está construido con:

| Tecnología | Para qué |
| :--- | :--- |
| **MkDocs** | Generador de sitios estáticos basado en Markdown |
| **Material for MkDocs** | El mejor tema que existe, sin discusión |
| **GitHub Pages** | Alojamiento gratuito con dominio personalizado |
| **GitHub Actions** | Despliegue automático en cada `push` a `master` |
| **Giscus** | Comentarios anclados a GitHub Discussions |
| **Mermaid** | Diagramas de arquitectura y flujo en Markdown |
| **FullCalendar** | Calendario de eventos de la agenda |
| **Google Analytics 4** | Analíticas de visitas (sin cookies de terceros) |

!!! tip "Todo el código es open source"
    Puedes ver el repositorio completo en [GitHub](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-). Cada decisión técnica está documentada en los commits.

### 📊 Números del primer día

- **38 capítulos** publicados
- **7 niveles** de dificultad progresiva
- **14 diagramas** Mermaid
- **30 ejercicios** resueltos
- **5 retos** semanales activos
- **0 €** de coste mensual (todo gratis y open source)

---

## 🧠 15 de Octubre, 2026 — Cuando decidí añadir quizzes

Al principio, el libro era solo texto. Y me di cuenta de que **leer sin practicar no sirve de nada**. Así que me puse a investigar cómo añadir quizzes interactivos sin romper la web.

### ❌ Lo que probé y no funcionó

1. **Google Forms embebidos**: feos, lentos, con marca de Google.
2. **Quiz libraries de NPM**: pesadas, con dependencias que rompían Material.
3. **Iframes externos**: no se adaptaban al modo oscuro.

### ✅ Lo que sí funcionó

Un poco de **JavaScript y CSS puro**. Cada quiz es un bloque HTML con `data-answer` y `data-opt`, y un script global se encarga de validarlo:

```html
<div class="quiz" data-quiz="capitulo-1">
  <div class="quiz-question" data-answer="b">
    <p>¿Cuáles son los tres pilares del desarrollo web?</p>
    <button class="quiz-option" data-opt="a">A) Python, Java y C++</button>
    <button class="quiz-option" data-opt="b">B) HTML, CSS y JavaScript</button>
    <button class="quiz-option" data-opt="c">C) React, Vue y Angular</button>
  </div>
</div>
<script>document.querySelectorAll('.quiz-question').forEach(function (q) {
  var answer = q.dataset.answer;
  q.querySelectorAll('.quiz-option').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (q.dataset.done) return;
      if (btn.dataset.opt === answer) {
        btn.classList.add('is-correct');
        q.dataset.done = '1';
      } else {
        btn.classList.add('is-wrong');
      }
    });
  });
});</script>