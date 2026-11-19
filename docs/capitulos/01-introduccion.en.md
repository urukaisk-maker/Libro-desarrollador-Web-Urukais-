# 01 — Introduction to Web Development

!!! abstract "What you'll learn"
    - What web development is and why it matters.
    - The three pillars: **HTML**, **CSS** and **JavaScript**.
    - The difference between **frontend** and **backend**.
    - How a web page works from the moment you request it until you see it.
    - The tools you need to get started.

---

## 🌐 What is web development?

**Web development** is the process of building sites and applications that run in a browser. It's one of the most in-demand disciplines in tech and one of the most accessible: all you need is a computer, a code editor and an internet connection.

!!! quote "The web is the world's biggest showcase"
    Every time you open a page, a team of developers has designed its structure, its style and its behavior. Learning web development means learning to **build that showcase**.

---

## 🏛 The three fundamental pillars

Every modern web page rests on three technologies:

| Pillar | What it does | Analogy |
| :--- | :--- | :--- |
| **HTML** | Defines the **structure** and content | The skeleton |
| **CSS** | Defines the **appearance** (colors, typography, layout) | The skin and clothes |
| **JavaScript** | Defines the **behavior** (interaction, logic) | The muscles |

~~~mermaid
graph LR
    A[Your code] --> B[HTML]
    A --> C[CSS]
    A --> D[JavaScript]
    B --> E[Browser]
    C --> E
    D --> E
    E --> F[Web page]
~~~

!!! tip "Learn in this order"
    First HTML (structure), then CSS (appearance), then JavaScript (behavior). Skipping the order is the #1 cause of frustration when starting out.

---

## ⚖️ Frontend vs Backend

| | **Frontend** | **Backend** |
| :--- | :--- | :--- |
| Where it runs | In the user's **browser** | On the **server** |
| Technologies | HTML, CSS, JavaScript | Node.js, Python, PHP, Java, Go… |
| What it handles | What you **see** and **touch** | Data, logic, security, database |
| Example | A button that changes color | Saving your password in the database |

**Full-stack** = knows how to do both.

---

## 🔄 How a web page works

When you type `https://libro.urukais.com` into the browser, this happens:

~~~mermaid
sequenceDiagram
    participant U as User
    participant N as Browser
    participant D as DNS
    participant S as Server
    U->>N: Types the URL
    N->>D: What IP does libro.urukais.com have?
    D->>N: 185.x.x.x
    N->>S: GET /
    S->>N: HTML, CSS, JS
    N->>U: Renders the page
~~~

1. **DNS**: translates the domain into an IP address.
2. **HTTP request**: the browser asks the server for the files.
3. **Response**: the server returns HTML, CSS and JS.
4. **Rendering**: the browser interprets those files and paints the page.

!!! warning "The browser doesn't run everything the same way"
    HTML and CSS are interpreted (they're not programming languages). JavaScript is **executed** (it has logic: variables, loops, conditions).

---

## 🧰 Tools you need

| Tool | For what | Recommendation |
| :--- | :--- | :--- |
| **Code editor** | Writing the code | VS Code |
| **Modern browser** | Testing and debugging | Chrome / Firefox |
| **Git** | Version control | Git + GitHub |
| **Terminal** | Running commands | Your system's default |

!!! tip "You don't need 20 tools"
    With VS Code and a browser you can start. Everything else is added when you need it.

---

## 👋 Your first "Hello, world"

Create a file called `index.html` with this content:

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My first page</title>
</head>
<body>
    <h1>Hello, world!</h1>
    <p>This is my first web page.</p>
</body>
</html>
~~~

Open it with a double click. You'll see your first page in the browser. **You're now a web developer.** 😄

---

## 🧪 Hands-on exercise

!!! example "Introduce yourself in HTML"
    Create a file called `presentation.html` with:

    - An `<h1>` with your name.
    - A `<p>` with a sentence about you.
    - An `<h2>` with "My goals".
    - A `<ul>` list with 3 things you want to learn.

    Open it in the browser and check that it renders correctly.

??? success "Solution"
    ~~~html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>My presentation</title>
    </head>
    <body>
        <h1>Urukais</h1>
        <p>I'm a web developer and I love teaching.</p>
        <h2>My goals</h2>
        <ul>
            <li>Mastering HTML and CSS</li>
            <li>Learning JavaScript in depth</li>
            <li>Building my own portfolio</li>
        </ul>
    </body>
    </html>
    ~~~

---

## 🧠 Quiz

!!! question "Check what you've learned"

??? success "1. What are the three pillars of web development?"
    HTML (structure), CSS (appearance) and JavaScript (behavior).

??? success "2. What's the difference between frontend and backend?"
    The frontend runs in the browser (what the user sees); the backend runs on the server (data, logic, security).

??? success "3. Is HTML a programming language?"
    No. It's a **markup language**. It has no variables, loops or conditions. JavaScript is a programming language.

??? success "4. What does DNS do when you type a URL?"
    It translates the domain name into the IP address of the server where the page is hosted.

---

## 📚 Resources

- [MDN — Learn web development](https://developer.mozilla.org/en-US/docs/Learn)
- [MDN — Getting started with the web](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web)
- [roadmap.sh — Frontend Developer Roadmap](https://roadmap.sh/frontend)

---

➡️ Next chapter: [02 — Basic HTML](02-html-basico.md)



---

## 🧠 Test your knowledge

<div class="quiz" data-quiz="capitulo-1">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> What are the three pillars of web development?</p>
<button class="quiz-option" data-opt="a">A) HTML, Python, SQL</button>
<button class="quiz-option" data-opt="b">B) HTML, CSS, JavaScript</button>
<button class="quiz-option" data-opt="c">C) React, Vue, Angular</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>2.</strong> Where does the frontend run?</p>
<button class="quiz-option" data-opt="a">A) On the server</button>
<button class="quiz-option" data-opt="b">B) In the database</button>
<button class="quiz-option" data-opt="c">C) In the browser</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>3.</strong> What does DNS do?</p>
<button class="quiz-option" data-opt="a">A) Translates domain to IP</button>
<button class="quiz-option" data-opt="b">B) Stores the database</button>
<button class="quiz-option" data-opt="c">C) Paints the page</button>
</div>
</div>

---

## 📢 Share this chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%201%3A%20Introduction&url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F01-introduccion%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F01-introduccion%2F" target="_blank" rel="noopener">LinkedIn</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/01-introduccion/" aria-label="Copy link">Copy link</button>
</div>