---
description: "Solved exercise 28: 28 — AI in the frontend. Step-by-step annotated solution from the Web Developer Book."
---
# 28 — AI in the frontend

!!! quote "Solved exercise"
    Use a pretrained image classification model.

---

## 🎯 Goal

1. Load the MobileNet model with TensorFlow.js.
2. Classify an image provided by the user.
3. Display the result.

---

## 💡 Solution

```html
<input type="file" id="imagen" accept="image/*">
<img id="preview" alt="Preview" style="max-width: 300px">
<p id="resultado"></p>

<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet"></script>
<script>
  const input = document.getElementById('imagen');
  const preview = document.getElementById('preview');
  const resultado = document.getElementById('resultado');

  input.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    preview.src = URL.createObjectURL(file);

    const modelo = await mobilenet.load();
    const predicciones = await modelo.classify(preview);

    resultado.textContent = predicciones
      .map(p => `${p.className}: ${(p.probability * 100).toFixed(1)}%`)
      .join(' | ');
  });
</script>
```

---

## 🧠 Key concepts

- TensorFlow.js: ML in the browser.
- MobileNet: image classification.
- `URL.createObjectURL`: previews the selected file.

---

## 🚀 Bonus challenges

- [ ] Show the top 3 most probable predictions.
- [ ] Use the camera with `getUserMedia`.
- [ ] Try Transformers.js for text classification.

---

[← Exercise 27](27-webassembly.md){ .md-button }
[Go to exercise 29 →](29-webxr.md){ .md-button .md-button--primary }
