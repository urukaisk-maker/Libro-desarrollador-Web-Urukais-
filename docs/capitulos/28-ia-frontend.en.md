---
description: "Chapter 28 of the Web Developer's Book: 28 — AI in the Frontend. Learn step by step with examples, exercises, and quizzes."
---
# 28 — AI in the Frontend

!!! abstract "What you will learn"
    - How to use AI in the browser with TensorFlow.js.
    - Pretrained models.
    - Browser AI APIs.
    - Integrating with external AI APIs (OpenAI, etc.).
    - Real-world use cases.

---

## 🤖 AI in the Frontend?

**AI in the frontend** lets you run machine learning models **directly in the browser**, without sending data to a server. This improves privacy, lowers latency, and works offline.

```
Before: browser → server → model → response
Now:    browser → model → response (all local)
```

!!! quote "AI is no longer backend-only"
    Libraries and runtimes like TensorFlow.js, ONNX Runtime Web, and Transformers.js make running AI in the browser practical with solid performance.

---

## 🧠 TensorFlow.js

**TensorFlow.js** is Google's library for running ML models in the browser and in Node.js.

```bash
npm install @tensorflow/tfjs
```

```javascript
import * as tf from "@tensorflow/tfjs";

// Create a tensor
const tensor = tf.tensor([1, 2, 3, 4]);
tensor.print();

// Operations
const doble = tensor.mul(2);
doble.print();
```

---

## 📦 Pretrained Models

```javascript
import * as cocoSsd from "@tensorflow-models/coco-ssd";

const modelo = await cocoSsd.load();
const predicciones = await modelo.detect(imagen);

predicciones.forEach((p) => {
  console.log(p.class, p.score, p.bbox);
});
```

| Model | What it does |
| :--- | :--- |
| **COCO-SSD** | Object detection |
| **MobileNet** | Image classification |
| **PoseNet** | Pose estimation |
| **FaceMesh** | Facial landmark mesh |
| **HandPose** | Hand tracking |
| **Speech Commands** | Voice recognition |
| **Toxicity** | Text toxicity detection |

---

## 🌐 Browser AI APIs

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
// Use device for GPU compute
```

---

## 🔌 External AI APIs

If a model is too large for the browser, use an API:

```javascript
const res = await fetch("[https://api.openai.com/v1/chat/completions](https://api.openai.com/v1/chat/completions)", {
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

!!! warning "Never expose your API key"
    API keys must never live in the frontend. Use a backend proxy that attaches the key and enforces rate limiting.

---

## 🤗 Transformers.js

**Transformers.js** lets you run Hugging Face models directly in the browser, with no server.

```bash
npm install @xenova/transformers
```

```javascript
import { pipeline } from "@xenova/transformers";

// Sentiment analysis
const clasificador = await pipeline("sentiment-analysis");
const resultado = await clasificador("Me encanta este libro");
console.log(resultado);
// [{ label: "POSITIVE", score: 0.9998 }]
```

```javascript
// Translation
const traductor = await pipeline("translation", "Xenova/opus-mt-es-en");
const salida = await traductor("Hola, mundo");
console.log(salida[0].translation_text);
// "Hello, world"
```

| Task | Model |
| :--- | :--- |
| Text classification | `sentiment-analysis` |
| Translation | `translation` |
| Summarization | `summarization` |
| Text generation | `text-generation` |
| Speech recognition | `automatic-speech-recognition` |
| Image generation | `text-to-image` (experimental) |

!!! tip "Models in the browser"
    Transformers.js downloads models on first use and caches them. The initial load can take a while; subsequent loads are instant.

---

## 🎯 Real-World Use Cases

| Use Case | Technology |
| :--- | :--- |
| Object detection in photos | TensorFlow.js (COCO-SSD) |
| Real-time camera filters | MediaPipe (FaceMesh) |
| Automatic captions | Web Speech API |
| Text translation | Transformers.js |
| Serverless chatbot | Transformers.js + IndexedDB |
| Semantic search | Embeddings + cosine similarity |
| Content moderation | Toxicity models |

---

## ✅ Best Practices

- ✅ **Load models on demand**: don't download them on the first visit.
- ✅ **Cache models** using Service Worker or IndexedDB.
- ✅ **Use small models** (MobileNet, DistilBERT) when performance matters.
- ✅ **Show progress feedback** while the model loads ("Loading AI...").
- ✅ **Never expose API keys** in the frontend.
- ✅ **Respect privacy**: when models run locally, user data stays in the browser.
- ❌ **Don't run huge models** on low-end mobile devices.

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-28">
<div class="quiz-question" data-answer="a">
<p><strong>1.</strong> Which Google library lets you run ML in the browser?</p>
<button class="quiz-option" data-opt="a">A) TensorFlow.js</button>
<button class="quiz-option" data-opt="b">B) PyTorch</button>
<button class="quiz-option" data-opt="c">C) Scikit-learn</button>
</div>
<div class="quiz-question" data-answer="b">
<p><strong>2.</strong> Which model detects objects in images?</p>
<button class="quiz-option" data-opt="a">A) BERT</button>
<button class="quiz-option" data-opt="b">B) COCO-SSD</button>
<button class="quiz-option" data-opt="c">C) GPT-4</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> Where should you NEVER put an API key?</p>
<button class="quiz-option" data-opt="a">A) On the backend</button>
<button class="quiz-option" data-opt="b">B) In environment variables</button>
<button class="quiz-option" data-opt="c">C) In frontend code</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2028%3A%20AI%20in%20the%20Frontend&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F28-ia-frontend%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F28-ia-frontend%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%2028%3A%20AI%20in%20the%20Frontend%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F28-ia-frontend%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/28-ia-frontend/" aria-label="Copy link">Copy link</button>
</div>

---

## ➡ Next Step

[Go to Chapter 29 — WebXR](29-webxr.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }