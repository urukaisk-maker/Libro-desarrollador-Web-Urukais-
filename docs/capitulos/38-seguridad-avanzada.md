# 38 — Seguridad Web Avanzada

!!! abstract "Qué vas a aprender"
    - El OWASP Top 10 en profundidad.
    - Ataques avanzados: SSRF, XXE, prototype pollution.
    - Content Security Policy (CSP) en producción.
    - Gestión de secretos.
    - Auditoría y respuesta a incidentes.

---

## 🛡️ ¿Por qué seguridad avanzada?

La seguridad básica (HTTPS, validación, hashing) cubre el 80% de los ataques. Pero los atacantes profesionales buscan el 20% restante: configuraciones mal hechas, dependencias vulnerables, lógica de negocio rota.

!!! quote "La seguridad es una carrera armamentística"
    Los atacantes evolucionan constantemente. Lo que hoy es seguro, mañana puede no serlo. La seguridad no es un estado, es un proceso continuo.

---

## 📋 OWASP Top 10 (2021)

| # | Vulnerabilidad | Ejemplo |
| :--- | :--- | :--- |
| 1 | **Broken Access Control** | Acceder a /admin sin ser admin |
| 2 | **Cryptographic Failures** | Guardar contraseñas en texto plano |
| 3 | **Injection** | SQL Injection, XSS |
| 4 | **Insecure Design** | Lógica de negocio sin validar |
| 5 | **Security Misconfiguration** | Debug activo en producción |
| 6 | **Vulnerable Components** | Dependencias con CVEs |
| 7 | **Authentication Failures** | Contraseñas débiles, sin rate limit |
| 8 | **Data Integrity Failures** | Deserialización insegura |
| 9 | **Logging Failures** | No registrar ataques |
| 10 | **SSRF** | Server-Side Request Forgery |

---

## 🎯 Ataques avanzados

### SSRF (Server-Side Request Forgery)

El atacante hace que **el servidor** haga peticiones a recursos internos.

```javascript
// ❌ Vulnerable: fetch de una URL del usuario
app.get("/proxy", async (req, res) => {
  const data = await fetch(req.query.url);
  res.send(await data.text());
});
// Ataque: /proxy?url=http://localhost:6379

// ✅ Seguro: validar contra una allowlist
const ALLOWED = ["https://api.ejemplo.com"];
if (!ALLOWED.includes(new URL(req.query.url).origin)) {
  return res.status(403).send("URL no permitida");
}
```

### Prototype Pollution

El atacante inyecta propiedades en `Object.prototype`.

```javascript
// ❌ Vulnerable
function merge(target, source) {
  for (let key in source) {
    target[key] = source[key];
  }
  return target;
}
merge({}, JSON.parse(\x27{"__proto__":{"isAdmin":true}}\x27));
// Ahora TODOS los objetos tienen isAdmin=true

// ✅ Seguro: usar Object.create(null) o filtrar __proto__
const safe = Object.create(null);
```

### XXE (XML External Entity)

Si parseas XML sin protección, el atacante puede leer archivos del servidor.

```
<!-- Payload malicioso -->
<?xml version="1.0"?>
<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>
<foo>&xxe;</foo>
```

!!! warning "Nunca parsees XML sin protección"
    Usa librerías con `resolveEntities: false` o, mejor, no uses XML: usa JSON.

---

## 🔒 Content Security Policy (CSP)

CSP es una cabecera HTTP que restringe qué recursos puede cargar una página.

```http
Content-Security-Policy:
  default-src \x27self\x27;
  script-src \x27self\x27 https://trusted.cdn.com;
  style-src \x27self\x27 \x27unsafe-inline\x27;
  img-src \x27self\x27 data: https:;
  connect-src \x27self\x27 https://api.miapp.com;
  frame-ancestors \x27none\x27;
  base-uri \x27self\x27;
  form-action \x27self\x27;
```

!!! tip "Empieza en modo report"
    Usa `Content-Security-Policy-Report-Only` al principio para ver qué se rompe sin bloquear nada. Cuando esté limpio, cámbialo a `Content-Security-Policy`.

---

## 🔑 Gestión de secretos

| Práctica | Descripción |
| :--- | :--- |
| **Nunca en el código** | Ni en el frontend ni en el repo |
| **Variables de entorno** | `.env` en local, secrets en CI/CD |
| **Rotación periódica** | Cambia claves cada 90 días |
| **Principio de menor privilegio** | Cada servicio solo los permisos que necesita |
| **Cifrado en reposo** | Secrets manager (Vault, AWS Secrets Manager) |
| **Auditoría** | Registra quién accede a cada secreto |

```bash
# .gitignore
.env
.env.local
*.pem
*.key
```

!!! warning "Si subes un secreto a GitHub"
    Considéralo comprometido. Rótalo inmediatamente, aunque lo borres en el siguiente commit (queda en el historial).

---

## 🔍 Auditoría y monitorización

| Herramienta | Uso |
| :--- | :--- |
| **Snyk** | Vulnerabilidades en dependencias |
| **npm audit** | Vulnerabilidades en npm |
| **OWASP ZAP** | Escáner de vulnerabilidades web |
| **Dependabot** | Actualizaciones automáticas de dependencias |
| **Sentry** | Errores en producción |
| **Security Headers** | Analiza cabeceras de seguridad |

```bash
npm audit
npm audit fix
```

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-38">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué ataque hace que el servidor haga peticiones internas?</p>
<button class="quiz-option" data-opt="a">A) XSS</button>
<button class="quiz-option" data-opt="b">B) SSRF</button>
<button class="quiz-option" data-opt="c">C) CSRF</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué cabecera restringe qué recursos puede cargar una página?</p>
<button class="quiz-option" data-opt="a">A) Content-Security-Policy</button>
<button class="quiz-option" data-opt="b">B) Access-Control-Allow-Origin</button>
<button class="quiz-option" data-opt="c">C) X-Frame-Options</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Dónde NO debes guardar secretos?</p>
<button class="quiz-option" data-opt="a">A) En variables de entorno</button>
<button class="quiz-option" data-opt="b">B) En un secrets manager</button>
<button class="quiz-option" data-opt="c">C">En el código del frontend</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2038%3A%20Seguridad%20Web%20Avanzada&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F38-seguridad-avanzada%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F38-seguridad-avanzada%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2038%3A%20Seguridad%20Web%20Avanzada%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F38-seguridad-avanzada%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/38-seguridad-avanzada/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## 🏆 ¡HAS COMPLETADO EL LIBRO!

Si has llegado hasta aquí, has terminado los **38 capítulos** del Libro del Desarrollador Web. Eso es un logro enorme. 🎉

| Nivel | Capítulos |
| :--- | :--- |
| 🟢 Principiante | 01–06 |
| 🟡 Intermedio | 07–10 |
| 🟠 Avanzado | 11–18 |
| 🔴 Profesional | 19–20 |
| 🟣 Experto | 21–25 |
| 🔵 Élite | 26–30 |
| 🚀 Vanguardia | 31–38 |

!!! quote "Enhorabuena"
    Has pasado de no saber qué era HTML a dominar seguridad avanzada, WebAssembly, IA generativa y micro-frontends. Ahora toca **construir**, **compartir** y **enseñar**.

### ¿Y ahora qué?

- 🎓 **Genera tu certificado** en la página de [Certificado](certificado.md).
- 🏅 **Aparece en el Hall of Fame** ([Hall of Fame](hall-of-fame.md)).
- 🤝 **Contribuye al proyecto** ([Contribuir](contribuir.md)).
- 📣 **Comparte tu logro** en redes sociales.
- 🚀 **Sigue aprendiendo**: la web nunca deja de evolucionar.

---

## ➡️ Siguientes pasos

[🎓 Generar mi certificado](certificado.md){ .md-button .md-button--primary }
[🏅 Ver el Hall of Fame](hall-of-fame.md){ .md-button }
[🤝 Contribuir al proyecto](contribuir.md){ .md-button }
[📖 Volver al índice](../index.md){ .md-button }
