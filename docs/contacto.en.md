# ✉ Contact

!!! quote "Let's talk"
    Have a question, a suggestion, a collaboration idea, or just want to say hello? Here are all the ways to reach me. Pick whichever fits best.

---

## 📬 Contact form

Fill out the fields below and your email app or client will open with a message ready to send to `urukaisk@gmail.com`.

<form id="mailto-contact-form" class="contact-form">
  <div class="contact-field">
    <label for="nombre">Name <span class="required">*</span></label>
    <input type="text" id="nombre" name="nombre" required placeholder="Your name">
  </div>

  <div class="contact-field">
    <label for="email">Your email <span class="required">*</span></label>
    <input type="email" id="email" name="email" required placeholder="you@email.com">
  </div>

  <div class="contact-field">
    <label for="asunto">Subject <span class="required">*</span></label>
    <select id="asunto" name="asunto" required>
      <option value="">— Select a subject —</option>
      <option value="Question about the content">Question about the content</option>
      <option value="Report an issue">Report an issue</option>
      <option value="Suggestion or improvement">Suggestion or improvement</option>
      <option value="Collaboration proposal">Collaboration proposal</option>
      <option value="Press or media">Press or media</option>
      <option value="Talk or workshop">Talk or workshop</option>
      <option value="Other">Other</option>
    </select>
  </div>

  <div class="contact-field">
    <label for="mensaje">Message <span class="required">*</span></label>
    <textarea id="mensaje" name="mensaje" rows="6" required placeholder="Tell me what you need…"></textarea>
  </div>

  <div class="contact-field contact-checkbox">
    <input type="checkbox" id="privacidad" name="privacidad" required>
    <label for="privacidad">I have read and accept the <a href="index.md#licencia">privacy policy</a>.</label>
  </div>

  <button type="submit" class="md-button md-button--primary">✉ Open in my mail client</button>
</form>

<script>
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("mailto-contact-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const asunto = document.getElementById("asunto").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    const subject = encodeURIComponent(`[Web Book] ${{asunto}} — ${{nombre}}`);
    const body = encodeURIComponent(
      `Name: ${{nombre}}
` +
      `Email: ${{email}}
` +
      `Subject: ${{asunto}}

` +
      `Message:
${{mensaje}}`
    );

    window.location.href = `mailto:urukaisk@gmail.com?subject=${{subject}}&body=${{body}}`;
  });
});
</script>

!!! note "Mail client not opening?"
    If you do not have a mail client configured or prefer to write directly from webmail, send your message to [urukaisk@gmail.com](mailto:urukaisk@gmail.com).

---

## 📮 Direct channels

If you prefer reaching out through another channel, here are all available options:

| Channel | Best for | Link |
| :--- | :--- | :--- |
| **📧 Email** | General inquiries, press, and collaborations | [urukaisk@gmail.com](mailto:urukaisk@gmail.com) |
| **🐛 GitHub Issues** | Bugs, typos, and technical suggestions | [Open an issue](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues/new) |
| **💬 GitHub Discussions** | Questions, discussions, and ideas | [Go to Discussions](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/discussions) |
| **🐦 Twitter / X** | Public mentions and sharing links | [@urukaisk](https://x.com/urukaisk) |
| **💼 LinkedIn** | Professional outreach | [Manuel Casimiro Carrasco](https://www.linkedin.com/in/urukais/) |
| **📰 Substack** | Newsletter and updates | [urukaisklick.substack.com](https://urukaisklick.substack.com) |
| **🐙 GitHub** | Code and contributions | [@urukaisk-maker](https://github.com/urukaisk-maker) |

---

## 🎯 What can you write to me about?

### ✅ Yes, write to me if…

- You have a **question about the book's content**.
- You found a **bug, typo, or broken link**.
- You want to **suggest an improvement** or a new topic.
- You want to **propose a collaboration** (translation, guest chapter, etc.).
- You are **press or media** and want to cover the project.
- You want me to give a **talk or workshop**.
- You built something using the book and want to **share it**.
- You simply want to **say hi** or thank someone.

### ❌ No, please do not write to me if…

- It is a **personal tech support issue** (my time is limited; Stack Overflow is the place for that).
- It is a **sales pitch** (services, products, SEO, marketing…).
- It is **spam** or automated messages.
- You are asking me to **do your homework** (I do not do homework, though I can point you in the right direction).

---

## ⏱ Response times

I am one person, not a company. Here are approximate response times:

| Channel | Typical response time |
| :--- | :--- |
| **GitHub Issues** | 24–72 h (business days) |
| **GitHub Discussions** | 24–72 h (business days) |
| **Email** | 2–5 business days |
| **Form** | 2–5 business days |
| **Twitter / X** | Variable (I do not check it daily) |
| **LinkedIn** | 3–7 business days |

!!! warning "Fast replies are not guaranteed"
    This book is a personal project I maintain in my free time. If I take longer than expected to reply, it does not mean I do not care—it just means I am busy with work, life, or the book itself.

---

## ❓ Before writing: is your question in the FAQ?

Many common questions are already answered on the [FAQ](faq.md) page. Before sending a message, take a quick look:

- [Is it free? How is it funded?](faq.md#sobre-el-proyecto)
- [Who is the book for?](faq.md#sobre-el-contenido)
- [How can I contribute?](faq.md#sobre-contribuir)
- [How do I get the certificate?](faq.md#sobre-los-logros-y-el-certificado)

If your question is not in the FAQ, go ahead and write.

---

## 🤝 Collaborations

If you want to collaborate on the project (translation, guest chapter, sponsorship, talk…), mention it in the form subject or by email. Tell me:

- **Who you are** and what you do.
- **What you are proposing** specifically.
- **Why** you think it fits the project.
- **What you would need** from me.

!!! tip "Collaboration replies"
    If your proposal aligns with the project's values (open source, free, and ad-free), I will gladly reply. If it does not fit, I will tell you honestly too.

---

## 🗺 Where I'm based

I am based in Spain 🇪🇸 and collaborate with people around the world. Keep that in mind if you write from a different time zone.

---

## 🔐 Privacy

Your details **are only used to reply to you**. They are never sold, shared with third parties, or used for spam. If you want me to delete your message after replying, just ask.

For more details, see the [privacy policy](index.md#licencia).

---

## 💬 Final thought

> *"A well-written email saves 10 messages."*

If you write to me, help me help you: be specific, tell me what you need, and if it is a technical issue, include screenshots, logs, or the failing code. With that context I can answer much faster and better.

---

## ➡ Next steps

[🐛 Report an issue](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues/new){ .md-button .md-button--primary }

[💬 Go to Discussions](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/discussions){ .md-button }

[📖 Read the FAQ](faq.md){ .md-button }
