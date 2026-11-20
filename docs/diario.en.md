# 📰 Development Journal

!!! quote "Behind the scenes"
    A space to share notes, ideas, technical decisions, and the process of creating this book. Unfiltered, no marketing: what works, what doesn't, and why.

---

## 🚀 October 18, 2026 — The Day the Book Came to Life

![My workspace](https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=80)
*My workspace, after weeks of coffee and code.*

Today is a special day. After weeks of work, the book is no longer just an idea. It has **36 chapters**, interactive diagrams, solved exercises, and even an achievements system so you learn by playing.

The idea grew out of my own notes. I realized there was a missing resource in Spanish that wasn't afraid to talk about **architecture, performance, and security**. I wanted to build something I wish I'd had when I started out.

### 🛠 The Stack Behind the Book

For the curious, this book is built with:

| Technology | Purpose |
| :--- | :--- |
| **MkDocs** | Markdown-based static site generator |
| **Material for MkDocs** | The best theme out there, hands down |
| **GitHub Pages** | Free hosting with a custom domain |
| **GitHub Actions** | Automated deployment on every `push` to `master` |
| **Giscus** | Comments powered by GitHub Discussions |
| **Mermaid** | Architecture and flow diagrams in Markdown |
| **FullCalendar** | Schedule events calendar |
| **Google Analytics 4** | Traffic analytics (no third-party cookies) |

!!! tip "All code is open source"
    You can browse the full repository on [GitHub](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-). Every technical decision is documented in the commits.

### 📊 Day One Numbers

- **38 chapters** published
- **7 levels** of progressive difficulty
- **14 diagrams** in Mermaid
- **30 exercises** solved
- **5 active weekly** challenges
- **€0** monthly cost (everything free and open source)

---

## 🧠 October 15, 2026 — When I Decided to Add Quizzes

At first, the book was plain text. And I realized that **reading without practicing gets you nowhere**. So I set out to figure out how to add interactive quizzes without breaking the site.

### ❌ What I Tried That Didn't Work

1. **Embedded Google Forms**: ugly, slow, with Google branding.
2. **NPM quiz libraries**: bloated, with dependencies that broke Material.
3. **External iframes**: didn't adapt to dark mode.

### ✅ What Actually Worked

A bit of **plain JavaScript and CSS**. Each quiz is an HTML block with `data-answer` and `data-opt`, and a global script validates it:

```html
<div class="quiz" data-quiz="capitulo-1">
  <div class="quiz-question" data-answer="b">
    <p>What are the three pillars of web development?</p>
    <button class="quiz-option" data-opt="a">A) Python, Java, and C++</button>
    <button class="quiz-option" data-opt="b">B) HTML, CSS, and JavaScript</button>
    <button class="quiz-option" data-opt="c">C) React, Vue, and Angular</button>
  </div>
</div>
<script>document.querySelectorAll('.quiz-question').forEach(function (q) {
  var answer = q.dataset.answer;
  q.querySelectorAll('.quiz-option').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (q.dataset.done) return;
      if (btn.dataset.opt === answer) {
        btn.classList.add('is-correct');
        q.dataset.done = '1';
      } else {
        btn.classList.add('is-wrong');
      }
    });
  });
});</script>
```