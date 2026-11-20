---
description: "Chapter 06 of the Web Developer's Book: 06 — HTML Forms. Learn step by step with examples, exercises, and quizzes."
---
# 06 — HTML Forms

!!! abstract "What you will learn"
    - Essential form tags and attributes.
    - Most commonly used input types.
    - Native browser validation.
    - Form accessibility.
    - Best practices.

---

## 📝 What is a Form?

A **form** is the main way to collect data from users. It can be a login screen, a search box, a checkout, a contact form, a survey… All of them use the same tags.

```html
<form action="/enviar" method="POST">
  <label for="nombre">Name:</label>
  <input type="text" id="nombre" name="nombre" required>
  <button type="submit">Send</button>
</form>