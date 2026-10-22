# 26 — Seguridad web

!!! abstract "Qué vas a aprender"
    - Los ataques más comunes: XSS, CSRF, SQL Injection.
    - Cómo prevenirlos.
    - HTTPS, CORS y CSP.
    - Buenas prácticas de autenticación.
    - Auditoría de seguridad.

---

## 🔒 ¿Por qué importa la seguridad?

Una vulnerabilidad puede costar **millones de euros**, destruir la reputación de una empresa y exponer datos personales de usuarios. La seguridad no es opcional: es parte del trabajo.

!!! quote "La seguridad es un proceso, no un producto"
    No se trata de instalar un plugin y olvidarse. Se trata de pensar en seguridad en cada decisión de diseño, código y despliegue.

---

## 🚨 Los ataques más comunes

| Ataque | Qué hace | Impacto |
| :--- | :--- | :--- |
| **XSS** (Cross-Site Scripting) | Inyecta código malicioso en la web | Robo de sesión, redirecciones |
| **CSRF** (Cross-Site Request Forgery) | Fuerza al usuario a ejecutar acciones | Cambios de contraseña, transferencias |
| **SQL Injection** | Inyecta SQL en inputs | Robo de base de datos |
| **Clickjacking** | Engaña al usuario para que haga clic | Acciones no deseadas |
| **MITM** (Man-in-the-Middle) | Intercepta la comunicación | Robo de credenciales |

---

## 💉 XSS: Cross-Site Scripting

Ocurre cuando un atacante inyecta **JavaScript** en tu web, que se ejecuta en el navegador de otros usuarios.

```html
<!-- Vulnerable: el input se renderiza sin escapar -->
<div>Hola, <?php echo $_GET["nombre"]; ?></div>

<!-- Ataque: ?nombre=<script>alert("XSS")</script> -->
```

### Cómo prevenirlo

```javascript
// ❌ Malo: innerHTML con datos del usuario
elemento.innerHTML = input;

// ✅ Bueno: textContent escapa el HTML
elemento.textContent = input;
```

```javascript
// ✅ Si necesitas renderizar HTML, sanitízalo con DOMPurify
import DOMPurify from "dompurify";
elemento.innerHTML = DOMPurify.sanitize(input);
```

!!! warning "Sanitiza siempre"
    Cualquier dato que venga del usuario (input, URL, cookies) debe ser tratado como potencialmente malicioso. Sanitiza antes de renderizar.

---

## 🎭 CSRF: Cross-Site Request Forgery

Ocurre cuando un atacante hace que el navegador de un usuario autenticado ejecute una acción no deseada en tu web.

### Cómo prevenirlo

```html
<form method="POST" action="/cambiar-password">
  <input type="hidden" name="csrf_token" value="token-único">
  <!-- ... -->
</form>
```

```javascript
// En el servidor: validar que el token coincide
if (req.body.csrf_token !== req.session.csrf_token) {
  return res.status(403).json({ error: "CSRF token inválido" });
}
```

- ✅ Usa **SameSite=Strict** en cookies.
- ✅ Valida el header **Origin** y **Referer**.
- ✅ Usa **CSRF tokens** en formularios.
- ✅ Verifica el método HTTP (POST, PUT, DELETE para mutaciones).

---

## 🔐 HTTPS

HTTPS cifra la comunicación entre el navegador y el servidor. Sin HTTPS, cualquier atacante en la misma red puede leer las credenciales.

```
HTTP:  navegador → texto plano → servidor  (❌ inseguro)
HTTPS: navegador → cifrado TLS → servidor   (✅ seguro)
```

- ✅ Usa **Let\x27s Encrypt** (gratis).
- ✅ Redirige todo el tráfico HTTP a HTTPS.
- ✅ Activa **HSTS** (Strict-Transport-Security).

---

## 🌐 CORS

**CORS** (*Cross-Origin Resource Sharing*) es un mecanismo de seguridad que permite o bloquea peticiones entre dominios distintos.

```javascript
// Servidor
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://miapp.com");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
```

!!! warning "No uses `*` en producción"
    `Access-Control-Allow-Origin: *` permite que cualquier web haga peticiones a tu API. En producción, usa dominios específicos.

---

## 🛡️ Content Security Policy (CSP)

**CSP** es una cabecera HTTP que restringe qué recursos puede cargar una página: scripts, estilos, imágenes, fuentes… Es una defensa potente contra XSS.

```javascript
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", [
    "default-src \x27self\x27",
    "script-src \x27self\x27 https://trusted.cdn.com",
    "style-src \x27self\x27 \x27unsafe-inline\x27",
    "img-src \x27self\x27 data: https:"
  ].join("; "));
  next();
});
```

!!! tip "Empieza en modo report"
    Usa `Content-Security-Policy-Report-Only` al principio para ver qué se rompe sin bloquear nada. Cuando esté limpio, cambia a `Content-Security-Policy`.

---

## 🔑 Autenticación segura

- ✅ **Hashea contraseñas** con bcrypt, argon2 o scrypt. Nunca en texto plano.
- ✅ **Usa JWT con expiración corta** (15 min) + refresh token.
- ✅ **Rota los tokens** al cambiar de contraseña.
- ✅ **Rate limiting** en login (5 intentos/min).
- ✅ **2FA** (autenticación de dos factores) para cuentas sensibles.
- ✅ **Cookies HttpOnly + Secure + SameSite**.
- ❌ **No guardes tokens en localStorage** si puedes usar cookies HttpOnly.

---

## 🔍 Auditoría de seguridad

| Herramienta | Qué hace |
| :--- | :--- |
| **OWASP ZAP** | Escáner de vulnerabilidades web |
| **Lighthouse** | Auditoría de seguridad básica |
| **Snyk** | Vulnerabilidades en dependencias |
| **npm audit** | Vulnerabilidades en npm |
| **Security Headers** | Analiza cabeceras de seguridad |

```bash
npm audit
npm audit fix
```

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-26">
<div class="quiz-question" data-answer="a">
<p><strong>1.</strong> ¿Qué ataque inyecta JavaScript en la web?</p>
<button class="quiz-option" data-opt="a">A) XSS</button>
<button class="quiz-option" data-opt="b">B) CSRF</button>
<button class="quiz-option" data-opt="c">C) MITM</button>
</div>
<div class="quiz-question" data-answer="b">
<p><strong>2.</strong> ¿Qué propiedad de cookie evita CSRF?</p>
<button class="quiz-option" data-opt="a">A">HttpOnly</button>
<button class="quiz-option" data-opt="b">B) SameSite=Strict</button>
<button class="quiz-option" data-opt="c">C) Secure</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué cabecera restringe qué recursos puede cargar una página?</p>
<button class="quiz-option" data-opt="a">A) CORS</button>
<button class="quiz-option" data-opt="b">B) HSTS</button>
<button class="quiz-option" data-opt="c">C) CSP</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2026%3A%20Seguridad%20web&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F26-seguridad%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F26-seguridad%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2026%3A%20Seguridad%20web%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F26-seguridad%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/26-seguridad/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 27 — WebAssembly](27-webassembly.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
