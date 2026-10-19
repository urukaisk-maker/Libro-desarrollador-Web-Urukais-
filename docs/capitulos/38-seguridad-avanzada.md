# Capítulo 38 — Seguridad Web Avanzada

## Introducción

En el Capítulo 26 vimos los fundamentos de la seguridad web. Aquí vamos a profundizar en las técnicas más avanzadas que usan los profesionales para proteger aplicaciones críticas.

## Cabeceras de Seguridad Avanzadas

### Content Security Policy (CSP)

CSP es una capa adicional de seguridad que ayuda a detectar y mitigar ataques como XSS e inyección de datos.

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.cdn.com; style-src 'self' 'unsafe-inline'
```

### Strict-Transport-Security (HSTS)

Fuerza a que todas las conexiones se hagan por HTTPS.

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

## Autenticación con WebAuthn

WebAuthn permite a los usuarios autenticarse con huella digital, Face ID o llaves de seguridad físicas (YubiKey), eliminando las contraseñas.

```javascript
const credencial = await navigator.credentials.create({
  publicKey: {
    challenge: new Uint8Array(32),
    rp: { name: 'Mi App' },
    user: { id: new Uint8Array(16), name: 'usuario@ejemplo.com', displayName: 'Usuario' },
    pubKeyCredParams: [{ alg: -7, type: 'public-key' }]
  }
});
```

## Rate Limiting y Protección contra DDoS

Usa middlewares como `express-rate-limit` en el backend y soluciones como Cloudflare en el frontend.

```javascript
import rateLimit from 'express-rate-limit';
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 peticiones por IP
  message: 'Demasiadas peticiones. Inténtalo más tarde.'
}));
```

## Ejercicios

1. Configura CSP en tu proyecto y verifica con securityheaders.com.
2. Implementa rate limiting en una API Express.
3. Investiga cómo funciona WebAuthn con una llave de seguridad.

---

⬅️ [Capítulo 37 — IA Generativa](37-ia-generativa.md) | ➡️ [Apéndices](../apendices/index.md)
