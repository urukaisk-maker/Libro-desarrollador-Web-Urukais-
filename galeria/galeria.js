const miniaturas = document.querySelectorAll('.miniatura');
const lightbox = document.getElementById('lightbox');
const imagenGrande = document.getElementById('imagen-grande');
const cerrar = document.getElementById('cerrar');

miniaturas.forEach((img) => {
  img.addEventListener('click', () => {
    imagenGrande.src = img.src;
    imagenGrande.alt = img.alt;
    lightbox.classList.add('activo');
  });
});

cerrar.addEventListener('click', () => {
  lightbox.classList.remove('activo');
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('activo');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('activo')) {
    lightbox.classList.remove('activo');
  }
});