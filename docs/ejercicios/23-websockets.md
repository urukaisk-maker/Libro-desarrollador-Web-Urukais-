# 23 — WebSockets

!!! quote "Ejercicio resuelto"
    Crea un chat básico con WebSockets.

---

## 🎯 Objetivo

1. Cliente que se conecta a \`wss://echo.websocket.org\`.
2. Envía un mensaje al pulsar un botón.
3. Muestra los mensajes recibidos.

---

## 💡 Solución

\`\`\`html
<input id="mensaje" placeholder="Escribe un mensaje">
<button id="enviar">Enviar</button>
<ul id="mensajes"></ul>

<script>
  const ws = new WebSocket('wss://echo.websocket.org');

  ws.addEventListener('open', () => console.log('Conectado'));
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
\`\`\`

---

## 🧠 Conceptos clave

- \`new WebSocket(url)\`: abre conexión.
- \`ws.send()\`: envía mensaje.
- \`message\`: evento al recibir.
- \`wss://\` es la versión segura.

---

## 🚀 Retos extra

- [ ] Añade reconexión automática con backoff.
- [ ] Implementa un servidor WebSocket con \`ws\` en Node.js.
- [ ] Añade salas (rooms).

---

[← Ejercicio 22](22-pwa.md){ .md-button }
[Ir al ejercicio 24 →](24-animaciones.md){ .md-button .md-button--primary }
