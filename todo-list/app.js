const form = document.getElementById('formulario');
const input = document.getElementById('nueva-tarea');
const lista = document.getElementById('lista-tareas');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = input.value.trim();
  if (texto === '') return;

  const li = document.createElement('li');
  li.innerHTML = `
    <span class="tarea-texto">${texto}</span>
    <button class="btn-eliminar">Eliminar</button>
  `;

  li.querySelector('.tarea-texto').addEventListener('click', () => {
    li.classList.toggle('tachada');
  });

  li.querySelector('.btn-eliminar').addEventListener('click', () => {
    li.remove();
  });

  lista.appendChild(li);
  input.value = '';
});