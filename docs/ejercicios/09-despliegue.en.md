---
description: "Solved exercise 09: 09 — Deployment. Step-by-step annotated solution from the Web Developer's Book."
---
# 09 — Deployment

!!! quote "Solved exercise"
    Practice deploying a static website on GitHub Pages.

---

## 🎯 Goal

1. Create a repository on GitHub.
2. Push an `index.html` file with a "Hello, world".
3. Enable GitHub Pages.
4. Verify that the site is accessible.

---

## 💡 Solution

```bash
# 1. Create local repo
mkdir mi-web && cd mi-web
echo "<h1>Hello, world</h1>" > index.html

# 2. Initialize git
git init
git add index.html
git commit -m "feat: initial version"

# 3. Create remote repo on GitHub and connect
git remote add origin [https://github.com/your-username/mi-web.git](https://github.com/your-username/mi-web.git)
git branch -M main
git push -u origin main
```

**On GitHub**:

1. Settings → Pages.
2. Source: Deploy from a branch.
3. Branch: main, folder / (root).
4. Save.

Your site will be available at `https://your-username.github.io/mi-web/`.

---

## 🧠 Key Concepts

- GitHub Pages hosts static sites for free.
- You need a public repository (or Pro for private ones).
- Branch and folder are configured under Settings → Pages.

---

## 🚀 Extra Challenges

- [ ] Add a custom domain.
- [ ] Add a `CNAME` file.
- [ ] Set up a GitHub Actions workflow to deploy automatically.

---

[← Exercise 08](08-apis.md){ .md-button }
[Go to exercise 10 →](10-proyecto-final.md){ .md-button .md-button--primary }