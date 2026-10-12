# Capítulo 29 — WebXR

## Introducción

**WebXR** permite crear experiencias de **Realidad Virtual (VR)** y **Realidad Aumentada (AR)** que se ejecutan directamente en el navegador, sin instalar aplicaciones.

Funciona en gafas (Meta Quest, Apple Vision Pro, HTC Vive), móviles (ARCore/ARKit) y gafas de realidad mixta. Todo con el mismo código.

## ¿Qué es WebXR?

Es una API del navegador que da acceso a:

- **Posición y orientación** del dispositivo en el espacio 3D.
- **Cámaras** para AR.
- **Mandos** y seguimiento de manos.
- **Audio espacial**.

Es la evolución de **WebVR** (obsoleta). WebXR combina VR + AR en una sola API.

## Cómo funciona

```
Navegador
   ↓
navigator.xr (WebXR API)
   ↓
Dispositivo (gafas, móvil, PC)
   ↓
Escena 3D (Three.js, Babylon.js, A-Frame)
```

WebXR solo gestiona el **rastreo** y la **sesión**. Necesitas una librería 3D para renderizar.

## Compatibilidad

| Navegador | VR | AR |
|---|---|---|
| Chrome Android | ✅ | ✅ |
| Chrome Desktop | ✅ (con gafas) | ❌ |
| Edge | ✅ | ❌ |
| Meta Quest Browser | ✅ | ✅ |
| Safari (Vision Pro) | ✅ | ✅ |
| Firefox | ✅ | 🟡 parcial |

Comprueba siempre antes de arrancar la sesión.

## Detectar soporte

```javascript
if ('xr' in navigator) {
  const soportaVR = await navigator.xr.isSessionSupported('immersive-vr');
  const soportaAR = await navigator.xr.isSessionSupported('immersive-ar');
  console.log('VR:', soportaVR, 'AR:', soportaAR);
} else {
  console.log('WebXR no disponible');
}
```

## Librerías recomendadas

| Librería | Uso |
|---|---|
| **Three.js** | 3D general con WebGL |
| **Babylon.js** | 3D + WebXR integrado, más completo |
| **A-Frame** | HTML declarativo, el más fácil |
| **React Three Fiber** | Three.js para React |
| **Wonderland Engine** | Especializada en WebXR |

Vamos con **A-Frame** primero (lo más simple) y luego **Three.js**.

## Ejemplo básico con A-Frame

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi primera escena VR</title>
  <script src="https://aframe.io/releases/1.5.0/aframe.min.js"></script>
</head>
<body>
  <a-scene>
    <a-box position="-1 0.5 -3" rotation="0 45 0" color="#6a5acd"></a-box>
    <a-sphere position="0 1.25 -5" radius="1.25" color="#22d3ee"></a-sphere>
    <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#ef4444"></a-cylinder>
    <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#f8fafc"></a-plane>
    <a-sky color="#0f172a"></a-sky>
  </a-scene>
</body>
</html>
```

Con eso ya tienes una escena VR. Añade un botón para entrar en modo VR:

```html
<a-scene>
  <a-entity id="rig" position="0 1.6 0">
    <a-entity camera look-controls></a-entity>
  </a-entity>
  <!-- ... resto de la escena ... -->
</a-scene>
```

A-Frame muestra automáticamente el botón "Enter VR" si el dispositivo lo soporta.

## Ejemplo con Three.js

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>WebXR con Three.js</title>
</head>
<body>
  <button id="entrar">Entrar en VR</button>

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

    // Botón VR
    document.body.appendChild(VRButton.createButton(renderer));

    // Luces
    escena.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1));

    // Objeto
    const geometria = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x6a5acd });
    const cubo = new THREE.Mesh(geometria, material);
    cubo.position.set(0, 1.6, -2);
    escena.add(cubo);

    // Bucle
    renderer.setAnimationLoop((tiempo) => {
      cubo.rotation.y = tiempo / 1000;
      cubo.rotation.x = tiempo / 2000;
      renderer.render(escena, camara);
    });

    // Responsive
    addEventListener('resize', () => {
      camara.aspect = innerWidth / innerHeight;
      camara.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    });
  </script>
</body>
</html>
```

Al abrirlo en un dispositivo compatible (Meta Quest, móvil con ARCore, etc.) aparece el botón **"Enter VR"**.

## AR con WebXR

AR necesita la cámara trasera. Ejemplo básico con Three.js:

```javascript
import { ARButton } from 'https://unpkg.com/three@0.160.0/examples/jsm/webxr/ARButton.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

document.body.appendChild(
  ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] })
);

const escena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera();

escena.add(new THREE.HemisphereLight(0xffffff, 0xbbbbff, 3));

// Cubo que se coloca donde toques
const cubo = new THREE.Mesh(
  new THREE.BoxGeometry(0.2, 0.2, 0.2),
  new THREE.MeshStandardMaterial({ color: 0x6a5acd })
);
cubo.visible = false;
escena.add(cubo);

let reticle = new THREE.Mesh(
  new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
  new THREE.MeshBasicMaterial({ color: 0x22d3ee })
);
reticle.matrixAutoUpdate = false;
reticle.visible = false;
escena.add(reticle);

// Hit testing
let hitTestSource = null;
let hitTestSourceRequested = false;

renderer.xr.addEventListener('sessionstart', async () => {
  const session = renderer.xr.getSession();
  const viewerSpace = await session.requestReferenceSpace('viewer');
  hitTestSource = await session.requestHitTestSource({ space: viewerSpace });

  session.addEventListener('select', () => {
    if (reticle.visible) {
      const clone = cubo.clone();
      clone.position.setFromMatrixPosition(reticle.matrix);
      clone.visible = true;
      escena.add(clone);
    }
  });
});

renderer.setAnimationLoop((tiempo, frame) => {
  if (frame && hitTestSource) {
    const referenceSpace = renderer.xr.getReferenceSpace();
    const hits = frame.getHitTestResults(hitTestSource);
    if (hits.length) {
      const pose = hits[0].getPose(referenceSpace);
      reticle.visible = true;
      reticle.matrix.fromArray(pose.transform.matrix);
    }
  }
  renderer.render(escena, camara);
});
```

Esto coloca cubos donde el usuario toca una superficie detectada. Es la base de cualquier app AR.

## Controles y mandos

```javascript
const controlador = renderer.xr.getController(0);
controlador.addEventListener('selectstart', () => {
  console.log('Gatillo pulsado');
});
escena.add(controlador);

// Añadir un rayo visible
const rayo = new THREE.Line(
  new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, -1),
  ]),
  new THREE.LineBasicMaterial({ color: 0x22d3ee })
);
rayo.scale.z = 5;
controlador.add(rayo);
```

## Seguimiento de manos

WebXR soporta **hand tracking** en Quest y Vision Pro:

```javascript
const session = renderer.xr.getSession();
session.addEventListener('inputsourceschange', (event) => {
  event.added.forEach((input) => {
    if (input.hand) {
      console.log('Mano detectada:', input.handedness);
    }
  });
});

session.requestAnimationFrame((tiempo, frame) => {
  for (const input of session.inputSources) {
    if (input.hand) {
      for (const joint of input.hand.values()) {
        // joint.transform: matriz 4x4 con la posición
      }
    }
  }
});
```

## Audio espacial

El sonido cambia según la posición del usuario:

```javascript
const listener = new THREE.AudioListener();
camara.add(listener);

const sonido = new THREE.PositionalAudio(listener);
const audioLoader = new THREE.AudioLoader();

audioLoader.load('ambiente.mp3', (buffer) => {
  sonido.setBuffer(buffer);
  sonido.setRefDistance(1);
  sonido.setLoop(true);
  sonido.play();
});

cubo.add(sonido); // el sonido viene del cubo
```

## Rendimiento en VR

VR exige **90 FPS mínimo** (idealmente 120). Reglas estrictas:

- **Bajo poligonaje**. Cada triángulo cuenta.
- **Texturas comprimidas** (KTX2, Basis).
- **Instancing** para objetos repetidos.
- **LOD** (Level of Detail) según distancia.
- **Evita transparencias** (son caras).
- **Evita sombras dinámicas** complejas.
- **Prueba en el dispositivo real**.

## Casos de uso

- **Educación**: visitas virtuales, simulaciones.
- **Comercio**: probar productos en AR.
- **Formación**: entrenamiento en entornos seguros.
- **Arte**: museos virtuales.
- **Arquitectura**: recorridos de edificios.
- **Salud**: terapia de exposición, rehabilitación.

## Buenas prácticas

- **Detecta soporte** antes de arrancar.
- **Ofrece fallback 2D** si no hay XR.
- **Empieza con A-Frame** si eres nuevo.
- **Optimiza desde el día 1**. En VR no puedes improvisar.
- **Prueba en el dispositivo real**. El emulador no basta.
- **Cuida la accesibilidad**. No todo el mundo puede usar gafas.
- **Evita movimientos bruscos** (marean).
- **Considera el espacio físico** del usuario.
- **Ofrece pausa y salida** siempre visibles.

## Ejercicios

1. Crea una escena VR con A-Frame con 5 objetos de colores.
2. Añade un botón para entrar en VR desde un dispositivo compatible.
3. Convierte una escena Three.js a WebXR con `VRButton`.
4. Prueba AR en un móvil Android con ARCore.
5. Añade audio espacial a un objeto de tu escena.
6. Implementa hand tracking básico en Meta Quest.
7. Optimiza una escena VR para alcanzar 90 FPS estables.

---

⬅️ [Capítulo 28 — IA en el frontend](28-ia-frontend.md) | ➡️ [Capítulo 30 — Web3](30-web3.md)
