# Ejercicios resueltos — Capítulo 29

[Volver al índice](index.md) · [Capítulo original](../capitulos/29-webxr.md)

## Ejercicio 1: Escena VR con A-Frame

> Crea una escena VR con 5 objetos de colores.

### Solución

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi escena VR</title>
  <script src="https://aframe.io/releases/1.5.0/aframe.min.js"></script>
</head>
<body>
  <a-scene>
    <a-box position="-1 0.5 -3" color="#6a5acd"></a-box>
    <a-sphere position="0 1.25 -5" radius="1.25" color="#22d3ee"></a-sphere>
    <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#ef4444"></a-cylinder>
    <a-cone position="-2 0.75 -4" radius-bottom="1" height="1.5" color="#f59e0b"></a-cone>
    <a-torus position="2 1 -5" color="#10b981"></a-torus>

    <a-plane position="0 0 -4" rotation="-90 0 0" width="10" height="10" color="#f8fafc"></a-plane>
    <a-sky color="#0f172a"></a-sky>
  </a-scene>
</body>
</html>
```

---

## Ejercicio 2: Botón "Enter VR"

> Añade un botón para entrar en VR.

### Solución

**Con A-Frame:** aparece automáticamente si el dispositivo lo soporta. No hay que hacer nada.

**Con Three.js:**

```javascript
import { VRButton } from 'https://unpkg.com/three@0.160.0/examples/jsm/webxr/VRButton.js';

renderer.xr.enabled = true;
document.body.appendChild(VRButton.createButton(renderer));
```

---

## Ejercicio 3: Three.js a WebXR

> Convierte una escena Three.js a WebXR.

### Solución

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>WebXR</title>
</head>
<body>
  <script type="importmap">
    {
      "imports": {
        "three": "https://unpkg.com/three@0.160.0/build/three.module.js"
      }
    }
  </script>

  <script type="module">
    import * as THREE from 'three';
    import { VRButton } from 'https://unpkg.com/three@0.160.0/examples/jsm/webxr/VRButton.js';

    const escena = new THREE.Scene();
    escena.background = new THREE.Color(0x0f172a);

    const camara = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 100);
    camara.position.set(0, 1.6, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(innerWidth, innerHeight);
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(VRButton.createButton(renderer));

    escena.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1));

    const cubo = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 0x6a5acd })
    );
    cubo.position.set(0, 1.6, -2);
    escena.add(cubo);

    renderer.setAnimationLoop((tiempo) => {
      cubo.rotation.y = tiempo / 1000;
      renderer.render(escena, camara);
    });

    addEventListener('resize', () => {
      camara.aspect = innerWidth / innerHeight;
      camara.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    });
  </script>
</body>
</html>
```

---

## Ejercicio 4: AR con ARCore

> Prueba AR en un móvil Android.

### Solución

```html
<script type="module">
  import * as THREE from 'three';
  import { ARButton } from 'https://unpkg.com/three@0.160.0/examples/jsm/webxr/ARButton.js';

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.xr.enabled = true;
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);

  document.body.appendChild(
    ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] })
  );

  const escena = new THREE.Scene();
  const camara = new THREE.PerspectiveCamera();

  escena.add(new THREE.HemisphereLight(0xffffff, 0xbbbbff, 3));

  const cubo = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 0.2),
    new THREE.MeshStandardMaterial({ color: 0x6a5acd })
  );
  cubo.visible = false;
  escena.add(cubo);

  const reticle = new THREE.Mesh(
    new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: 0x22d3ee })
  );
  reticle.matrixAutoUpdate = false;
  reticle.visible = false;
  escena.add(reticle);

  let hitTestSource = null;

  renderer.xr.addEventListener('sessionstart', async () => {
    const session = renderer.xr.getSession();
    const viewerSpace = await session.requestReferenceSpace('viewer');
    hitTestSource = await session.requestHitTestSource({ space: viewerSpace });

    session.addEventListener('select', () => {
      if (reticle.visible) {
        const clon = cubo.clone();
        clon.position.setFromMatrixPosition(reticle.matrix);
        clon.visible = true;
        escena.add(clon);
      }
    });
  });

  renderer.setAnimationLoop((tiempo, frame) => {
    if (frame && hitTestSource) {
      const refSpace = renderer.xr.getReferenceSpace();
      const hits = frame.getHitTestResults(hitTestSource);
      if (hits.length) {
        reticle.visible = true;
        reticle.matrix.fromArray(hits[0].getPose(refSpace).transform.matrix);
      }
    }
    renderer.render(escena, camara);
  });
</script>
```

---

## Ejercicio 5: Audio espacial

> Añade audio espacial a un objeto.

### Solución

```javascript
const listener = new THREE.AudioListener();
camara.add(listener);

const sonido = new THREE.PositionalAudio(listener);
const loader = new THREE.AudioLoader();

loader.load('ambiente.mp3', (buffer) => {
  sonido.setBuffer(buffer);
  sonido.setRefDistance(1);
  sonido.setLoop(true);
  sonido.play();
});

cubo.add(sonido); // el sonido viene del cubo
```

Al moverte por la escena VR, el sonido cambia de volumen e intensidad según la distancia.

---

## Ejercicio 6: Hand tracking en Quest

> Implementa hand tracking básico.

### Solución

```javascript
const session = renderer.xr.getSession();

session.addEventListener('inputsourceschange', (event) => {
  event.added.forEach((input) => {
    if (input.hand) {
      console.log('Mano detectada:', input.handedness);
    }
  });
});

renderer.setAnimationLoop((tiempo, frame) => {
  if (!frame) return;

  for (const input of session.inputSources) {
    if (input.hand) {
      for (const joint of input.hand.values()) {
        // joint.transform es una matriz 4x4
        // joint.jointName: 'wrist', 'thumb-tip', 'index-finger-tip', ...
      }
    }
  }

  renderer.render(escena, camara);
});
```

---

## Ejercicio 7: Optimizar para 90 FPS

> Optimiza una escena VR para alcanzar 90 FPS.

### Solución

**Checklist:**

- [ ] **Bajo poligonaje**: cada triángulo cuenta.
- [ ] **Texturas comprimidas**: KTX2 o Basis.
- [ ] **Instancing** para objetos repetidos.
- [ ] **LOD** (Level of Detail) según distancia.
- [ ] **Evita transparencias** (caras de renderizar).
- [ ] **Sin sombras dinámicas** complejas.
- [ ] **Sin post-processing** pesado.
- [ ] **`frustumCulled = true`** por defecto.

**Medir FPS:**

```javascript
let frames = 0;
let inicio = performance.now();

renderer.setAnimationLoop(() => {
  frames++;

  const ahora = performance.now();
  if (ahora - inicio >= 1000) {
    console.log('FPS:', frames);
    frames = 0;
    inicio = ahora;
  }

  renderer.render(escena, camara);
});
```

**Objetivo**: 90 FPS estables (11 ms por frame).

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/29-webxr.md)
