# 35 — GraphQL

!!! abstract "Qué vas a aprender"
    - Qué es GraphQL y en qué se diferencia de REST.
    - Schema y tipos.
    - Queries, mutations y subscriptions.
    - Cliente Apollo.
    - Cuándo usar GraphQL y cuándo no.

---

## 🔷 ¿Qué es GraphQL?

**GraphQL** es un lenguaje de consulta para APIs creado por Facebook. A diferencia de REST, el cliente pide **exactamente los datos que necesita**, ni más ni menos.

```
REST:     GET /usuarios/1 → devuelve TODO el usuario
GraphQL:  query { usuario(id: 1) { nombre } } → solo el nombre
```

!!! quote "Pide lo que necesitas, ni más ni menos"
    Con REST, a veces recibes 50 campos cuando solo necesitas 2. Con GraphQL, pides exactamente esos 2. Eso ahorra ancho de banda, especialmente en móvil.

---

## 📜 Schema

El **schema** define los tipos y operaciones disponibles. Es el contrato entre cliente y servidor.

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
# Obtener todos los usuarios con su nombre
query {
  usuarios {
    id
    nombre
  }
}

# Obtener un usuario con sus posts
query {
  usuario(id: "1") {
    nombre
    posts {
      titulo
    }
  }
}

# Con variables
query GetUsuario($id: ID!) {
  usuario(id: $id) {
    nombre
    email
  }
}
```

---

## ✏️ Mutations

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

Las **subscriptions** permiten recibir datos en tiempo real (como WebSockets, pero con GraphQL).

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

## ⚛️ Cliente Apollo

**Apollo Client** es la librería más popular para consumir GraphQL desde React, Vue, Svelte o vanilla.

```bash
npm install @apollo/client graphql
```

```jsx
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.ejemplo.com/graphql",
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

## 🖥️ Servidor GraphQL con Node.js

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

## ✅ GraphQL vs REST

| Aspecto | REST | GraphQL |
| :--- | :--- |
| Peticiones | Múltiples endpoints | Un solo endpoint |
| Datos | Overfetching / underfetching | Solo lo que pides |
| Versionado | v1, v2... | Evolución del schema |
| Curva | Baja | Media |
| Caching | HTTP caching | Más complejo |
| Subidas de archivos | Nativo | Requiere multipart |

!!! tip "Cuándo usar GraphQL"
    - Muchas entidades relacionadas.
    - Móvil con ancho de banda limitado.
    - Múltiples clientes (web, iOS, Android).
    - Evitar overfetching en APIs grandes.

!!! warning "Cuándo NO usar GraphQL"
    - APIs simples con pocos recursos.
    - Equipos pequeños sin experiencia.
    - Cuando HTTP caching es crítico.

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-35">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué ventaja principal tiene GraphQL sobre REST?</p>
<button class="quiz-option" data-opt="a">A) Es más rápido</button>
<button class="quiz-option" data-opt="b">B) El cliente pide solo los datos que necesita</button>
<button class="quiz-option" data-opt="c">C">Usa menos servidores</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué operación se usa para modificar datos?</p>
<button class="quiz-option" data-opt="a">A) Mutation</button>
<button class="quiz-option" data-opt="b">B) Query</button>
<button class="quiz-option" data-opt="c">C) Subscription</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué librería es la más popular para GraphQL?</p>
<button class="quiz-option" data-opt="a">A) Axios</button>
<button class="quiz-option" data-opt="b">B) Fetch</button>
<button class="quiz-option" data-opt="c">C) Apollo</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2035%3A%20GraphQL&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F35-graphql%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F35-graphql%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2035%3A%20GraphQL%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F35-graphql%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/35-graphql/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 36 — Micro-frontends](36-micro-frontends.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
