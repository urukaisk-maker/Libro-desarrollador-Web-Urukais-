---
description: "Chapter 38 of the Web Developer's Book: 38 — Advanced Web Security. Learn step by step with examples, exercises, and quizzes."
---
# 38 — Advanced Web Security

!!! abstract "What you will learn"
    - The OWASP Top 10 in depth.
    - Advanced attacks: SSRF, XXE, prototype pollution.
    - Content Security Policy (CSP) in production.
    - Secrets management.
    - Auditing and incident response.

---

## 🛡 Why Advanced Security?

Basic security (HTTPS, validation, hashing) covers 80% of attacks. Yet skilled attackers look for the remaining 20%: misconfigurations, vulnerable dependencies, broken business logic.

!!! quote "Security is an arms race"
    Attackers evolve constantly. What is safe today may not be tomorrow. Security isn't a state; it's an ongoing process.

---

## 📋 OWASP Top 10 (2021)

| # | Vulnerability | Example |
| :--- | :--- | :--- |
| 1 | **Broken Access Control** | Accessing /admin without being an admin |
| 2 | **Cryptographic Failures** | Storing passwords in plain text |
| 3 | **Injection** | SQL Injection, XSS |
| 4 | **Insecure Design** | Unvalidated business logic |
| 5 | **Security Misconfiguration** | Debug mode enabled in production |
| 6 | **Vulnerable Components** | Dependencies with CVEs |
| 7 | **Authentication Failures** | Weak passwords, missing rate limit |
| 8 | **Data Integrity Failures** | Insecure deserialization |
| 9 | **Logging Failures** | Failing to log attacks |
| 10 | **SSRF** | Server-Side Request Forgery |

---

## 🎯 Advanced Attacks

### SSRF (Server-Side Request Forgery)

The attacker tricks **the server** into making requests to internal resources.

```javascript
// ❌ Vulnerable: fetching a user-supplied URL
app.get("/proxy", async (req, res) => {
  const data = await fetch(req.query.url);
  res.send(await data.text());
});
// Attack: /proxy?url=http://localhost:6379

// ✅ Safe: validate against an allowlist
const ALLOWED = ["[https://api.ejemplo.com](https://api.ejemplo.com)"];
if (!ALLOWED.includes(new URL(req.query.url).origin)) {
  return res.status(403).send("URL no permitida");
}
```

### Prototype Pollution

The attacker injects properties into `Object.prototype`.

```javascript
// ❌ Vulnerable
function merge(target, source) {
  for (let key in source) {
    target[key] = source[key];
  }
  return target;
}
merge({}, JSON.parse('{"__proto__":{"isAdmin":true}}'));
// Now ALL objects have isAdmin=true

// ✅ Safe: use Object.create(null) or filter __proto__
const safe = Object.create(null);
```

### XXE (XML External Entity)

If you parse XML without protection, an attacker can read files from the server.

```
<!-- Malicious payload -->
<?xml version="1.0"?>
<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>
<foo>&xxe;</foo>
```

!!! warning "Never parse XML without protection"
    Use parsers with `resolveEntities: false` or, better yet, don't use XML: use JSON.

---

## 🔒 Content Security Policy (CSP)

CSP is an HTTP header that restricts which resources a page can load.

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' [https://trusted.cdn.com](https://trusted.cdn.com);
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' [https://api.miapp.com](https://api.miapp.com);
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
```

!!! tip "Start in report mode"
    Use `Content-Security-Policy-Report-Only` at first to see what breaks without blocking anything. Once it's clean, switch it to `Content-Security-Policy`.

---

## 🔑 Secrets Management

| Practice | Description |
| :--- | :--- |
| **Never in code** | Not in frontend or repo |
| **Environment variables** | `.env` locally, secrets in CI/CD |
| **Periodic rotation** | Rotate keys every 90 days |
| **Principle of least privilege** | Each service gets only the permissions it needs |
| **Encryption at rest** | Secrets manager (Vault, AWS Secrets Manager) |
| **Auditing** | Log who accesses each secret |

```bash
# .gitignore
.env
.env.local
*.pem
*.key
```

!!! warning "If you push a secret to GitHub"
    Treat it as compromised. Rotate it immediately, even if you delete it in the next commit (it stays in git history).

---

## 🔍 Auditing and Monitoring

| Tool | Purpose |
| :--- | :--- |
| **Snyk** | Dependency vulnerabilities |
| **npm audit** | npm vulnerabilities |
| **OWASP ZAP** | Web vulnerability scanner |
| **Dependabot** | Automated dependency updates |
| **Sentry** | Production errors |
| **Security Headers** | Analyzes security headers |

```bash
npm audit
npm audit fix
```

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-38">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> Which attack makes the server send internal requests?</p>
<button class="quiz-option" data-opt="a">A) XSS</button>
<button class="quiz-option" data-opt="b">B) SSRF</button>
<button class="quiz-option" data-opt="c">C) CSRF</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> Which header restricts which resources a page can load?</p>
<button class="quiz-option" data-opt="a">A) Content-Security-Policy</button>
<button class="quiz-option" data-opt="b">B) Access-Control-Allow-Origin</button>
<button class="quiz-option" data-opt="c">C) X-Frame-Options</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> Where should you NOT store secrets?</p>
<button class="quiz-option" data-opt="a">A) In environment variables</button>
<button class="quiz-option" data-opt="b">B) In a secrets manager</button>
<button class="quiz-option" data-opt="c">C) In frontend code</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2038%3A%20Advanced%20Web%20Security&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F38-seguridad-avanzada%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F38-seguridad-avanzada%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%2038%3A%20Advanced%20Web%20Security%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F38-seguridad-avanzada%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/38-seguridad-avanzada/" aria-label="Copy link">Copy link</button>
</div>

---

## 🏆 YOU HAVE COMPLETED THE BOOK!

If you made it this far, you have finished all **38 chapters** of the Web Developer's Book. That is a huge achievement. 🎉

| Level | Chapters |
| :--- | :--- |
| 🟢 Beginner | 01–06 |
| 🟡 Intermediate | 07–10 |
| 🟠 Advanced | 11–18 |
| 🔴 Professional | 19–20 |
| 🟣 Expert | 21–25 |
| 🔵 Elite | 26–30 |
| 🚀 Cutting-Edge | 31–38 |

!!! quote "Congratulations"
    You've gone from not knowing what HTML was to mastering advanced security, WebAssembly, generative AI, and micro-frontends. Now it's time to **build**, **share**, and **teach**.

### What Now?

- 🎓 **Generate your certificate** on the [Certificate](../certificado.md) page.
- 🏅 **Appear in the Hall of Fame** ([Hall of Fame](../hall-of-fame.md)).
- 🤝 **Contribute to the project** ([Contribute](../contribuir.md)).
- 📣 **Share your achievement** on social media.
- 🚀 **Keep learning**: the web never stops evolving.

---

## ➡ Next Steps

[🎓 Generate my certificate](../certificado.md){ .md-button .md-button--primary }
[🏅 View Hall of Fame](../hall-of-fame.md){ .md-button }
[🤝 Contribute to the project](../contribuir.md){ .md-button }
[📖 Back to index](../index.md){ .md-button }