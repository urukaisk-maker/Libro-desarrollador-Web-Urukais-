# ✉ Contact

!!! quote "Let's Talk"
    Have a question, a suggestion, a collaboration idea, or just want to say hi? Here are all the ways to get in touch. Pick whichever works best for what you need.

---

## 📬 Contact Form

Fill out the fields below and your email app or client will open with the message pre-filled for `urukaisk@gmail.com`.

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

  <button type="submit" class="md-button md-button--primary">✉ Open in my email client</button>
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

    const subject = encodeURIComponent(`[Web Dev Book] ${asunto} — ${nombre}`);
    const body = encodeURIComponent(
      `Name: ${nombre}
` +
      `Email: ${email}
` +
      `Subject: ${asunto}

` +
      `Message:
${mensaje}`
    );

    window.location.href = `mailto:urukaisk@gmail.com?subject=${subject}&body=${body}`;
  });
});
</script>

!!! note "Email client didn't open?"
    If you don't have a desktop email client set up or prefer writing directly from webmail, send your message to [urukaisk@gmail.com](mailto:urukaisk@gmail.com).

---

## 📮 Direct Channels

If you prefer to reach out another way, here are all available channels:

| Channel | Recommended Use | Link |
| :--- | :--- | :--- |
| **📧 Email** | General inquiries, press, and collaborations | [urukaisk@gmail.com](mailto:urukaisk@gmail.com) |
| **🐛 GitHub Issues** | Bugs, typos, and technical suggestions | [Open an issue](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues/new) |
| **💬 GitHub Discussions** | Questions, discussions, and ideas | [Go to Discussions](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/discussions) |
| **🐦 Twitter / X** | Public mentions and sharing content | [@urukaisk](https://x.com/urukais) |
| **💼 LinkedIn** | Professional contact | [Manuel Casimiro Carrasco](https://www.linkedin.com/in/urukais/) |
| **📰 Substack** | Newsletter and updates | [urukaisklick.substack.com](https://urukaisklick.substack.com) |
| **🐙 GitHub** | Code and contributions | [@urukaisk-maker](https://github.com/urukaisk-maker) |

---

## 🎯 What Can You Write About?

### ✅ Yes, write to me if…

- You have a **question about the book's content**.
- You found a **bug, typo, or broken link**.
- You want to **suggest an improvement** or a new topic.
- You want to **propose a collaboration** (translation, guest chapter, etc.).
- You're **press or media** and want to cover the project.
- You'd like me to host a **talk or workshop**.
- You built something using the book and want to **share it**.
- You simply want to **say hello** or thank the project.

### ❌ No, please don't write if…

- It's for **personal tech support** (my time is limited and Stack Overflow is built for that).
- It's to **pitch or sell** something (services, products, SEO, marketing…).
- It's **spam** or automated messages.
- You're asking me to **do your homework** (I don't do assignments, though I can point you in the right direction).

---

## ⏱ Response Times

I'm one person, not a company. Here are rough response times:

| Channel | Response Time |
| :--- | :--- |
| **GitHub Issues** | 24–72 h (business days) |
| **GitHub Discussions** | 24–72 h (business days) |
| **Email** | 2–5 business days |
| **Form** | 2–5 business days |
| **Twitter / X** | Variable (not checked daily) |
| **LinkedIn** | 3–7 business days |

!!! warning "No immediate reply guaranteed"
    This book is a personal project I maintain in my free time. If it takes longer than listed to reply, it doesn't mean I don't care—it just means I'm busy with work, life, or the book itself.

---

## ❓ Before Writing: Is Your Question in the FAQ?

Many common questions are already answered on the [Frequently Asked Questions](faq.md) page. Before messaging me, take a look:

- [Is it free? How is it funded?](faq.md#about-the-project)
- [Who is the book for?](faq.md#about-the-content)
- [How do I contribute?](faq.md#about-contributing)
- [How do I get the certificate?](faq.md#about-achievements-certificate)

If your question isn't in the FAQ, then by all means reach out.

---

## 🤝 Collaborations

If you want to collaborate on the project (translation, guest chapter, sponsorship, talk…), mention it in the form subject or by email. Tell me:

- **Who you are** and what you do.
- **What you're proposing** specifically.
- **Why** you think it fits the project.
- **What you'd need** from me.

!!! tip "Collaboration Replies"
    If your proposal aligns with the project's values (open source, free, and ad-free), I'll gladly get back to you. If it doesn't fit, I'll tell you honestly too.

---

## 🗺 Where I'm Based

I'm from Spain 🇪🇸, though I collaborate with people around the world. Keep that in mind if you're writing from another time zone.

---

## 🔐 Privacy

Your details are **only used to reply to you**. They aren't sold, shared with third parties, or used for spam. If you want me to delete your message after replying, just ask.

For more details, see the [privacy policy](index.md#licencia).

---

## 💬 One Final Thought

> *"A well-written email saves 10 messages."*

If you write to me, help me help you: be specific, explain what you need, and if it's a technical issue, attach screenshots, logs, or failing code. That makes it much easier to give you a fast, useful answer.

---

## ➡ Next Steps

[🐛 Report an issue](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues/new){.md-button .md-button--primary }

[💬 Go to Discussions](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/discussions){.md-button }

[📖 Read the FAQ](faq.md){ .md-button }
