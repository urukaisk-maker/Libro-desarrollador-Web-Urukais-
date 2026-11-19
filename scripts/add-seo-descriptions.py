#!/usr/bin/env python3
"""
add-seo-descriptions.py
Añade una meta description única a cada capítulo/ejercicio si no la tiene.
Uso: python scripts/add-seo-descriptions.py
"""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"

# Plantillas de description por nivel (puedes personalizar)
TEMPLATES = {
    "capitulos": "Capítulo {num} del Libro del Desarrollador Web: {titulo}. Aprende paso a paso con ejemplos, ejercicios y quizzes.",
    "ejercicios": "Ejercicio resuelto {num}: {titulo}. Solución comentada paso a paso del Libro del Desarrollador Web.",
    "retos": "Reto {num}: {titulo}. Practica tus habilidades de desarrollo web con este desafío del Libro del Desarrollador Web.",
    "apendices": "Apéndice: {titulo}. Recurso de referencia del Libro del Desarrollador Web.",
    "proyectos": "Proyecto {num}: {titulo}. Tutorial paso a paso del Libro del Desarrollador Web.",
}

def extract_h1(content: str) -> str:
    """Extrae el primer H1 (# Título) del markdown."""
    match = re.search(r"^#\s+(.+)$", content, re.MULTILINE)
    if match:
        return match.group(1).strip()
    return ""

def has_frontmatter(content: str) -> bool:
    return content.startswith("---\n")

def get_frontmatter_and_body(content: str) -> tuple[str, str]:
    """Devuelve (frontmatter, body). Si no hay frontmatter, frontmatter=''."""
    if not has_frontmatter(content):
        return "", content
    parts = content.split("---\n", 2)
    if len(parts) < 3:
        return "", content
    return f"---\n{parts[1]}---\n", parts[2]

def has_description(frontmatter: str) -> bool:
    return bool(re.search(r"^description\s*:", frontmatter, re.MULTILINE))

def add_description(frontmatter: str, description: str) -> str:
    if not frontmatter:
        return f"---\ndescription: \"{description}\"\n---\n"
    # Añadir antes del cierre ---
    return frontmatter.replace("---\n", f"description: \"{description}\"\n---\n", 1)

def process_file(path: Path, template: str):
    content = path.read_text(encoding="utf-8")
    fm, body = get_frontmatter_and_body(content)

    if has_description(fm):
        print(f"⏭️  {path.name} — ya tiene description")
        return

    titulo = extract_h1(body)
    if not titulo:
        titulo = path.stem.replace("-", " ").title()

    # Detectar número de capítulo del nombre del archivo
    num_match = re.match(r"(\d+)", path.stem)
    num = num_match.group(1) if num_match else ""

    description = template.format(num=num, titulo=titulo)
    # Limitar a ~160 caracteres (estándar SEO)
    if len(description) > 160:
        description = description[:157] + "..."

    new_content = add_description(fm, description) + body
    path.write_text(new_content, encoding="utf-8")
    print(f"✅ {path.name} — {description[:80]}…")

def main():
    folders = {
        "capitulos": DOCS / "capitulos",
        "ejercicios": DOCS / "ejercicios",
        "retos": DOCS / "retos",
        "apendices": DOCS / "apendices",
        "proyectos": DOCS / "proyectos",
    }

    total = 0
    for key, folder in folders.items():
        if not folder.exists():
            continue
        template = TEMPLATES[key]
        print(f"\n📁 {key}/")
        for md_file in sorted(folder.glob("*.md")):
            # Saltar traducciones .en.md por ahora
            if md_file.name.endswith(".en.md"):
                continue
            process_file(md_file, template)
            total += 1

    print(f"\n🎉 Procesados {total} archivos.")

if __name__ == "__main__":
    main()