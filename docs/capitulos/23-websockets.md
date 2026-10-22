# 23 — WebSockets y tiempo real

!!! abstract "Qué vas a aprender"
    - Qué son los WebSockets y cuándo usarlos.
    - La API WebSocket en el navegador.
    - Servidor WebSocket con Node.js y ws.
    - Salas y broadcasting.
    - Reconexión y manejo de errores.

---

## 🔌 ¿Qué es un WebSocket?

Un **WebSocket** es un protocolo de comunicación **bidireccional** y **persistente** entre cliente y servidor. A diferencia de HTTP, la conexión no se cierra después de cada petición: queda abierta para enviar y recibir mensajes en tiempo real.

```
HTTP:     petición → respuesta → cerrar
WebSocket: conexión persistente ↔ mensajes en ambos sentidos
```

!!! quote "Tiempo real de verdad"
    Los WebSockets son la base de chats, notificaciones en vivo, colaboración en tiempo real y juegos multijugador.

---

## 🎯 ¿Cuándo usar WebSockets?

| Caso | WebSocket | HTTP polling |
| :--- | :--- | :--- |
| Chat | ✅ | ❌ |
| Notificaciones en vivo | ✅ | ❌ |
| Edición colaborativa | ✅ | ❌ |
| Juegos multijugador | ✅ | ❌ |
| Datos que cambian poco | ❌ | ✅ |
| APIs REST tradicionales | ❌ | ✅ |

---

## 💻 Cliente: la API WebSocket

```javascript
const ws = new WebSocket("wss://mi-servidor.com");

ws.addEventListener("open", () => {
  console.log("Conectado");
  ws.send(JSON.stringify({ tipo: "saludo", nombre: "Ana" }));
});

ws.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  console.log("Mensaje recibido:", data);
});

ws.addEventListener("close", () => {
  console.log("Desconectado");
});

ws.addEventListener("error", (err) => {
  console.error("Error:", err);
});
```

!!! warning "wss:// en producción"
    Usa siempre `wss://` (WebSocket seguro) en producción. `ws://` solo para desarrollo local.

---

## 🖥️ Servidor con Node.js y ws

```bash
npm install ws
```

```javascript
// server.js
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Cliente conectado");

  ws.on("message", (data) => {
    const mensaje = JSON.parse(data);
    console.log("Recibido:", mensaje);

    // Reenviar a todos los clientes
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ tipo: "mensaje", texto: mensaje.texto }));
      }
    });
  });

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});
```

---

## 🏠 Salas y broadcasting

```javascript
const salas = new Map();

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    const { tipo, sala, texto } = JSON.parse(data);

    if (tipo === "entrar") {
      if (!salas.has(sala)) salas.set(sala, new Set());
      salas.get(sala).add(ws);
      ws.sala = sala;
    }

    if (tipo === "mensaje" && ws.sala) {
      salas.get(ws.sala).forEach((client) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({ texto }));
        }
      });
    }
  });

  ws.on("close", () => {
    if (ws.sala && salas.has(ws.sala)) {
      salas.get(ws.sala).delete(ws);
    }
  });
});
```

---

## 🔄 Reconexión automática

Los WebSockets se pueden cerrar por red, servidor caído o timeout. Implementa reconexión:

```javascript
let ws;
let reintentos = 0;

function conectar() {
  ws = new WebSocket("wss://mi-servidor.com");

  ws.addEventListener("open", () => {
    console.log("Conectado");
    reintentos = 0;
  });

  ws.addEventListener("close", () => {
    console.log("Desconectado, reconectando...");
    reintentos++;
    const delay = Math.min(1000 * 2 ** reintentos, 30000);
    setTimeout(conectar, delay);
  });

  ws.addEventListener("error", () => ws.close());
}

conectar();
```

---

## ✅ Buenas prácticas

- ✅ **Usa `wss://`** en producción (WebSocket seguro).
- ✅ **Reconexión con backoff exponencial**: 1s, 2s, 4s, 8s...
- ✅ **Heartbeat**: envía pings periódicos para detectar conexiones muertas.
- ✅ **Autenticación**: valida el token al conectar, no solo al hacer login.
- ✅ **Limita el tamaño de los mensajes**: los mensajes gigantes bloquean.
- ✅ **Valida los datos** que llegan del cliente.
- ❌ **No uses WebSockets para todo**: para CRUD simple, HTTP es suficiente.

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-23">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué diferencia principal hay entre HTTP y WebSocket?</p>
<button class="quiz-option" data-opt="a">A) WebSocket es más lento</button>
<button class="quiz-option" data-opt="b">B) WebSocket mantiene la conexión abierta y es bidireccional</button>
<button class="quiz-option" data-opt="c">C) HTTP es más moderno</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué protocolo es seguro para WebSockets?</p>
<button class="quiz-option" data-opt="a">A) wss://</button>
<button class="quiz-option" data-opt="b">B) ws://</button>
<button class="quiz-option" data-opt="c">C) http://</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué técnica evita reconectar demasiado rápido?</p>
<button class="quiz-option" data-opt="a">A) Polling</button>
<button class="quiz-option" data-opt="b">B) Heartbeat</button>
<button class="quiz-option" data-opt="c">C) Backoff exponencial</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2023%3A%20WebSockets%20y%20tiempo%20real&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F23-websockets%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F23-websockets%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2023%3A%20WebSockets%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F23-websockets%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/23-websockets/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 24 — Animaciones avanzadas](24-animaciones.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
