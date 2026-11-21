# 🎓 Certificate of Completion

!!! quote "Your effort deserves recognition"
    Completing all **38 chapters** of the book is no small feat. That is why, once you finish, you can generate a **personalized PDF certificate** with your name and completion date.

---

## 🎯 What is this certificate?

It is a **symbolic recognition** that you have completed the Web Developer Book. It carries no official academic or professional accreditation, but you can:

- Include it in your **portfolio** as evidence of self-directed learning.
- Add it to your **LinkedIn** profile under education/certifications.
- Share it on **social media** to celebrate your milestone.
- Print it and frame it on your wall (if that is your style).

!!! warning "Not an official credential"
    This certificate **does not replace** an official degree or qualification. It is a recognition from this project, not from an educational institution. If you need an officially recognized credential, look into accredited programs (such as freeCodeCamp, Meta, Google, or Microsoft).

---

## ✅ Requirements to unlock it

To unlock the certificate, you need to:

1. **Complete all 38 chapters** of the book.
2. **Mark each chapter as completed** at the bottom of its page.
3. **Solve at least 30 exercises** (optional, but recommended).
4. **Complete at least 3 weekly challenges** (optional).

!!! tip "Your progress is saved in your browser"
    Completed chapters are stored via `localStorage`. Clearing your browser data will erase your progress. Switching devices does **not** sync progress (yet).

---

## 📊 Your current progress

<div class="certificado-progreso" id="certificado-progreso">
  <div class="certificado-progreso__bar">
    <div class="certificado-progreso__fill" id="certificado-progreso-fill" style="width: 0%"></div>
  </div>
  <p class="certificado-progreso__text" id="certificado-progreso-text">
    Loading progress…
  </p>
</div>

---

## 🎨 Certificate preview

Here is how your certificate will look once unlocked:

<div class="certificado-preview" id="certificado-preview">
  <div class="certificado-preview__border">
    <div class="certificado-preview__content">
      <div class="certificado-preview__logo">📘</div>
      <h2 class="certificado-preview__title">Certificate of Completion</h2>
      <p class="certificado-preview__subtitle">Web Developer Book</p>
      <p class="certificado-preview__text">This certificate is awarded to</p>
      <p class="certificado-preview__name" id="certificado-preview-nombre">Your Name Here</p>
      <p class="certificado-preview__text">for completing all 38 chapters of the book, demonstrating consistency and dedication in learning web development.</p>
      <div class="certificado-preview__footer">
        <div class="certificado-preview__fecha">
          <span class="certificado-preview__label">Date</span>
          <span id="certificado-preview-fecha">October 2026</span>
        </div>
        <div class="certificado-preview__firma">
          <span class="certificado-preview__label">Author</span>
          <span>Manuel Casimiro Carrasco (Urukais)</span>
        </div>
      </div>
    </div>
  </div>
</div>

---

## 🛠 Generate your certificate

Once you have completed the book, fill out the form to generate your personalized certificate:

<form class="certificado-form" id="certificado-form" onsubmit="return false;">
  <div class="certificado-field">
    <label for="certificado-nombre">Your full name <span class="required">*</span></label>
    <input type="text" id="certificado-nombre" name="nombre" required placeholder="E.g.: Jane Doe" maxlength="60">
    <small>This name will appear on the certificate. Enter it just how you want it displayed.</small>
  </div>

  <div class="certificado-field">
    <label for="certificado-fecha">Completion date <span class="required">*</span></label>
    <input type="date" id="certificado-fecha" name="fecha" required>
  </div>

  <div class="certificado-field">
    <label for="certificado-email">Email (optional)</label>
    <input type="email" id="certificado-email" name="email" placeholder="you@email.com">
    <small>Only used to send you the certificate. Never shared with anyone.</small>
  </div>

  <div class="certificado-actions">
    <button type="button" class="md-button md-button--primary" id="certificado-generar">
      🎓 Generate certificate
    </button>
    <button type="button" class="md-button" id="certificado-descargar" disabled>
      ⬇ Download PDF
    </button>
  </div>
</form>

!!! warning "Only available once you finish the book"
    If you try to generate the certificate before completing all 38 chapters, the button stays disabled. This preserves the integrity of the milestone.

---

## 📥 What happens when you generate it?

1. A **PDF** is generated with your name, date, and certificate layout.
2. It downloads automatically to your device.
3. You can **print it** or **share it** on social media.
4. If you filled in the email field, you can also **send it by email**.

!!! tip "Printing tip"
    If you plan to print the certificate, use **A4 landscape** paper and set your printer to no margins. The PDF is already laid out to print without clipping.

---

## 🏆 Share your achievement

Once you generate your certificate, share it! It helps motivate others to finish the book.

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=I%20completed%20the%20Web%20Developer%20Book%20by%20%40urukaisk%20%F0%9F%8E%93%20On%20to%20the%20next%20challenge!&url=https%3A%2F%2Flibro.urukais.com%2Fcertificado%2F" target="_blank" rel="noopener" aria-label="Share on Twitter">
<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
Twitter
</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcertificado%2F" target="_blank" rel="noopener" aria-label="Share on LinkedIn">
<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
LinkedIn
</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=I%20completed%20the%20Web%20Developer%20Book%20%F0%9F%8E%93%20https%3A%2F%2Flibro.urukais.com%2Fcertificado%2F" target="_blank" rel="noopener" aria-label="Share on WhatsApp">
<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
WhatsApp
</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/certificado/" aria-label="Copy link">
<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
Copy link
</button>
</div>

---

## ❓ Frequently asked questions

??? question "Do I have to pay for the certificate?"
    **No.** The certificate is **100% free**, just like the rest of the book. There is no "premium" tier or hidden fee.

??? question "Can I get the certificate without finishing the book?"
    **No.** The certificate only unlocks once you have completed all 38 chapters. This keeps the milestone meaningful. If you try to generate it earlier, the button stays disabled.

??? question "Is the certificate stored on any server?"
    **No.** The PDF is generated **in your browser** using JavaScript. Nothing is sent to any server. Your name and date stay on your device.

??? question "Can I use a handle or nickname instead of my real name?"
    **Yes.** You can enter whatever name you prefer. It is your certificate after all.

??? question "Can I customize the certificate design?"
    **Yes.** The certificate code lives in `docs/assets/js/certificado.js` and `docs/assets/css/certificado.css`. Feel free to customize colors, typography, or copy—it is open source.

??? question "How can someone verify a certificate is authentic?"
    **It cannot be verified.** Without a central server, there is no way to verify authenticity. It is a symbolic recognition, not an official credential. Anyone verifying it will have to take your word for it.

??? question "Can I still get the certificate if I cleared my browser data?"
    If you cleared your browser data, your progress was wiped. You will need to mark the chapters as completed again to unlock the certificate.

---

## 🚀 Haven't finished the book yet?

If you are reading this and have not finished all 38 chapters yet, do not worry. Go at your own pace. The certificate will be waiting when you are done.

[📖 Back to index](index.md){ .md-button .md-button--primary }
[🎯 View my progress](logros.md){ .md-button }

---

**Last updated:** October 2026 · **Author:** [Manuel Casimiro Carrasco (Urukais)](autor.md)
