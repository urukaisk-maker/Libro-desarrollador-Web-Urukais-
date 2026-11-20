---
description: "Solved exercise 07: 07 — Git. Step-by-step annotated solution from the Web Developer's Book."
---
# 07 — Git

!!! quote "Solved exercise"
    Practice basic Git commands.

---

## 🎯 Goal

Simulate the basic Git workflow:

1. Initialize a repository.
2. Create an `index.html` file.
3. Make a commit.
4. Create a `feature` branch.
5. Add a `style.css` file and commit it.
6. Merge the branch into `main`.

---

## 💡 Solution

```bash
# 1. Initialize
git init
git config user.name "Your Name"
git config user.email "you@email.com"

# 2. Create file and commit
echo "<h1>Hello</h1>" > index.html
git add index.html
git commit -m "feat: add index.html"

# 3. Branch
git checkout -b feature

# 4. Add CSS
echo "h1 { color: red; }" > style.css
git add style.css
git commit -m "feat: add styles"

# 5. Switch back to main and merge
git checkout main
git merge feature
```

---

## 🧠 Key Concepts

- `git init`: creates an empty repository.
- `git add`: stages changes.
- `git commit -m`: creates a commit.
- `git checkout -b`: creates and switches to a branch.
- `git merge`: merges branches.

---

## 🚀 Extra Challenges

- [ ] Push the repository to GitHub with `git remote add` and `git push`.
- [ ] Create a merge conflict and resolve it.
- [ ] Use `git log --oneline --graph` to inspect the history.

---

[← Exercise 06](06-formularios.md){ .md-button }
[Go to exercise 08 →](08-apis.md){ .md-button .md-button--primary }