---
description: "Appendix: 📖 Glossary. Reference resource from the Web Developer's Book."
---
# 📖 Glossary

!!! quote "Essential web development terms"
    Ordered alphabetically. Each term includes a concise definition and, when applicable, a link to the chapter where it is covered in depth.

---

## 🧭 Quick Navigation

[**A**](#a) · [**B**](#b) · [**C**](#c) · [**D**](#d) · [**E**](#e) · [**F**](#f) · [**G**](#g) · [**H**](#h) · [**I**](#i) · [**J**](#j) · [**K**](#k) · [**L**](#l) · [**M**](#m) · [**N**](#n) · [**O**](#o) · [**P**](#p) · [**Q**](#q) · [**R**](#r) · [**S**](#s) · [**T**](#t) · [**U**](#u) · [**V**](#v) · [**W**](#w) · [**X**](#x) · [**Y**](#y) · [**Z**](#z)

---

## A

**Accessibility (a11y)** — The practice of designing websites that anyone can use, including people with visual, hearing, or motor disabilities. Measured against **WCAG** guidelines. → [Chapter 14](../capitulos/14-accesibilidad.md)

**API** — *Application Programming Interface*. A set of rules that lets two programs communicate. On the web, it usually refers to a REST or GraphQL API returning JSON. → [Chapter 8](../capitulos/08-apis.md)

**Async/await** — Modern JavaScript syntax for handling asynchronous operations in a readable way. Built on top of promises under the hood. → [Chapter 12](../capitulos/12-javascript-asincrono.md)

**Attribute** — Extra information added to an HTML tag. For example, `href` in `<a href="...">`.

---

## B

**Backend** — The part of web development that runs on the server (business logic, databases, authentication). → [Chapter 19](../capitulos/19-fullstack-node.md)

**Branch** — An independent line of development within a Git repository. The main branch is commonly named `main` or `master`. → [Chapter 7](../capitulos/07-git.md)

**Bundler** — A tool that packages all files in a project (JS, CSS, images) into a few optimized bundles. Examples: **Vite**, **Webpack**, **esbuild**. → [Chapter 13](../capitulos/13-modulos-bundlers.md)

---

## C

**Callback** — A function passed as an argument to another function that runs after something happens. Widely used in JavaScript before promises.

**CDN** — *Content Delivery Network*. A geographically distributed network of servers that delivers static assets (images, CSS, JS) quickly.

**Closure** — A function that "remembers" the lexical scope in which it was created, even after that outer scope has finished executing. A key concept in JavaScript.

**Commit** — A recorded snapshot of changes in Git history. Each commit has a unique hash and a descriptive message. → [Chapter 7](../capitulos/07-git.md)

**CORS** — *Cross-Origin Resource Sharing*. A security mechanism that allows or blocks requests across different origins.

**CSS** — *Cascading Style Sheets*. The language that defines how a page is presented: colors, typography, layout, animations. → [Chapter 3](../capitulos/03-css-basico.md)

**CSRF** — *Cross-Site Request Forgery*. An attack that tricks an authenticated user's browser into performing unwanted actions on another site.

---

## D

**Debounce** — A technique that delays running a function until a set period passes without the event firing again. Very useful on search inputs.

**Deploy** — Publishing an application to the internet so anyone can access it. → [Chapter 9](../capitulos/09-despliegue.md)

**DevOps** — Practices that combine development and operations to automate deployments and monitoring. → [Chapter 20](../capitulos/20-devops.md)

**DOM** — *Document Object Model*. An in-memory representation of HTML that JavaScript can manipulate. It forms a tree of nodes. → [Chapter 4](../capitulos/04-javascript.md)

---

## E

**ES6** — The sixth edition of ECMAScript (2015), which introduced `let`, `const`, arrow functions, classes, promises, modules, and more.

**Edge Computing** — Running code on distributed servers closer to the user (rather than a single central server) to reduce latency. → [Chapter 33](../capitulos/33-edge-computing.md)

**Event loop** — The mechanism that lets single-threaded JavaScript handle asynchronous operations. Coordinates the call stack, task queue, and microtask queue.

**Event** — An action that happens in the browser (click, keypress, scroll) that JavaScript can listen for and handle.

---

## F

**Fetch** — A native browser API for making HTTP requests. Returns promises. → [Chapter 8](../capitulos/08-apis.md)

**Flexbox** — A one-dimensional CSS layout model, ideal for aligning items in a row or column. → [Chapter 3](../capitulos/03-css-basico.md)

**Framework** — A set of tools and conventions that speed up development. Examples: React, Vue, Angular, Svelte.

**Frontend** — The part of web development that runs in the browser: structure, styling, and interactivity. → [Chapter 1](../capitulos/01-introduccion.md)

---

## G

**Git** — A distributed version control system created by Linus Torvalds in 2005. → [Chapter 7](../capitulos/07-git.md)

**GitHub** — A platform for hosting Git repositories and collaborating on open-source projects.

**GitHub Actions** — GitHub's built-in CI/CD system. Lets you run scripts automatically on every push, PR, or event.

**Grid** — A two-dimensional CSS layout model, ideal for laying out full pages. → [Chapter 3](../capitulos/03-css-basico.md)

---

## H

**Hash** — In Git, a unique identifier for a commit (40 hex characters). Also used in URLs (`#section`) to jump to a section.

**Hoisting** — JavaScript behavior that moves variable (`var`) and function declarations to the top of their enclosing scope.

**HTML** — *HyperText Markup Language*. The markup language that defines the structure of the web. → [Chapter 2](../capitulos/02-html-basico.md)

**HTTP** — *HyperText Transfer Protocol*. The hypertext transfer protocol that forms the foundation of the web.

**HTTPS** — HTTP encrypted with TLS. Mandatory today for any site in production.

---

## I

**i18n** — Short for *internationalization*. The process of preparing an application to support multiple languages.

**IDE** — *Integrated Development Environment*. A code editor with built-in tools (debugger, terminal, version control). Examples: VS Code, WebStorm.

**Index** — A database structure that speeds up lookups. Also, in this book, the home/overview page.

---

## J

**JavaScript** — The programming language that runs in the browser (and also in Node.js). The only language natively understood by all browsers. → [Chapter 4](../capitulos/04-javascript.md)

**JSON** — *JavaScript Object Notation*. A lightweight data-interchange format. The de facto standard for REST APIs.

**JWT** — *JSON Web Token*. A standard for securely transmitting authentication claims between client and server.

---

## K

**Keyword** — A word reserved by the language syntax. In JavaScript: `const`, `let`, `function`, `return`, `if`, `for`…

---

## L

**Layout** — How elements are arranged and positioned on a page.

**LCP** — *Largest Contentful Paint*. A web performance metric measuring when the largest visible content element finishes rendering. Part of **Core Web Vitals**.

**Linter** — A tool that analyzes code for bugs, syntax issues, or bad practices. Example: ESLint.

---

## M

**Markdown** — A lightweight markup language for writing documentation. Used throughout this book.

**Media query** — A CSS rule that applies styles based on viewport size or other device conditions. → [Chapter 5](../capitulos/05-responsive.md)

**Merge** — In Git, combining changes from one branch into another. → [Chapter 7](../capitulos/07-git.md)

**Micro-frontend** — An architecture that splits a large frontend into smaller, independent applications. → [Chapter 36](../capitulos/36-micro-frontends.md)

**MIME type** — The media type declared by the server in the `Content-Type` header (`text/html`, `application/json`, `image/png`…).

---

## N

**Node.js** — A runtime environment that lets you run JavaScript outside the browser, on the server. → [Chapter 19](../capitulos/19-fullstack-node.md)

**npm** — *Node Package Manager*. The package manager for Node.js. The largest software registry in the world.

---

## O

**OAuth** — An authorization protocol that lets an application access resources on another service without sharing passwords.

**ORM** — *Object-Relational Mapping*. A tool that maps between code objects and database tables. Examples: Prisma, Sequelize.

---

## P

**PNG / JPG / SVG / WebP / AVIF** — Image formats. **SVG** is vector-based; the others are raster bitmaps. **WebP** and **AVIF** are modern and compact.

**Promise** — An object representing the eventual completion (or failure) of an asynchronous operation. Can be pending, fulfilled, or rejected.

**Pull request (PR)** — A proposal to merge changes on GitHub. Lets collaborators review code before integrating it. → [Chapter 7](../capitulos/07-git.md)

**PWA** — *Progressive Web App*. A web app that behaves like a native app: installable, offline-capable, with push notifications. → [Chapter 22](../capitulos/22-pwa.md)

---

## Q

**Query** — A request for data. In databases, a SQL statement. In URLs, the part after `?` with parameters (`?q=hello&page=2`).

**Quirks Mode** — A legacy rendering mode triggered by browsers when `<!DOCTYPE html>` is missing. Breaks modern layouts.

---

## R

**React** — A JavaScript library for building user interfaces. Created by Facebook in 2013.

**Rebase** — In Git, rewriting commit history by moving commits from one branch onto a new base. An alternative to `merge`. → [Chapter 7](../capitulos/07-git.md)

**Refactor** — Restructuring existing code without changing its external behavior, to make it cleaner or more maintainable.

**RegEx (regular expression)** — A pattern used to search or replace text. Powerful and often cryptic.

**Repo (repository)** — Where Git stores a project's files and full commit history.

**Responsive** — Design that adapts smoothly to any screen size. → [Chapter 5](../capitulos/05-responsive.md)

**REST** — *Representational State Transfer*. An architectural style for HTTP-based APIs using verbs (`GET`, `POST`, `PUT`, `DELETE`) and resources.

---

## S

**SCSS / Sass** — A CSS preprocessor with variables, nesting, mixins, and functions. Compiles to standard CSS.

**SEO** — *Search Engine Optimization*. Improving visibility in search engines through semantic HTML, metadata, speed, and accessibility.

**Service Worker** — A script that runs in the background in the browser, enabling offline support, caching, and push notifications.

**SPA** — *Single Page Application*. A web app that loads a single HTML page and updates content dynamically with JavaScript without full reloads.

**SSG** — *Static Site Generator*. Builds static HTML sites from Markdown or other source files. MkDocs, Hugo, and Jekyll are examples.

**SSR** — *Server-Side Rendering*. Rendering HTML on the server before sending it to the browser. Improves SEO and initial load time.

**Stack** — The set of technologies used in a project. "Frontend stack" = HTML + CSS + JS + framework.

---

## T

**Tailwind CSS** — A utility-first CSS framework applied directly in HTML markup rather than writing separate stylesheets.

**Terminal** — A command-line interface. On Linux/macOS it's `bash`, `zsh`, or `fish`; on Windows, PowerShell or WSL.

**Testing** — Writing automated checks to verify code works as expected. Types: unit, integration, E2E. → [Chapter 16](../capitulos/16-testing.md)

**TypeScript** — JavaScript with static types. Compiles to plain JavaScript before running. → [Chapter 15](../capitulos/15-typescript.md)

---

## U

**UI** — *User Interface*. What the user sees and interacts with on screen.

**UX** — *User Experience*. How it feels to use a product.

**URL** — *Uniform Resource Locator*. The address of a resource on the web.

---

## V

**Viewport** — The visible area of a web page on a device. Controlled with `<meta name="viewport" content="...">`.

**Virtual DOM** — An in-memory representation of the DOM used by frameworks like React to update the UI efficiently.

**Vite** — A fast build tool and dev server powered by native ES modules. → [Chapter 13](../capitulos/13-modulos-bundlers.md)

---

## W

**WCAG** — *Web Content Accessibility Guidelines*. International web accessibility standards. Levels: A, AA, AAA. → [Chapter 14](../capitulos/14-accesibilidad.md)

**WebAssembly (Wasm)** — A binary instruction format that lets code in languages like C, C++, and Rust run in the browser near native speed. → [Chapter 27](../capitulos/27-webassembly.md)

**Web Components** — A set of native web standards (Custom Elements, Shadow DOM, HTML Templates) for reusable components without frameworks. → [Chapter 21](../capitulos/21-web-components.md)

**WebSocket** — A protocol for full-duplex, real-time communication between client and server. → [Chapter 23](../capitulos/23-websockets.md)

**WebXR** — A set of APIs for virtual reality (VR) and augmented reality (AR) experiences in the browser. → [Chapter 29](../capitulos/29-webxr.md)

**Web3** — A decentralized vision of the web built around blockchain technologies. → [Chapter 30](../capitulos/30-web3.md)

---

## X

**XSS** — *Cross-Site Scripting*. An attack that injects malicious scripts into a web page. Prevented by escaping user input.

**XML** — *eXtensible Markup Language*. A tag-based data format, less common today than JSON.

---

## Y

**YAML** — A human-readable data serialization format. Used by `mkdocs.yml`.

---

## Z

**Zeitgeist** — (Not strictly a technical term, though we like it.) The spirit of the times—what's trending right now in the ecosystem.

---

!!! tip "Missing a term?"
    If you notice a term that belongs here, open a [GitHub issue](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues/new) or submit a pull request with its definition. New terms are added in alphabetical order.

**Last updated:** October 2026