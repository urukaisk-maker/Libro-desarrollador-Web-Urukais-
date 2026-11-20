---
description: "Chapter 29 of the Web Developer's Book: 29 — WebXR. Learn step by step with examples, exercises, and quizzes."
---
# 29 — WebXR

!!! abstract "What you will learn"
    - What WebXR is and what it is used for.
    - Virtual Reality (VR) in the browser.
    - Augmented Reality (AR) in the browser.
    - Three.js and A-Frame.
    - Use cases and limitations.

---

## 🥽 What is WebXR?

**WebXR** is a browser API that lets you build **Virtual Reality (VR)** and **Augmented Reality (AR)** experiences directly on the web, without installing native apps.

```
WebXR = VR + AR + Mixed Reality (MR) in the browser
```

!!! quote "The immersive web is already here"
    Meta Quest, Apple Vision Pro, and other devices already support WebXR. You can create immersive experiences with HTML, CSS, and JavaScript.

---

## 🎮 Virtual Reality (VR)

**Virtual Reality** immerses the user in a fully digital environment. It requires a headset (Meta Quest, HTC Vive, PSVR…) or a Cardboard viewer.

```javascript
// Check VR support
if (navigator.xr) {
  const soportado = await navigator.xr.isSessionSupported("immersive-vr");
  if (soportado) {
    const sesion = await navigator.xr.requestSession("immersive-vr");
  }
}
```

| Device | WebXR Support |
| :--- | :--- |
| Meta Quest 2/3/Pro | ✅ |
| Apple Vision Pro | ✅ |
| HTC Vive | ✅ |
| PSVR2 | ⚠ Limited |
| Cardboard | ✅ |

---

## 📱 Augmented Reality (AR)

**Augmented Reality** overlays digital elements onto the real world using the device's camera.

```javascript
// Check AR support
if (navigator.xr) {
  const soportado = await navigator.xr.isSessionSupported("immersive-ar");
  if (soportado) {
    const sesion = await navigator.xr.requestSession("immersive-ar", {
      requiredFeatures: ["hit-test"]
    });
  }
}
```

| Device | AR Support |
| :--- | :--- |
| Android (Chrome) | ✅ |
| iPhone (Safari) | ✅ (iOS 17+) |
| Meta Quest | ✅ |
| Apple Vision Pro | ✅ |

---

## 🎨 Three.js

**Three.js** is the most popular 3D library for JavaScript. It works with WebXR.

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

// A cube
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

## 🖼 A-Frame

**A-Frame** is a framework for building VR/AR experiences using declarative HTML. Great for rapid prototyping.

```html
<script src="[https://aframe.io/releases/1.5.0/aframe.min.js](https://aframe.io/releases/1.5.0/aframe.min.js)"></script>

<a-scene>
  <a-box position="-1 0.5 -3" rotation="0 45 0" color="#6a5acd"></a-box>
  <a-sphere position="0 1.25 -5" radius="1.25" color="#00bcd4"></a-sphere>
  <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#ffc65d"></a-cylinder>
  <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7bc8a4"></a-plane>
  <a-sky color="#1a1726"></a-sky>
</a-scene>
```

!!! tip "A-Frame vs. Three.js"
    A-Frame is easier to start with (declarative HTML). Three.js is more powerful and flexible for large projects. Both work with WebXR.

---

## 🎯 Real-World Use Cases

| Use Case | Technology |
| :--- | :--- |
| Virtual apartment tours | WebXR + Three.js |
| Trying furniture in AR | WebXR + ARCore |
| Virtual museums | A-Frame |
| Immersive education | WebXR + Three.js |
| Industrial VR training | WebXR |
| Virtual try-on stores | WebXR + AR |
| Browser games | Three.js + WebXR |
| 3D data visualization | Three.js |

---

## ⚠ Limitations

- **Performance**: phones and headsets have constrained GPUs.
- **Compatibility**: not every device supports WebXR.
- **Permissions**: users must approve entering VR/AR.
- **Battery**: VR/AR drains battery quickly.
- **Learning curve**: 3D is complex (geometry, materials, lights, camera).
- **Motion sickness**: some experiences make users dizzy.

!!! warning "Test on real devices"
    Chrome's WebXR simulator is useful during development, but **nothing replaces** testing on a real headset or supported phone.

---

## ✅ Best Practices

- ✅ **Start simple**: a spinning cube is already a milestone.
- ✅ **Use A-Frame** for rapid prototypes.
- ✅ **Use Three.js** for large projects.
- ✅ **Optimize 3D models** (glTF, Draco compression).
- ✅ **Limit polygon count** and textures.
- ✅ **Test on low-end devices**.
- ✅ **Provide a fallback** for devices without WebXR.
- ❌ **Don't assume everyone owns a headset**.

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-29">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> What does WebXR allow you to do?</p>
<button class="quiz-option" data-opt="a">A) Build native VR apps</button>
<button class="quiz-option" data-opt="b">B) Create VR/AR experiences in the browser</button>
<button class="quiz-option" data-opt="c">C) Edit 360 videos</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> Which 3D library is most popular for WebXR?</p>
<button class="quiz-option" data-opt="a">A) Three.js</button>
<button class="quiz-option" data-opt="b">B) jQuery</button>
<button class="quiz-option" data-opt="c">C) Bootstrap</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> Which framework lets you create VR with declarative HTML?</p>
<button class="quiz-option" data-opt="a">A) React</button>
<button class="quiz-option" data-opt="b">B) Vue</button>
<button class="quiz-option" data-opt="c">C) A-Frame</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2029%3A%20WebXR&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F29-webxr%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F29-webxr%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%2029%3A%20WebXR%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F29-webxr%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/29-webxr/" aria-label="Copy link">Copy link</button>
</div>

---

## ➡ Next Step

[Go to Chapter 30 — Web3](30-web3.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }



---

## 🥽 WebXR vs. WebVR vs. AR.js

| Technology | What it does | Status |
| :--- | :--- | :--- |
| **WebVR** (legacy) | Virtual reality in the browser | ❌ Deprecated |
| **WebXR** (modern) | VR **and** AR in the browser | ✅ Current standard |
| **AR.js** | Lightweight AR (markers, GPS) | ✅ Active (complementary) |

**WebXR** is the W3C standard API for immersive experiences in the browser. It replaced WebVR in 2019 and added AR support.

### Support (2026)

| Browser | VR | AR |
| :--- | :--- | :--- |
| Chrome (Android) | ✅ | ✅ |
| Chrome (PC + headset) | ✅ | ❌ |
| Safari (iOS) | ✅ (visionOS) | ✅ |
| Meta Quest Browser | ✅ | ✅ |
| Firefox | ❌ | ❌ |

!!! warning "Firefox does not support WebXR"
    As of now, Firefox does not implement WebXR. If your experience is VR/AR-only, inform the user with a clear message.

---

## 🚀 Your First VR Scene with Three.js

**Three.js** is the most widely used 3D library for WebXR. It abstracts the API and lets you create complex scenes with minimal code.

### Installation

~~~bash
npm install three
~~~

### Minimal VR Scene

~~~javascript
import * as THREE from "three";
import { VRButton } from "three/addons/webxr/VRButton.js";

// 1. Scene, camera, and renderer
const escena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(innerWidth, innerHeight);
renderer.xr.enabled = true; // enable WebXR
document.body.appendChild(renderer.domElement);

// 2. "Enter VR" button
document.body.appendChild(VRButton.createButton(renderer));

// 3. A spinning cube
const geometria = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x6a5acd });
const cubo = new THREE.Mesh(geometria, material);
escena.add(cubo);

// 4. Light
escena.add(new THREE.AmbientLight(0xffffff, 1));

// 5. Camera
camara.position.z = 3;

// 6. Render loop
renderer.setAnimationLoop(() => {
    cubo.rotation.x += 0.01;
    cubo.rotation.y += 0.01;
    renderer.render(escena, camara);
});
~~~

!!! tip "`setAnimationLoop` instead of `requestAnimationFrame`"
    With WebXR, `renderer.setAnimationLoop()` is **mandatory**. `requestAnimationFrame` does not work in VR mode because the browser controls the headset's refresh rate.

---

## 📱 AR in the Browser with WebXR

Browser augmented reality works on **supported mobile devices** (Android with ARCore, iOS with ARKit via Safari).

### Minimal AR Scene

~~~javascript
import * as THREE from "three";
import { ARButton } from "three/addons/webxr/ARButton.js";

const escena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.xr.enabled = true;
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// "View in AR" button
const boton = ARButton.createButton(renderer, { requiredFeatures: ["hit-test"] });
document.body.appendChild(boton);

// A floating cube
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

!!! warning "HTTPS is mandatory"
    WebXR **only works over HTTPS** (or `localhost`). Over `http://`, the browser blocks camera access and AR APIs.

---

## 🎮 Real-World Use Cases

| Use Case | Example | Maturity |
| :--- | :--- | :--- |
| **AR E-commerce** | Preview furniture in your living room before buying | 🟢 Production |
| **Education** | 3D anatomy, virtual museums | 🟢 Production |
| **Tourism** | AR guides in museums and cities | 🟡 Growing |
| **Industrial training** | Machinery simulations in VR | 🟢 Production |
| **Real estate** | Virtual apartment tours | 🟢 Production |
| **Gaming** | Immersive browser experiences | 🟡 Growing |
| **Events** | VR concerts and exhibitions | 🟡 Growing |

### Real Examples

- **IKEA Place** — preview furniture in AR
- **Google Arts & Culture** — museums in VR
- **Sketchfab** — 3D models in AR
- **Amazon View in Your Room** — AR in e-commerce

---

## ⚡ VR Performance

VR is **much more demanding** than a standard webpage: steady 90 fps, stereoscopy (two renders per frame), and head tracking.

| Requirement | VR | Standard Web |
| :--- | :--- | :--- |
| **FPS** | 90+ (72 on Quest) | 30-60 |
| **Renders per frame** | 2 (one per eye) | 1 |
| **Latency** | less than 20 ms (motion sickness) | less than 100 ms |
| **Triangles** | less than 100k per eye | Millions possible |

### Key Optimizations

~~~javascript
// 1. Cap pixel ratio (don't render at 4K)
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

// 2. Disable shadows or keep them simple
renderer.shadowMap.enabled = false; // or THREE.PCFSoftShadowMap

// 3. Geometries with LOD
const lod = new THREE.LOD();
lod.addLevel(meshDetallado, 0);
lod.addLevel(meshSimple, 50);

// 4. Frustum culling (Three.js enables this by default)
// 5. InstancedMesh for many identical objects
const instancias = new THREE.InstancedMesh(geometria, material, 1000);
~~~

!!! warning "Motion sickness is real"
    When latency exceeds 20 ms, users experience **motion sickness** (dizziness, nausea). That's why VR isn't for everyone. Always prioritize FPS over visual fidelity.

---

## 🧪 Hands-On Exercise

!!! example "VR Scene with an Interactive Cube"
    Create a Three.js VR scene that:

    - Has a spinning cube in the center.
    - Changes color when clicked (with a VR controller).
    - Has an "Enter VR" button that hides on unsupported mobile devices.

??? success "Solution"
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

    // Change color on click (with VR controller)
    cubo.addEventListener("select", () => {
        cubo.material.color.setHex(Math.random() * 0xffffff);
    });

    renderer.setAnimationLoop(() => {
        cubo.rotation.y += 0.01;
        renderer.render(escena, camara);
    });
    ~~~

---

## 🧠 Review Quiz

!!! question "Check what you learned"

??? success "1. What is the difference between WebVR and WebXR?"
    WebVR was the legacy API (VR only). **WebXR** is the modern API supporting **VR and AR** in the browser. It replaced WebVR in 2019.

??? success "2. Why is `renderer.setAnimationLoop` mandatory in VR?"
    Because the browser controls the **headset refresh rate** (90 Hz). `requestAnimationFrame` does not work in VR mode: the browser needs to decide when to render each eye.

??? success "3. How many FPS does VR need?"
    **90 FPS** (72 on Meta Quest). That is double a typical webpage, because the human brain detects motion with high precision and low FPS causes motion sickness.

??? success "4. What is motion sickness in VR?"
    The **dizziness** caused by VR when latency exceeds 20 ms or FPS drops. The brain expects visual motion to match body movement, and when it doesn't, motion sickness occurs.

??? success "5. Which real-world use case uses WebXR in production?"
    IKEA Place (furniture in AR), Amazon View in Your Room (AR e-commerce), Google Arts & Culture (VR museums), Sketchfab (3D models in AR), industrial VR training.

---

## 📚 Resources

- [MDN — WebXR](https://developer.mozilla.org/es/docs/Web/API/WebXR_Device_API)
- [Three.js — Docs](https://threejs.org/docs/)
- [Three.js — WebXR examples](https://threejs.org/examples/?q=webxr)
- [web.dev — WebXR](https://web.dev/explore/webxr)
- [Immersive Web — Spec](https://immersive-web.github.io/)
- [AR.js — Docs](https://ar-js-org.github.io/AR.js-Docs/)

---

➡ Next chapter: [30 — Web3](30-web3.md)