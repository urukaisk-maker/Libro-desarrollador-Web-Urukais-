# Capítulo 28 — IA en el frontend

## Introducción

La inteligencia artificial ha pasado de ser un tema de investigación a estar integrada en el navegador. Hoy puedes ejecutar modelos de lenguaje, visión por computador y reconocimiento de voz **directamente en el cliente**, sin servidores ni APIs de pago.

Este capítulo repasa las herramientas y casos de uso reales de la IA en el frontend.

## ¿Por qué IA en el cliente?

### Ventajas

- **Privacidad**: los datos no salen del dispositivo.
- **Latencia cero**: sin peticiones a servidores.
- **Sin costes de API**: no pagas por inferencia.
- **Funciona offline**.
- **Escalable**: cada usuario usa su propio hardware.

### Desventajas

- **Limitado al hardware del usuario**.
- **Modelos más pequeños** que los de servidor.
- **Consumo de batería** en móvil.
- **Descarga inicial** del modelo.

## Transformers.js

**Transformers.js** es la versión JavaScript de la librería de Hugging Face. Ejecuta modelos en el navegador con WebGPU o WASM.

### Instalación

```bash
npm install @xenova/transformers
```

### Ejemplo: análisis de sentimiento

```javascript
import { pipeline } from '@xenova/transformers';

const clasificador = await pipeline(
  'sentiment-analysis',
  'Xenova/distilbert-base-uncased-finetuned-sst-2-english'
);

const resultado = await clasificador('Me encanta este libro');
console.log(resultado);
// [{ label: 'POSITIVE', score: 0.9998 }]
```

### Ejemplo: traducción

```javascript
const traductor = await pipeline(
  'translation',
  'Xenova/nllb-200-distilled-600M'
);

const salida = await traductor('Hello, world', {
  src_lang: 'eng_Latn',
  tgt_lang: 'spa_Latn',
});
console.log(salida[0].translation_text); // "Hola, mundo"
```

### Ejemplo: resumen de texto

```javascript
const resumidor = await pipeline('summarization');

const texto = `Un texto largo sobre desarrollo web...`;
const resumen = await resumidor(texto, {
  max_length: 100,
  min_length: 30,
});
console.log(resumen[0].summary_text);
```

!!! info "Primera vez tarda"
    Los modelos se descargan la primera vez. Pueden pesar entre 10 MB y varios GB. **Cachea el modelo** con Cache Storage.

## WebLLM: LLMs en el navegador

**WebLLM** ejecuta modelos como Llama, Mistral o Phi **en el navegador** usando WebGPU.

### Instalación

```bash
npm install @mlc-ai/web-llm
```

### Uso

```javascript
import * as webllm from '@mlc-ai/web-llm';

const motor = await webllm.CreateMLCEngine(
  'Llama-3.2-1B-Instruct-q4f32_1-MLC'
);

const respuesta = await motor.chat.completions.create({
  messages: [{ role: 'user', content: '¿Qué es HTML?' }],
});

console.log(respuesta.choices[0].message.content);
```

!!! warning "Requiere WebGPU"
    WebLLM necesita WebGPU, disponible en Chrome/Edge 113+ y Safari 17+. Firefox va llegando.

## Web Speech API: voz

### Reconocimiento de voz

```javascript
const recognition = new (window.SpeechRecognition ||
                        window.webkitSpeechRecognition)();

recognition.lang = 'es-ES';
recognition.continuous = false;

recognition.onresult = (event) => {
  const texto = event.results[0][0].transcript;
  console.log('Has dicho:', texto);
};

recognition.start();
```

### Síntesis de voz

```javascript
const utterance = new SpeechSynthesisUtterance('Hola, bienvenido al libro');
utterance.lang = 'es-ES';
utterance.rate = 1;
utterance.pitch = 1;

speechSynthesis.speak(utterance);
```

## MediaPipe: visión por computador

**MediaPipe** de Google ofrece modelos ligeros para detección de manos, pose, cara y objetos.

### Instalación

```bash
npm install @mediapipe/tasks-vision
```

### Detección de manos

```javascript
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

const vision = await FilesetResolver.forVisionTasks(
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm'
);

const detector = await HandLandmarker.createFromOptions(vision, {
  baseOptions: {
    modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
  },
  numHands: 2,
});

const video = document.querySelector('video');
const resultados = detector.detectForVideo(video, performance.now());

resultados.landmarks.forEach(mano => {
  console.log('Puntos de la mano:', mano);
});
```

## TensorFlow.js

**TensorFlow.js** permite entrenar y ejecutar modelos en el navegador.

### Instalación

```bash
npm install @tensorflow/tfjs
```

### Ejemplo: regresión lineal

```javascript
import * as tf from '@tensorflow/tfjs';

const xs = tf.tensor1d([1, 2, 3, 4, 5]);
const ys = tf.tensor1d([2, 4, 6, 8, 10]);

const modelo = tf.sequential();
modelo.add(tf.layers.dense({ units: 1, inputShape: [1] }));
modelo.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

await modelo.fit(xs, ys, { epochs: 100 });

const prediccion = modelo.predict(tf.tensor1d([6]));
prediccion.print(); // ~12
```

### Modelos preentrenados

```javascript
import * as cocoSsd from '@tensorflow-models/coco-ssd';

const modelo = await cocoSsd.load();
const predicciones = await modelo.detect(imagen);

predicciones.forEach(p => {
  console.log(`${p.class} (${p.score.toFixed(2)})`);
});
```

## Casos de uso reales

- **Búsqueda semántica** en documentación.
- **Subtítulos automáticos** en vídeo.
- **Detección de spam** en formularios.
- **Recomendaciones personalizadas**.
- **Chat con documentación** (RAG con Transformers.js).
- **Edición de imagen con IA** (quitar fondo, mejorar calidad).
- **Traducción en tiempo real**.

## Cachear modelos

Los modelos se pueden cachear para evitar descargas repetidas.

```javascript
import { env } from '@xenova/transformers';

env.useBrowserCache = true;
env.allowLocalModels = false;
```

También puedes servirlos desde tu dominio con `env.remoteHost`.

## Ejemplo práctico: chat con embeddings

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

// Calcular similitud entre dos textos
async function similitud(a, b) {
  const [ea, eb] = await Promise.all([embedding(a), embedding(b)]);
  return ea.reduce((sum, v, i) => sum + v * eb[i], 0);
}

console.log(await similitud('gato', 'felino')); // ~0.8
console.log(await similitud('gato', 'coche')); // ~0.2
```

Esta técnica es la base de la **búsqueda semántica**: puedes encontrar documentos similares aunque no compartan palabras exactas.

## Consideraciones éticas

- **Sé transparente**: avisa cuando el usuario interactúa con IA.
- **No recojas datos sin permiso**.
- **Revisa sesgos** en los modelos.
- **Ofrece alternativas** si la IA falla.
- **Respeta el copyright** de los modelos.
- **No finjas ser humano** si eres un bot.

## Buenas prácticas

- **Carga los modelos con lazy loading**.
- **Muestra un indicador de progreso** mientras descargan.
- **Cachea el modelo** tras la primera descarga.
- **Usa Web Workers** para no bloquear la UI.
- **Prueba en móvil** — el rendimiento varía mucho.
- **Ofrece modo fallback** si WebGPU no está disponible.
- **No envíes datos sensibles** a APIs externas sin cifrado.
- **Prefiere modelos pequeños** para el cliente.

## Ejercicios

1. Añade análisis de sentimiento a los comentarios de tu blog con Transformers.js.
2. Crea un buscador semántico de tus capítulos usando embeddings.
3. Implementa dictado por voz con Web Speech API en un formulario.
4. Prueba WebLLM con un modelo pequeño y pide que resuma un texto.
5. Usa MediaPipe para detectar gestos y controlar un reproductor de vídeo.
6. Entrena un modelo simple con TensorFlow.js en el navegador.
7. Cachea el modelo con Cache Storage para que no se descargue cada vez.

---

⬅️ [Capítulo 27 — WebAssembly](27-webassembly.md) | ➡️ [Capítulo 29 — WebXR](29-webxr.md)
