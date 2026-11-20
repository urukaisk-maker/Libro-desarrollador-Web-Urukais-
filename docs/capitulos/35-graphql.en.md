---
description: "Chapter 35 of the Web Developer's Book: 35 — GraphQL. Learn step by step with examples, exercises, and quizzes."
---
# 35 — GraphQL

!!! abstract "What you will learn"
    - What GraphQL is and how it differs from REST.
    - Schema and types.
    - Queries, mutations, and subscriptions.
    - Apollo Client.
    - When to use GraphQL and when not to.

---

## 🔷 What is GraphQL?

**GraphQL** is a query language for APIs created by Facebook. Unlike REST, the client asks for **the exact data it needs**, nothing more and nothing less.

```
REST:     GET /usuarios/1 → returns the ENTIRE user
GraphQL:  query { usuario(id: 1) { nombre } } → only the name
```

!!! quote "Ask for what you need, nothing more"
    With REST, you sometimes get 50 fields when you only need 2. With GraphQL, you ask for those exact 2. That saves bandwidth, especially on mobile.

---

## 📜 Schema

The **schema** defines the available types and operations. It is the contract between client and server.

```graphql
type Usuario {
  id: ID!
  nombre: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  titulo: String!
  contenido: String!
  autor: Usuario!
}

type Query {
  usuarios: [Usuario!]!
  usuario(id: ID!): Usuario
  posts: [Post!]!
}

type Mutation {
  crearUsuario(nombre: String!, email: String!): Usuario!
  crearPost(titulo: String!, contenido: String!, autorId: ID!): Post!
}
```

---

## 🔍 Queries

```graphql
# Get all users with their name
query {
  usuarios {
    id
    nombre
  }
}

# Get a user with their posts
query {
  usuario(id: "1") {
    nombre
    posts {
      titulo
    }
  }
}

# With variables
query GetUsuario($id: ID!) {
  usuario(id: $id) {
    nombre
    email
  }
}
```

---

## ✏ Mutations

```graphql
mutation {
  crearUsuario(nombre: "Ana", email: "ana@ejemplo.com") {
    id
    nombre
  }
}
```

---

## 📡 Subscriptions

**Subscriptions** let you receive real-time data (like WebSockets, but with GraphQL).

```graphql
subscription {
  nuevoPost {
    id
    titulo
    autor {
      nombre
    }
  }
}
```

---

## ⚛ Apollo Client

**Apollo Client** is the most popular library for consuming GraphQL from React, Vue, Svelte, or vanilla JS.

```bash
npm install @apollo/client graphql
```

```jsx
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";

const client = new ApolloClient({
  uri: "[https://api.ejemplo.com/graphql](https://api.ejemplo.com/graphql)",
  cache: new InMemoryCache()
});

const GET_USUARIOS = gql`
  query {
    usuarios {
      id
      nombre
    }
  }
`;

function Usuarios() {
  const { data, loading, error } = useQuery(GET_USUARIOS);
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.usuarios.map((u) => <li key={u.id}>{u.nombre}</li>)}
    </ul>
  );
}
```

---

## 🖥 GraphQL Server with Node.js

```bash
npm install @apollo/server graphql
```

```javascript
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `
  type Usuario {
    id: ID!
    nombre: String!
  }

  type Query {
    usuarios: [Usuario!]!
  }
`;

const resolvers = {
  Query: {
    usuarios: () => [
      { id: "1", nombre: "Ana" },
      { id: "2", nombre: "Luis" }
    ]
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log("Servidor en " + url);
```

---

## ✅ GraphQL vs. REST

| Aspect | REST | GraphQL |
| :--- | :--- | :--- |
| Requests | Multiple endpoints | Single endpoint |
| Data | Overfetching / underfetching | Only what you ask for |
| Versioning | v1, v2... | Schema evolution |
| Learning curve | Low | Medium |
| Caching | HTTP caching | More complex |
| File uploads | Native | Requires multipart |

!!! tip "When to use GraphQL"
    - Many related entities.
    - Mobile with limited bandwidth.
    - Multiple clients (web, iOS, Android).
    - Avoiding overfetching on large APIs.

!!! warning "When NOT to use GraphQL"
    - Simple APIs with few resources.
    - Small teams without prior experience.
    - When HTTP caching is critical.

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-35">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> What is the main advantage of GraphQL over REST?</p>
<button class="quiz-option" data-opt="a">A) It is faster</button>
<button class="quiz-option" data-opt="b">B) The client asks only for the data it needs</button>
<button class="quiz-option" data-opt="c">C) It uses fewer servers</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> Which operation is used to modify data?</p>
<button class="quiz-option" data-opt="a">A) Mutation</button>
<button class="quiz-option" data-opt="b">B) Query</button>
<button class="quiz-option" data-opt="c">C) Subscription</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> Which library is most popular for GraphQL?</p>
<button class="quiz-option" data-opt="a">A) Axios</button>
<button class="quiz-option" data-opt="b">B) Fetch</button>
<button class="quiz-option" data-opt="c">C) Apollo</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2035%3A%20GraphQL&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F35-graphql%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F35-graphql%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%2035%3A%20GraphQL%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F35-graphql%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/35-graphql/" aria-label="Copy link">Copy link</button>
</div>

---

## ➡ Next Step

[Go to Chapter 36 — Micro-frontends](36-micro-frontends.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }