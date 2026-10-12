# Ejercicios resueltos — Capítulo 6

[Volver al índice](index.md) · [Capítulo original](../capitulos/06-formularios.md)

## Ejercicio 1: Formulario de contacto

> Crea un formulario de contacto con nombre, email y mensaje.

### Solución

```html
<form action="/enviar" method="POST">
  <label for="nombre">Nombre</label>
  <input type="text" id="nombre" name="nombre" required minlength="2" maxlength="50">

  <label for="email">Email</label>
  <input type="email" id="email" name="email" required>

  <label for="mensaje">Mensaje</label>
  <textarea id="mensaje" name="mensaje" rows="5" required minlength="10"></textarea>

  <button type="submit">Enviar</button>
</form>
```

**Explicación:**
- Cada `<input>` con su `<label>` asociado por `for`/`id`.
- `required` → validación nativa.
- `minlength` y `maxlength` → limitan la longitud.

---

## Ejercicio 2: Validación de email obligatoria

> Añade validación para que el email sea obligatorio.

### Solución

```html
<input
  type="email"
  id="email"
  name="email"
  required
  placeholder="tu@email.com"
  pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
  title="Introduce un email válido"
>
```

**Explicación:**
- `type="email"` → el navegador valida el formato.
- `pattern` → expresión regular adicional.
- `title` → mensaje de error personalizado.

!!! warning "Valida también en el servidor"
    La validación del navegador es solo para UX. **Nunca** confíes en ella como seguridad. Valida siempre en el backend.

---

## Ejercicio 3: Mostrar datos en consola

> Muestra en consola los datos al enviar.

### Solución

```html
<form id="mi-form">
  <label for="nombre">Nombre</label>
  <input type="text" id="nombre" name="nombre" required>

  <label for="email">Email</label>
  <input type="email" id="email" name="email" required>

  <button type="submit">Enviar</button>
</form>

<script>
  const form = document.getElementById('mi-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const datos = new FormData(form);
    const objeto = Object.fromEntries(datos.entries());
    console.log('Datos del formulario:', objeto);
    form.reset();
  });
</script>
```

**Explicación:**
- `e.preventDefault()` → evita el envío por defecto.
- `FormData` → recoge todos los campos.
- `Object.fromEntries()` → convierte a objeto JS.

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/06-formularios.md)
