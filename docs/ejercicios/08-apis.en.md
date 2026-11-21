---
description: "Solved exercise 08: 08 — APIs. Step-by-step annotated solution from the Web Developer's Book."
---
# 08 — APIs

!!! quote "Solved exercise"
    Practice consuming APIs with `fetch`.

---

## 🎯 Goal

Consume the public JSONPlaceholder API (`https://jsonplaceholder.typicode.com/posts`) and display the titles of the first 5 posts.

---

## 💡 Solution

```html
<h1>Posts</h1>
<ul id="posts"></ul>

<script>
  async function cargarPosts() {
    try {
      const res = await fetch('[https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts)');
      if (!res.ok) throw new Error('HTTP Error ' + res.status);
      const posts = await res.json();

      const lista = document.getElementById('posts');
      posts.slice(0, 5).forEach(post => {
        const li = document.createElement('li');
        li.textContent = post.title;
        lista.appendChild(li);
      });
    } catch (err) {
      console.error('Something went wrong:', err);
    }
  }

  cargarPosts();
</script>
```

---

## 🧠 Key Concepts

- `fetch()`: makes HTTP requests.
- `await`: awaits the response.
- `res.ok`: checks whether the response is successful.
- `res.json()`: parses the response into a JS object.
- `try/catch`: handles network errors.

---

## 🚀 Extra Challenges

- [ ] Display the post body as well.
- [ ] Add a button to reload.
- [ ] Handle the loading state with a `<p>Loading...</p>`.

---

[← Exercise 07](07-git.md){ .md-button }
[Go to exercise 09 →](09-despliegue.md){ .md-button .md-button--primary }