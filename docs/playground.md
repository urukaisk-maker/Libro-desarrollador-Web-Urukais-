# 🧪 Playground de Código

Escribe código JavaScript y ejecútalo directamente en el navegador con validación real en el servidor.

<div class="playground-container">
  <div class="playground-editor-wrapper">
    <div class="playground-header">
      <span class="playground-lang">JavaScript</span>
      <button id="runCode" class="playground-run-btn">▶ Ejecutar código</button>
    </div>
    <textarea id="codeEditor" spellcheck="false" placeholder="// Escribe tu código aquí...">console.log("¡Hola, mundo!");
console.log("2 + 2 =", 2 + 2);

// Prueba a hacer un bucle
for (let i = 0; i < 3; i++) {
  console.log("Iteración número:", i);
}</textarea>
  </div>
  
  <div class="playground-output-wrapper">
    <div class="playground-output-header">Consola de salida</div>
    <pre id="outputConsole" class="playground-console">Esperando ejecución...</pre>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const runBtn = document.getElementById('runCode');
  const editor = document.getElementById('codeEditor');
  const output = document.getElementById('outputConsole');

  if (!runBtn) return;

  runBtn.addEventListener('click', async () => {
    const code = editor.value;
    output.textContent = '⏳ Ejecutando código en el servidor...';
    output.style.color = '#94a3b8';

    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: 'javascript',
          version: '18.15.0',
          files: [{ content: code }]
        })
      });

      if (!response.ok) throw new Error('Error en el servidor de ejecución');

      const data = await response.json();
      
      let result = '';
      if (data.run.stdout) result += data.run.stdout;
      if (data.run.stderr) result += '❌ Error:\n' + data.run.stderr;
      if (!result) result = '(El código no produjo salida)';

      output.textContent = result;
      output.style.color = data.run.stderr ? '#ef4444' : '#4ade80';

    } catch (error) {
      output.textContent = '❌ Error de conexión: ' + error.message;
      output.style.color = '#ef4444';
    }
  });
});
</script>