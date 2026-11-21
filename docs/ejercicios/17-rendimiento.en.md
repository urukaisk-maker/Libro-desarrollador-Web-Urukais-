---
description: "Solved exercise 17: 17 — Performance. Step-by-step annotated solution from the Web Developer Book."
---
# 17 — Performance

!!! quote "Solved exercise"
    Practice lazy loading and image optimization.

---

## 🎯 Goal

Optimize a page with 10 images so that:

1. They only load when approaching the viewport.
2. They use modern formats.
3. They have `width` and `height` to avoid CLS.

---

## 💡 Solution

```html
<div class="galeria">
  <img src="img1.webp" alt="Image 1" loading="lazy" width="400" height="300">
  <img src="img2.webp" alt="Image 2" loading="lazy" width="400" height="300">
  <!-- ... -->
</div>
```

```html
<!-- With srcset for responsive -->
<img
  src="foto-800.webp"
  srcset="foto-400.webp 400w, foto-800.webp 800w, foto-1600.webp 1600w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px"
  alt="Photo"
  loading="lazy"
  width="800"
  height="600"
>
```

---

## 🧠 Key concepts

- `loading="lazy"`: lazy loading.
- `width` and `height`: reserve space, avoid CLS.
- `srcset` and `sizes`: responsive images.
- WebP/AVIF: lighter modern formats.

---

## 🚀 Bonus challenges

- [ ] Convert the images to WebP with [Squoosh](https://squoosh.app/).
- [ ] Add <picture> with JPG fallback.
- [ ] Measure LCP before and after with Lighthouse.

---

[← Exercise 16](16-testing.md){ .md-button }
[Go to exercise 18 →](18-arquitectura.md){ .md-button .md-button--primary }
