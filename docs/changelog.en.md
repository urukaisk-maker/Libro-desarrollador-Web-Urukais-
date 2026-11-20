# 📝 Changelog

!!! quote "Change History"
    All notable changes to the **Web Developer's Book** (*Libro del Desarrollador Web*) are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project adheres to [Semantic Versioning](https://semver.org/).

---

## 🏷 Change Types

| Badge | Meaning |
| :--- | :--- |
| 🆕 `Added` | New feature, chapter, or resource |
| 🔧 `Changed` | Change in existing functionality |
| 🐛 `Fixed` | Bug fixes |
| 🗑 `Removed` | Removed feature or content |
| 🔒 `Security` | Vulnerability fixes |
| 📝 `Documentation` | Documentation improvements |
| 🎨 `Style` | Visual or design changes |
| ⚡ `Performance` | Speed or efficiency improvements |

---

## [Unreleased]

### 🆕 Added
- Music page for coding with embedded YouTube playlists.
- [Press and Media](prensa.md) page with a full press kit.
- [Contact](contacto.md) page with form and direct channels.
- [About the Author](autor.md) page with biography, stack, and projects.
- [Frequently Asked Questions](faq.md) page with over 40 questions.
- [Contribute](contribuir.md) page with technical guide and templates.
- Expanded [Acknowledgements](agradecimientos.md) page.
- Expanded [Glossary](apendices/glosario.md) page from ~35 to ~90 terms.
- Interactive quiz system inside chapters.
- Social sharing buttons at the bottom of each chapter.

### 🔧 Changed
- Single-line header redesign (logo + title + Explore + search + repo).
- "Explore" mega-menu integrated into the header (previously on the tabs bar).
- Premium 5-column footer with top accent bar.
- Overall site accessibility improvements.

### 🐛 Fixed
- Mega-menu visible on mobile (now properly hidden via CSS and JS).
- FullCalendar CSS MIME error (non-existent URL removed).
- Quirks Mode caused by missing `<!DOCTYPE html>` in `main.html`.
- Footer order in the DOM.
- Broken links across several chapters.

### 🎨 Style
- Unified color palette (purple `#6a5acd` + cyan `#00bcd4`).
- Inter + JetBrains Mono typography.
- Dark mode with WCAG AA contrast.
- Subtle hover animations on links and cards.

### ⚡ Performance
- Lazy loading on images and YouTube iframes.
- Critical CSS inlined in the header.
- Removal of unused dependencies.

---

## [1.0.0] — 2026-10-18

### 🎉 Initial Release

First public release of the book, with all foundational content.

### 🆕 Added
- **38 chapters** organized across **7 levels**:
  - 🟢 Beginner (chapters 01–06)
  - 🟡 Intermediate (chapters 07–10)
  - 🟠 Advanced (chapters 11–18)
  - 🔴 Professional (chapters 19–20)
  - 🟣 Expert (chapters 21–25)
  - 🔵 Elite (chapters 26–30)
  - 🚀 Cutting-edge (chapters 31–38)
- **30 solved exercises** with annotated solutions.
- **14 Mermaid diagrams** for architecture and flow.
- **5 weekly challenges** with automated validation.
- **Achievement system** using `localStorage`.
- **Interactive quizzes** at the end of each chapter.
- **Live code editors** with sandboxed iframes.
- **StackBlitz labs** for Node.js.
- **Giscus comments** backed by GitHub Discussions.
- **Dark and light mode** with persistence.
- **Installable PWA** with offline support.
- **Printable version** in PDF.
- **Search** with suggestions and highlighting.
- **Ctrl+K shortcut** for quick search.
- **Reading progress** top bar.
- **Newsletter** with subscription modal.
- **Cookie banner** compliant with GDPR.

### 🎨 Style
- Premium design with glassmorphism and gradients.
- Inter + JetBrains Mono typography.
- Dark mode with adapted palette.
- Subtle hover animations.
- Responsive layout (mobile, tablet, desktop).

### 🔧 Infrastructure
- **MkDocs + Material for MkDocs** as static site generator.
- **GitHub Actions** for automated deployment.
- **GitHub Pages** for hosting.
- **Custom domain**: `libro.urukais.com`.
- **Google Analytics 4** for analytics.
- **Google Search Console** for SEO.

---

## [0.9.0] — 2026-10-10

### 🆕 Added
- First 20 chapters of the book.
- Basic tab navigation system.
- Search via `mkdocs-material` search.
- Dark mode.

### 🐛 Fixed
- Broken links in the index.
- Typos in chapters 01–05.

---

## [0.5.0] — 2026-09-25

### 🆕 Added
- Initial project structure.
- First 10 chapters at the beginner level.
- MkDocs configuration.
- GitHub repository.

### 🎨 Style
- Material theme with default colors.
- Basic sidebar navigation.

---

## [0.1.0] — 2026-09-01

### 🎉 First Commit

- Repository creation.
- `README.md` file with project description.
- Initial notes in `docs/`.

---

## 📅 Release Schedule

| Version | Date | Milestones |
| :--- | :--- | :--- |
| **1.1.0** | *Coming soon* | English localization (i18n) |
| **1.2.0** | *Coming soon* | Account system and achievement sync |
| **1.3.0** | *Coming soon* | Verifiable certificates with QR |
| **2.0.0** | *Coming soon* | Full site redesign |

!!! note "No Fixed Dates"
    Dates for upcoming releases are **estimates**. The project is maintained in the author's free time, so priorities may shift. The only dates guaranteed are those of **already released** versions.

---

## 🔗 Useful Links

- **Repository**: [GitHub](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-)
- **Commits**: [Full history](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/commits/master)
- **Releases**: [GitHub Releases](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/releases)
- **Issues**: [Open issues](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues)
- **Roadmap**: [Project Roadmap](roadmap.md)

---

## 🤝 How to Contribute to the Changelog

If you make a notable change (new chapter, bug fix, design improvement), add an entry to the Changelog under `[Unreleased]`. Follow this format:

```markdown
### 🆕 Added
- Brief description of the change.
```
