# 💼 Interview Questions

!!! quote "Get ready for your next opportunity"
    A collection of common frontend technical interview questions with detailed answers and code examples, organized by level so you can practice at your pace.

---

## 🎯 How to use this page

1. **Read the question** and try to answer it yourself before opening the solution.
2. **Click the question** to expand the detailed answer.
3. **Practice the example code** in your editor.
4. **Do not memorize**: understand the underlying concept.

!!! tip "Interview tip"
    In a technical interview, how you think matters just as much as the right answer. If you do not know something, say so and explain how you would look it up. Honesty beats pretending.

---

## 🟢 Beginner Level

??? question "What is the difference between let, const, and var?"
    **var**: Function-scoped and hoisted. Can be redeclared. Avoid it in modern code.

    **let**: Block-scoped. Cannot be redeclared in the same scope, but can be reassigned.

    **const**: Block-scoped. Cannot be redeclared or reassigned. Requires initialization.

    ```javascript
    var x = 1;
    let y = 2;
    const z = 3;
    ```

??? question "What is the DOM and what is it used for?"
    The **DOM** (*Document Object Model*) is a tree-like representation of the HTML document built in memory by the browser. It lets JavaScript access and manipulate elements on the page.

    ```javascript
    const title = document.querySelector('h1');
    title.textContent = 'New title';
    ```

??? question "What is an event and how do you handle it in JavaScript?"
    An **event** is an action that happens in the browser—a click, a keypress, a form submit, scrolling, page load… JavaScript can **listen** for these events and run code when they occur.

    ```javascript
    const button = document.querySelector('button');
    button.addEventListener('click', (event) => {
      console.log('Clicked', event.target);
    });
    ```

??? question "What is the difference between == and ===?"
    - **==** compares values after type coercion.
    - **===** compares both value and type (strict equality).

    ```javascript
    5 == '5';   // true
    5 === '5';  // false
    null == undefined;   // true
    null === undefined;  // false
    ```

    **Always use ===** unless you have a clear, justified reason not to.

??? question "What is hoisting?"
    It is JavaScript behavior that **hoists variable and function declarations to the top of their scope**. Function declarations can be called before their definition; `var` variables are hoisted with a value of `undefined` until assignment.

    ```javascript
    console.log(name); // undefined (no error)
    var name = 'Ana';

    greet(); // 'Hello' (works)
    function greet() { console.log('Hello'); }
    ```

??? question "What is a closure and what is it used for?"
    A **closure** is a function that "remembers" the environment in which it was created, even after that outer scope has finished executing. It is commonly used to encapsulate private state.

    ```javascript
    function createCounter() {
      let count = 0;
      return function () {
        count++;
        return count;
      };
    }

    const counter = createCounter();
    console.log(counter()); // 1
    console.log(counter()); // 2
    console.log(counter()); // 3
    ```

---

## 🟡 Intermediate Level

??? question "What is the event loop in JavaScript?"
    The **event loop** is the mechanism that allows JavaScript (which runs on a single thread) to coordinate asynchronous operations. It works with:

    1. **Call stack**: stack of synchronous function calls.
    2. **Task queue**: queue of tasks (macrotasks) such as `setTimeout`.
    3. **Microtask queue**: queue of microtasks such as resolved/rejected promises.

    The event loop drains the call stack, then runs microtasks, then takes macrotasks one by one.

    ```javascript
    console.log('1');
    setTimeout(() => console.log('2'), 0);
    Promise.resolve().then(() => console.log('3'));
    console.log('4');
    // Output: 1, 4, 3, 2
    ```

??? question "What is the difference between a promise and async/await?"
    **Both are the same thing under the hood**: `async/await` is syntactic sugar over promises. The difference is in readability and structure:

    ```javascript
    // With promises
    fetch('/api/user')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));

    // With async/await
    async function load() {
      try {
        const res = await fetch('/api/user');
        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }
    ```

    `async/await` is often easier to read, especially with sequential steps and `try/catch` error handling.

??? question "What is event delegation and why is it useful?"
    It is a technique where you **attach a single event listener to a parent element** instead of attaching one to every child element. It relies on event bubbling.

    ```javascript
    document.querySelector('ul').addEventListener('click', (e) => {
      if (e.target.matches('li')) {
        console.log('Clicked li:', e.target.textContent);
      }
    });
    ```

    **Benefits**: fewer listeners (better memory/performance), works for dynamically added children, and cleaner code.

??? question "What is the difference between localStorage, sessionStorage, and cookies?"
    | Feature | localStorage | sessionStorage | Cookies |
    | :--- | :--- | :--- | :--- |
    | **Persistence** | Persistent | Session only | Configurable |
    | **Capacity** | ~5 MB | ~5 MB | ~4 KB |
    | **Sent to server** | No | No | Yes (with matching requests) |
    | **Accessible from JS** | Yes | Yes | Yes (unless `HttpOnly`) |
    | **Typical uses** | Preferences, achievements | Temporary form state | Auth tokens, tracking |

    ```javascript
    localStorage.setItem('theme', 'dark');
    sessionStorage.setItem('cart', JSON.stringify(items));
    document.cookie = 'user=ana; max-age=3600; path=/';
    ```

??? question "What is event propagation (bubbling and capturing)?"
    When an event happens on an element, it travels through three phases:

    1. **Capturing**: from the document root down to the target element.
    2. **Target**: the event reaches the target element.
    3. **Bubbling**: from the target element back up to the root.

    ```javascript
    // Bubbling (default)
    child.addEventListener('click', () => console.log('child'));
    parent.addEventListener('click', () => console.log('parent'));
    // Click on child → 'child', 'parent'

    // Capturing
    parent.addEventListener('click', () => console.log('parent'), true);
    // Click on child → 'parent', 'child'
    ```

??? question "How does this work in JavaScript?"
    `this` depends on **how a function is called**, not where it is defined. Four common rules:

    ```javascript
    // 1. Object method → the object
    const obj = { name: 'Ana', greet() { console.log(this.name); } };
    obj.greet(); // 'Ana'

    // 2. Standalone function → window (or undefined in strict mode)
    function globalFn() { console.log(this); }
    globalFn(); // window / undefined

    // 3. Arrow function → lexical this from surrounding scope
    const obj2 = {
      name: 'Ana',
      greet: () => console.log(this.name)
    };

    // 4. call/apply/bind → explicitly passed object
    function sayName() { console.log(this.name); }
    sayName.call({ name: 'Luis' }); // 'Luis'
    ```

??? question "What is the module pattern?"
    It is a pattern for encapsulating code and exposing only what is needed, using closures or ES6 modules.

    ```javascript
    // With closure
    const counter = (() => {
      let value = 0;
      return {
        increment: () => ++value,
        get: () => value,
      };
    })();

    counter.increment();
    console.log(counter.get()); // 1

    // With ES6 modules
    export const PI = 3.14;
    export function add(a, b) { return a + b; }
    ```

---

## 🟠 Advanced Level

??? question "What is the Virtual DOM?"
    It is an **in-memory representation of the real DOM**, used by libraries/frameworks like React to batch and minimize direct DOM mutations. When state changes, a new Virtual DOM tree is created, diffed against the previous one, and only the necessary updates are applied to the real DOM.

??? question "What are debounce and throttle?"
    **Debounce**: delays running a function until a specified quiet period has passed without new events. Great for search inputs.

    ```javascript
    function debounce(fn, ms = 300) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
      };
    }
    ```

    **Throttle**: runs a function at most once every `X` ms. Useful for scroll or resize handlers.

    ```javascript
    function throttle(fn, ms = 200) {
      let last = 0;
      return (...args) => {
        const now = Date.now();
        if (now - last >= ms) { last = now; fn(...args); }
      };
    }
    ```

??? question "What is conditional rendering in React?"
    Showing or hiding parts of the UI based on state or props.

    ```jsx
    function Greeting({ user }) {
      return user ? <p>Hello, {user.name}</p> : <p>Hello, guest</p>;
    }
    ```

??? question "What is the React Context API?"
    A way to **share data across the component tree without passing props manually through every intermediate level**.

    ```jsx
    const ThemeContext = React.createContext('light');
    ```

??? question "What are hooks and which ones are most common?"
    **Hooks** are functions in React that let you hook into state and lifecycle/other features inside function components.

    | Hook | Purpose |
    | :--- | :--- |
    | `useState` | Local component state |
    | `useEffect` | Side effects |
    | `useContext` | Consume context |
    | `useRef` | Mutable reference across renders |
    | `useMemo` | Memoize computed values |
    | `useCallback` | Memoize function references |

??? question "What is frontend performance optimization?"
    Improving how fast and smooth a web app feels. Techniques include lazy loading, code splitting, memoization, list virtualization, modern image formats (WebP/AVIF), HTTP caching, and service workers.

??? question "What is web accessibility?"
    Designing websites so **anyone can use them**. Key practices include semantic HTML, descriptive `alt` text, WCAG AA contrast, keyboard navigation, `aria-label`, and visible focus styles.

---

## 🔴 Professional Level

??? question "What is Server-Side Rendering (SSR)?"
    **SSR** renders HTML on the server before sending it to the browser. Benefits: better SEO and faster initial content visibility. Trade-offs: higher server load and extra architectural complexity.

??? question "What is a micro-frontend?"
    An architecture that splits a large frontend into **smaller, independent applications** that teams can build, test, and deploy separately.

??? question "What is hydration in SSR?"
    The process where server-rendered HTML becomes interactive in the client browser by attaching event listeners and hydrating client state.

??? question "How does HTTP caching work?"
    | Header | Role |
    | :--- | :--- |
    | `Cache-Control` | Caching directives |
    | `ETag` | Version identifier for validation |
    | `Last-Modified` | Last modification timestamp |

    Common strategies: hashed static assets → long `max-age`; HTML → `no-cache`; dynamic API responses → `private` or short `max-age`.

??? question "What is CORS and why does it cause errors?"
    **CORS** is a browser security mechanism that controls cross-origin requests. The server must include `Access-Control-Allow-Origin` (and matching headers) to allow the origin.

    ```http
    Access-Control-Allow-Origin: https://libro.urukais.com
    ```

??? question "What is a Content Security Policy (CSP)?"
    An HTTP response header that restricts which resources (scripts, styles, images, frames) the browser is allowed to load or execute—a key defense against XSS.

??? question "How would you improve the performance of a slow website?"
    1. Measure with Lighthouse and Core Web Vitals
    2. Optimize images (WebP/AVIF, proper sizing, lazy loading)
    3. Minify CSS/JS and apply code splitting
    4. Use `font-display: swap` for web fonts
    5. Configure HTTP caching and service workers
    6. Serve static assets through a CDN
    7. Use SSR or SSG when SEO and initial HTML matter
    8. Inline critical CSS

---

## 📊 Interview tips

!!! tip "Before"
    - Research the company and product
    - Practice explaining concepts out loud
    - Prepare thoughtful questions for the interviewer

!!! tip "During"
    - Think before answering
    - Say when you do not know something
    - Walk through your problem-solving process

!!! tip "After"
    - Write down the questions you were asked
    - Ask for feedback when possible
    - Do not over-obsess over a single interview

---

## 📚 Resources

| Resource | Description |
| :--- | :--- |
| [Front-end Interview Handbook](https://github.com/yangshun/front-end-interview-handbook) | Complete guide |
| [JavaScript Questions](https://github.com/lydiahallie/javascript-questions) | 100+ questions |
| [LeetCode](https://leetcode.com/) | Algorithms |
| [Exercism](https://exercism.org/tracks/javascript) | Practice exercises |

---

## ➡ Next steps

[🎮 Go to Playground](playground.md){ .md-button .md-button--primary }
[📝 View solved exercises](ejercicios/index.md){ .md-button }
[🏆 View my achievements](logros.md){ .md-button }
