(function () {
  "use strict";

  const STORAGE = "ldw:progress";
  const TOTAL_CAPS = 38, TOTAL_EJS = 30, TOTAL_RETOS = 5;

  const XP = {
    "primer-paso": 10, "bases-html": 30, "principiante-completo": 50,
    "git-master": 15, "api-explorer": 15, "intermedio-completo": 40,
    "typescript": 20, "testing": 20, "avanzado-completo": 80,
    "fullstack": 25, "devops": 25,
    "web-components": 20, "pwa": 20, "websockets": 20, "experto-completo": 100,
    "seguridad": 20, "wasm": 20, "ia-frontend": 20, "elite-completo": 100,
    "playwright": 20, "edge": 20, "ia-generativa": 20, "vanguardia-completo": 150,
    "racha-7": 15, "racha-30": 50,
    "primer-ejercicio": 10, "solucionador": 30,
    "primer-reto": 20, "retos-5": 50,
    "libro-completo": 500, "certificado": 100
  };

  const load = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE)) || { caps: [], ejs: [], retos: [], racha: 0 };
    } catch (e) {
      return { caps: [], ejs: [], retos: [], racha: 0 };
    }
  };

  const save = (d) => {
    try { localStorage.setItem(STORAGE, JSON.stringify(d)); } catch (e) {}
  };

  function rachaUpdate(d) {
    const hoy = new Date().toDateString();
    let last = null;
    try { last = localStorage.getItem("ldw:lastVisit"); } catch (e) {}
    if (last === hoy) return d.racha || 0;
    const ayer = new Date(Date.now() - 864e5).toDateString();
    d.racha = last === ayer ? (d.racha || 0) + 1 : 1;
    try { localStorage.setItem("ldw:lastVisit", hoy); } catch (e) {}
    save(d);
    return d.racha;
  }

  function calcularLogros(d) {
    const caps = new Set(d.caps || []);
    const ejs = new Set(d.ejs || []);
    const retos = new Set(d.retos || []);
    const r = d.racha || 0;
    const on = {};

    on["primer-paso"] = caps.has(1);
    on["bases-html"] = [2, 3, 4].every(n => caps.has(n));
    on["principiante-completo"] = [1, 2, 3, 4, 5, 6].every(n => caps.has(n));
    on["git-master"] = caps.has(7);
    on["api-explorer"] = caps.has(8);
    on["intermedio-completo"] = [7, 8, 9, 10].every(n => caps.has(n));
    on["typescript"] = caps.has(15);
    on["testing"] = caps.has(16);
    on["avanzado-completo"] = [11, 12, 13, 14, 15, 16, 17, 18].every(n => caps.has(n));
    on["fullstack"] = caps.has(19);
    on["devops"] = caps.has(20);
    on["web-components"] = caps.has(21);
    on["pwa"] = caps.has(22);
    on["websockets"] = caps.has(23);
    on["experto-completo"] = [21, 22, 23, 24, 25].every(n => caps.has(n));
    on["seguridad"] = caps.has(26);
    on["wasm"] = caps.has(27);
    on["ia-frontend"] = caps.has(28);
    on["elite-completo"] = [26, 27, 28, 29, 30].every(n => caps.has(n));
    on["playwright"] = caps.has(31);
    on["edge"] = caps.has(33);
    on["ia-generativa"] = caps.has(37);
    on["vanguardia-completo"] = [31, 32, 33, 34, 35, 36, 37, 38].every(n => caps.has(n));
    on["racha-7"] = r >= 7;
    on["racha-30"] = r >= 30;
    on["primer-ejercicio"] = ejs.size >= 1;
    on["solucionador"] = ejs.size >= 10;
    on["primer-reto"] = retos.size >= 1;
    on["retos-5"] = retos.size >= 5;
    on["libro-completo"] = caps.size >= 38;

    let cert = false;
    try { cert = localStorage.getItem("ldw:certificado") === "true"; } catch (e) {}
    on["certificado"] = cert;

    return on;
  }

  function render() {
    const d = load();
    const r = rachaUpdate(d);
    d.racha = r;
    const on = calcularLogros(d);
    const xp = Object.keys(on).reduce((s, k) => s + (on[k] ? XP[k] : 0), 0);
    const totalOn = Object.values(on).filter(Boolean).length;

    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    set("logros-cap-completados", d.caps.length);
    set("logros-ejercicios", d.ejs.length);
    set("logros-retos", d.retos.length);
    set("logros-total", totalOn);
    set("stat-cap", d.caps.length + " / " + TOTAL_CAPS);
    set("stat-ej", d.ejs.length + " / " + TOTAL_EJS);
    set("stat-retos", d.retos.length + " / " + TOTAL_RETOS);
    set("stat-xp", xp + " XP");

    const bar = document.getElementById("logros-progreso-fill");
    if (bar) bar.style.width = Math.round((d.caps.length / TOTAL_CAPS) * 100) + "%";

    let nivel = "🌱 Novato";
    if (xp >= 1500) nivel = "👑 Leyenda";
    else if (xp >= 800) nivel = "💎 Maestro";
    else if (xp >= 400) nivel = "🥇 Profesional";
    else if (xp >= 150) nivel = "🥈 Practicante";
    else if (xp >= 50) nivel = "🥉 Aprendiz";
    set("stat-nivel", nivel);

    document.querySelectorAll("[data-estado]").forEach(el => {
      const key = el.getAttribute("data-estado");
      if (!key) return;
      if (on[key]) {
        el.textContent = "✅";
        const card = el.closest(".logro-card");
        if (card) card.classList.add("logro-card--unlocked");
      } else {
        el.textContent = "🔒";
        const card = el.closest(".logro-card");
        if (card) card.classList.remove("logro-card--unlocked");
      }
    });
  }

  window.ldw = { load: load, save: save, render: render, calcularLogros: calcularLogros };

  function init() {
    // Solo actúa en la página de logros y donde haya botones de capítulo.
    // NO toca enlaces del menú, cabecera, tabs ni ningún <a>.
    render();

    const btnReset = document.getElementById("logros-resetear");
    if (btnReset) {
      btnReset.addEventListener("click", function () {
        if (confirm("¿Seguro? Se borrará todo tu progreso.")) {
          try { localStorage.removeItem(STORAGE); } catch (e) {}
          try { localStorage.removeItem("ldw:lastVisit"); } catch (e) {}
          render();
        }
      });
    }

    const btnExport = document.getElementById("logros-exportar");
    if (btnExport) {
      btnExport.addEventListener("click", function () {
        const blob = new Blob([JSON.stringify(load(), null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "logros-libro-" + Date.now() + ".json";
        a.click();
      });
    }

    const btnImport = document.getElementById("logros-importar");
    if (btnImport) {
      btnImport.addEventListener("click", function () {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/json";
        input.onchange = function (e) {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = function (ev) {
            try {
              save(JSON.parse(ev.target.result));
              render();
              alert("Progreso importado ✅");
            } catch (err) {
              alert("Archivo inválido ❌");
            }
          };
          reader.readAsText(file);
        };
        input.click();
      });
    }

    document.querySelectorAll(".chapter-complete-btn").forEach(function (btn) {
      const num = parseInt(btn.dataset.chapter, 10);
      if (isNaN(num)) return;

      const d = load();
      if (d.caps.indexOf(num) !== -1) {
        btn.classList.add("completed");
        btn.textContent = "✅ Capítulo completado";
      }

      btn.addEventListener("click", function () {
        const d2 = load();
        if (d2.caps.indexOf(num) === -1) {
          d2.caps.push(num);
          save(d2);
          btn.classList.add("completed");
          btn.textContent = "✅ Capítulo completado";
          render();
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();