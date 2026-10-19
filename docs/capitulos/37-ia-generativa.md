# Capítulo 37 — Introducción a la IA Generativa

## ¿Qué es la IA generativa?

La IA generativa es una rama de la inteligencia artificial que se centra en crear contenido nuevo (texto, imágenes, código, audio) a partir de patrones aprendidos de grandes cantidades de datos. A diferencia de la IA tradicional, que clasifica o predice, la IA generativa **produce**.

## Modelos de Lenguaje (LLMs)

Los LLMs (Large Language Models) son modelos entrenados con miles de millones de parámetros para entender y generar texto. Ejemplos: GPT-4, Claude, Llama, Gemini.

### ¿Cómo funcionan?

1. **Tokenización**: El texto se divide en unidades llamadas tokens.
2. **Embeddings**: Cada token se convierte en un vector numérico.
3. **Atención**: El modelo calcula la relación entre tokens.
4. **Generación**: Predice el siguiente token, uno a uno.

## Integrar IA en el frontend

Puedes integrar IA en tus aplicaciones web usando APIs de proveedores como OpenAI, Anthropic o Hugging Face.

```javascript
async function preguntarAlModelo(pregunta) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: pregunta }]
    })
  });
  const data = await res.json();
  return data.choices[0].message.content;
}
```

!!! warning "No expongas tu API Key"
    Nunca pongas la clave de API en el frontend. Usa un backend (Node.js, Serverless) como intermediario.

## Ejercicios

1. Crea un chat básico con la API de OpenAI.
2. Investiga cómo funciona la generación de imágenes con DALL-E o Stable Diffusion.

---

⬅️ [Capítulo 36 — Micro-frontends](36-micro-frontends.md) | ➡️ [Capítulo 38 — Seguridad Avanzada](38-seguridad-avanzada.md)
