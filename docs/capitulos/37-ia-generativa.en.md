---
description: "Chapter 37 of the Web Developer's Book: 37 — Introduction to Generative AI. Learn step by step with examples, exercises, and quizzes."
---
# 37 — Introduction to Generative AI

!!! abstract "What you will learn"
    - What generative AI is and how it works.
    - LLMs: GPT, Claude, Gemini, Llama.
    - Integrating AI into a web app.
    - Prompt engineering.
    - Risks and best practices.

---

## 🤖 What is Generative AI?

**Generative AI** is a type of artificial intelligence that **creates new content**: text, images, code, audio, or video. **LLMs** (*Large Language Models*) are models that generate text.

```
Prompt  →  Model  →  Generated response
```

!!! quote "AI isn't magic, it's statistics"
    An LLM predicts the next most probable word. It does it well enough to look like it "understands", yet it doesn't reason like a human.

---

## 🧠 Popular LLMs

| Model | Company | Strength |
| :--- | :--- | :--- |
| **GPT-4** | OpenAI | Widely used, huge ecosystem |
| **Claude** | Anthropic | Long context, strong with documents |
| **Gemini** | Google | Multimodal (text, image, audio) |
| **Llama** | Meta | Open source, runnable locally |
| **Mistral** | Mistral AI | Open source, efficient |
| **DeepSeek** | DeepSeek | Very competitive in code |

---

## 🔌 Integrating AI into a Web App

```javascript
// Call to the OpenAI API
async function preguntar(prompt) {
  const res = await fetch("[https://api.openai.com/v1/chat/completions](https://api.openai.com/v1/chat/completions)", {
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

!!! warning "Never expose the API key in the frontend"
    The code above belongs in the **backend**. In the frontend, send a request to your own backend, which attaches the key and enforces rate limiting.

---

## 🎯 Prompt Engineering

The difference between a good response and a bad one lies in the prompt.

```
❌ Bad:  "Make me a website"
✅ Good: "Create a landing page for a personal finance app,
   with hero, features, and CTA. Use React, Tailwind, and a minimalist
   design with blue tones. Include full code."
```

| Technique | Example |
| :--- | :--- |
| **Role** | "You are a senior developer..." |
| **Context** | "I'm using React 18 and TypeScript..." |
| **Examples** | "Here is an example of what I want..." |
| **Format** | "Respond in JSON with the fields..." |
| **Step by step** | "Think step by step before answering" |
| **Constraints** | "Do not use external libraries" |

---

## 📚 RAG (Retrieval-Augmented Generation)

**RAG** combines an LLM with your own knowledge base. The model retrieves relevant information and uses it to answer.

```
Question → Search your database → LLM with context → Accurate answer
```

| Step | Tool |
| :--- | :--- |
| **Embeddings** | OpenAI, Cohere, Hugging Face |
| **Vector database** | Pinecone, Weaviate, Qdrant, pgvector |
| **LLM** | GPT-4, Claude, Llama |

```javascript
// 1. Turn the question into an embedding
const embedding = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: pregunta
});

// 2. Search similar documents
const docs = await db.query(
  "SELECT * FROM documentos ORDER BY embedding <=> $1 LIMIT 5",
  [embedding.data[0].embedding]
);

// 3. Pass docs to the LLM as context
const respuesta = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    { role: "system", content: "Responde usando solo este contexto: " + docs.join("\n") },
    { role: "user", content: pregunta }
  ]
});
```

---

## ⚠ Risks and Limitations

| Risk | Description |
| :--- | :--- |
| **Hallucinations** | The model invents plausible-sounding facts |
| **Bias** | Reflects biases present in training data |
| **Privacy** | Never send sensitive data to external APIs |
| **Cost** | APIs charge per token |
| **Latency** | Responses can take seconds |
| **Dependency** | If the API goes down, your app stops working |
| **Security** | Prompt injection, jailbreaks |

!!! warning "Never trust blindly"
    An LLM can invent a non-existent function, a non-existent package, or a fake citation. **Always verify** what it generates before using it.

---

## ✅ Best Practices

- ✅ **Validate and verify** model outputs.
- ✅ **Don't send sensitive data** to external APIs.
- ✅ **Use RAG** to supply domain-specific context.
- ✅ **Rate-limit** and cap costs.
- ✅ **Provide a fallback** if AI fails.
- ✅ **Let the user know** they are interacting with AI.
- ✅ **Log interactions** to improve the system.
- ❌ **Don't use AI for critical decisions** without human oversight.

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-37">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> What is an LLM?</p>
<button class="quiz-option" data-opt="a">A) A type of database</button>
<button class="quiz-option" data-opt="b">B) A Large Language Model</button>
<button class="quiz-option" data-opt="c">C) A UI framework</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> Where should you store the API key?</p>
<button class="quiz-option" data-opt="a">A) On the backend</button>
<button class="quiz-option" data-opt="b">B) On the frontend</button>
<button class="quiz-option" data-opt="c">C) In HTML</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> What is an AI hallucination?</p>
<button class="quiz-option" data-opt="a">A) A network error</button>
<button class="quiz-option" data-opt="b">B) A CSS bug</button>
<button class="quiz-option" data-opt="c">C) Invented information that sounds plausible</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2037%3A%20Generative%20AI&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F37-ia-generativa%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F37-ia-generativa%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%2037%3A%20Generative%20AI%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F37-ia-generativa%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/37-ia-generativa/" aria-label="Copy link">Copy link</button>
</div>

---

## ➡ Next Step

[Go to Chapter 38 — Advanced Web Security](38-seguridad-avanzada.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }