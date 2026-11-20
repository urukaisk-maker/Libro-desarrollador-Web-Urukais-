---
description: "Chapter 07 of the Web Developer's Book: 07 — Git and Version Control. Learn step by step with examples, exercises, and quizzes."
---
# 07 — Git and Version Control

!!! abstract "What you will learn"
    - What version control is and why it is essential.
    - Basic Git commands.
    - How to work with branches.
    - How to connect with GitHub.
    - Resolving merge conflicts.

---

## 🌳 What is Git?

**Git** is a distributed version control system. It keeps a history of all changes in a project, lets you go back in time, work in parallel with others, and merge changes without losing anything.

!!! quote "Without Git, you're lost"
    If you've ever had files like `final-project-v2-for-real-this-time.docx`, Git is the solution. One single history, every change tracked, no duplicates.

---

## ⚙ Initial Setup

```bash
git config --global user.name "Your Name"
git config --global user.email "you@email.com"
git config --global init.defaultBranch main
git config --global core.editor "code --wait"