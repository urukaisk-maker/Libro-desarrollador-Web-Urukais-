# 📁 Mis Proyectos

!!! quote "Lo que la comunidad está construyendo"
    Esta es la galería de proyectos de los lectores del libro. Aquí puedes ver lo que otros han construido, inspirarte y compartir los tuyos. Cualquier proyecto es bienvenido: desde una simple página personal hasta una app completa.

---

## 🎯 ¿Qué es esta página?

Un escaparate de los proyectos que los lectores del libro han creado mientras aprenden. Cada proyecto incluye:

- **Título** y descripción breve
- **Nivel** del libro en el que se enmarca
- **Tecnologías** usadas
- **Enlace** al proyecto (demo, repo, CodePen…)
- **Autor** (con enlace a su perfil si quiere)

!!! tip "¿Quieres aparecer aquí?"
    Si has construido algo con lo que has aprendido en el libro, [envía tu proyecto](#enviar-proyecto) a través del formulario de abajo. Puede ser un proyecto personal, un ejercicio, un reto o algo completamente nuevo.

---

## 🌟 Proyectos destacados

<div class="proyectos-grid">

<div class="proyecto-card">
<div class="proyecto-card__nivel">🟢 Principiante</div>
<h3 class="proyecto-card__titulo">Mi primera página personal</h3>
<p class="proyecto-card__desc">Una página de presentación con HTML y CSS, con secciones de sobre mí, proyectos y contacto.</p>
<div class="proyecto-card__tech">
<span class="proyecto-tag">HTML</span>
<span class="proyecto-tag">CSS</span>
</div>
<a href="#" class="proyecto-card__link">Ver proyecto →</a>
<div class="proyecto-card__autor">por <a href="#">@urukaisk</a></div>
</div>

<div class="proyecto-card">
<div class="proyecto-card__nivel">🟡 Intermedio</div>
<h3 class="proyecto-card__titulo">Lista de tareas con localStorage</h3>
<p class="proyecto-card__desc">Una app para gestionar tareas con persistencia en el navegador, filtros y modo oscuro.</p>
<div class="proyecto-card__tech">
<span class="proyecto-tag">HTML</span>
<span class="proyecto-tag">CSS</span>
<span class="proyecto-tag">JavaScript</span>
</div>
<a href="#" class="proyecto-card__link">Ver proyecto →</a>
<div class="proyecto-card__autor">por <a href="#">@urukaisk</a></div>
</div>

<div class="proyecto-card">
<div class="proyecto-card__nivel">🟠 Avanzado</div>
<h3 class="proyecto-card__titulo">Buscador de películas con API</h3>
<p class="proyecto-card__desc">Una app que consume la API de OMDB para buscar películas, con debounce y manejo de errores.</p>
<div class="proyecto-card__tech">
<span class="proyecto-tag">JavaScript</span>
<span class="proyecto-tag">API</span>
<span class="proyecto-tag">Vite</span>
</div>
<a href="#" class="proyecto-card__link">Ver proyecto →</a>
<div class="proyecto-card__autor">por <a href="#">@urukaisk</a></div>
</div>

<div class="proyecto-card">
<div class="proyecto-card__nivel">🔴 Profesional</div>
<h3 class="proyecto-card__titulo">API REST de tareas con Node.js</h3>
<p class="proyecto-card__desc">Una API REST con Express, PostgreSQL y autenticación JWT, desplegada en Railway.</p>
<div class="proyecto-card__tech">
<span class="proyecto-tag">Node.js</span>
<span class="proyecto-tag">Express</span>
<span class="proyecto-tag">PostgreSQL</span>
</div>
<a href="#" class="proyecto-card__link">Ver proyecto →</a>
<div class="proyecto-card__autor">por <a href="#">@urukaisk</a></div>
</div>

<div class="proyecto-card">
<div class="proyecto-card__nivel">🟣 Experto</div>
<h3 class="proyecto-card__titulo">PWA de recetas</h3>
<p class="proyecto-card__desc">Una PWA instalable con soporte offline, notificaciones push y caché con service workers.</p>
<div class="proyecto-card__tech">
<span class="proyecto-tag">PWA</span>
<span class="proyecto-tag">Service Worker</span>
<span class="proyecto-tag">Vite</span>
</div>
<a href="#" class="proyecto-card__link">Ver proyecto →</a>
<div class="proyecto-card__autor">por <a href="#">@urukaisk</a></div>
</div>

<div class="proyecto-card">
<div class="proyecto-card__nivel">🚀 Vanguardia</div>
<h3 class="proyecto-card__titulo">Micro-frontend con Module Federation</h3>
<p class="proyecto-card__desc">Un ejemplo de micro-frontend con Vite, Module Federation y despliegue en el edge.</p>
<div class="proyecto-card__tech">
<span class="proyecto-tag">Vite</span>
<span class="proyecto-tag">Module Federation</span>
<span class="proyecto-tag">Edge</span>
</div>
<a href="#" class="proyecto-card__link">Ver proyecto →</a>
<div class="proyecto-card__autor">por <a href="#">@urukaisk</a></div>
</div>

</div>

!!! note "Proyectos de ejemplo"
    Los proyectos anteriores son **ejemplos** para que veas el formato. Cuando la comunidad empiece a enviar proyectos reales, se sustituirán por los de verdad.

---

## 📊 Filtrar por nivel

<div class="proyectos-filtros">
<button class="proyecto-filtro is-active" data-nivel="todos">Todos</button>
<button class="proyecto-filtro" data-nivel="principiante">🟢 Principiante</button>
<button class="proyecto-filtro" data-nivel="intermedio">🟡 Intermedio</button>
<button class="proyecto-filtro" data-nivel="avanzado">🟠 Avanzado</button>
<button class="proyecto-filtro" data-nivel="profesional">🔴 Profesional</button>
<button class="proyecto-filtro" data-nivel="experto">🟣 Experto</button>
<button class="proyecto-filtro" data-nivel="vanguardia">🚀 Vanguardia</button>
</div>

---

## 📬 Enviar proyecto { #enviar-proyecto }

¿Has construido algo que quieres compartir? Rellena el formulario y lo añadiré a la galería (si cumple las normas básicas: que sea tuyo, que funcione y que no sea ofensivo).

<form class="proyecto-form" action="https://formspree.io/f/TU_FORM_ID" method="POST">
  <div class="proyecto-field">
    <label for="proyecto-titulo">Título del proyecto <span class="required">*</span></label>
    <input type="text" id="proyecto-titulo" name="titulo" required placeholder="Ej: Lista de tareas con localStorage">
  </div>

  <div class="proyecto-field">
    <label for="proyecto-desc">Descripción breve <span class="required">*</span></label>
    <textarea id="proyecto-desc" name="descripcion" rows="3" required placeholder="Cuéntanos qué hace tu proyecto en 2–3 frases…"></textarea>
  </div>

  <div class="proyecto-field">
    <label for="proyecto-url">URL del proyecto <span class="required">*</span></label>
    <input type="url" id="proyecto-url" name="url" required placeholder="https://tu-proyecto.com">
  </div>

  <div class="proyecto-field">
    <label for="proyecto-repo">Repositorio (opcional)</label>
    <input type="url" id="proyecto-repo" name="repo" placeholder="https://github.com/tu-usuario/tu-proyecto">
  </div>

  <div class="proyecto-field">
    <label for="proyecto-nivel">Nivel del libro <span class="required">*</span></label>
    <select id="proyecto-nivel" name="nivel" required>
      <option value="">— Selecciona un nivel —</option>
      <option value="principiante">🟢 Principiante</option>
      <option value="intermedio">🟡 Intermedio</option>
      <option value="avanzado">🟠 Avanzado</option>
      <option value="profesional">🔴 Profesional</option>
      <option value="experto">🟣 Experto</option>
      <option value="vanguardia">🚀 Vanguardia</option>
    </select>
  </div>

  <div class="proyecto-field">
    <label for="proyecto-tech">Tecnologías usadas <span class="required">*</span></label>
    <input type="text" id="proyecto-tech" name="tech" required placeholder="Ej: HTML, CSS, JavaScript">
  </div>

  <div class="proyecto-field">
    <label for="proyecto-autor">Tu nombre o alias <span class="required">*</span></label>
    <input type="text" id="proyecto-autor" name="autor" required placeholder="Ej: @tu-usuario">
  </div>

  <button type="submit" class="md-button md-button--primary">📤 Enviar proyecto</button>
</form>

!!! note "¿No funciona el formulario?"
    Si el formulario no responde (porque Formspree está caído o el ID no es válido), escríbeme directamente a [contacto@urukais.com](mailto:contacto@urukais.com) con los datos del proyecto.

---

## 📜 Normas de la galería

Para que un proyecto aparezca en esta página, debe cumplir:

- ✅ **Ser tuyo** (o tener permiso del autor original).
- ✅ **Funcionar** (sin errores graves).
- ✅ **Ser respetuoso** (sin contenido ofensivo, violento o ilegal).
- ✅ **Estar relacionado** con el desarrollo web (aunque sea de forma tangencial).
- ❌ **No se aceptan** proyectos generados íntegramente por IA sin aportación humana significativa.
- ❌ **No se aceptan** proyectos que vendan algo o hagan spam.

---

## ➡️ Siguientes pasos

[🧭 Ver los proyectos guiados](proyectos-guiados.md){ .md-button .md-button--primary }
[🎯 Ver los retos semanales](retos.md){ .md-button }
[🏆 Ver mis logros](logros.md){ .md-button }