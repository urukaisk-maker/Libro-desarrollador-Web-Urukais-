---
description: "Chapter 23 of the Web Developer's Book: 23 — WebSockets and Real Time. Learn step by step with examples, exercises, and quizzes."
---
# 23 — WebSockets and Real Time

!!! abstract "What you will learn"
    - What WebSockets are and when to use them.
    - The WebSocket API in the browser.
    - WebSocket server with Node.js and ws.
    - Rooms and broadcasting.
    - Reconnection and error handling.

---

## 🔌 What is a WebSocket?

A **WebSocket** is a **bidirectional** and **persistent** communication protocol between client and server. Unlike HTTP, the connection does not close after each request: it stays open to send and receive messages in real time.

```
HTTP:      request → response → close
WebSocket: persistent connection ↔ messages in both directions
```

!!! quote "True real time"
    WebSockets power chats, live notifications, real-time collaboration, and multiplayer games.

---

## 🎯 When to Use WebSockets?

| Use Case | WebSocket | HTTP Polling |
| :--- | :--- | :--- |
| Chat | ✅ | ❌ |
| Live notifications | ✅ | ❌ |
| Collaborative editing | ✅ | ❌ |
| Multiplayer games | ✅ | ❌ |
| Rarely changing data | ❌ | ✅ |
| Traditional REST APIs | ❌ | ✅ |

---

## 💻 Client: The WebSocket API

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

!!! warning "Use wss:// in production"
    Always use `wss://` (secure WebSocket) in production. Only use `ws://` for local development.

---

## 🖥 Server with Node.js and ws

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

    // Broadcast to all clients
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

## 🏠 Rooms and Broadcasting

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

## 🔄 Automatic Reconnection

WebSockets can drop due to network issues, server restarts, or timeouts. Implement reconnection:

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

## ✅ Best Practices

- ✅ **Use `wss://`** in production (secure WebSocket).
- ✅ **Reconnect with exponential backoff**: 1s, 2s, 4s, 8s...
- ✅ **Heartbeat**: send periodic pings to detect dead connections.
- ✅ **Authentication**: validate the token on connection, not just at login.
- ✅ **Limit message size**: huge messages block the event loop.
- ✅ **Validate incoming data** from the client.
- ❌ **Don't use WebSockets for everything**: for simple CRUD, HTTP is enough.

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-23">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> What is the main difference between HTTP and WebSocket?</p>
<button class="quiz-option" data-opt="a">A) WebSocket is slower</button>
<button class="quiz-option" data-opt="b">B) WebSocket keeps the connection open and is bidirectional</button>
<button class="quiz-option" data-opt="c">C) HTTP is newer</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> Which protocol is secure for WebSockets?</p>
<button class="quiz-option" data-opt="a">A) wss://</button>
<button class="quiz-option" data-opt="b">B) ws://</button>
<button class="quiz-option" data-opt="c">C) http://</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> Which technique prevents reconnecting too fast?</p>
<button class="quiz-option" data-opt="a">A) Polling</button>
<button class="quiz-option" data-opt="b">B) Heartbeat</button>
<button class="quiz-option" data-opt="c">C) Exponential backoff</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2023%3A%20WebSockets%20and%20Real%20Time&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F23-websockets%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F23-websockets%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%2023%3A%20WebSockets%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F23-websockets%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/23-websockets/" aria-label="Copy link">Copy link</button>
</div>

---

## ➡ Next Step

[Go to Chapter 24 — Animaciones avanzadas](24-animaciones.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }