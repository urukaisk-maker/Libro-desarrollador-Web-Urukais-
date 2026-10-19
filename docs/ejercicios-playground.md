# 🏋️ Ejercicios con Validación Automática

Pon a prueba tus conocimientos con estos retos. Escribe tu solución, selecciona el lenguaje y pulsa **"Validar"**. El sistema ejecutará tu código en un servidor seguro y comprobará los resultados.

!!! tip "💾 Tu progreso se guarda"
    El código que escribas se guarda automáticamente en tu navegador. Si recargas la página, seguirá ahí.

---

## 🟢 Reto 1: Suma de dos números

**Nivel:** Fácil · **Tema:** [JavaScript básico](../capitulos/04-javascript.md)

**Objetivo:** Crea una función `sumar(a, b)` que devuelva la suma de dos números.

<div class="playground-container" data-reto="reto1">
  <div class="playground-editor-wrapper">
    <div class="playground-header">
      <select class="playground-lang-select">
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
      </select>
      <button class="playground-run-btn validate-btn">✅ Validar</button>
    </div>
    <textarea class="code-editor" spellcheck="false"></textarea>
  </div>
  <div class="playground-output-wrapper">
    <div class="playground-output-header">Resultado</div>
    <pre class="playground-console output-console">Esperando validación...</pre>
  </div>
</div>

---

## 🟢 Reto 2: Revertir un string

**Nivel:** Fácil · **Tema:** [JavaScript básico](../capitulos/04-javascript.md)

**Objetivo:** Crea una función `revertir(texto)` que devuelva el texto al revés.

<div class="playground-container" data-reto="reto2">
  <div class="playground-editor-wrapper">
    <div class="playground-header">
      <select class="playground-lang-select">
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
      </select>
      <button class="playground-run-btn validate-btn">✅ Validar</button>
    </div>
    <textarea class="code-editor" spellcheck="false"></textarea>
  </div>
  <div class="playground-output-wrapper">
    <div class="playground-output-header">Resultado</div>
    <pre class="playground-console output-console">Esperando validación...</pre>
  </div>
</div>

---

## 🟢 Reto 3: Contar vocales

**Nivel:** Fácil · **Tema:** [JavaScript básico](../capitulos/04-javascript.md)

**Objetivo:** Crea una función `contarVocales(texto)` que devuelva el número de vocales.

<div class="playground-container" data-reto="reto3">
  <div class="playground-editor-wrapper">
    <div class="playground-header">
      <select class="playground-lang-select">
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
      </select>
      <button class="playground-run-btn validate-btn">✅ Validar</button>
    </div>
    <textarea class="code-editor" spellcheck="false"></textarea>
  </div>
  <div class="playground-output-wrapper">
    <div class="playground-output-header">Resultado</div>
    <pre class="playground-console output-console">Esperando validación...</pre>
  </div>
</div>

---

## 🟡 Reto 4: Número par o impar

**Nivel:** Fácil · **Tema:** [JavaScript básico](../capitulos/04-javascript.md)

**Objetivo:** Crea una función `esPar(n)` que devuelva `true` si el número es par, `false` si es impar.

<div class="playground-container" data-reto="reto4">
  <div class="playground-editor-wrapper">
    <div class="playground-header">
      <select class="playground-lang-select">
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
      </select>
      <button class="playground-run-btn validate-btn">✅ Validar</button>
    </div>
    <textarea class="code-editor" spellcheck="false"></textarea>
  </div>
  <div class="playground-output-wrapper">
    <div class="playground-output-header">Resultado</div>
    <pre class="playground-console output-console">Esperando validación...</pre>
  </div>
</div>

---

## 🟡 Reto 5: Máximo de un array

**Nivel:** Medio · **Tema:** [JavaScript básico](../capitulos/04-javascript.md)

**Objetivo:** Crea una función `maximo(numeros)` que devuelva el número más grande de un array.

<div class="playground-container" data-reto="reto5">
  <div class="playground-editor-wrapper">
    <div class="playground-header">
      <select class="playground-lang-select">
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
      </select>
      <button class="playground-run-btn validate-btn">✅ Validar</button>
    </div>
    <textarea class="code-editor" spellcheck="false"></textarea>
  </div>
  <div class="playground-output-wrapper">
    <div class="playground-output-header">Resultado</div>
    <pre class="playground-console output-console">Esperando validación...</pre>
  </div>
</div>

---

<script>
document.addEventListener('DOMContentLoaded', () => {
  const tests = {
    reto1: {
      js: {
        template: `function sumar(a, b) {\n  // Escribe tu solución aquí\n  \n}`,
        nombre: 'sumar',
        casos: [
          { args: [2, 3], esperado: 5 },
          { args: [-1, 1], esperado: 0 },
          { args: [10, 0], esperado: 10 },
          { args: [1.5, 2.5], esperado: 4 }
        ]
      },
      python: {
        template: `def sumar(a, b):\n    # Escribe tu solución aquí\n    pass`,
        nombre: 'sumar',
        casos: [
          { args: [2, 3], esperado: 5 },
          { args: [-1, 1], esperado: 0 },
          { args: [10, 0], esperado: 10 },
          { args: [1.5, 2.5], esperado: 4 }
        ]
      }
    },
    reto2: {
      js: {
        template: `function revertir(texto) {\n  // Escribe tu solución aquí\n  \n}`,
        nombre: 'revertir',
        casos: [
          { args: ["hola"], esperado: "aloh" },
          { args: ["abc"], esperado: "cba" },
          { args: [""], esperado: "" },
          { args: ["12345"], esperado: "54321" }
        ]
      },
      python: {
        template: `def revertir(texto):\n    # Escribe tu solución aquí\n    pass`,
        nombre: 'revertir',
        casos: [
          { args: ["hola"], esperado: "aloh" },
          { args: ["abc"], esperado: "cba" },
          { args: [""], esperado: "" },
          { args: ["12345"], esperado: "54321" }
        ]
      }
    },
    reto3: {
      js: {
        template: `function contarVocales(texto) {\n  // Escribe tu solución aquí\n  \n}`,
        nombre: 'contarVocales',
        casos: [
          { args: ["hola"], esperado: 2 },
          { args: ["programacion"], esperado: 5 },
          { args: ["xyz"], esperado: 0 },
          { args: ["AEIOU"], esperado: 5 }
        ]
      },
      python: {
        template: `def contar_vocales(texto):\n    # Escribe tu solución aquí\n    pass`,
        nombre: 'contar_vocales',
        casos: [
          { args: ["hola"], esperado: 2 },
          { args: ["programacion"], esperado: 5 },
          { args: ["xyz"], esperado: 0 },
          { args: ["AEIOU"], esperado: 5 }
        ]
      }
    },
    reto4: {
      js: {
        template: `function esPar(n) {\n  // Escribe tu solución aquí\n  \n}`,
        nombre: 'esPar',
        casos: [
          { args: [2], esperado: true },
          { args: [3], esperado: false },
          { args: [0], esperado: true },
          { args: [-4], esperado: true }
        ]
      },
      python: {
        template: `def es_par(n):\n    # Escribe tu solución aquí\n    pass`,
        nombre: 'es_par',
        casos: [
          { args: [2], esperado: true },
          { args: [3], esperado: false },
          { args: [0], esperado: true },
          { args: [-4], esperado: true }
        ]
      }
    },
    reto5: {
      js: {
        template: `function maximo(numeros) {\n  // Escribe tu solución aquí\n  \n}`,
        nombre: 'maximo',
        casos: [
          { args: [[1, 5, 3]], esperado: 5 },
          { args: [[-1, -5, -3]], esperado: -1 },
          { args: [[10]], esperado: 10 },
          { args: [[2, 2, 2]], esperado: 2 }
        ]
      },
      python: {
        template: `def maximo(numeros):\n    # Escribe tu solución aquí\n    pass`,
        nombre: 'maximo',
        casos: [
          { args: [[1, 5, 3]], esperado: 5 },
          { args: [[-1, -5, -3]], esperado: -1 },
          { args: [[10]], esperado: 10 },
          { args: [[2, 2, 2]], esperado: 2 }
        ]
      }
    }
  };

  // Inicializar cada playground
  document.querySelectorAll('.playground-container').forEach(container => {
    const retoId = container.dataset.reto;
    const editor = container.querySelector('.code-editor');
    const select = container.querySelector('.playground-lang-select');
    const btn = container.querySelector('.validate-btn');
    const output = container.querySelector('.output-console');

    // Cargar código guardado o template
    function cargarCodigo() {
      const lang = select.value;
      const guardado = localStorage.getItem(`playground_${retoId}_${lang}`);
      editor.value = guardado || tests[retoId][lang].template;
    }

    cargarCodigo();

    // Guardar al escribir
    editor.addEventListener('input', () => {
      const lang = select.value;
      localStorage.setItem(`playground_${retoId}_${lang}`, editor.value);
    });

    // Cambiar lenguaje
    select.addEventListener('change', cargarCodigo);

    // Validar
    btn.addEventListener('click', async () => {
      const lang = select.value;
      const test = tests[retoId][lang];
      const codigoUsuario = editor.value;

      output.textContent = '⏳ Validando...';
      output.style.color = '#94a3b8';

      let codigoCompleto = '';
      if (lang === 'javascript') {
        codigoCompleto = codigoUsuario + '\n\n';
        codigoCompleto += 'const __resultados = [];\n';
        test.casos.forEach((caso, i) => {
          const argsStr = JSON.stringify(caso.args);
          const esperadoStr = JSON.stringify(caso.esperado);
          codigoCompleto += `try { const __r = JSON.stringify(${test.nombre}(...${argsStr})); __resultados.push({ i: ${i}, ok: __r === ${JSON.stringify(esperadoStr)}, obtenido: __r }); } catch(e) { __resultados.push({ i: ${i}, ok: false, error: e.message }); }\n`;
        });
        codigoCompleto += 'console.log(JSON.stringify(__resultados));\n';
      } else if (lang === 'python') {
        codigoCompleto = codigoUsuario + '\n\n';
        codigoCompleto += 'import json\n__resultados = []\n';
        test.casos.forEach((caso, i) => {
          const argsStr = JSON.stringify(caso.args).replace(/true/g, 'True').replace(/false/g, 'False').replace(/null/g, 'None');
          const esperadoStr = JSON.stringify(caso.esperado).replace(/true/g, 'True').replace(/false/g, 'False').replace(/null/g, 'None');
          codigoCompleto += `try:\n    __r = json.dumps(${test.nombre}(*${argsStr}))\n    __resultados.append({"i": ${i}, "ok": __r == json.dumps(${esperadoStr}), "obtenido": __r})\nexcept Exception as e:\n    __resultados.append({"i": ${i}, "ok": False, "error": str(e)})\n`;
        });
        codigoCompleto += 'print(json.dumps(__resultados))\n';
      }

      try {
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language: lang,
            version: lang === 'javascript' ? '18.15.0' : '3.10.0',
            files: [{ content: codigoCompleto }]
          })
        });

        const data = await response.json();
        
        if (data.run.stderr && !data.run.stdout) {
          output.textContent = '❌ Error en tu código:\n' + data.run.stderr;
          output.style.color = '#ef4444';
          return;
        }

        const resultados = JSON.parse(data.run.stdout.trim());
        const fallos = resultados.filter(r => !r.ok);

        if (fallos.length === 0) {
          output.textContent = `🎉 ¡Correcto! Todos los tests han pasado (${test.casos.length}/${test.casos.length}).`;
          output.style.color = '#4ade80';
        } else {
          let msg = `❌ ${fallos.length} de ${test.casos.length} tests fallaron:\n\n`;
          fallos.forEach(f => {
            const caso = test.casos[f.i];
            msg += `❌ Test ${f.i+1}: ${test.nombre}(${JSON.stringify(caso.args)})\n`;
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