# 37 — Introducción a la IA Generativa

!!! abstract "Qué vas a aprender"
    - Qué es la IA generativa y cómo funciona.
    - LLMs: GPT, Claude, Gemini, Llama.
    - Integrar IA en una app web.
    - Prompt engineering.
    - Riesgos y buenas prácticas.

---

## 🤖 ¿Qué es la IA generativa?

La **IA generativa** es un tipo de inteligencia artificial que **crea contenido nuevo**: texto, imágenes, código, audio o vídeo. Los **LLMs** (*Large Language Models*) son los modelos que generan texto.

```
Prompt  →  Modelo  →  Respuesta generada
```

!!! quote "La IA no es magia, es estadística"
    Un LLM predice la siguiente palabra más probable. Lo hace tan bien que parece que "entiende", pero no razona como un humano.

---

## 🧠 LLMs más populares

| Modelo | Empresa | Ventaja |
| :--- | :--- | :--- |
| **GPT-4** | OpenAI | El más usado, ecosistema enorme |
| **Claude** | Anthropic | Contexto largo, bueno con documentos |
| **Gemini** | Google | Multimodal (texto, imagen, audio) |
| **Llama** | Meta | Open source, ejecutable en local |
| **Mistral** | Mistral AI | Open source, eficiente |
| **DeepSeek** | DeepSeek | Muy competitivo en código |

---

## 🔌 Integrar IA en una app web

```javascript
// Llamada a la API de OpenAI
async function preguntar(prompt) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + process.env.OPENAI_API_KEY
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Eres un experto en desarrollo web." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7
    })
  });

  const data = await res.json();
  return data.choices[0].message.content;
}
```

!!! warning "Nunca expongas la API key en el frontend"
    El código anterior va en el **backend**. En el frontend, haz una petición a tu propio backend, que añade la key y controla el rate limiting.

---

## 🎯 Prompt engineering

La diferencia entre una buena y una mala respuesta está en el prompt.

```
❌ Malo: "Hazme una web"
✅ Bueno: "Crea una landing page para una app de finanzas personales,
   con hero, features y CTA. Usa React, Tailwind y un diseño
   minimalista con colores azules. Incluye código completo."
```

| Técnica | Ejemplo |
| :--- | :--- |
| **Rol** | "Eres un desarrollador senior..." |
| **Contexto** | "Estoy usando React 18 y TypeScript..." |
| **Ejemplos** | "Aquí tienes un ejemplo de lo que quiero..." |
| **Formato** | "Responde en JSON con los campos..." |
| **Paso a paso** | "Piensa paso a paso antes de responder" |
| **Restricciones** | "No uses librerías externas" |

---

## 📚 RAG (Retrieval-Augmented Generation)

**RAG** combina un LLM con una base de conocimiento propia. El modelo busca información relevante y la usa para responder.

```
Pregunta → Buscar en tu base de datos → LLM con contexto → Respuesta precisa
```

| Paso | Herramienta |
| :--- | :--- |
| **Embeddings** | OpenAI, Cohere, Hugging Face |
| **Base vectorial** | Pinecone, Weaviate, Qdrant, pgvector |
| **LLM** | GPT-4, Claude, Llama |

```javascript
// 1. Convertir la pregunta en embedding
const embedding = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: pregunta
});

// 2. Buscar documentos similares
const docs = await db.query(
  "SELECT * FROM documentos ORDER BY embedding <=> $1 LIMIT 5",
  [embedding.data[0].embedding]
);

// 3. Pasar los docs al LLM como contexto
const respuesta = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    { role: "system", content: "Responde usando solo este contexto: " + docs.join("\n") },
    { role: "user", content: pregunta }
  ]
});
```

---

## ⚠️ Riesgos y limitaciones

| Riesgo | Descripción |
| :--- | :--- |
| **Alucinaciones** | El modelo inventa datos que suenan plausibles |
| **Sesgos** | Refleja los sesgos de los datos de entrenamiento |
| **Privacidad** | No envíes datos sensibles a APIs externas |
| **Coste** | Las APIs cobran por token |
| **Latencia** | Las respuestas pueden tardar segundos |
| **Dependencia** | Si la API cae, tu app deja de funcionar |
| **Seguridad** | Prompt injection, jailbreaks |

!!! warning "Nunca confíes ciegamente"
    Un LLM puede inventarse una función que no existe, un paquete que no existe o una cita falsa. **Verifica siempre** lo que genera antes de usarlo.

---

## ✅ Buenas prácticas

- ✅ **Valida y verifica** las respuestas del modelo.
- ✅ **No envíes datos sensibles** a APIs externas.
- ✅ **Usa RAG** para dar contexto específico de tu dominio.
- ✅ **Limita el rate** y los costes.
- ✅ **Proporciona un fallback** si la IA falla.
- ✅ **Indica al usuario** que está hablando con una IA.
- ✅ **Registra las interacciones** para mejorar el sistema.
- ❌ **No uses la IA para decisiones críticas** sin supervisión humana.

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-37">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué es un LLM?</p>
<button class="quiz-option" data-opt="a">A) Un tipo de base de datos</button>
<button class="quiz-option" data-opt="b">B) Un modelo de lenguaje grande</button>
<button class="quiz-option" data-opt="c">C) Un framework de UI</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Dónde debes poner la API key?</p>
<button class="quiz-option" data-opt="a">A) En el backend</button>
<button class="quiz-option" data-opt="b">B) En el frontend</button>
<button class="quiz-option" data-opt="c">C) En el HTML</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué es una alucinación de IA?</p>
<button class="quiz-option" data-opt="a">A) Un error de red</button>
<button class="quiz-option" data-opt="b">B) Un fallo de CSS</button>
<button class="quiz-option" data-opt="c">C">Información inventada que suena plausible</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2037%3A%20IA%20Generativa&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F37-ia-generativa%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F37-ia-generativa%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2037%3A%20IA%20Generativa%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F37-ia-generativa%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/37-ia-generativa/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 38 — Seguridad Web Avanzada](38-seguridad-avanzada.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
