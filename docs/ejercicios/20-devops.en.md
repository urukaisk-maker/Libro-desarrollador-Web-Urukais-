---
description: "Solved exercise 20: 20 — DevOps. Step-by-step annotated solution from the Web Developer Book."
---
# 20 — DevOps

!!! quote "Solved exercise"
    Practice automation with GitHub Actions.

---

## 🎯 Goal

Create a workflow that runs on every push to `main` and:

1. Installs dependencies.
2. Runs tests.
3. Builds the project.

---

## 💡 Solution

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - run: npm ci
      - run: npm test
      - run: npm run build
```

---

## 🧠 Key concepts

- `on`: events that trigger the workflow.
- `jobs`: tasks that run.
- `steps`: steps inside a job.
- `actions/checkout`: clones the repo.
- `actions/setup-node`: installs Node.js.

---

## 🚀 Bonus challenges

- [ ] Add a deploy step to GitHub Pages.
- [ ] Use a matrix to test on Node 18 and 20.
- [ ] Add a linting step with ESLint.

---

[← Exercise 19](19-fullstack-node.md){ .md-button }
[Back to index](index.md){ .md-button .md-button--primary }
