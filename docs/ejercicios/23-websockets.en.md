---
description: "Solved exercise 23: 23 — WebSockets. Step-by-step annotated solution from the Web Developer Book."
---
# 23 — WebSockets

!!! quote "Solved exercise"
    Create a basic chat with WebSockets.

---

## 🎯 Goal

1. Client that connects to `wss://echo.websocket.org`.
2. Sends a message when clicking a button.
3. Displays received messages.

---

## 💡 Solution

```html
<input id="mensaje" placeholder="Type a message">
<button id="enviar">Send</button>
<ul id="mensajes"></ul>

<script>
  const ws = new WebSocket('wss://echo.websocket.org');

  ws.addEventListener('open', () => console.log('Connected'));
  ws.addEventListener('message', (e) => {
    const li = document.createElement('li');
    li.textContent = e.data;
    document.getElementById('mensajes').appendChild(li);
  });

  document.getElementById('enviar').addEventListener('click', () => {
    const texto = document.getElementById('mensaje').value;
    if (texto) ws.send(texto);
  });
</script>
```

---

## 🧠 Key concepts

- `new WebSocket(url)`: opens the connection.
- `ws.send()`: sends a message.
- `message`: event fired on incoming message.
- `wss://` is the secure version.

---

## 🚀 Bonus challenges

- [ ] Add automatic reconnection with backoff.
- [ ] Implement a WebSocket server with `ws` in Node.js.
- [ ] Add rooms.

---

[← Exercise 22](22-pwa.md){ .md-button }
[Go to exercise 24 →](24-animaciones.md){ .md-button .md-button--primary }
