# 💭 Project Philosophy

!!! quote "Why this book exists"
    There is no shortage of tutorials on the internet. What is missing is **structured material that does not leave you hanging halfway through**. This book exists to fill that gap.

It grew out of my own notes. When I was learning, I jotted everything down in a text file. When I was teaching, I reused those notes. Over the years, it became this.

---

## 🎯 Principles

Every decision in this book—what to include, what to leave out, how to explain it—is governed by these seven principles. If you ever spot something that contradicts them, it is a bug and you can [report it](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues/new).

### 🛠 Practical over theoretical

Every concept comes with **code you can run**. There are no filler chapters or abstract theory without application.

!!! example "Real example"
    When we explain `async/await`, we do not stop at saying "it is used to wait for promises." We show a call to a real API, with `try/catch`, error handling, and an example of what happens if you do not use it.

### 📈 Progressive and without jumps

Chapters follow a **smooth curve**. There are no impossible "exercises for the reader" or advanced concepts shoehorned into an introductory chapter.

| Level | What you know at the start | What you know at the end |
| :--- | :--- | :--- |
| 🟢 Beginner | Nothing | Build static web pages with HTML, CSS, and JS |
| 🟡 Intermediate | Basic HTML/CSS/JS | Consume APIs, use Git, deploy to production |
| 🟠 Advanced | Static frontend | TypeScript, testing, frontend architecture |
| 🔴 Professional | Frontend | Full-stack with Node.js, basic DevOps |
| 🟣 Expert | Full-stack | Web Components, PWA, WebSockets, design systems |
| 🔵 Elite | Expert | Security, WebAssembly, AI, WebXR, Web3 |
| 🚀 Cutting Edge | Elite | Edge computing, GraphQL, micro-frontends, generative AI |

### 🌍 Natural, clear English

**No robotic phrasing, no unnecessary buzzwords.** Technical terms that are standard in the industry—such as *callback*, *debounce*, *hoisting*, or *event loop*—are explained, italicized, and used naturally.

!!! tip "Terms we keep in standard form"
    - **callback**: a function passed as an argument to another function
    - **debounce**: a technique to delay the execution of a function
    - **hoisting**: moving variable and function declarations to the top of their scope
    - **event loop**: the JavaScript engine's execution and event queue loop
    - **closure**: a function that remembers its lexical environment

    You can find definitions for each of these in the [glossary](apendices/glosario.md).

### 🧱 No trendy dependencies

We do not depend on a specific framework that will go out of fashion in six months. The fundamentals—**HTML, CSS, and JavaScript**—are the same today as they were ten years ago. Frameworks come and go, while the browser keeps understanding the same core standards.

!!! warning "What you will NOT find here"
    - ❌ "Learn React in 24 hours"
    - ❌ "The ultimate framework that will replace everything else"
    - ❌ "This library will change your life"
    - ✅ "Here is how the DOM works, and how React, Vue, and Svelte use it underneath"
    - ✅ "Here are the fundamentals that do not change, and here are the frameworks you can learn next"

### ♿ Accessible by default

Every example you see here is designed to be accessible. Because **accessibility is not an extra: it is part of the job**.

- All examples use **semantic HTML** (`<nav>`, `<main>`, `<article>`, `<button>` instead of `<div onclick>`)
- Forms include properly associated `<label>` elements
- Colors meet **WCAG AA contrast** (4.5:1 minimum)
- Images include descriptive `alt` text
- Interactive components are **keyboard-navigable**

!!! quote "Accessibility is not a checkbox"
    It is not about "passing" a validator. It is about **anyone**, regardless of their abilities, being able to use what you build. And that starts with writing good HTML from day one.

### 🔓 Open and free

All source code is on [GitHub](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-). You can **copy it, modify it, use it in your projects, or suggest improvements**. The license is MIT: one of the most permissive licenses available.

| You can | You cannot |
| :--- | :--- |
| ✅ Use the content in your projects | ❌ Remove attribution |
| ✅ Modify and adapt it | ❌ Sell it as if it were your own |
| ✅ Share it with anyone | ❌ Use it to cause harm |
| ✅ Contribute improvements | — |

### 🎓 Teach, do not show off

I do not write to prove how much I know, but so that **you learn**. That means:

- Explaining things twice if needed.
- Avoiding unnecessary jargon.
- Acknowledging when something is difficult.
- Not showing off "clever code" if it makes the example more confusing.
- Providing examples that work, rather than "elegant" examples that are hard to follow.

---

## ❌ What you will NOT find here

It is just as important to say what **is** here as what **is not**. So you know what to expect:

- ❌ **Promises to "learn to code in 24 hours"**. This takes time. Months, not days. Anyone telling you otherwise is lying to you.
- ❌ **Courses in disguise**. There is nothing paid behind the scenes. No hidden "pro version."
- ❌ **Ads or affiliate links**. Nobody pays to appear in the recommended resources.
- ❌ **Opinions disguised as facts**. When something is a matter of taste (like "React vs Vue"), it is stated clearly as a personal preference, not a technical fact.
- ❌ **Outdated tutorials**. If something changes in the ecosystem and affects the book, it gets updated. You can check the history in the [Changelog](changelog.md).
- ❌ **Content copied from elsewhere**. All text is original, written from scratch, with custom examples.
- ❌ **Filler**. Every paragraph is there because it adds value. If a chapter can be summarized in half the length, it gets summarized.

---

## 🏗 How it is built

The book is built with **100% open source** and **free** tools. No paid services or expensive infrastructure.

| Tool | Purpose | Alternative if it did not exist |
| :--- | :--- | :--- |
| **MkDocs** | Generate the static site from Markdown | Hugo, Jekyll, Astro |
| **Material for MkDocs** | The theme, which accounts for 80% of the design | Docusaurus, Just the Docs |
| **Markdown** | Write content cleanly and simply | Plain HTML (slower to write) |
| **GitHub Actions** | Deploy automatically on every `push` | Netlify, Vercel, manual CI |
| **GitHub Pages** | Host the site for free | Netlify, Vercel, Cloudflare Pages |
| **Giscus** | Comments anchored to GitHub Discussions | Disqus, Utterances |
| **Mermaid** | Architecture and flow diagrams | Draw.io, Excalidraw, PlantUML |

All source code is public and lives in the [repository](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-). If you want to build your own book with the same structure, you can fork it and get started.

---

## 🤝 A commitment

This book **will not lie to you**. Nor will it sell you hype. When something is difficult, I will tell you. When something takes repeated practice, I will tell you that too. When something requires building projects on your own, I will not tell you that reading alone is enough.

!!! quote "Learning to code is like learning to play an instrument"
    It takes practice, making mistakes, and trying again. There are no shortcuts. No magic pills. No "tricks" that replace hours at the keyboard.

### What I can promise you

- ✅ Every chapter will be written with **clarity**, without unnecessary jargon.
- ✅ Every example **will work** when you copy and paste it.
- ✅ If something changes in the ecosystem, **it will be updated** as soon as possible.
- ✅ There will **never be ads** or paywalls.
- ✅ **Your progress is yours**: it is not sent to any server or shared with anyone.
- ✅ If I make a mistake, **I will fix it** and tell you.

### What I cannot promise you

- ❌ That you will learn in a week. That is not realistic.
- ❌ That reading alone will be enough. It does not work that way.
- ❌ That you will not get frustrated. Frustration is part of the process.
- ❌ That this book is perfect. It has bugs. If you find them, [report them](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues/new).
- ❌ That you will know everything you need when you finish. Learning to code is a lifelong process.

---

## 🧭 On the "best" language, framework, or tool

One of the most common questions is: **"Which framework is best?"**. The honest answer is: **it depends**.

- **React** is great for dynamic interfaces, but is heavier than Svelte or Solid.
- **Vue** is easier to learn, though it has fewer job openings in some regions.
- **Svelte** compiles to vanilla JavaScript, though its ecosystem is smaller.
- **Angular** is solid for large teams, though its learning curve is steeper.

!!! tip "My advice"
    Learn **JavaScript well** before picking a framework. 80% of what you will do with React, Vue, or Svelte is JavaScript. If you master the language, switching frameworks takes weeks, not months.

The same applies to backend languages: **Node.js** is great for APIs, **Python** for data and AI, **Go** for microservices, **Rust** for extreme performance. There is no single "best" one overall—only the **best one for each use case**.

---

## 🌱 Project sustainability

This book is not a sprint: it is a marathon. Because of that:

- **There are no release deadlines**. Chapters are published when they are ready, not on an artificial schedule.
- **There is no growth pressure**. Whether 10 people or 10,000 read it, the project stays the same.
- **There is no team**. It is just me, with help from the community. If you want to [contribute](contribuir.md), you are welcome.
- **There is no rush**. I prefer one well-written chapter a month over a mediocre one every week.
- **No aggressive monetization**. If the project ever generates revenue, it will be reinvested into the book itself.

!!! note "Want to help?"
    There are many ways to contribute without writing code: reporting bugs, suggesting improvements, sharing the book, starring the repository on GitHub. Everything counts. You can read the details on the [Contribute](contribuir.md) page.

---

## 🔮 Future of the project

These are the ideas I have in mind for the coming months. Not all of them will happen, and priorities may shift. Still, they give you a sense of where this is heading:

- [ ] **English translation** with `mkdocs-static-i18n` (in progress).
- [ ] **More interactive labs** with StackBlitz and CodeSandbox.
- [ ] **Verifiable certificates** with QR codes.
- [ ] **Account system** to sync achievements across devices.
- [ ] **"Read-only" mode** for distraction-free printing.
- [ ] **Semantic search** with embeddings (experimental).
- [ ] **Guest chapters** by other community authors.

!!! tip "Have an idea?"
    If you think something important is missing, open an [issue on GitHub](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues/new) with the `enhancement` label. Community ideas are reviewed every week.

---

## 💬 Final reflection

> "The best way to learn is to teach."

This book is my way of teaching. It is what I wish I had found when I started out. If it helps you, it has already been worth it.

And if you ever write your own, let me know—I would love to read it.

**Last updated:** October 2026 · **Author:** [Manuel Casimiro Carrasco (Urukais)](autor.md)
