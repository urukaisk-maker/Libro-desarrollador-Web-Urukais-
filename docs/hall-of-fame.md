cd ~/Libro-desarrollador-Web-Urukais-
python3 -c "
contenido = '''# 🏅 Hall of Fame

!!! quote \"Reconocimiento a quienes lo lograron\"
    Aquí aparecen las personas que han completado el **Libro del Desarrollador Web**. Un reconocimiento simbólico a su constancia y dedicación. ¿Serás el próximo?

---

## 🎯 ¿Qué es el Hall of Fame?

Es una lista de lectores que han:

1. **Completado los 38 capítulos** del libro.
2. **Generado su certificado** de finalización.
3. **Compartido su logro** con la comunidad.

No hay premios físicos ni dinero. Solo el reconocimiento de haber terminado algo que muy pocos terminan: un libro técnico completo de principio a fin.

!!! tip \"¿Quieres aparecer aquí?\"
    Completa el libro, genera tu [certificado](certificado.md) y [envía tu perfil](#enviar-perfil). Se revisa y se añade en la siguiente actualización.

---

## 🌟 Destacados

<div class=\"hall-grid\">

<div class=\"hall-card hall-card--empty\">
<div class=\"hall-card__avatar\">👤</div>
<h3 class=\"hall-card__name\">Tu nombre aquí</h3>
<p class=\"hall-card__role\">Primer graduado</p>
<p class=\"hall-card__date\">—</p>
<div class=\"hall-card__badge\">🎓 Certificado pendiente</div>
</div>

<div class=\"hall-card hall-card--empty\">
<div class=\"hall-card__avatar\">👤</div>
<h3 class=\"hall-card__name\">Tu nombre aquí</h3>
<p class=\"hall-card__role\">Graduado</p>
<p class=\"hall-card__date\">—</p>
<div class=\"hall-card__badge\">🎓 Certificado pendiente</div>
</div>

<div class=\"hall-card hall-card--empty\">
<div class=\"hall-card__avatar\">👤</div>
<h3 class=\"hall-card__name\">Tu nombre aquí</h3>
<p class=\"hall-card__role\">Graduado</p>
<p class=\"hall-card__date\">—</p>
<div class=\"hall-card__badge\">🎓 Certificado pendiente</div>
</div>

</div>

!!! note \"Aún no hay graduados\"
    Esta página está lista para recibir a los primeros lectores que completen el libro. Si eres el primero, aparecerás destacado con una mención especial.

---

## 📊 Estadísticas

<div class=\"hall-stats\">

| Métrica | Valor |
| :--- | :--- |
| **Graduados** | 0 |
| **Certificados emitidos** | 0 |
| **Países representados** | 0 |
| **Tiempo medio de finalización** | — |

</div>

---

## 🏆 Niveles de reconocimiento

No todos los graduados son iguales. Estos son los niveles de reconocimiento:

| Nivel | Requisito | Badge |
| :--- | :--- | :--- |
| 🌱 **Lector** | Has empezado el libro | 🌱 |
| 🟢 **Principiante** | Has completado el Nivel Principiante | 🟢 |
| 🟡 **Intermedio** | Has completado el Nivel Intermedio | 🟡 |
| 🟠 **Avanzado** | Has completado el Nivel Avanzado | 🟠 |
| 🔴 **Profesional** | Has completado el Nivel Profesional | 🔴 |
| 🟣 **Experto** | Has completado el Nivel Experto | 🟣 |
| 🔵 **Élite** | Has completado el Nivel Élite | 🔵 |
| 🚀 **Vanguardia** | Has completado el Nivel Vanguardia | 🚀 |
| 🎓 **Graduado** | Has completado los 38 capítulos | 🎓 |
| 🏅 **Leyenda** | Graduado + 10 contribuciones al proyecto | 🏅 |

---

## 📬 Enviar perfil { #enviar-perfil }

Si has completado el libro y quieres aparecer en el Hall of Fame, rellena este formulario:

<form class=\"hall-form\" action=\"https://formspree.io/f/TU_FORM_ID\" method=\"POST\">
  <div class=\"hall-field\">
    <label for=\"hall-nombre\">Nombre o alias <span class=\"required\">*</span></label>
    <input type=\"text\" id=\"hall-nombre\" name=\"nombre\" required placeholder=\"Ej: Ana García o @anagarcia\">
  </div>

  <div class=\"hall-field\">
    <label for=\"hall-pais\">País (opcional)</label>
    <input type=\"text\" id=\"hall-pais\" name=\"pais\" placeholder=\"Ej: España\">
  </div>

  <div class=\"hall-field\">
    <label for=\"hall-fecha\">Fecha de finalización <span class=\"required\">*</span></label>
    <input type=\"date\" id=\"hall-fecha\" name=\"fecha\" required>
  </div>

  <div class=\"hall-field\">
    <label for=\"hall-github\">Usuario de GitHub (opcional)</label>
    <input type=\"text\" id=\"hall-github\" name=\"github\" placeholder=\"@tu-usuario\">
  </div>

  <div class=\"hall-field\">
    <label for=\"hall-web\">Web o portfolio (opcional)</label>
    <input type=\"url\" id=\"hall-web\" name=\"web\" placeholder=\"https://tu-web.com\">
  </div>

  <div class=\"hall-field\">
    <label for=\"hall-mensaje\">¿Qué te ha parecido el libro? (opcional)</label>
    <textarea id=\"hall-mensaje\" name=\"mensaje\" rows=\"3\" placeholder=\"Tu testimonio ayuda a otros a decidirse…\"></textarea>
  </div>

  <button type=\"submit\" class=\"md-button md-button--primary\">🎓 Enviar perfil</button>
</form>

!!! note \"¿No funciona el formulario?\"
    Si el formulario no responde, escríbeme a [contacto@urukais.com](mailto:contacto@urukais.com) con los datos y lo añado manualmente.

---

## 🗣️ Testimonios

*(Aún no hay testimonios. Sé el primero en compartir tu experiencia.)*

!!! example \"Plantilla de testimonio\"
    > *\"Empecé el libro sin saber nada de programación y hoy he construido mi primer proyecto real. La estructura por niveles y los ejercicios prácticos han sido clave.\"*
    >
    > — **Tu nombre**, tu país

---

## 📜 Cómo se verifica un perfil

Para aparecer en el Hall of Fame, el perfil debe cumplir:

- ✅ Haber completado los 38 capítulos del libro.
- ✅ Haber generado el [certificado](certificado.md).
- ✅ Ser una persona real (no se admiten perfiles falsos).
- ✅ Ser respetuoso (no se admiten perfiles ofensivos).

No se verifica técnicamente (no hay servidor), pero se confía en la buena fe de la comunidad. Si alguien miente, no pasa nada: el reconocimiento es simbólico.

---

## 🏅 Contribuidores destacados

Además de los graduados, esta sección reconoce a quienes han contribuido al proyecto:

*(Aún no hay contribuidores externos. ¿Quieres ser el primero? Consulta la página de [Contribuir](contribuir.md).)*

---

## ➡️ Siguientes pasos

[🎓 Generar mi certificado](certificado.md){ .md-button .md-button--primary }
[🏆 Ver mis logros](logros.md){ .md-button }
[🤝 Contribuir al proyecto](contribuir.md){ .md-button }
'''
open('docs/hall-of-fame.md', 'w', encoding='utf-8').write(contenido)
print('OK:', len(contenido.splitlines()), 'líneas escritas')
"