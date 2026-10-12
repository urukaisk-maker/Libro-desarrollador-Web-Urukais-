# Capítulo 26 — Seguridad web

## Introducción

La seguridad no es un extra que se añade al final. Es parte del desarrollo desde la primera línea de código. Una web insegura expone a los usuarios, daña la reputación y puede tener consecuencias legales.

Este capítulo repasa las **vulnerabilidades más comunes** y cómo protegerte de ellas.

## Los tres pilares

- **Confidencialidad**: solo quien debe ver los datos, los ve.
- **Integridad**: los datos no se modifican sin permiso.
- **Disponibilidad**: la web funciona cuando se necesita.

## HTTPS siempre

Todo el tráfico debe ir cifrado con **TLS**. Sin HTTPS:

- Los datos viajan en texto plano.
- Los navegadores marcan tu web como "no segura".
- Google penaliza tu SEO.

GitHub Pages, Netlify, Vercel y Cloudflare activan HTTPS automáticamente. Activa **HSTS** (Strict-Transport-Security) para forzar siempre HTTPS.

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## OWASP Top 10

La [OWASP](https://owasp.org/) publica cada año la lista de las vulnerabilidades más críticas. Estas son las principales para desarrollo web:

| # | Vulnerabilidad | Ejemplo |
|---|---|---|
| 1 | Control de acceso roto | Acceder a `/admin` sin permisos |
| 2 | Fallos criptográficos | Guardar contraseñas sin hash |
| 3 | Inyección | SQL, comandos del sistema |
| 4 | Diseño inseguro | Lógica de negocio mal planteada |
| 5 | Configuración incorrecta | Servidor con defaults expuestos |
| 6 | Componentes vulnerables | Dependencias desactualizadas |
| 7 | Fallos de autenticación | Fuerza bruta, sesiones mal gestionadas |
| 8 | Fallos de integridad | Actualizaciones sin firma |
| 9 | Fallos de logging | No detectar ataques |
| 10 | SSRF | Forzar el servidor a hacer peticiones |

## XSS (Cross-Site Scripting)

Ocurre cuando un atacante **inyecta JavaScript** en tu página.

### Ejemplo vulnerable

```javascript
// NUNCA hagas esto
const nombre = new URLSearchParams(location.search).get('nombre');
document.getElementById('saludo').innerHTML = `Hola, ${nombre}`;
```

Si alguien visita:
```
https://tuweb.com/?nombre=<script>robarCookies()</script>
```

El script se ejecuta en el navegador de la víctima.

### Cómo protegerte

**1. Usa `textContent` en lugar de `innerHTML`:**

```javascript
// Seguro
document.getElementById('saludo').textContent = `Hola, ${nombre}`;
```

**2. Escapa el HTML:**

```javascript
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[c]);
}
```

**3. Usa Content Security Policy (CSP):**

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://trusted.cdn.com">
```

CSP es una cabecera que le dice al navegador **qué fuentes** puede cargar. Bloquea scripts inyectados.

## CSRF (Cross-Site Request Forgery)

El atacante hace que el navegador de la víctima envíe una petición a tu servidor **sin que se dé cuenta**.

Ejemplo: un `<img>` en una web maliciosa hace una petición a `tubanco.com/transferir?cantidad=1000&destino=atacante`.

### Cómo protegerte

**1. Tokens CSRF:**

```html
<form method="POST" action="/transferir">
  <input type="hidden" name="csrf_token" value="{{ token }}">
  <!-- ... -->
</form>
```

El servidor verifica que el token coincide con la sesión.

**2. Cookies `SameSite`:**

```http
Set-Cookie: session=abc; SameSite=Strict; Secure; HttpOnly
```

- `SameSite=Strict`: no se envía desde otros sitios.
- `HttpOnly`: no accesible desde JavaScript.
- `Secure`: solo por HTTPS.

## Inyección SQL

Ocurre cuando concatenas input del usuario en una query SQL.

### Vulnerable

```javascript
// NUNCA
const query = `SELECT * FROM usuarios WHERE email = '${email}'`;
```

Si `email` es `' OR '1'='1`, devuelve todos los usuarios.

### Seguro (con consultas parametrizadas)

```javascript
const query = 'SELECT * FROM usuarios WHERE email = $1';
const resultado = await db.query(query, [email]);
```

Con **Prisma** o **Sequelize** ya estás protegido si usas su API normal.

## Autenticación segura

### Contraseñas

- **Mínimo 8 caracteres** (mejor 12+).
- **Hash con bcrypt, argon2 o scrypt**. Nunca SHA-256 directo.
- **Salt único** por usuario (bcrypt lo hace solo).

```javascript
import bcrypt from 'bcrypt';

const hash = await bcrypt.hash(password, 12);
const ok = await bcrypt.compare(password, hash);
```

### Rate limiting

Evita ataques de fuerza bruta.

```javascript
import rateLimit from 'express-rate-limit';

app.use('/api/login', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Demasiados intentos. Prueba en 15 minutos.',
}));
```

### 2FA (autenticación en dos pasos)

Siempre que puedas, ofrécelo. Con TOTP (Google Authenticator, Authy) o WebAuthn.

## Gestión de secretos

- **Nunca** metas claves en el código.
- **Nunca** subas `.env` a Git.
- Usa variables de entorno en el hosting.
- Rota claves periódicamente.
- Usa gestores como **Vault**, **AWS Secrets Manager** o **Doppler**.

`.gitignore`:
```
.env
.env.local
*.pem
```

## Cabeceras de seguridad

Configura estas cabeceras en tu servidor:

```http
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

En Nginx:

```nginx
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=()" always;
```

## Dependencias

La mayoría de vulnerabilidades vienen de **dependencias desactualizadas**.

```bash
npm audit
npm audit fix
```

Activa **Dependabot** en GitHub para PRs automáticos:

```yaml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
```

Herramientas: [Snyk](https://snyk.io/), [Socket.dev](https://socket.dev/).

## Validación en cliente y servidor

**Todo input del usuario es malicioso por defecto**.

- Valida siempre **en el servidor**.
- La validación en cliente (HTML5, JS) es solo UX.
- Usa **Zod** o **Joi** para validar schemas.

```javascript
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  edad: z.number().int().min(0).max(120),
});

const resultado = schema.safeParse(req.body);
if (!resultado.success) return res.status(400).json(resultado.error);
```

## Buenas prácticas

- **HTTPS en todo el sitio**, sin excepciones.
- **Nunca confíes en el cliente**. Valida siempre en servidor.
- **Hashes con bcrypt/argon2** para contraseñas.
- **Consultas parametrizadas** para SQL.
- **CSP + cabeceras de seguridad**.
- **Rate limiting** en endpoints sensibles.
- **Actualiza dependencias** semanalmente.
- **Rota secretos** periódicamente.
- **Logs de seguridad**: registra intentos fallidos de login.
- **Backups regulares** de bases de datos.
- **Principio de mínimo privilegio**: cada usuario solo lo necesario.

## Herramientas de auditoría

- **[OWASP ZAP](https://www.zaproxy.org/)** — escáner de vulnerabilidades.
- **[Lighthouse](https://developer.chrome.com/docs/lighthouse/)** — incluye auditoría de seguridad.
- **[Security Headers](https://securityheaders.com/)** — analiza tus cabeceras.
- **[SSL Labs](https://www.ssllabs.com/ssltest/)** — evalúa tu TLS.
- **[Have I Been Pwned](https://haveibeenpwned.com/)** — verifica filtraciones.

## Ejercicios

1. Audita tu web con [securityheaders.com](https://securityheaders.com/) y corrige lo que falte.
2. Reemplaza todos los `innerHTML` de tu código por `textContent` o escapado.
3. Añade rate limiting a un endpoint de login.
4. Configura CSP en tu servidor.
5. Ejecuta `npm audit` en un proyecto y actualiza dependencias.
6. Añade autenticación con bcrypt a una API.
7. Activa Dependabot en un repo de GitHub.

---

⬅️ [Capítulo 25 — Design systems](25-design-systems.md) | ➡️ [Capítulo 27 — WebAssembly](27-webassembly.md)


## Diagrama: capas de seguridad

\`\`\`mermaid
flowchart TB
    A[Usuario] -->|HTTPS| B[CDN / Firewall]
    B --> C[Servidor]
    C -->|Validación| D[Backend]
    D -->|Sanitización| E[(Base de datos)]

    style A fill:#a78bfa,color:white
    style E fill:#dc2626,color:white
\`\`\`

Cada capa añade una defensa: HTTPS cifra, el CDN filtra, el servidor valida, el backend sanitiza y la base de datos almacena.
