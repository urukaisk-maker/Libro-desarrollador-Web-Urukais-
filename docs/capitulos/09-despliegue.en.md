---
description: "Chapter 09 of the Web Developer's Book: 09 — Deployment. Learn step by step with examples, exercises, and quizzes."
---
# 09 — Deployment

!!! abstract "What you will learn"
    - What it means to "deploy" a web application.
    - Static hosting vs. dynamic hosting.
    - Recommended platforms: Vercel, Netlify, GitHub Pages, Cloudflare Pages.
    - CI/CD with GitHub Actions.
    - Environment variables, custom domains, and HTTPS.
    - Rollbacks and basic monitoring.

---

## 🚀 What is Deployment?

**Deploying** means publishing your application to a server accessible from the internet. Until then, your site only exists on your computer (`localhost`). When you deploy, it gets a public URL and anyone can visit it.

!!! quote "The storefront analogy"
    Your local project is the **workshop** where you build the display. Deploying is **opening the shop to the public**: setting up the window display on the street, turning on the lights, and hanging the sign.

~~~mermaid
graph LR
    A[Your code] --> B[Git repository]
    B --> C[CI/CD]
    C --> D[Server]
    D --> E[Public URL]
~~~

---

## 🏛 Hosting Types

| Type | What it serves | Examples | Typical cost |
| :--- | :--- | :--- | :--- |
| **Static** | HTML, CSS, JS, images (no backend) | GitHub Pages, Netlify, Cloudflare Pages | Free |
| **Serverless / JAMstack** | Static + on-demand functions | Vercel, Netlify Functions | Free within limits |
| **PaaS** | Node.js, Python, etc. with managed server | Railway, Render, Fly.io | €0–5/month |
| **IaaS / VPS** | Full server (you manage everything) | DigitalOcean, Hetzner, AWS EC2 | €5–20/month |
| **Containers** | Orchestrated Docker | AWS ECS, Google Cloud Run, Fly.io | Pay as you go |

!!! tip "Start with static"
    If your project is HTML + CSS + JS, static hosting is **free, fast, and includes automatic HTTPS**. Step up only when you need a backend.

---

## 🎯 Recommended Platforms

### GitHub Pages (static, free)

Great for documentation, portfolios, and personal projects.

~~~yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/
      - uses: actions/deploy-pages@v4
~~~

!!! warning "No backend"
    GitHub Pages only serves static files. It does not run Node.js, Python, or databases.

### Vercel (Next.js, React, static + functions)

~~~bash
npm i -g vercel
vercel
~~~

- Automatic framework detection (Next.js, Vite, Astro…).
- **Preview deployments** for every PR (temporary URL).
- Serverless functions included.
- Free HTTPS and domain.
- Generous free tier for personal projects.

### Netlify (static + functions)

- Similar to Vercel, very popular for JAMstack.
- Built-in forms (`<form netlify>`).
- Serverless functions in `netlify/functions/`.
- Built-in A/B split testing.

### Cloudflare Pages + Workers

- Global CDN (300+ PoPs).
- Very generous free tier.
- **Workers** for edge logic (see Chapter 33).
- Ideal when combining static assets + edge functions.

### Railway / Render / Fly.io (backend)

- **Railway**: deploy from Git, PostgreSQL included.
- **Render**: similar, free tier spins down when idle.
- **Fly.io**: global Docker containers, very fast.

| I need… | Platform |
| :--- | :--- |
| Just HTML/CSS/JS | GitHub Pages / Netlify |
| Next.js / React | Vercel |
| Edge functions | Cloudflare Pages |
| Node/Python backend | Railway / Render / Fly.io |
| Database + API | Railway / Supabase / Neon |

---

## 🔁 CI/CD with GitHub Actions

**CI/CD** (Continuous Integration / Continuous Deployment) automates the workflow: every `git push` builds, tests, and deploys.

~~~yaml
# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main]
  pull_request:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
~~~

!!! tip "One workflow per responsibility"
    Keep one workflow for **tests** (`ci.yml`) and another for **deploy** (`deploy.yml`). That way you can tell at a glance whether code or deployment failed.

---

## 🔐 Environment Variables and Secrets

**Never** commit keys to the repository. Use environment variables:

~~~javascript
// ❌ Bad
const API_KEY = "sk-abc123...";

// ✅ Good
const API_KEY = process.env.API_KEY;
~~~

### In GitHub Actions

1. Repo → Settings → Secrets and variables → Actions.
2. Add `API_KEY` with its value.
3. Use it in the workflow:

~~~yaml
- run: npm run build
  env:
    API_KEY: ${{ secrets.API_KEY }}
~~~

### In Vercel / Netlify

Configure them in the web dashboard (Settings → Environment Variables). They are injected at build time and runtime.

!!! warning ".env never goes into the repo"
    Add `.env`, `.env.local`, `.env.*.local` to `.gitignore`. If you accidentally push one, **rotate the keys** right away: even if you delete the commit, they remain in Git history.

---

## 🌐 Custom Domain and HTTPS

### Custom Domain

1. Buy the domain (Namecheap, Cloudflare Registrar, etc.).
2. In your platform (Vercel/Netlify), add the domain.
3. Configure DNS records:
   - **A record** → server IP (or `ALIAS`/`ANAME` with some providers).
   - **CNAME** → `www.tudominio.com` pointing to the platform host.

### HTTPS

All modern platforms (Vercel, Netlify, Cloudflare, GitHub Pages) **issue Let's Encrypt certificates automatically**. You don't have to do anything.

If you manage your own server:

~~~bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Issue certificate
sudo certbot --nginx -d tudominio.com -d www.tudominio.com

# Automatic renewal test (cron)
sudo certbot renew --dry-run
~~~

!!! tip "HTTPS is mandatory"
    Beyond security, **Google penalizes sites without HTTPS** in search rankings. Modern browsers also flag them as "Not secure".

---

## 📊 Basic Monitoring

### What to Measure?

| Metric | Tool | Threshold |
| :--- | :--- | :--- |
| Uptime | UptimeRobot, BetterStack | >99.9% |
| JS Errors | Sentry | <0.1% sessions |
| Performance | Lighthouse, WebPageTest | LCP <2.5s |
| Traffic | Google Analytics, Plausible | — |
| Logs | Platform (Vercel Logs, etc.) | — |

### Example with Sentry (production errors)

~~~javascript
import * as Sentry from "@sentry/browser";

Sentry.init({
    dsn: "https://...@sentry.io/...",
    tracesSampleRate: 0.1,
});
~~~

Automatically captures JS errors in the browser and alerts you via email/Slack.

---

## 🔄 Rollback

If a deploy breaks production, you need to **revert to the previous version** in seconds.

| Platform | Rollback |
| :--- | :--- |
| **Vercel** | Dashboard → Deployments → Promote previous |
| **Netlify** | Deploys → Rollback to this deploy |
| **GitHub Pages** | `git revert` + push (rebuild) |
| **Cloudflare Pages** | Deployments → Rollback |
| **VPS** | Docker tag / `git checkout <tag>` |

!!! tip "Version with tags"
    Before each major deploy: `git tag v1.2.0 && git push --tags`. If something breaks, `git checkout v1.2.0` and redeploy. It will save you more than once.

---

## 🏗 Typical Full Pipeline

~~~mermaid
graph LR
    A[git push] --> B[GitHub Actions]
    B --> C[npm test]
    C --> D[npm run build]
    D --> E[Deploy Vercel]
    E --> F[Preview URL]
    F --> G{OK?}
    G -->|Yes| H[Merge to main]
    G -->|No| I[Fix]
    H --> J[Production deploy]
~~~

1. Develop on a branch.
2. `git push` → triggers CI.
3. If it passes, a **preview URL** is generated.
4. Review the preview.
5. Merge into `main` → deploy to production.

---

## 🧪 Practical Exercise

!!! example "Deploy a static site to GitHub Pages"
    Deploy a static site (HTML + CSS) to GitHub Pages using GitHub Actions.

    **Steps:**
    1. Create a repo with `index.html` and `styles.css`.
    2. Create `.github/workflows/deploy.yml` that:
       - Runs on push to `main`.
       - Uses `actions/upload-pages-artifact` to upload the site folder.
       - Uses `actions/deploy-pages` to publish.
    3. Enable GitHub Pages in Settings → Pages → Source: GitHub Actions.
    4. Push and verify the URL `https://tu-usuario.github.io/tu-repo/`.

??? success "Solution"
    ~~~yaml
    name: Deploy Pages
    on:
      push:
        branches: [main]
    permissions:
      contents: read
      pages: write
      id-token: write
    jobs:
      deploy:
        runs-on: ubuntu-latest
        environment:
          name: github-pages
          url: ${{ steps.deployment.outputs.page_url }}
        steps:
          - uses: actions/checkout@v4
          - uses: actions/configure-pages@v5
          - uses: actions/upload-pages-artifact@v3
            with:
              path: "."
          - id: deployment
            uses: actions/deploy-pages@v4
    ~~~

    **Note:** if your site is at the root of the repo, use `path: "."`. If it is built into `dist/`, use `path: "dist"`.

---

## 🧠 Quiz

!!! question "Check what you learned"

??? success "1. What is the difference between static and dynamic hosting?"
    Static hosting only serves files (HTML, CSS, JS, images). Dynamic hosting runs server-side code (Node, Python, etc.) and accesses databases.

??? success "2. What is CI/CD?"
    Continuous Integration / Continuous Deployment. CI: every push builds and tests automatically. CD: if it passes, it deploys automatically.

??? success "3. Why shouldn't you commit `.env` to the repository?"
    Because it contains secrets (API keys, passwords). In Git history they stay forever. Use environment variables on the platform and `.gitignore`.

??? success "4. How does automatic HTTPS work on Vercel/Netlify?"
    The platform issues Let's Encrypt certificates automatically when you add the domain. You don't have to manage anything.

??? success "5. What is a rollback and when do you need it?"
    Reverting to the previously deployed version. You need it when a deploy breaks production and you can't fix it in minutes.

---

## 📚 Resources

- [GitHub Pages — Docs](https://docs.github.com/en/pages)
- [Vercel — Docs](https://vercel.com/docs)
- [Netlify — Docs](https://docs.netlify.com/)
- [Cloudflare Pages — Docs](https://developers.cloudflare.com/pages/)
- [GitHub Actions — Docs](https://docs.github.com/en/actions)
- [Let's Encrypt — Docs](https://letsencrypt.org/docs/)
- [web.dev — Deploy](https://web.dev/learn/pwa/deployment)

---

➡ Next chapter: [10 — Proyecto final](10-proyecto-final.md)


---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-9">
<div class="quiz-question" data-answer="a">
<p><strong>1.</strong> What is CI/CD?</p>
<button class="quiz-option" data-opt="a">A) Continuous integration and continuous deployment</button>
<button class="quiz-option" data-opt="b">B) A programming language</button>
<button class="quiz-option" data-opt="c">C) A type of server</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> Which platform is ideal for a static site?</p>
<button class="quiz-option" data-opt="a">A) GitHub Pages</button>
<button class="quiz-option" data-opt="b">B) AWS EC2</button>
<button class="quiz-option" data-opt="c">C) Heroku</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>3.</strong> Why not commit .env to the repository?</p>
<button class="quiz-option" data-opt="a">A) Because it contains secrets</button>
<button class="quiz-option" data-opt="b">B) Because it is too large</button>
<button class="quiz-option" data-opt="c">C) Because it is not a text file</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%209%3A%20Deployment&url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F09-despliegue%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F09-despliegue%2F" target="_blank" rel="noopener">LinkedIn</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/09-despliegue/" aria-label="Copy link">Copy link</button>
</div>