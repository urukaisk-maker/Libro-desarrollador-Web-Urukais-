---
description: "Chapter 20 of the Web Developer's Book: 20 — Frontend DevOps. Learn step by step with examples, exercises, and quizzes."
---
# 20 — Frontend DevOps

!!! abstract "What you will learn"
    - What DevOps is and why it matters for frontend.
    - CI/CD with GitHub Actions.
    - Docker for frontend.
    - Monitoring and logs.
    - Deployment best practices.

---

## 🚀 What is DevOps?

**DevOps** is the culture and set of practices that bring **development** and **operations** together to deliver software faster and with fewer errors. For a frontend developer, it means automating builds, tests, and deployments.

!!! quote "If you do it more than twice, automate it"
    DevOps isn't a tool—it's a way of working: if a manual process repeats, turn it into a script or a workflow.

---

## 🔄 CI/CD

| Concept | What it means |
| :--- | :--- |
| **CI** (Continuous Integration) | Integrating changes frequently, running automated tests |
| **CD** (Continuous Delivery) | Code is always ready to deploy |
| **CD** (Continuous Deployment) | Every change is deployed automatically |

---

## ⚙ GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - run: npm ci
      - run: npm run test
      - run: npm run build

      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

!!! tip "What this workflow does"
    1. Runs on every push to main.
    2. Installs Node.js 20 and dependencies.
    3. Runs the tests.
    4. Builds the project.
    5. Publishes it to GitHub Pages.

---

## 🐳 Docker for Frontend

**Docker** packages your app with all its dependencies so it runs the same way in any environment.

```dockerfile
# Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t mi-frontend .
docker run -p 8080:80 mi-frontend
```

!!! tip "Multi-stage build"
    The Dockerfile above uses two stages: one to build and one to serve. That keeps the final image much smaller (only Nginx + static files).

---

## 📊 Monitoring

| Tool | What it measures |
| :--- | :--- |
| **Sentry** | Production errors with stack traces |
| **LogRocket** | User sessions (screen recording) |
| **Google Analytics 4** | Traffic and behavior |
| **Vercel Analytics** | Real-world Core Web Vitals |
| **UptimeRobot** | Site availability |

```javascript
// Sentry
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://tu-dsn@sentry.io/123",
  environment: "production",
  tracesSampleRate: 0.1
});
```

---

## ✅ Deployment Best Practices

- ✅ **Deploy from main**: don't deploy manually from your local machine.
- ✅ **Run tests before deploying**: if a test fails, don't deploy.
- ✅ **Use environment variables**: never put secrets in code.
- ✅ **Version releases**: use Git tags (`v1.0.0`).
- ✅ **Easy rollback**: be able to revert to the previous version in minutes.
- ✅ **Monitor after deploying**: errors don't report themselves.
- ✅ **Notify the team**: Slack, Discord, or email after each deployment.
- ❌ **Don't deploy on Fridays**: if something breaks, nobody is around to fix it.

---

## 🔐 Environment Variables

```bash
# .env (never push it to GitHub)
VITE_API_URL=[https://api.miapp.com](https://api.miapp.com)
VITE_ANALYTICS_ID=G-XXXXXXX
```

```javascript
// In code
const apiUrl = import.meta.env.VITE_API_URL;
```

```gitignore
# .gitignore
.env
.env.local
.env.*.local
```

!!! warning "Never push .env"
    If you push a .env file with secrets to GitHub, consider them compromised. Rotate them immediately.

---

## 📦 Semantic Versioning

```
MAJOR.MINOR.PATCH
1.2.3
```

| Change | What increments | Example |
| :--- | :--- | :--- |
| **MAJOR** | Breaking changes | 1.0.0 → 2.0.0 |
| **MINOR** | Backward-compatible new feature | 1.0.0 → 1.1.0 |
| **PATCH** | Bug fixes | 1.0.0 → 1.0.1 |

```bash
git tag v1.0.0
git push origin v1.0.0
```

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-20">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> What does CI stand for in CI/CD?</p>
<button class="quiz-option" data-opt="a">A) Code Inspector</button>
<button class="quiz-option" data-opt="b">B) Continuous Integration</button>
<button class="quiz-option" data-opt="c">C) Cloud Infrastructure</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> Which tool automates deployments on GitHub?</p>
<button class="quiz-option" data-opt="a">A) GitHub Actions</button>
<button class="quiz-option" data-opt="b">B) GitHub Pages</button>
<button class="quiz-option" data-opt="c">C) GitHub Issues</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> What does Docker do?</p>
<button class="quiz-option" data-opt="a">A) Minifies code</button>
<button class="quiz-option" data-opt="b">B) Runs tests</button>
<button class="quiz-option" data-opt="c">C) Packages the app and its dependencies into a container</button>
</div>
</div>
<div class="chapter-complete-wrapper">
  <button class="chapter-complete-btn" data-chapter="N">✅ I have completed this chapter</button>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2020%3A%20Frontend%20DevOps&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F20-devops%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F20-devops%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%2020%3A%20Frontend%20DevOps%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F20-devops%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/20-devops/" aria-label="Copy link">Copy link</button>
</div>

---

## 🏆 You Finished the Professional Level!

If you made it this far, you already know:

- Node.js and Express for building APIs
- Prisma and PostgreSQL for databases
- JWT authentication
- CI/CD with GitHub Actions
- Docker for frontend
- Monitoring and deployment best practices

!!! quote "Congratulations"
    You moved from frontend to full-stack. Now comes the **Expert Level**: Web Components, PWA, WebSockets, advanced animations, and design systems.

---

## ➡ Next Step

[Go to Chapter 21 — Web Components](21-web-components.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }