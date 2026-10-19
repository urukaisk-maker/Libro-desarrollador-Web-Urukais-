# 🎓 Certificado de Finalización

Completa al menos el **50% de los capítulos** del libro para desbloquear tu certificado personalizado.

<div id="certificado-container" style="text-align: center; margin: 2rem 0;">
  <p>Cargando tu progreso...</p>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('certificado-container');
  if (!container) return;

  const completados = JSON.parse(localStorage.getItem('completed_chapters') || '[]');
  const total = 36;
  const porcentaje = Math.round((completados.length / total) * 100);

  if (porcentaje < 50) {
    container.innerHTML = `
      <p style="font-size: 1.2rem;">Has completado <strong>${completados.length}</strong> de <strong>${total}</strong> capítulos (<strong>${porcentaje}%</strong>).</p>
      <p>Necesitas al menos el 50% para generar tu certificado.</p>
      <a href="/capitulos/01-introduccion/" class="md-button md-button--primary">Seguir aprendiendo</a>
    `;
    return;
  }

  container.innerHTML = `
    <p style="font-size: 1.2rem;">¡Felicidades! Has completado <strong>${completados.length}</strong> capítulos (<strong>${porcentaje}%</strong>).</p>
    <input type="text" id="nombreCert" placeholder="Tu nombre completo" style="padding: 0.75rem; border-radius: 8px; border: 1px solid #ccc; width: 100%; max-width: 300px; margin-bottom: 1rem;">
    <button id="generarCert" class="md-button md-button--primary">Generar Certificado PDF</button>
    <div id="certificado-vista" style="margin-top: 2rem; display: none; border: 2px solid var(--md-primary-fg-color); border-radius: 12px; padding: 2rem; background: white; color: #0f172a;"></div>
  `;

  document.getElementById('generarCert').addEventListener('click', () => {
    const nombre = document.getElementById('nombreCert').value.trim();
    if (!nombre) {
      alert('Por favor, escribe tu nombre.');
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape', 'mm', 'a4');

    // Fondo
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 297, 210, 'F');

    // Borde decorativo
    doc.setDrawColor(167, 139, 250);
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);

    // Título
    doc.setTextColor(34, 211, 238);
    doc.setFontSize(40);
    doc.text('CERTIFICADO', 148.5, 60, { align: 'center' });

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text('de finalización del', 148.5, 75, { align: 'center' });
    doc.setFontSize(24);
    doc.setTextColor(167, 139, 250);
    doc.text('Libro del Desarrollador Web', 148.5, 90, { align: 'center' });

    // Nombre
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text('Otorgado a:', 148.5, 115, { align: 'center' });
    doc.setFontSize(32);
    doc.setTextColor(34, 211, 238);
    doc.text(nombre, 148.5, 130, { align: 'center' });

    // Porcentaje
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text(`Por completar el ${porcentaje}% del libro (${completados.length} de ${total} capítulos)`, 148.5, 150, { align: 'center' });

    // Fecha
    const fecha = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    doc.setFontSize(12);
    doc.text(`Fecha: ${fecha}`, 148.5, 165, { align: 'center' });

    // Autor
    doc.setFontSize(11);
    doc.setTextColor(167, 139, 250);
    doc.text('Manuel Casimiro Carrasco — Urukais', 148.5, 185, { align: 'center' });

    doc.save(`certificado-${nombre.replace(/\s+/g, '-')}.pdf`);
  });
});
</script>