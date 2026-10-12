# Ejercicios resueltos — Capítulo 28

[Volver al índice](index.md) · [Capítulo original](../capitulos/28-ia-frontend.md)

## Ejercicio 1: Análisis de sentimiento

> Añade análisis de sentimiento a los comentarios.

### Solución

```bash
npm install @xenova/transformers
```

```javascript
import { pipeline } from '@xenova/transformers';

const clasificador = await pipeline(
  'sentiment-analysis',
  'Xenova/distilbert-base-uncased-finetuned-sst-2-english'
);

async function analizar(texto) {
  const [resultado] = await clasificador(texto);
  return resultado;
}

const r = await analizar('Me encanta este libro');
console.log(r);
// { label: 'POSITIVE', score: 0.9998 }
```

**Mostrar en UI:**

```html
<textarea id="texto" placeholder="Escribe algo..."></textarea>
<p id="resultado"></p>

<script type="module">
  import { pipeline } from '@xenova/transformers';

  const clasificador = await pipeline('sentiment-analysis');

  document.getElementById('texto').addEventListener('input', async (e) => {
    const texto = e.target.value.trim();
    if (texto.length < 3) return;

    const [r] = await clasificador(texto);
    document.getElementById('resultado').textContent =
      r.label === 'POSITIVE' ? '😊 Positivo' : '😞 Negativo';
  });
</script>
```

---

## Ejercicio 2: Buscador semántico

> Crea un buscador semántico con embeddings.

### Solución

```javascript
import { pipeline } from '@xenova/transformers';

const extractor = await pipeline(
  'feature-extraction',
  'Xenova/all-MiniLM-L6-v2'
);

async function embedding(texto) {
  const salida = await extractor(texto, {
    pooling: 'mean',
    normalize: true,
  });
  return salida.data;
}

function similitud(a, b) {
  return a.reduce((sum, v, i) => sum + v * b[i], 0);
}

async function buscar(consulta, documentos) {
  const vecConsulta = await embedding(consulta);
  const vecDocs = await Promise.all(documentos.map(embedding));

  const puntuados = documentos.map((doc, i) => ({
    doc,
    score: similitud(vecConsulta, vecDocs[i]),
  }));

  return puntuados.sort((a, b) => b.score - a.score);
}

const docs = [
  'Cómo usar HTML',
  'Introducción a CSS',
  'JavaScript moderno',
  'Guía de TypeScript',
];

const resultados = await buscar('estilos web', docs);
console.log(resultados);
// [ 'Introducción a CSS', 'Cómo usar HTML', ... ]
```

---

## Ejercicio 3: Dictado por voz

> Implementa dictado por voz en un formulario.

### Solución

```html
<label for="texto">Dictado</label>
<textarea id="texto" rows="5"></textarea>
<button id="btn">🎤 Hablar</button>

<script>
  const btn = document.getElementById('btn');
  const area = document.getElementById('texto');

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    btn.disabled = true;
    btn.textContent = 'No soportado';
  } else {
    const recognition = new SR();
    recognition.lang = 'es-ES';
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let texto = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        texto += event.results[i][0].transcript;
      }
      area.value += texto;
    };

    btn.addEventListener('click', () => {
      if (btn.textContent.includes('Hablar')) {
        recognition.start();
        btn.textContent = '🔴 Parar';
      } else {
        recognition.stop();
        btn.textContent = '🎤 Hablar';
      }
    });
  }
</script>
```

---

## Ejercicio 4: WebLLM

> Prueba WebLLM con un modelo pequeño.

### Solución

```bash
npm install @mlc-ai/web-llm
```

```html
<div id="progreso"></div>
<p id="respuesta"></p>

<script type="module">
  import * as webllm from '@mlc-ai/web-llm';

  const motor = await webllm.CreateMLCEngine(
    'Llama-3.2-1B-Instruct-q4f32_1-MLC',
    {
      initProgressCallback: (info) => {
        document.getElementById('progreso').textContent =
          `Cargando: ${(info.progress * 100).toFixed(1)}%`;
      },
    }
  );

  const respuesta = await motor.chat.completions.create({
    messages: [
      { role: 'system', content: 'Resume en 20 palabras.' },
      { role: 'user', content: 'HTML es un lenguaje de marcado...' },
    ],
  });

  document.getElementById('respuesta').textContent =
    respuesta.choices[0].message.content;
</script>
```

!!! warning "Requiere WebGPU"
    Chrome/Edge 113+ o Safari 17+. Firefox va llegando.

---

## Ejercicio 5: MediaPipe para gestos

> Usa MediaPipe para detectar gestos.

### Solución

```bash
npm install @mediapipe/tasks-vision
```

```html
<video autoplay playsinline></video>

<script type="module">
  import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

  const vision = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm'
  );

  const detector = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
    },
    numHands: 1,
  });

  const video = document.querySelector('video');
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;

  function detectar() {
    const resultados = detector.detectForVideo(video, performance.now());

    if (resultados.landmarks.length > 0) {
      const mano = resultados.landmarks[0];
      // Verificar si el índice está "levantado" (posición y < posición y del nudillo)
      const dedoLevantado = mano[8].y < mano[6].y;
      if (dedoLevantado) console.log('👍 Dedo levantado');
    }

    requestAnimationFrame(detectar);
  }

  detectar();
</script>
```

---

## Ejercicio 6: TensorFlow.js

> Entrena un modelo simple en el navegador.

### Solución

```bash
npm install @tensorflow/tfjs
```

```javascript
import * as tf from '@tensorflow/tfjs';

// Datos: y = 2x + 1
const xs = tf.tensor1d([1, 2, 3, 4, 5]);
const ys = tf.tensor1d([3, 5, 7, 9, 11]);

const modelo = tf.sequential();
modelo.add(tf.layers.dense({ units: 1, inputShape: [1] }));
modelo.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

await modelo.fit(xs, ys, {
  epochs: 200,
  callbacks: {
    onEpochEnd: (epoch, logs) => console.log(`Epoch ${epoch}: loss=${logs.loss.toFixed(4)}`),
  },
});

const prediccion = modelo.predict(tf.tensor1d([6]));
prediccion.print(); // ~13
```

---

## Ejercicio 7: Cachear el modelo

> Cachea el modelo para que no se descargue cada vez.

### Solución

```javascript
import { env, pipeline } from '@xenova/transformers';

env.useBrowserCache = true;
env.allowLocalModels = false;

// El modelo se descarga la primera vez y se guarda en Cache Storage
const clasificador = await pipeline('sentiment-analysis');
```

**Verificar:** DevTools → Application → Cache Storage → `transformers-cache`.

**Servir desde tu dominio:**

```javascript
env.remoteHost = 'https://libro.urukais.com/models/';
```

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/28-ia-frontend.md)
