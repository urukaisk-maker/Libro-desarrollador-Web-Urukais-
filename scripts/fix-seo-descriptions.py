#!/usr/bin/env python3
"""
fix-seo-descriptions.py
Corrige las descriptions de retos, proyectos e índice de ejercicios
que quedaron sin número o con texto redundante.
"""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"

def replace_description(path: Path, new_description: str):
    content = path.read_text(encoding="utf-8")
    if not content.startswith("---\n"):
        print(f"⚠️  {path.name} — sin frontmatter, saltando")
        return
    # Reemplazar la línea description existente
    new_content = re.sub(
        r"^description\s*:.*$",
        f'description: "{new_description}"',
        content,
        count=1,
        flags=re.MULTILINE
    )
    path.write_text(new_content, encoding="utf-8")
    print(f"✅ {path.name} — {new_description[:80]}…")

# ---------- RETOS ----------
retos_titulos = {
    1: "El botón camaleón",
    2: "Tarjeta de presentación",
    3: "Contador de clics",
    4: "Galería responsive",
    5: "Validador de formulario",
}
for num, titulo in retos_titulos.items():
    path = DOCS / "retos" / f"reto-{num}.md"
    if path.exists():
        desc = f"Reto {num}: {titulo}. Practica tus habilidades de desarrollo web con este desafío del Libro del Desarrollador Web."
        replace_description(path, desc[:160])

# ---------- PROYECTOS ----------
proyectos_titulos = {
    1: "Urukais Music — plataforma musical con +150 APIs",
    2: "Remedios Naturales — Urukais Klick",
    3: "Felices Fiestas 2025/26",
    4: "Git & GitHub — Experiencia Inmersiva",
    5: "Pardo Agenda — calendario interactivo",
    6: "Los Guardianes Silenciosos",
    7: "Urukais Klick — Metal & Tech",
}
for num, titulo in proyectos_titulos.items():
    path = DOCS / "proyectos" / f"proyecto-{num}.md"
    if path.exists():
        desc = f"Proyecto {num}: {titulo}. Tutorial paso a paso del Libro del Desarrollador Web."
        replace_description(path, desc[:160])

# ---------- ÍNDICES ----------
indices = {
    "ejercicios/index.md": "Ejercicios resueltos del Libro del Desarrollador Web: 30 soluciones comentadas paso a paso para practicar HTML, CSS, JavaScript y más.",
    "retos/index.md": "Retos semanales del Libro del Desarrollador Web: 5 desafíos prácticos con validación automática para mejorar tus habilidades.",
    "apendices/index.md": "Apéndices del Libro del Desarrollador Web: glosario, chuletas rápidas y recursos por nivel.",
    "proyectos/index.md": "Proyectos del Libro del Desarrollador Web: tutoriales paso a paso para construir aplicaciones reales.",
}
for rel, desc in indices.items():
    path = DOCS / rel
    if path.exists():
        replace_description(path, desc[:160])

print("\n🎉 Correcciones aplicadas.")