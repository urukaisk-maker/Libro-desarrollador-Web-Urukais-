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
&lt;script src="https://aframe.io/releases/1.5.0/aframe.min.js"&gt;&lt;/script&gt;

&lt;a-scene&gt;
  &lt;a-box position="-1 0.5 -3" rotation="0 45 0" color="#6a5acd"&gt;&lt;/a-box&gt;
  &lt;a-sphere position="0 1.25 -5" radius="1.25" color="#00bcd4"&gt;&lt;/a-sphere&gt;
  &lt;a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#ffc65d"&gt;&lt;/a-cylinder&gt;
  &lt;a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7bc8a4"&gt;&lt;/a-plane&gt;
  &lt;a-sky color="#1a1726"&gt;&lt;/a-sky&gt;
&lt;/a-scene&gt;
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
<button class="quiz-option" data-opt="b">B) Crear experiencias VR/AR en el navegador</button>
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


---

## 🥽 WebXR vs WebVR vs AR.js

| Tecnología | Qué hace | Estado |
| :--- | :--- | :--- |
| **WebVR** (antiguo) | Realidad virtual en el navegador | ❌ Obsoleto |
| **WebXR** (moderno) | VR **y** AR en el navegador | ✅ Estándar actual |
| **AR.js** | AR ligera (marcadores, GPS) | ✅ Activo (complementario) |

**WebXR** es la API estándar del W3C para experiencias inmersivas en el navegador. Sustituyó a WebVR en 2019 y añadió soporte para AR.

### Soporte (2026)

| Navegador | VR | AR |
| :--- | :--- | :--- |
| Chrome (Android) | ✅ | ✅ |
| Chrome (PC + gafas) | ✅ | ❌ |
| Safari (iOS) | ✅ (visionOS) | ✅ |
| Meta Quest Browser | ✅ | ✅ |
| Firefox | ❌ | ❌ |

!!! warning "Firefox no soporta WebXR"
    A día de hoy, Firefox no implementa WebXR. Si tu experiencia es solo VR/AR, avisa al usuario con un mensaje claro.

---

## 🚀 Tu primera escena VR con Three.js

**Three.js** es la librería 3D más usada para WebXR. Abstrae la API y permite crear escenas complejas con poco código.

### Instalación

~~~bash
npm install three
~~~

### Escena mínima con VR

~~~javascript
import * as THREE from "three";
import { VRButton } from "three/addons/webxr/VRButton.js";

// 1. Escena, cámara y renderer
const escena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(innerWidth, innerHeight);
renderer.xr.enabled = true; // activar WebXR
document.body.appendChild(renderer.domElement);

// 2. Botón "Entrar en VR"
document.body.appendChild(VRButton.createButton(renderer));

// 3. Un cubo giratorio
const geometria = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x6a5acd });
const cubo = new THREE.Mesh(geometria, material);
escena.add(cubo);

// 4. Luz
escena.add(new THREE.AmbientLight(0xffffff, 1));

// 5. Cámara
camara.position.z = 3;

// 6. Bucle de render
renderer.setAnimationLoop(() => {
    cubo.rotation.x += 0.01;
    cubo.rotation.y += 0.01;
    renderer.render(escena, camara);
});
~~~

!!! tip "`setAnimationLoop` en lugar de `requestAnimationFrame`"
    Con WebXR, `renderer.setAnimationLoop()` es **obligatorio**. `requestAnimationFrame` no funciona en modo VR porque el navegador controla el refresco de las gafas.

---

## 📱 AR en el navegador con WebXR

La realidad aumentada en el navegador funciona en **móviles compatibles** (Android con ARCore, iOS con ARKit a través de Safari).

### Escena AR mínima

~~~javascript
import * as THREE from "three";
import { ARButton } from "three/addons/webxr/ARButton.js";

const escena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.xr.enabled = true;
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// Botón "Ver en AR"
const boton = ARButton.createButton(renderer, { requiredFeatures: ["hit-test"] });
document.body.appendChild(boton);

// Un cubo flotante
const cubo = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 0.2),
    new THREE.MeshStandardMaterial({ color: 0x00bcd4 })
);
cubo.position.set(0, 0, -1);
escena.add(cubo);

escena.add(new THREE.AmbientLight(0xffffff, 1));
camara.position.set(0, 0, 0);

renderer.setAnimationLoop(() => {
    cubo.rotation.y += 0.01;
    renderer.render(escena, camara);
});
~~~

!!! warning "HTTPS obligatorio"
    WebXR **solo funciona en HTTPS** (o `localhost`). En `http://` el navegador bloquea la cámara y las APIs de AR.

---

## 🎮 Casos de uso reales

| Caso | Ejemplo | Madurez |
| :--- | :--- | :--- |
| **E-commerce AR** | Ver un mueble en tu salón antes de comprarlo | 🟢 Producción |
| **Educación** | Anatomía 3D, museos virtuales | 🟢 Producción |
| **Turismo** | Guías AR en museos y ciudades | 🟡 Crecimiento |
| **Formación industrial** | Simulacros de maquinaria en VR | 🟢 Producción |
| **Inmobiliaria** | Tour virtual de pisos | 🟢 Producción |
| **Juegos** | Experiencias inmersivas en el navegador | 🟡 Crecimiento |
| **Eventos** | Conciertos y exposiciones VR | 🟡 Crecimiento |

### Ejemplos reales

- **IKEA Place** — ver muebles en AR
- **Google Arts & Culture** — museos en VR
- **Sketchfab** — modelos 3D en AR
- **Amazon View in Your Room** — AR en e-commerce

---

## ⚡ Rendimiento en VR

La VR es **mucho más exigente** que una web normal: 90 fps constantes, estereoscopía (dos renders por frame), y tracking de cabeza.

| Requisito | VR | Web normal |
| :--- | :--- | :--- |
| **FPS** | 90+ (72 en Quest) | 30-60 |
| **Renders por frame** | 2 (uno por ojo) | 1 |
| **Latencia** | < 20 ms (mareo) | < 100 ms |
| **Triángulos** | < 100k por ojo | Millones posibles |

### Optimizaciones clave

~~~javascript
// 1. Pixel ratio limitado (no renderizar a 4K)
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

// 2. Sombras desactivadas o simples
renderer.shadowMap.enabled = false; // o THREE.PCFSoftShadowMap

// 3. Geometrías con LOD
const lod = new THREE.LOD();
lod.addLevel(meshDetallado, 0);
lod.addLevel(meshSimple, 50);

// 4. Frustum culling (Three.js lo hace por defecto)
// 5. InstancedMesh para muchos objetos iguales
const instancias = new THREE.InstancedMesh(geometria, material, 1000);
~~~

!!! warning "El mareo es real"
    Si la latencia supera los 20 ms, el usuario nota **motion sickness** (mareo, náuseas). Es el motivo por el que la VR no es para todo el mundo. Prioriza siempre los FPS sobre la calidad visual.

---

## 🧪 Ejercicio práctico

!!! example "Escena VR con un cubo interactivo"
    Crea una escena VR con Three.js que:

    - Tenga un cubo girando en el centro.
    - Al hacer clic en el cubo (con el mando VR), cambie de color.
    - Tenga un botón "Entrar en VR" que oculte en móviles sin soporte.

??? success "Solución"
    ~~~javascript
    import * as THREE from "three";
    import { VRButton } from "three/addons/webxr/VRButton.js";

    const escena = new THREE.Scene();
    const camara = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(innerWidth, innerHeight);
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(VRButton.createButton(renderer));

    const cubo = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 0x6a5acd })
    );
    escena.add(cubo);
    escena.add(new THREE.AmbientLight(0xffffff, 1));
    camara.position.z = 3;

    // Cambiar color al hacer clic (con mando VR)
    cubo.addEventListener("select", () => {
        cubo.material.color.setHex(Math.random() * 0xffffff);
    });

    renderer.setAnimationLoop(() => {
        cubo.rotation.y += 0.01;
        renderer.render(escena, camara);
    });
    ~~~

---

## 🧠 Quiz de repaso

!!! question "Comprueba lo aprendido"

??? success "1. ¿Qué diferencia hay entre WebVR y WebXR?"
    WebVR era la API antigua (solo VR). **WebXR** es la API moderna que soporta **VR y AR** en el navegador. Sustituyó a WebVR en 2019.

??? success "2. ¿Por qué `renderer.setAnimationLoop` es obligatorio en VR?"
    Porque el navegador controla el **refresco de las gafas** (90 Hz). `requestAnimationFrame` no funciona en modo VR: el navegador necesita decidir cuándo renderizar cada ojo.

??? success "3. ¿Cuántos FPS necesita la VR?"
    **90 FPS** (72 en Meta Quest). Es el doble que una web normal, porque el cerebro humano detecta el movimiento con mucha precisión y los FPS bajos provocan mareo.

??? success "4. ¿Qué es el motion sickness en VR?"
    El **mareo** que produce la VR cuando la latencia supera los 20 ms o los FPS bajan. El cerebro espera que el movimiento visual coincida con el del cuerpo, y si no coincide, se marea.

??? success "5. ¿Qué caso de uso real usa WebXR en producción?"
    IKEA Place (muebles en AR), Amazon View in Your Room (e-commerce AR), Google Arts & Culture (museos VR), Sketchfab (modelos 3D en AR), formación industrial en VR.

---

## 📚 Recursos

- [MDN — WebXR](https://developer.mozilla.org/es/docs/Web/API/WebXR_Device_API)
- [Three.js — Docs](https://threejs.org/docs/)
- [Three.js — WebXR examples](https://threejs.org/examples/?q=webxr)
- [web.dev — WebXR](https://web.dev/explore/webxr)
- [Immersive Web — Spec](https://immersive-web.github.io/)
- [AR.js — Docs](https://ar-js-org.github.io/AR.js-Docs/)

---

➡️ Siguiente capítulo: [30 — Web3](30-web3.md)
