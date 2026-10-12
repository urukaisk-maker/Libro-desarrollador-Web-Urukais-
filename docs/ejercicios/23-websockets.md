# Ejercicios resueltos — Capítulo 23

[Volver al índice](index.md) · [Capítulo original](../capitulos/23-websockets.md)

## Ejercicio 1: Servidor eco

> Crea un servidor WebSocket que haga eco de los mensajes.

### Solución

```bash
npm install ws
```

`server.js`:

```javascript
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('message', (data) => {
    console.log('Recibido:', data.toString());
    socket.send(`Eco: ${data}`);
  });

  socket.on('close', () => console.log('Cliente desconectado'));
});
```

`cliente.html`:

```html
<script>
  const socket = new WebSocket('ws://localhost:8080');

  socket.onopen = () => socket.send('Hola');
  socket.onmessage = (e) => console.log('Servidor:', e.data);
</script>
```

---

## Ejercicio 2: Broadcast

> Añade broadcast: cada mensaje va a todos.

### Solución

```javascript
wss.on('connection', (socket) => {
  socket.on('message', (data) => {
    wss.clients.forEach((cliente) => {
      if (cliente.readyState === cliente.OPEN) {
        cliente.send(data.toString());
      }
    });
  });
});
```

---

## Ejercicio 3: Salas

> Implementa salas: los mensajes solo van a los de la misma sala.

### Solución

```javascript
const salas = new Map();

wss.on('connection', (socket) => {
  socket.on('message', (raw) => {
    const msg = JSON.parse(raw);

    if (msg.tipo === 'unirse') {
      if (!salas.has(msg.sala)) salas.set(msg.sala, new Set());
      salas.get(msg.sala).add(socket);
      socket.sala = msg.sala;
      return;
    }

    if (msg.tipo === 'mensaje') {
      const miembros = salas.get(socket.sala) || new Set();
      miembros.forEach((s) => {
        if (s.readyState === s.OPEN) {
          s.send(JSON.stringify({
            tipo: 'mensaje',
            de: msg.de,
            texto: msg.texto,
          }));
        }
      });
    }
  });

  socket.on('close', () => {
    if (socket.sala) salas.get(socket.sala)?.delete(socket);
  });
});
```

---

## Ejercicio 4: Reconexión con backoff

> Añade reconexión automática al cliente.

### Solución

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

---

## Ejercicio 5: Autenticación con JWT

> Autentica el WebSocket con un JWT.

### Solución

**Servidor:**

```javascript
import jwt from 'jsonwebtoken';

wss.on('connection', (socket, req) => {
  const url = new URL(req.url, 'http://localhost');
  const token = url.searchParams.get('token');

  try {
    socket.usuario = jwt.verify(token, process.env.JWT_SECRET);
    socket.send(JSON.stringify({ tipo: 'autenticado', usuario: socket.usuario }));
  } catch {
    socket.close(4001, 'Token inválido');
  }
});
```

**Cliente:**

```javascript
const token = localStorage.getItem('token');
const socket = new WebSocket(`wss://api.miapp.com/ws?token=${token}`);
```

---

## Ejercicio 6: Indicador "escribiendo…"

> Añade un indicador de "escribiendo…" en el chat.

### Solución

**Cliente:**

```javascript
let timeout;
input.addEventListener('input', () => {
  socket.send(JSON.stringify({ tipo: 'escribiendo', de: 'Urukais' }));

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    socket.send(JSON.stringify({ tipo: 'parado' }));
  }, 1000);
});

socket.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.tipo === 'escribiendo') {
    indicador.textContent = `${msg.de} está escribiendo…`;
  } else if (msg.tipo === 'parado') {
    indicador.textContent = '';
  }
};
```

**Servidor:** reenvía a los demás miembros de la sala.

```javascript
if (msg.tipo === 'escribiendo' || msg.tipo === 'parado') {
  const miembros = salas.get(socket.sala) || new Set();
  miembros.forEach(s => {
    if (s !== socket && s.readyState === s.OPEN) s.send(raw);
  });
}
```

---

## Ejercicio 7: Persistir historial

> Guarda el historial de mensajes en PostgreSQL.

### Solución

```javascript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Schema Prisma
model Mensaje {
  id       Int      @id @default(autoincrement())
  autor    String
  texto    String
  sala     String
  enviado  DateTime @default(now())
}
```

**Servidor:**

```javascript
if (msg.tipo === 'mensaje') {
  // Persistir
  await prisma.mensaje.create({
    data: { autor: msg.de, texto: msg.texto, sala: socket.sala },
  });

  // Reenviar a la sala
  const miembros = salas.get(socket.sala) || new Set();
  miembros.forEach(s => {
    if (s.readyState === s.OPEN) s.send(raw);
  });
}

// Enviar historial al unirse
if (msg.tipo === 'unirse') {
  socket.sala = msg.sala;
  const historial = await prisma.mensaje.findMany({
    where: { sala: msg.sala },
    orderBy: { enviado: 'asc' },
    take: 50,
  });
  socket.send(JSON.stringify({ tipo: 'historial', mensajes: historial }));
}
```

---

## Ejercicio 8: Desplegar en Railway

> Despliega en Railway y prueba con dos navegadores.

### Solución

1. Crea `package.json` con `"start": "node server.js"`.
2. Sube a GitHub.
3. Railway → New project → Deploy from GitHub.
4. Copia la URL pública (`tu-app.up.railway.app`).
5. Cliente: `new WebSocket('wss://tu-app.up.railway.app')`.

!!! warning "WSS en producción"
    Siempre `wss://` (con S) en producción, nunca `ws://`.

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/23-websockets.md)
