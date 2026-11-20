---
description: "Chapter 26 of the Web Developer's Book: 26 — Web Security. Learn step by step with examples, exercises, and quizzes."
---
# 26 — Web Security

!!! abstract "What you will learn"
    - Most common attacks: XSS, CSRF, SQL Injection.
    - How to prevent them.
    - HTTPS, CORS, and CSP.
    - Authentication best practices.
    - Security auditing.

---

## 🔒 Why Does Security Matter?

A vulnerability can cost **millions of euros**, destroy a company's reputation, and expose users' personal data. Security isn't optional—it's part of the job.

!!! quote "Security is a process, not a product"
    It's not about installing a plugin and forgetting about it. It's about thinking about security in every design, code, and deployment decision.

---

## 🚨 Most Common Attacks

| Attack | What it does | Impact |
| :--- | :--- | :--- |
| **XSS** (Cross-Site Scripting) | Injects malicious code into the page | Session hijacking, redirects |
| **CSRF** (Cross-Site Request Forgery) | Forces an authenticated user to run actions | Password changes, transfers |
| **SQL Injection** | Injects SQL into inputs | Database theft |
| **Clickjacking** | Tricks the user into clicking | Unintended actions |
| **MITM** (Man-in-the-Middle) | Intercepts communication | Credential theft |

---

## 💉 XSS: Cross-Site Scripting

Happens when an attacker injects **JavaScript** into your site, executing in other users' browsers.

```html
<!-- Vulnerable: input is rendered unescaped -->
<div>Hola, <?php echo $_GET["nombre"]; ?></div>

<!-- Attack: ?nombre=<script>alert("XSS")</script> -->
```

### How to Prevent It

```javascript
// ❌ Bad: innerHTML with user data
elemento.innerHTML = input;

// ✅ Good: textContent escapes HTML
elemento.textContent = input;
```

```javascript
// ✅ If you need to render HTML, sanitize it with DOMPurify
import DOMPurify from "dompurify";
elemento.innerHTML = DOMPurify.sanitize(input);
```

!!! warning "Always sanitize"
    Any data coming from the user (input, URL, cookies) must be treated as potentially malicious. Sanitize before rendering.

---

## 🎭 CSRF: Cross-Site Request Forgery

Happens when an attacker makes an authenticated user's browser perform an unwanted action on your site.

### How to Prevent It

```html
<form method="POST" action="/cambiar-password">
  <input type="hidden" name="csrf_token" value="token-único">
  <!-- ... -->
</form>
```

```javascript
// On the server: validate that the token matches
if (req.body.csrf_token !== req.session.csrf_token) {
  return res.status(403).json({ error: "CSRF token inválido" });
}
```

- ✅ Use **SameSite=Strict** on cookies.
- ✅ Validate the **Origin** and **Referer** headers.
- ✅ Use **CSRF tokens** on forms.
- ✅ Verify the HTTP method (POST, PUT, DELETE for mutations).

---

## 🔐 HTTPS

HTTPS encrypts communication between browser and server. Without HTTPS, anyone on the same network can read credentials.

```
HTTP:  browser → plain text → server      (❌ insecure)
HTTPS: browser → TLS encryption → server (✅ secure)
```

- ✅ Use **Let's Encrypt** (free).
- ✅ Redirect all HTTP traffic to HTTPS.
- ✅ Enable **HSTS** (Strict-Transport-Security).

---

## 🌐 CORS

**CORS** (*Cross-Origin Resource Sharing*) is a security mechanism that allows or blocks requests across different origins.

```javascript
// Server
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "[https://miapp.com](https://miapp.com)");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
```

!!! warning "Don't use `*` in production"
    `Access-Control-Allow-Origin: *` lets any site make requests to your API. In production, use specific origins.

---

## 🛡 Content Security Policy (CSP)

**CSP** is an HTTP header that restricts which resources a page can load: scripts, styles, images, fonts… It is a strong defense against XSS.

```javascript
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", [
    "default-src 'self'",
    "script-src 'self' [https://trusted.cdn.com](https://trusted.cdn.com)",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:"
  ].join("; "));
  next();
});
```

!!! tip "Start in report-only mode"
    Use `Content-Security-Policy-Report-Only` at first to see what breaks without blocking anything. Once clean, switch to `Content-Security-Policy`.

---

## 🔑 Secure Authentication

- ✅ **Hash passwords** with bcrypt, argon2, or scrypt. Never store plain text.
- ✅ **Use short-lived JWTs** (15 min) + refresh token.
- ✅ **Rotate tokens** when changing passwords.
- ✅ **Rate limit** login endpoints (5 attempts/min).
- ✅ **2FA** (two-factor authentication) for sensitive accounts.
- ✅ **HttpOnly + Secure + SameSite cookies**.
- ❌ **Don't store tokens in localStorage** if you can use HttpOnly cookies.

---

## 🔍 Security Auditing

| Tool | What it does |
| :--- | :--- |
| **OWASP ZAP** | Web vulnerability scanner |
| **Lighthouse** | Basic security audit |
| **Snyk** | Dependency vulnerabilities |
| **npm audit** | npm package vulnerabilities |
| **Security Headers** | Analyzes security headers |

```bash
npm audit
npm audit fix
```

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-26">
<div class="quiz-question" data-answer="a">
<p><strong>1.</strong> Which attack injects JavaScript into a web page?</p>
<button class="quiz-option" data-opt="a">A) XSS</button>
<button class="quiz-option" data-opt="b">B) CSRF</button>
<button class="quiz-option" data-opt="c">C) MITM</button>
</div>
<div class="quiz-question" data-answer="b">
<p><strong>2.</strong> Which cookie attribute helps prevent CSRF?</p>
<button class="quiz-option" data-opt="a">A) HttpOnly</button>
<button class="quiz-option" data-opt="b">B) SameSite=Strict</button>
<button class="quiz-option" data-opt="c">C) Secure</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> Which header restricts which resources a page can load?</p>
<button class="quiz-option" data-opt="a">A) CORS</button>
<button class="quiz-option" data-opt="b">B) HSTS</button>
<button class="quiz-option" data-opt="c">C) CSP</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2026%3A%20Web%20Security&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F26-seguridad%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F26-seguridad%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%2026%3A%20Web%20Security%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F26-seguridad%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/26-seguridad/" aria-label="Copy link">Copy link</button>
</div>

---

## ➡ Next Step

[Go to Chapter 27 — WebAssembly](27-webassembly.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }