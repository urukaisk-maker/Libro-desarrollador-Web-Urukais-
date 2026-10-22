# 🎓 Certificado de Finalización

!!! quote "Tu esfuerzo merece un reconocimiento"
    Completar los **38 capítulos** del libro no es poca cosa. Por eso, al terminar, puedes generar un **certificado personalizado en PDF** con tu nombre y la fecha de finalización.

---

## 🎯 ¿Qué es este certificado?

Es un **reconocimiento simbólico** de que has completado el Libro del Desarrollador Web. No tiene validez académica ni profesional oficial, pero puedes:

- Incluirlo en tu **portfolio** como muestra de formación autodidacta.
- Añadirlo a tu perfil de **LinkedIn** en la sección de formación.
- Compartirlo en **redes sociales** para celebrar tu logro.
- Imprimirlo y colgarlo en tu pared (si eres de los que lo hacen).

!!! warning "Sin validez oficial"
    Este certificado **no sustituye** a una titulación oficial. Es un reconocimiento del proyecto, no de una institución educativa. Si necesitas un certificado con validez profesional, tendrás que buscar una certificación oficial (como las de freeCodeCamp, Meta, Google o Microsoft).

---

## ✅ Requisitos para obtenerlo

Para desbloquear el certificado necesitas:

1. **Completar los 38 capítulos** del libro.
2. **Marcar cada capítulo como completado** al final de su página.
3. **Tener al menos 30 ejercicios resueltos** (opcional, pero recomendado).
4. **Haber completado al menos 3 retos semanales** (opcional).

!!! tip "Tu progreso se guarda en tu navegador"
    Los capítulos completados se guardan con `localStorage`. Si borras los datos del navegador, pierdes el progreso. Si cambias de dispositivo, el progreso **no se sincroniza** (todavía).

---

## 📊 Tu progreso actual

<div class="certificado-progreso" id="certificado-progreso">
  <div class="certificado-progreso__bar">
    <div class="certificado-progreso__fill" id="certificado-progreso-fill" style="width: 0%"></div>
  </div>
  <p class="certificado-progreso__text" id="certificado-progreso-text">
    Cargando progreso…
  </p>
</div>

---

## 🎨 Vista previa del certificado

Así se verá tu certificado una vez completado:

<div class="certificado-preview" id="certificado-preview">
  <div class="certificado-preview__border">
    <div class="certificado-preview__content">
      <div class="certificado-preview__logo">📘</div>
      <h2 class="certificado-preview__title">Certificado de Finalización</h2>
      <p class="certificado-preview__subtitle">Libro del Desarrollador Web</p>
      <p class="certificado-preview__text">Se otorga el presente certificado a</p>
      <p class="certificado-preview__name" id="certificado-preview-nombre">Tu Nombre Aquí</p>
      <p class="certificado-preview__text">por haber completado los 38 capítulos del libro, demostrando constancia y dedicación en el aprendizaje del desarrollo web.</p>
      <div class="certificado-preview__footer">
        <div class="certificado-preview__fecha">
          <span class="certificado-preview__label">Fecha</span>
          <span id="certificado-preview-fecha">Octubre 2026</span>
        </div>
        <div class="certificado-preview__firma">
          <span class="certificado-preview__label">Autor</span>
          <span>Manuel Casimiro Carrasco (Urukais)</span>
        </div>
      </div>
    </div>
  </div>
</div>

---

## 🛠️ Genera tu certificado

Cuando hayas completado el libro, rellena el formulario para generar tu certificado personalizado:

<form class="certificado-form" id="certificado-form" onsubmit="return false;">
  <div class="certificado-field">
    <label for="certificado-nombre">Tu nombre completo <span class="required">*</span></label>
    <input type="text" id="certificado-nombre" name="nombre" required placeholder="Ej: María García López" maxlength="60">
    <small>Este nombre aparecerá en el certificado. Escríbelo tal como quieres que se vea.</small>
  </div>

  <div class="certificado-field">
    <label for="certificado-fecha">Fecha de finalización <span class="required">*</span></label>
    <input type="date" id="certificado-fecha" name="fecha" required>
  </div>

  <div class="certificado-field">
    <label for="certificado-email">Email (opcional)</label>
    <input type="email" id="certificado-email" name="email" placeholder="tu@email.com">
    <small>Solo se usa para enviarte el certificado. No se comparte con nadie.</small>
  </div>

  <div class="certificado-actions">
    <button type="button" class="md-button md-button--primary" id="certificado-generar">
      🎓 Generar certificado
    </button>
    <button type="button" class="md-button" id="certificado-descargar" disabled>
      ⬇️ Descargar PDF
    </button>
  </div>
</form>

!!! warning "Solo si has completado el libro"
    Si intentas generar el certificado sin haber completado los 38 capítulos, el botón estará deshabilitado. Esto es para mantener la integridad del reconocimiento.

---

## 📥 ¿Qué pasa al generarlo?

1. Se genera un **PDF** con tu nombre, la fecha y el diseño del certificado.
2. Se descarga automáticamente a tu equipo.
3. Puedes **imprimirlo** o **compartirlo** en redes sociales.
4. Si quieres, puedes **enviarlo por email** (si has rellenado el campo).

!!! tip "Consejo para imprimir"
    Si vas a imprimir el certificado, usa papel **A4 horizontal** y configura la impresora para que no añada márgenes. El PDF ya está diseñado para imprimirse sin recortes.

---

## 🏆 Comparte tu logro

Si has generado tu certificado, ¡compártelo! Ayuda a motivar a otras personas a completar el libro.

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=He%20completado%20el%20Libro%20del%20Desarrollador%20Web%20de%20%40urukaisk%20%F0%9F%8E%93%20%C2%A1Ahora%20a%20por%20el%20siguiente%20reto!&url=https%3A%2F%2Flibro.urukais.com%2Fcertificado%2F" target="_blank" rel="noopener" aria-label="Compartir en Twitter">
<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
Twitter
</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcertificado%2F" target="_blank" rel="noopener" aria-label="Compartir en LinkedIn">
<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
LinkedIn
</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=He%20completado%20el%20Libro%20del%20Desarrollador%20Web%20%F0%9F%8E%93%20https%3A%2F%2Flibro.urukais.com%2Fcertificado%2F" target="_blank" rel="noopener" aria-label="Compartir en WhatsApp">
<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
WhatsApp
</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/certificado/" aria-label="Copiar enlace">
<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
Copiar enlace
</button>
</div>

---

## ❓ Preguntas frecuentes

??? question "¿Tengo que pagar por el certificado?"
    **No.** El certificado es **100% gratuito**, como todo el libro. No hay versión "premium" ni pago oculto.

??? question "¿Puedo obtener el certificado sin completar el libro?"
    **No.** El certificado se desbloquea solo cuando has completado los 38 capítulos. Esto es para mantener la integridad del reconocimiento. Si intentas generarlo antes, el botón estará deshabilitado.

??? question "¿El certificado se guarda en algún servidor?"
    **No.** El PDF se genera **en tu navegador** con JavaScript. No se envía a ningún servidor. Tu nombre y fecha se quedan en tu equipo.

??? question "¿Puedo poner un alias en lugar de mi nombre real?"
    **Sí.** Puedes poner el nombre que quieras. Al fin y al cabo, es tu certificado.

??? question "¿Puedo modificar el diseño del certificado?"
    **Sí.** El código del certificado está en `docs/assets/js/certificado.js` y `docs/assets/css/certificado.css`. Si quieres personalizarlo (colores, tipografía, texto), puedes hacerlo. Es open source.

??? question "¿Cómo verifico que un certificado es auténtico?"
    **No se puede verificar.** Al no haber un servidor central, no hay forma de comprobar si un certificado es auténtico. Es un reconocimiento simbólico, no oficial. Si alguien quiere verificarlo, tendrá que confiar en tu palabra.

??? question "¿Puedo obtener el certificado si borré los datos del navegador?"
    Si borraste los datos del navegador, perdiste el progreso. Tendrás que volver a marcar los capítulos como completados para desbloquear el certificado.

---

## 🚀 ¿Aún no has terminado el libro?

Si estás leyendo esto y aún no has completado los 38 capítulos, no te preocupes. Ve a tu ritmo. El certificado estará aquí cuando termines.

[📖 Volver al índice](index.md){ .md-button .md-button--primary }
[🎯 Ver mi progreso](logros.md){ .md-button }

---

**Última actualización:** Octubre 2026 · **Autor:** [Manuel Casimiro Carrasco (Urukais)](autor.md)