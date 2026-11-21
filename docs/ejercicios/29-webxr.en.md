---
description: "Solved exercise 29: 29 — WebXR. Step-by-step annotated solution from the Web Developer Book."
---
# 29 — WebXR

!!! quote "Solved exercise"
    Detect WebXR support in the browser.

---

## 🎯 Goal

1. Check whether the browser supports WebXR.
2. Check whether it supports immersive VR.
3. Display the result to the user.

---

## 💡 Solution

```javascript
async function comprobarXR() {
  if (!navigator.xr) {
    console.log('WebXR not supported');
    return;
  }

  const vrSoportado = await navigator.xr.isSessionSupported('immersive-vr');
  const arSoportado = await navigator.xr.isSessionSupported('immersive-ar');

  console.log('VR:', vrSoportado);
  console.log('AR:', arSoportado);
}

comprobarXR();
```

---

## 🧠 Key concepts

- `navigator.xr`: WebXR API.
- `isSessionSupported`: checks support.
- `immersive-vr` / `immersive-ar`: session modes.

---

## 🚀 Bonus challenges

- [ ] Create a 3D scene with Three.js.
- [ ] Add an "Enter VR" button.
- [ ] Test on a real Meta Quest.

---

[← Exercise 28](28-ia-frontend.md){ .md-button }
[Go to exercise 30 →](30-web3.md){ .md-button .md-button--primary }
