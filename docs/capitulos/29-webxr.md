# 29 — WebXR

!!! abstract "Qué vas a aprender"
    - Qué es WebXR y para qué sirve.
    - Realidad Virtual (VR) en el navegador.
    - Realidad Aumentada (AR) en el navegador.
    - Three.js y A-Frame.
    - Casos de uso y limitaciones.

---

## 🥽 ¿Qué es WebXR?

**WebXR** es una API del navegador que permite crear experiencias de **Realidad Virtual (VR)** y **Realidad Aumentada (AR)** directamente en la web, sin instalar apps.

```
WebXR = VR + AR + Mixed Reality (MR) en el navegador
```

!!! quote "La web inmersiva ya está aquí"
    Meta Quest, Apple Vision Pro y otros dispositivos ya soportan WebXR. Puedes crear experiencias inmersivas con HTML, CSS y JavaScript.

---

## 🎮 Realidad Virtual (VR)

La **Realidad Virtual** sumerge al usuario en un entorno completamente digital. Necesita un visor (Meta Quest, HTC Vive, PSVR…) o un Cardboard.

```javascript
// Comprobar soporte VR
if (navigator.xr) {
  const soportado = await navigator.xr.isSessionSupported("immersive-vr");
  if (soportado) {
    const sesion = await navigator.xr.requestSession("immersive-vr");
  }
}
```

| Dispositivo | Soporte WebXR |
| :--- | :--- |
| Meta Quest 2/3/Pro | ✅ |
| Apple Vision Pro | ✅ |
| HTC Vive | ✅ |
| PSVR2 | ⚠️ Limitado |
| Cardboard | ✅ |

---

## 📱 Realidad Aumentada (AR)

La **Realidad Aumentada** superpone elementos digitales al mundo real, usando la cámara del dispositivo.

```javascript
// Comprobar soporte AR
if (navigator.xr) {
  const soportado = await navigator.xr.isSessionSupported("immersive-ar");
  if (soportado) {
    const sesion = await navigator.xr.requestSession("immersive-ar", {
      requiredFeatures: ["hit-test"]
    });
  }
}
```

| Dispositivo | Soporte AR |
| :--- | :--- |
| Android (Chrome) | ✅ |
| iPhone (Safari) | ✅ (iOS 17+) |
| Meta Quest | ✅ |
| Apple Vision Pro | ✅ |

---

## 🎨 Three.js

**Three.js** es la librería 3D más popular para JavaScript. Funciona con WebXR.

```bash
npm install three
```

```javascript
import * as THREE from "three";

const escena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(innerWidth, innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// Un cubo
const geometria = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x6a5acd });
const cubo = new THREE.Mesh(geometria, material);
escena.add(cubo);

camara.position.z = 5;

function animar() {
  cubo.rotation.x += 0.01;
  cubo.rotation.y += 0.01;
  renderer.render(escena, camara);
}

renderer.setAnimationLoop(animar);
```

---

## 🖼️ A-Frame

**A-Frame** es un framework de Mozilla para crear experiencias VR/AR con HTML declarativo. Ideal para prototipos rápidos.

```html
<script src="https://aframe.io/releases/1.5.0/aframe.min.js"></script>

<a-scene>
  <a-box position="-1 0.5 -3" rotation="0 45 0" color="#6a5acd"></a-box>
  <a-sphere position="0 1.25 -5" radius="1.25" color="#00bcd4"></a-sphere>
  <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#ffc65d"></a-cylinder>
  <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7bc8a4"></a-plane>
  <a-sky color="#1a1726"></a-sky>
</a-scene>
```

!!! tip "A-Frame vs Three.js"
    A-Frame es más fácil para empezar (HTML declarativo). Three.js es más potente y flexible para proyectos grandes. Ambos funcionan con WebXR.

---

## 🎯 Casos de uso reales

| Caso | Tecnología |
| :--- | :--- |
| Visitas virtuales a pisos | WebXR + Three.js |
| Prueba de muebles en AR | WebXR + ARCore |
| Museos virtuales | A-Frame |
| Educación inmersiva | WebXR + Three.js |
| Formación industrial en VR | WebXR |
| Tiendas con prueba virtual | WebXR + AR |
| Juegos en el navegador | Three.js + WebXR |
| Visualización de datos 3D | Three.js |

---

## ⚠️ Limitaciones

- **Rendimiento**: los móviles y visores tienen GPUs limitadas.
- **Compatibilidad**: no todos los dispositivos soportan WebXR.
- **Permisos**: el usuario debe aceptar entrar en VR/AR.
- **Batería**: la VR/AR consume mucha batería.
- **Curva de aprendizaje**: 3D es complejo (geometría, materiales, luces, cámara).
- **Motion sickness**: algunas experiencias marean a los usuarios.

!!! warning "Prueba en dispositivos reales"
    El simulador de WebXR de Chrome es útil para desarrollar, pero **nada sustituye** a probar en un visor real o en un móvil compatible.

---

## ✅ Buenas prácticas

- ✅ **Empieza simple**: un cubo girando ya es un logro.
- ✅ **Usa A-Frame** para prototipos rápidos.
- ✅ **Usa Three.js** para proyectos grandes.
- ✅ **Optimiza los modelos 3D** (glTF, Draco compression).
- ✅ **Limita el número de polígonos** y texturas.
- ✅ **Prueba en dispositivos de gama baja**.
- ✅ **Proporciona un fallback** para dispositivos sin WebXR.
- ❌ **No asumas que todo el mundo tiene un visor**.

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-29">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué permite WebXR?</p>
<button class="quiz-option" data-opt="a">A) Crear apps nativas de VR</button>
<button class="quiz-option" data-opt="b">B">Crear experiencias VR/AR en el navegador</button>
<button class="quiz-option" data-opt="c">C) Editar vídeos 360</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué librería 3D es la más popular para WebXR?</p>
<button class="quiz-option" data-opt="a">A) Three.js</button>
<button class="quiz-option" data-opt="b">B) jQuery</button>
<button class="quiz-option" data-opt="c">C) Bootstrap</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué framework permite crear VR con HTML declarativo?</p>
<button class="quiz-option" data-opt="a">A) React</button>
<button class="quiz-option" data-opt="b">B) Vue</button>
<button class="quiz-option" data-opt="c">C) A-Frame</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2029%3A%20WebXR&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F29-webxr%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F29-webxr%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2029%3A%20WebXR%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F29-webxr%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/29-webxr/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 30 — Web3](30-web3.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
