# 🏋️ Ejercicios con Validación Automática

Pon a prueba tus conocimientos con estos retos. Escribe tu solución en el editor y pulsa **"Validar"** para comprobar si es correcta. El sistema ejecutará tu código en un servidor seguro y comprobará los resultados.

---

## Reto 1: Suma de dos números

**Objetivo:** Crea una función `sumar(a, b)` que devuelva la suma de dos números.

<div class="playground-container">
  <div class="playground-editor-wrapper">
    <div class="playground-header">
      <span class="playground-lang">JavaScript</span>
      <button class="playground-run-btn validate-btn" data-test="reto1">✅ Validar</button>
    </div>
    <textarea class="code-editor" spellcheck="false">function sumar(a, b) {
  // Escribe tu solución aquí
  
}</textarea>
  </div>
  <div class="playground-output-wrapper">
    <div class="playground-output-header">Resultado del test</div>
    <pre class="playground-console output-console">Esperando validación...</pre>
  </div>
</div>

---

## Reto 2: Revertir un string

**Objetivo:** Crea una función `revertir(texto)` que devuelva el texto al revés. Por ejemplo, `revertir("hola")` debe devolver `"aloh"`.

<div class="playground-container">
  <div class="playground-editor-wrapper">
    <div class="playground-header">
      <span class="playground-lang">JavaScript</span>
      <button class="playground-run-btn validate-btn" data-test="reto2">✅ Validar</button>
    </div>
    <textarea class="code-editor" spellcheck="false">function revertir(texto) {
  // Escribe tu solución aquí
  
}</textarea>
  </div>
  <div class="playground-output-wrapper">
    <div class="playground-output-header">Resultado del test</div>
    <pre class="playground-console output-console">Esperando validación...</pre>
  </div>
</div>

---

## Reto 3: Contar vocales

**Objetivo:** Crea una función `contarVocales(texto)` que devuelva el número de vocales (a, e, i, o, u) que contiene un string.

<div class="playground-container">
  <div class="playground-editor-wrapper">
    <div class="playground-header">
      <span class="playground-lang">JavaScript</span>
      <button class="playground-run-btn validate-btn" data-test="reto3">✅ Validar</button>
    </div>
    <textarea class="code-editor" spellcheck="false">function contarVocales(texto) {
  // Escribe tu solución aquí
  
}</textarea>
  </div>
  <div class="playground-output-wrapper">
    <div class="playground-output-header">Resultado del test</div>
    <pre class="playground-console output-console">Esperando validación...</pre>
  </div>
</div>

---

<script>
document.addEventListener('DOMContentLoaded', () => {
  const tests = {
    reto1: {
      setup: `function sumar(a, b) {
        // placeholder
      }`,
      casos: [
        { args: [2, 3], esperado: 5 },
        { args: [-1, 1], esperado: 0 },
        { args: [10, 0], esperado: 10 },
        { args: [1.5, 2.5], esperado: 4 }
      ],
      nombreFuncion: 'sumar'
    },
    reto2: {
      setup: `function revertir(texto) {
        // placeholder
      }`,
      casos: [
        { args: ["hola"], esperado: "aloh" },
        { args: ["abc"], esperado: "cba" },
        { args: [""], esperado: "" },
        { args: ["12345"], esperado: "54321" }
      ],
      nombreFuncion: 'revertir'
    },
    reto3: {
      setup: `function contarVocales(texto) {
        // placeholder
      }`,
      casos: [
        { args: ["hola"], esperado: 2 },
        { args: ["programacion"], esperado: 5 },
        { args: ["xyz"], esperado: 0 },
        { args: ["AEIOU"], esperado: 5 }
      ],
      nombreFuncion: 'contarVocales'
    }
  };

  const botones = document.querySelectorAll('.validate-btn');

  botones.forEach(btn => {
    btn.addEventListener('click', async () => {
      const testId = btn.dataset.test;
      const test = tests[testId];
      const container = btn.closest('.playground-container');
      const editor = container.querySelector('.code-editor');
      const output = container.querySelector('.output-console');
      const codigoUsuario = editor.value;

      output.textContent = '⏳ Validando tu solución...';
      output.style.color = '#94a3b8';

      // Construir el código completo con los tests
      let codigoCompleto = codigoUsuario + '\n\n';
      codigoCompleto += 'const __resultados = [];\n';
      
      test.casos.forEach((caso, i) => {
        const argsStr = JSON.stringify(caso.args);
        const esperadoStr = JSON.stringify(caso.esperado);
        codigoCompleto += `try { __resultados.push({ i: ${i}, ok: JSON.stringify(${test.nombreFuncion}(...${argsStr})) === ${JSON.stringify(esperadoStr)}, obtenido: JSON.stringify(${test.nombreFuncion}(...${argsStr})) }); } catch(e) { __resultados.push({ i: ${i}, ok: false, error: e.message }); }\n`;
      });
      
      codigoCompleto += 'console.log(JSON.stringify(__resultados));\n';

      try {
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language: 'javascript',
            version: '18.15.0',
            files: [{ content: codigoCompleto }]
          })
        });

        const data = await response.json();
        
        if (data.run.stderr) {
          output.textContent = '❌ Error en tu código:\n' + data.run.stderr;
          output.style.color = '#ef4444';
          return;
        }

        const resultados = JSON.parse(data.run.stdout.trim());
        const fallos = resultados.filter(r => !r.ok);

        if (fallos.length === 0) {
          output.textContent = '🎉 ¡Correcto! Todos los tests han pasado.\n\n' + 
            test.casos.map((c, i) => `✅ Test ${i+1}: ${test.nombreFuncion}(${JSON.stringify(c.args)}) = ${JSON.stringify(c.esperado)}`).join('\n');
          output.style.color = '#4ade80';
        } else {
          let msg = '❌ Hay fallos en tu solución:\n\n';
          fallos.forEach(f => {
            const caso = test.casos[f.i];
            msg += `❌ Test ${f.i+1}: ${test.nombreFuncion}(${JSON.stringify(caso.args)})\n`;
            msg += `   Esperado: ${JSON.stringify(caso.esperado)}\n`;
            msg += `   Obtenido: ${f.error ? 'Error: ' + f.error : f.obtenido}\n\n`;
          });
          output.textContent = msg;
          output.style.color = '#ef4444';
        }

      } catch (error) {
        output.textContent = '❌ Error de conexión: ' + error.message;
        output.style.color = '#ef4444';
      }
    });
  });
});
</script>