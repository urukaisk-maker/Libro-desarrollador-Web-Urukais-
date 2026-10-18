# 🔥 Retos Semanales

Cada semana publicaré un pequeño desafío de código. Puedes enviar tu solución y compararla con la de otros lectores.

---

## Reto #1: El botón camaleón

**Dificultad:** 🟢 Fácil
**Tema:** HTML y CSS

Crea un botón que cambie de color de fondo y de texto cuando el usuario pase el ratón por encima (`hover`). El botón debe tener bordes redondeados y una transición suave para que el cambio no sea brusco.

**Pistas:**
- Usa la propiedad `:hover` en CSS.
- Usa `transition` para suavizar el cambio.

??? success "Ver solución"
    ```html
    <button class="mi-boton">Púlsame</button>
    .mi-boton {
  background-color: #6a5acd;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.mi-boton:hover {
  background-color: #22d3ee;
  color: #0f172a;
}