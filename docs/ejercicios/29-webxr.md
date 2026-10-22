# 29 — WebXR

!!! quote "Ejercicio resuelto"
    Detecta soporte WebXR en el navegador.

---

## 🎯 Objetivo

1. Comprueba si el navegador soporta WebXR.
2. Comprueba si soporta VR inmersiva.
3. Muestra el resultado al usuario.

---

## 💡 Solución

\`\`\`javascript
async function comprobarXR() {
  if (!navigator.xr) {
    console.log('WebXR no soportado');
    return;
  }

  const vrSoportado = await navigator.xr.isSessionSupported('immersive-vr');
  const arSoportado = await navigator.xr.isSessionSupported('immersive-ar');

  console.log('VR:', vrSoportado);
  console.log('AR:', arSoportado);
}

comprobarXR();
\`\`\`

---

## 🧠 Conceptos clave

- \`navigator.xr\`: API de WebXR.
- \`isSessionSupported\`: comprueba soporte.
- \`immersive-vr\` / \`immersive-ar\`: modos.

---

## 🚀 Retos extra

- [ ] Crea una escena 3D con Three.js.
- [ ] Añade un botón "Entrar en VR".
- [ ] Prueba en un Meta Quest real.

---

[← Ejercicio 28](28-ia-frontend.md){ .md-button }
[Ir al ejercicio 30 →](30-web3.md){ .md-button .md-button--primary }
