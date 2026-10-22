# 28 — IA en el frontend

!!! quote "Ejercicio resuelto"
    Usa un modelo preentrenado de clasificación de imágenes.

---

## 🎯 Objetivo

1. Carga el modelo MobileNet con TensorFlow.js.
2. Clasifica una imagen del usuario.
3. Muestra el resultado.

---

## 💡 Solución

\`\`\`html
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
      .map(p => \`${p.className}: ${(p.probability * 100).toFixed(1)}%\`)
      .join(' | ');
  });
</script>
\`\`\`

---

## 🧠 Conceptos clave

- TensorFlow.js: ML en el navegador.
- MobileNet: clasificación de imágenes.
- \`URL.createObjectURL\`: muestra el archivo seleccionado.

---

## 🚀 Retos extra

- [ ] Muestra las 3 predicciones más probables.
- [ ] Usa la cámara con \`getUserMedia\`.
- [ ] Prueba Transformers.js para clasificar texto.

---

[← Ejercicio 27](27-webassembly.md){ .md-button }
[Ir al ejercicio 29 →](29-webxr.md){ .md-button .md-button--primary }
