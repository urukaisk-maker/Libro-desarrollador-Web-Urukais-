# Capítulo 23 — WebSockets y tiempo real

## Introducción

HTTP funciona con un modelo **petición-respuesta**: el cliente pregunta, el servidor responde, la conexión se cierra. Perfecto para la mayoría de casos, pero insuficiente para aplicaciones en **tiempo real**:

- Chats.
- Notificaciones instantáneas.
- Juegos multijugador.
- Edición colaborativa (tipo Google Docs).
- Paneles con datos en vivo.

Para eso existen los **WebSockets**: un canal **bidireccional y persistente** entre cliente y servidor.

## HTTP vs WebSockets

| Aspecto | HTTP | WebSockets |
|---|---|---|
| Dirección | Cliente → Servidor | Bidireccional |
| Conexión | Se cierra tras cada respuesta | Persistente |
| Latencia | Alta (handshake cada vez) | Muy baja |
| Uso típico | Cargar páginas, APIs | Tiempo real |

## Cómo funciona un WebSocket

1. El cliente envía una petición HTTP especial con `Upgrade: websocket`.
2. El servidor acepta (`101 Switching Protocols`).
3. La conexión pasa a ser **WebSocket**: ya no es HTTP.
4. Ambos lados pueden enviarse mensajes cuando quieran.
5. La conexión se cierra cuando alguien la cierra o falla la red.

## API de WebSocket en el navegador

```javascript
const socket = new WebSocket('wss://api.miapp.com/ws');

socket.addEventListener('open', () => {
  console.log('Conectado');
  socket.send(JSON.stringify({ tipo: 'saludo', nombre: 'Urukais' }));
});

socket.addEventListener('message', (event) => {
  const datos = JSON.parse(event.data);
  console.log('Recibido:', datos);
});

socket.addEventListener('error', (err) => {
  console.error('Error:', err);
});

socket.addEventListener('close', (event) => {
  console.log('Cerrado:', event.code, event.reason);
});
```

!!! info "wss vs ws"
    - `ws://` → WebSocket sin cifrar (solo para desarrollo).
    - `wss://` → WebSocket sobre TLS (obligatorio en producción).

## Enviar y recibir

### Enviar texto

```javascript
socket.send('Hola servidor');
```

### Enviar JSON

```javascript
socket.send(JSON.stringify({
  tipo: 'mensaje',
  sala: 'general',
  texto: 'Hola a todos',
}));
```

### Mensajes binarios

```javascript
socket.binaryType = 'arraybuffer';
socket.send(new Uint8Array([1, 2, 3]));
```

### Cerrar

```javascript
socket.close(1000, 'Cierre normal');
```

## Reconexión automática

Las conexiones se caen. Un buen cliente **se reconecta solo**, con **backoff exponencial** para no saturar.

```javascript
class SocketReconectable {
  #url;
  #socket;
  #intentos = 0;
  #maxIntentos = 5;

  constructor(url) {
    this.#url = url;
    this.#conectar();
  }

  #conectar() {
    this.#socket = new WebSocket(this.#url);

    this.#socket.addEventListener('open', () => {
      this.#intentos = 0;
      console.log('Conectado');
    });

    this.#socket.addEventListener('close', () => {
      if (this.#intentos < this.#maxIntentos) {
        const espera = 2 ** this.#intentos * 1000;
        console.log(`Reintentando en ${espera}ms`);
        setTimeout(() => {
          this.#intentos++;
          this.#conectar();
        }, espera);
      }
    });
  }

  enviar(datos) {
    if (this.#socket.readyState === WebSocket.OPEN) {
      this.#socket.send(JSON.stringify(datos));
    }
  }
}
```

## Servidor WebSocket con Node.js

Usaremos la librería **ws**, la más popular y ligera.

### Instalación

```bash
npm install ws
```

### Servidor básico

```javascript
// server.js
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('message', (data) => {
    const mensaje = data.toString();
    console.log('Recibido:', mensaje);

    // Eco al mismo cliente
    socket.send(`Eco: ${mensaje}`);
  });

  socket.on('close', () => {
    console.log('Cliente desconectado');
  });
});
```

Ejecuta con `node server.js` y prueba desde el navegador con `new WebSocket('ws://localhost:8080')`.

### Difusión a todos (broadcast)

```javascript
wss.on('connection', (socket) => {
  socket.on('message', (data) => {
    // Reenviar a todos los clientes conectados
    wss.clients.forEach((cliente) => {
      if (cliente.readyState === cliente.OPEN) {
        cliente.send(data.toString());
      }
    });
  });
});
```

## Salas (rooms)

Para chats con varios canales, agrupa clientes en salas.

```javascript
const salas = new Map(); // sala -> Set de sockets

wss.on('connection', (socket) => {
  socket.on('message', (raw) => {
    const msg = JSON.parse(raw);

    if (msg.tipo === 'unirse') {
      if (!salas.has(msg.sala)) salas.set(msg.sala, new Set());
      salas.get(msg.sala).add(socket);
      socket.sala = msg.sala;
    }

    if (msg.tipo === 'mensaje') {
      const miembros = salas.get(socket.sala) || new Set();
      miembros.forEach((s) => {
        if (s.readyState === s.OPEN) {
          s.send(JSON.stringify({ tipo: 'mensaje', de: msg.de, texto: msg.texto }));
        }
      });
    }
  });

  socket.on('close', () => {
    if (socket.sala) salas.get(socket.sala)?.delete(socket);
  });
});
```

## Integrar WebSocket con HTTP

Lo habitual es **HTTP para la API** y **WebSocket para eventos en vivo**. Ambos conviven en el mismo servidor.

```javascript
import http from 'node:http';
import express from 'express';
import { WebSocketServer } from 'ws';

const app = express();
app.get('/api/salud', (req, res) => res.json({ ok: true }));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (socket) => {
  socket.send(JSON.stringify({ tipo: 'bienvenida' }));
});

server.listen(3000, () => console.log('http://localhost:3000'));
```

El cliente se conecta a `ws://localhost:3000` y la API sigue en `http://localhost:3000/api/...`.

## Socket.IO: la alternativa con esteroides

**Socket.IO** no es WebSocket puro; es una capa sobre WebSocket que añade:

- **Fallback** a long-polling si WebSocket falla.
- **Reconexión automática**.
- **Salas y namespaces** ya implementados.
- **Emisión con acks** (confirmaciones).

### Instalación

```bash
npm install socket.io socket.io-client
```

### Servidor

```javascript
import { Server } from 'socket.io';
import http from 'node:http';
import express from 'express';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:5173' },
});

io.on('connection', (socket) => {
  console.log('Conectado:', socket.id);

  socket.on('unirse', (sala) => {
    socket.join(sala);
  });

  socket.on('mensaje', ({ sala, texto }) => {
    io.to(sala).emit('mensaje', { texto, autor: socket.id });
  });

  socket.on('disconnect', () => {
    console.log('Desconectado:', socket.id);
  });
});

server.listen(3000);
```

### Cliente

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.emit('unirse', 'general');

socket.on('mensaje', (msg) => {
  console.log(`${msg.autor}: ${msg.texto}`);
});

socket.emit('mensaje', { sala: 'general', texto: 'Hola' });
```

!!! tip "¿WebSocket puro o Socket.IO?"
    - **WebSocket puro**: más control, protocolo estándar, ideal para APIs públicas.
    - **Socket.IO**: más cómodo, reconexión y salas incluidas, ideal para apps propias.

## Autenticación

WebSocket no tiene cabeceras HTTP, así que la autenticación se hace de otras formas.

### Token en la URL

```javascript
const socket = new WebSocket(`wss://api.miapp.com/ws?token=${jwt}`);
```

```javascript
// Servidor
wss.on('connection', (socket, req) => {
  const url = new URL(req.url, 'http://localhost');
  const token = url.searchParams.get('token');

  try {
    socket.usuario = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    socket.close(4001, 'Token inválido');
  }
});
```

### Primer mensaje de autenticación

```javascript
socket.onopen = () => {
  socket.send(JSON.stringify({ tipo: 'auth', token: jwt }));
};
```

El servidor espera al primer mensaje antes de aceptar cualquier otra acción.

!!! warning "Nunca autentiques sin verificar"
    Un WebSocket abierto sin autenticación es una puerta abierta. Verifica siempre el token al conectar.

## Casos de uso reales

### Chat en tiempo real

- Salas por conversación.
- Mensajes con timestamp.
- Indicador de "escribiendo…".
- Historial persistido en BD.

### Notificaciones

- Nuevo mensaje, nueva venta, nueva alerta.
- El servidor hace `emit` a un usuario concreto.
- El cliente muestra la notificación.

### Panel en vivo

- KPIs que se actualizan al instante.
- Actualizaciones push cuando cambia algo en el servidor.
- Mejor que hacer polling cada 5 s.

### Edición colaborativa

- Varios usuarios editan el mismo documento.
- Los cambios se sincronizan vía WebSocket.
- Combina con **CRDTs** (Yjs, Automerge) para resolver conflictos.

## Alternativas a WebSocket

| Tecnología | Dirección | Uso |
|---|---|---|
| **WebSocket** | Bidireccional | Uso general tiempo real |
| **SSE** (Server-Sent Events) | Servidor → Cliente | Notificaciones unidireccionales |
| **Long polling** | Cliente → Servidor (simulado) | Fallback legacy |
| **WebRTC** | Peer-to-peer | Audio, vídeo, datos P2P |
| **MQTT** | Bidireccional (broker) | IoT |

## Server-Sent Events (SSE)

Unidireccional, más simple que WebSocket si solo necesitas que el servidor empuje datos.

```javascript
// Servidor
app.get('/eventos', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');

  const intervalo = setInterval(() => {
    res.write(`data: ${JSON.stringify({ hora: new Date() })}\n\n`);
  }, 1000);

  req.on('close', () => clearInterval(intervalo));
});
```

```javascript
// Cliente
const eventos = new EventSource('/eventos');
eventos.onmessage = (e) => console.log(JSON.parse(e.data));
```

## Buenas prácticas

- **HTTPS/WSS siempre** en producción.
- **Autentica al conectar**. Un WebSocket abierto es un agujero de seguridad.
- **Reconecta con backoff exponencial**. Evita tormentas de reconexión.
- **Limita el tamaño de los mensajes**. Los WebSockets no son para enviar archivos grandes.
- **Heartbeat (ping/pong)**. Detecta conexiones muertas.
- **Escala con Redis pub/sub** si tienes varias instancias del servidor.
- **Cierra conexiones inactivas** tras un tiempo.
- **Registra eventos** para diagnóstico.
- **Cuidado con la seguridad**: valida todo lo que llega.

## Ejemplo: chat mínimo completo

### Servidor

```javascript
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
const clientes = new Set();

wss.on('connection', (socket) => {
  clientes.add(socket);

  socket.on('message', (raw) => {
    const msg = JSON.parse(raw);
    const salida = JSON.stringify({
      autor: msg.autor,
      texto: msg.texto,
      hora: Date.now(),
    });
    clientes.forEach((c) => {
      if (c.readyState === c.OPEN) c.send(salida);
    });
  });

  socket.on('close', () => clientes.delete(socket));
});
```

### Cliente

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Chat</title>
</head>
<body>
  <ul id="mensajes"></ul>
  <form id="form">
    <input id="texto" placeholder="Escribe..." autocomplete="off">
    <button>Enviar</button>
  </form>

  <script>
    const socket = new WebSocket('ws://localhost:8080');
    const ul = document.getElementById('mensajes');
    const form = document.getElementById('form');
    const input = document.getElementById('texto');

    socket.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      const li = document.createElement('li');
      li.textContent = `${msg.autor}: ${msg.texto}`;
      ul.appendChild(li);
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      socket.send(JSON.stringify({ autor: 'Urukais', texto: input.value }));
      input.value = '';
    });
  </script>
</body>
</html>
```

## Ejercicios

1. Crea un servidor WebSocket que haga eco de los mensajes.
2. Añade broadcast: cada mensaje se reenvía a todos los clientes.
3. Implementa salas: los mensajes solo van a los de la misma sala.
4. Añade reconexión automática con backoff exponencial al cliente.
5. Autentica el WebSocket con un JWT en el primer mensaje.
6. Añade un indicador de "escribiendo…" en el chat.
7. Persiste el historial de mensajes en PostgreSQL.
8. Despliega en Railway y prueba con dos navegadores distintos.

---

⬅️ [Capítulo 22 — Progressive Web Apps](22-pwa.md) | ➡️ [Capítulo 24 — Animaciones avanzadas](24-animaciones.md)
