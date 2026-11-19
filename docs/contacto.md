# ✉️ Contacto

!!! quote "Hablemos"
    ¿Tienes una duda, una sugerencia, una propuesta de colaboración o simplemente quieres decir hola? Aquí tienes todas las formas de contactar conmigo. Elige la que mejor se adapte a lo que necesitas.

---

## 📬 Formulario de contacto

Rellena los campos y se abrirá tu aplicación o gestor de correo con el mensaje preparado para `urukaisk@gmail.com`.

<form id="mailto-contact-form" class="contact-form">
  <div class="contact-field">
    <label for="nombre">Nombre <span class="required">*</span></label>
    <input type="text" id="nombre" name="nombre" required placeholder="Tu nombre">
  </div>

  <div class="contact-field">
    <label for="email">Tu email <span class="required">*</span></label>
    <input type="email" id="email" name="email" required placeholder="tu@email.com">
  </div>

  <div class="contact-field">
    <label for="asunto">Asunto <span class="required">*</span></label>
    <select id="asunto" name="asunto" required>
      <option value="">— Selecciona un asunto —</option>
      <option value="Duda sobre el contenido">Duda sobre el contenido</option>
      <option value="Reportar un error">Reportar un error</option>
      <option value="Sugerencia o mejora">Sugerencia o mejora</option>
      <option value="Propuesta de colaboración">Propuesta de colaboración</option>
      <option value="Prensa o medios">Prensa o medios</option>
      <option value="Charla o taller">Charla o taller</option>
      <option value="Otro">Otro</option>
    </select>
  </div>

  <div class="contact-field">
    <label for="mensaje">Mensaje <span class="required">*</span></label>
    <textarea id="mensaje" name="mensaje" rows="6" required placeholder="Cuéntame qué necesitas…"></textarea>
  </div>

  <div class="contact-field contact-checkbox">
    <input type="checkbox" id="privacidad" name="privacidad" required>
    <label for="privacidad">He leído y acepto la <a href="index.md#licencia">política de privacidad</a>.</label>
  </div>

  <button type="submit" class="md-button md-button--primary">✉️ Abrir en mi correo</button>
</form>

<script>
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("mailto-contact-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const asunto = document.getElementById("asunto").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    const subject = encodeURIComponent(`[Libro Web] ${asunto} — ${nombre}`);
    const body = encodeURIComponent(
      `Nombre: ${nombre}\n` +
      `Email: ${email}\n` +
      `Asunto: ${asunto}\n\n` +
      `Mensaje:\n${mensaje}`
    );

    window.location.href = `mailto:urukaisk@gmail.com?subject=${subject}&body=${body}`;
  });
});
</script>

!!! note "¿No se abre tu gestor de correo?"
    Si no tienes un cliente de correo configurado o prefieres escribir directamente desde tu webmail, envía tu mensaje a [urukaisk@gmail.com](mailto:urukaisk@gmail.com).

---

## 📮 Canales directos

Si prefieres contactar por otra vía, aquí tienes todos los canales disponibles:

| Canal | Uso recomendado | Enlace |
| :--- | :--- | :--- |
| **📧 Email** | Consultas generales, prensa y colaboraciones | [urukaisk@gmail.com](mailto:urukaisk@gmail.com) |
| **🐛 GitHub Issues** | Errores, erratas y sugerencias técnicas | [Abrir issue](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues/new) |
| **💬 GitHub Discussions** | Preguntas, debates e ideas | [Ir a Discussions](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/discussions) |
| **🐦 Twitter / X** | Menciones públicas y compartir contenido | [@urukaisk](https://x.com/urukaisk) |
| **💼 LinkedIn** | Contacto profesional | [Manuel Casimiro Carrasco](https://www.linkedin.com/in/urukais/) |
| **📰 Substack** | Newsletter y novedades | [urukaisklick.substack.com](https://urukaisklick.substack.com) |
| **🐙 GitHub** | Código y contribuciones | [@urukaisk-maker](https://github.com/urukaisk-maker) |

---

## 🎯 ¿Sobre qué puedes escribirme?

### ✅ Sí, escríbeme si…

- Tienes una **duda sobre el contenido** del libro.
- Has encontrado un **error, errata o enlace roto**.
- Quieres **sugerir una mejora** o un tema nuevo.
- Quieres **proponer una colaboración** (traducción, capítulo invitado, etc.).
- Eres **prensa o medio** y quieres hablar del proyecto.
- Quieres que dé una **charla o taller**.
- Has construido algo con el libro y quieres **compartirlo**.
- Simplemente quieres **saludar** o dar las gracias.

### ❌ No, mejor no me escribas si…

- Es un **tema de soporte técnico personal** (mi tiempo es limitado y para eso está Stack Overflow).
- Es para **vender algo** (servicios, productos, SEO, marketing…).
- Es **spam** o mensajes automáticos.
- Es para **pedir que haga tu tarea** (no hago deberes, pero puedo orientarte).

---

## ⏱️ Tiempos de respuesta

Soy una persona, no una empresa. Estos son los tiempos orientativos:

| Canal | Tiempo de respuesta |
| :--- | :--- |
| **GitHub Issues** | 24–72 h (laborables) |
| **GitHub Discussions** | 24–72 h (laborables) |
| **Email** | 2–5 días laborables |
| **Formulario** | 2–5 días laborables |
| **Twitter / X** | Variable (no lo reviso a diario) |
| **LinkedIn** | 3–7 días laborables |

!!! warning "No garantizo respuesta inmediata"
    El libro es un proyecto personal que mantengo en mi tiempo libre. Si necesito más tiempo del indicado para responderte, no significa que no me importe: significa que estoy ocupado con el trabajo, la vida o el propio libro.

---

## ❓ Antes de escribirme: ¿está tu duda en la FAQ?

Muchas de las preguntas habituales ya tienen respuesta en la página de [Preguntas frecuentes](faq.md). Antes de escribirme, échale un vistazo:

- [¿Es gratis? ¿Cómo se financia?](faq.md#sobre-el-proyecto)
- [¿Para quién es el libro?](faq.md#sobre-el-contenido)
- [¿Cómo contribuyo?](faq.md#sobre-contribuir)
- [¿Cómo obtengo el certificado?](faq.md#sobre-los-logros-y-el-certificado)

Si tu duda no aparece en la FAQ, entonces sí: escríbeme.

---

## 🤝 Colaboraciones

Si quieres colaborar con el proyecto (traducción, capítulo invitado, patrocinio, charla…), indícamelo en el asunto del formulario o por email. Cuéntame:

- **Quién eres** y a qué te dedicas.
- **Qué propones** concretamente.
- **Por qué** crees que encaja con el proyecto.
- **Qué necesitarías** de mi parte.

!!! tip "Respuesta a colaboraciones"
    Si tu propuesta encaja con los valores del proyecto (open source, gratuito y sin publicidad), te responderé con mucho gusto. Si no encaja, también te lo diré con honestidad.

---

## 🗺️ Dónde estoy

Soy de España 🇪🇸, pero colaboro con gente de todo el mundo. Tenlo en cuenta si me escribes desde otra franja horaria.

---

## 🔐 Privacidad

Tus datos **solo se usan para responderte**. No se venden, ni se comparten con terceros, ni se usan para spam. Si quieres que elimine tu mensaje después de responderte, solo tienes que pedírmelo.

Para más información, consulta la [política de privacidad](index.md#licencia).

---

## 💬 Última reflexión

> *"Un email bien escrito ahorra 10 mensajes."*

Si me escribes, ayúdame a ayudarte: sé concreto, cuéntame qué necesitas y, si es un error técnico, adjunta capturas, logs o el código que falla. Con esa información podré responderte mucho más rápido y mejor.

---

## ➡️ Siguientes pasos

[🐛 Reportar un error](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues/new){ .md-button .md-button--primary }

[💬 Ir a Discussions](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/discussions){ .md-button }

[📖 Leer las FAQ](faq.md){ .md-button }