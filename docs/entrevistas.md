cd ~/Libro-desarrollador-Web-Urukais-
bash -c 'cat > docs/entrevistas.md << "ENTREVISTAS_EOF"
# 💼 Preguntas de Entrevista

!!! quote "Prepárate para tu próxima oportunidad"
    Una colección de las preguntas más comunes en entrevistas técnicas para desarrolladores frontend, con respuestas detalladas y ejemplos de código. Organizadas por nivel para que puedas practicar según tu experiencia.

---

## 🎯 Cómo usar esta página

1. **Lee la pregunta** e intenta responderla tú mismo antes de ver la respuesta.
2. **Haz clic en la pregunta** para ver la respuesta detallada.
3. **Practica el código** de los ejemplos en tu editor.
4. **No memorices**: entiende el concepto.

!!! tip "Consejo para entrevistas"
    En una entrevista técnica no solo importa la respuesta correcta, sino **cómo piensas**. Si no sabes algo, dilo y explica cómo lo buscarías. La honestidad vale más que fingir.

---

## 🟢 Nivel Principiante

??? question "¿Qué diferencia hay entre `let`, `const` y `var`?"
    **`var`**: Tiene alcance de función y se eleva (hoisting). Se puede redeclarar. Evítalo en código moderno.

    **`let`**: Tiene alcance de bloque. No se puede redeclarar, pero sí reasignar.

    **`const`**: Tiene alcance de bloque. No se puede redeclarar ni reasignar. Requiere inicialización.

    ```javascript
    var x = 1;     // function scope
    let y = 2;     // block scope
    const z = 3;   // block scope, no reasignable