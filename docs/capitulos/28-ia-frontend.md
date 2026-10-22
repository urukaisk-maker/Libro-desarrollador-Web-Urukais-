# 28 — IA en el frontend

!!! abstract "Qué vas a aprender"
    - Cómo usar IA en el navegador con TensorFlow.js.
    - Modelos preentrenados.
    - APIs de IA del navegador.
    - Integración con APIs de IA (OpenAI, etc.).
    - Casos de uso reales.

---

## 🤖 ¿IA en el frontend?

La **IA en el frontend** permite ejecutar modelos de machine learning **directamente en el navegador**, sin enviar datos a un servidor. Esto mejora la privacidad, reduce la latencia y funciona offline.

```
Antes:  navegador → servidor → modelo → respuesta
Ahora:  navegador → modelo → respuesta (todo local)
```

!!! quote "La IA ya no es solo del backend"
    Modelos como TensorFlow.js, ONNX Runtime Web y Transformers.js permiten ejecutar IA en el navegador con buen rendimiento.

---

## 🧠 TensorFlow.js

**TensorFlow.js** es la librería de Google para ejecutar modelos de ML en el navegador y en Node.js.

```bash
npm install @tensorflow/tfjs
```

```javascript
import * as tf from "@tensorflow/tfjs";

// Crear un tensor
const tensor = tf.tensor([1, 2, 3, 4]);
tensor.print();

// Operaciones
const doble = tensor.mul(2);
doble.print();
```

---

## 📦 Modelos preentrenados

```javascript
import * as cocoSsd from "@tensorflow-models/coco-ssd";

const modelo = await cocoSsd.load();
const predicciones = await modelo.detect(imagen);

predicciones.forEach((p) => {
  console.log(p.class, p.score, p.bbox);
});
```

| Modelo | Qué hace |
| :--- | :--- |
| **COCO-SSD** | Detección de objetos |
| **MobileNet** | Clasificación de imágenes |
| **PoseNet** | Detección de poses |
| **FaceMesh** | Malla facial |
| **HandPose** | Detección de manos |
| **Speech Commands** | Reconocimiento de voz |
| **Toxicity** | Detección de toxicidad en texto |

---

## 🌐 APIs de IA del navegador

### Web Speech API

```javascript
const recognition = new webkitSpeechRecognition();
recognition.lang = "es-ES";
recognition.onresult = (event) => {
  console.log(event.results[0][0].transcript);
};
recognition.start();
```

### WebGPU

```javascript
const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();
// Usar device para cómputo en GPU
```

---

## 🔌 APIs externas de IA

Si el modelo es muy grande para el navegador, usa una API:

```javascript
const res = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + apiKey
  },
  body: JSON.stringify({
    model: "gpt-4",
    messages: [{ role: "user", content: "Hola" }]
  })
});

const data = await res.json();
console.log(data.choices[0].message.content);
```

!!! warning "Nunca expongas tu API key"
    Las API keys nunca deben estar en el frontend. Usa un backend proxy que añada la key y controle el rate limiting.

---

## 🤗 Transformers.js

**Transformers.js** permite usar modelos de Hugging Face directamente en el navegador, sin servidor.

```bash
npm install @xenova/transformers
```

```javascript
import { pipeline } from "@xenova/transformers";

// Análisis de sentimiento
const clasificador = await pipeline("sentiment-analysis");
const resultado = await clasificador("Me encanta este libro");
console.log(resultado);
// [{ label: "POSITIVE", score: 0.9998 }]
```

```javascript
// Traducción
const traductor = await pipeline("translation", "Xenova/opus-mt-es-en");
const salida = await traductor("Hola, mundo");
console.log(salida[0].translation_text);
// "Hello, world"
```

| Tarea | Modelo |
| :--- | :--- |
| Clasificación de texto | `sentiment-analysis` |
| Traducción | `translation` |
| Resumen | `summarization` |
| Generación de texto | `text-generation` |
| Reconocimiento de voz | `automatic-speech-recognition` |
| Generación de imágenes | `text-to-image` (experimental) |

!!! tip "Modelos en el navegador"
    Transformers.js descarga los modelos la primera vez y los cachea. La primera carga puede tardar; las siguientes son instantáneas.

---

## 🎯 Casos de uso reales

| Caso | Tecnología |
| :--- | :--- |
| Detección de objetos en fotos | TensorFlow.js (COCO-SSD) |
| Filtros de cámara en tiempo real | MediaPipe (FaceMesh) |
| Subtítulos automáticos | Web Speech API |
| Traducción de texto | Transformers.js |
| Chatbot sin servidor | Transformers.js + IndexedDB |
| Búsqueda semántica | Embeddings + similitud coseno |
| Moderación de contenido | Modelos de toxicidad |

---

## ✅ Buenas prácticas

- ✅ **Carga los modelos bajo demanda**: no los descargues en la primera visita.
- ✅ **Cachea los modelos** con Service Worker o IndexedDB.
- ✅ **Usa modelos pequeños** (MobileNet, DistilBERT) si el rendimiento importa.
- ✅ **Muestra feedback** mientras el modelo carga ("Cargando IA...").
- ✅ **Nunca expongas API keys** en el frontend.
- ✅ **Respeta la privacidad**: si el modelo es local, los datos no salen del navegador.
- ❌ **No ejecutes modelos gigantes** en móviles de gama baja.

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-28">
<div class="quiz-question" data-answer="a">
<p><strong>1.</strong> ¿Qué librería de Google permite ejecutar ML en el navegador?</p>
<button class="quiz-option" data-opt="a">A) TensorFlow.js</button>
<button class="quiz-option" data-opt="b">B) PyTorch</button>
<button class="quiz-option" data-opt="c">C) Scikit-learn</button>
</div>
<div class="quiz-question" data-answer="b">
<p><strong>2.</strong> ¿Qué modelo detecta objetos en imágenes?</p>
<button class="quiz-option" data-opt="a">A) BERT</button>
<button class="quiz-option" data-opt="b">B) COCO-SSD</button>
<button class="quiz-option" data-opt="c">C) GPT-4</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Dónde NO debes poner una API key?</p>
<button class="quiz-option" data-opt="a">A) En el backend</button>
<button class="quiz-option" data-opt="b">B) En variables de entorno</button>
<button class="quiz-option" data-opt="c">C">En el código del frontend</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2028%3A%20IA%20en%20el%20frontend&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F28-ia-frontend%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F28-ia-frontend%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2028%3A%20IA%20en%20el%20frontend%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F28-ia-frontend%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/28-ia-frontend/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 29 — WebXR](29-webxr.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
