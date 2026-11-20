---
description: "Solved exercise 06: 06 — Forms. Step-by-step annotated solution from the Web Developer's Book."
---
# 06 — Forms

!!! quote "Solved exercise"
    Practice creating accessible forms.

---

## 🎯 Goal

Create a registration form with:

1. Name field.
2. Email field.
3. Password field.
4. Terms checkbox.
5. Submit button.

---

## 💡 Solution

```html
<form action="/registro" method="POST">
  <label for="nombre">Name:</label>
  <input type="text" id="nombre" name="nombre" required minlength="2">

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>

  <label for="password">Password:</label>
  <input type="password" id="password" name="password" required minlength="8">

  <label>
    <input type="checkbox" name="terminos" required>
    I accept the terms
  </label>

  <button type="submit">Sign up</button>
</form>
```

---

## 🧠 Key Concepts

- Every input must have a `<label>` with `for` matching the input's `id`.
- `required`: mandatory field.
- `minlength`: minimum length.
- `type="email"`: validates email format.

---

## 🚀 Extra Challenges

- [ ] Add a phone field with `type="tel"`.
- [ ] Add a country `<select>`.
- [ ] Validate the password with JS in real time.

---

[← Exercise 05](05-responsive.md){ .md-button }
[Go to exercise 07 →](07-git.md){ .md-button .md-button--primary }