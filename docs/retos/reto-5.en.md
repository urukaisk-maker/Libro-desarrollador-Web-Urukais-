---
description: "Challenge 5: Form Validator. Practice your web development skills with this challenge from the Web Developer Book."
---
# 🎯 Challenge #5: Form Validator

!!! quote "Intermediate-level challenge"
    Build a form with real-time validation using the Constraint Validation API. Ideal for practicing forms and accessibility.

---

## 🎯 Goal

Create a registration form with:

1. Fields: **email**, **password**, **confirm password**.
2. **Real-time** validation.
3. **Descriptive error** messages.
4. **Accessibility** (aria-invalid, aria-describedby).
5. Prevent submission if there are errors.

## 🧠 Concepts

- Constraint Validation API
- `input` and `blur` events
- Accessibility

## 🖥 Editor

<div class="playground-ejercicio" data-ejercicio="reto-5">
<div class="playground__editor">
<div class="playground__tabs">
<button class="playground__tab is-active" data-lang="html">HTML</button>
<button class="playground__tab" data-lang="css">CSS</button>
<button class="playground__tab" data-lang="js">JS</button>
</div>
<textarea class="playground__textarea" data-lang="html" spellcheck="false"><form id="registro" novalidate>
  <div>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required>
    <small class="error" id="email-error"></small>
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" id="password" name="password" required minlength="8">
    <small class="error" id="password-error"></small>
  </div>
  <div>
    <label for="confirmar">Confirm password</label>
    <input type="password" id="confirmar" name="confirmar" required>
    <small class="error" id="confirmar-error"></small>
  </div>
  <button type="submit">Sign up</button>
</form></textarea>
<textarea class="playground__textarea is-hidden" data-lang="css" spellcheck="false">body { font-family: system-ui; padding: 1.5rem; }
form { max-width: 400px; }
div { margin-bottom: 1rem; display: flex; flex-direction: column; }
label { font-weight: 600; font-size: .85rem; margin-bottom: .25rem; }
input { padding: .5rem; border: 1px solid #ddd; border-radius: 6px; }
input.invalido { border-color: #dc3545; }
.error { color: #dc3545; font-size: .75rem; margin-top: .25rem; min-height: 1rem; }
button { padding: .75rem 1.5rem; background: #6a5acd; color: #fff; border: none; border-radius: 6px; cursor: pointer; }</textarea>
<textarea class="playground__textarea is-hidden" data-lang="js" spellcheck="false">// Your code here
</textarea>
<div class="playground__actions">
<button class="md-button md-button--primary" data-run>▶ Run</button>
</div>
</div>
<div class="playground__output">
<iframe data-output sandbox="allow-scripts allow-modals"></iframe>
</div>
</div>

??? success "Solution"
    ```javascript
    const form = document.getElementById('registro');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmar = document.getElementById('confirmar');

    function validar(input, extra) {
      const error = document.getElementById(input.id + '-error');
      if (!input.validity.valid) {
        error.textContent = mensaje(input);
        input.classList.add('invalido');
        return false;
      }
      if (extra && extra()) {
        error.textContent = 'Passwords do not match';
        input.classList.add('invalido');
        return false;
      }
      error.textContent = '';
      input.classList.remove('invalido');
      return true;
    }

    function mensaje(input) {
      if (input.validity.valueMissing) return 'This field is required';
      if (input.validity.typeMismatch) return 'Enter a valid email address';
      if (input.validity.tooShort) return 'Minimum ' + input.minLength + ' characters';
      return 'Invalid value';
    }

    [email, password, confirmar].forEach(input => {
      input.addEventListener('input', () => validar(input, input === confirmar ? () => password.value !== confirmar.value : null));
      input.addEventListener('blur', () => validar(input));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const ok = validar(email) && validar(password) && validar(confirmar, () => password.value !== confirmar.value);
      if (ok) alert('Registration successful!');
    });
    ```

## 🚀 Bonus Challenges

- [ ] **Password strength indicator**.
- [ ] **Terms and conditions** checkbox.
- [ ] Form **progress meter**.

---

[← Back to challenges](../retos.md){ .md-button }
[🎯 See all challenges](../retos.md){ .md-button .md-button--primary }
