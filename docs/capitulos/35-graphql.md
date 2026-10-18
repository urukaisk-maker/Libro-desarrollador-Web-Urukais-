# Capítulo 35 — GraphQL

## Introducción

**GraphQL** es un lenguaje de consulta para APIs creado por Facebook en 2015. A diferencia de REST, donde el servidor define qué devuelve cada endpoint, en GraphQL **el cliente pide exactamente los datos que necesita**.

Esto resuelve dos problemas clásicos de REST:

- **Over-fetching**: recibir más datos de los necesarios.
- **Under-fetching**: necesitar varias peticiones para completar una vista.

## REST vs GraphQL

### REST: múltiples peticiones

```http
GET /api/usuario/1
GET /api/usuario/1/posts
GET /api/usuario/1/seguidores
```

Tres peticiones, datos de más en cada una.

### GraphQL: una sola petición

```graphql
query {
  usuario(id: 1) {
    nombre
    email
    posts { titulo }
    seguidores { nombre }
  }
}
```

Una sola petición, exactamente los datos que necesitas.

## Conceptos clave

| Concepto | Qué es |
|---|---|
| **Query** | Consulta de lectura (como GET) |
| **Mutation** | Modificación de datos (POST/PUT/DELETE) |
| **Subscription** | Actualizaciones en tiempo real (WebSockets) |
| **Schema** | Contrato que define qué se puede pedir |
| **Resolver** | Función que devuelve los datos |
| **Type** | Tipo de dato (Usuario, Post, etc.) |

## Tu primer servidor GraphQL

Con **Apollo Server** (Node.js):

```bash
npm install @apollo/server graphql
```

```javascript
// server.js
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `
  type Query {
    saludo: String
    usuario(id: ID!): Usuario
  }

  type Usuario {
    id: ID!
    nombre: String!
    email: String!
  }
`;

const usuarios = [
  { id: '1', nombre: 'Urukais', email: 'urukaisk@gmail.com' },
  { id: '2', nombre: 'Ana', email: 'ana@ejemplo.com' },
];

const resolvers = {
  Query: {
    saludo: () => 'Hola desde GraphQL',
    usuario: (_, { id }) => usuarios.find(u => u.id === id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log('Servidor en', url);
```

## Probar consultas

En `http://localhost:4000` tienes **Apollo Studio**, un playground donde probar queries:

```graphql
query {
  saludo
}

query {
  usuario(id: "1") {
    nombre
    email
  }
}
```

## Mutations: modificar datos

```graphql
type Mutation {
  crearUsuario(nombre: String!, email: String!): Usuario
}
```

Resolver:

```javascript
const resolvers = {
  Mutation: {
    crearUsuario: (_, { nombre, email }) => {
      const nuevo = { id: String(usuarios.length + 1), nombre, email };
      usuarios.push(nuevo);
      return nuevo;
    },
  },
};
```

Cliente:

```graphql
mutation {
  crearUsuario(nombre: "Pedro", email: "pedro@ejemplo.com") {
    id
    nombre
  }
}
```

## Cliente: Apollo Client en React

```bash
npm install @apollo/client graphql
```

```jsx
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const USUARIO_QUERY = gql`
  query GetUsuario($id: ID!) {
    usuario(id: $id) {
      nombre
      email
    }
  }
`;

function Perfil() {
  const { loading, error, data } = useQuery(USUARIO_QUERY, {
    variables: { id: '1' },
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>{data.usuario.nombre}</h2>
      <p>{data.usuario.email}</p>
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Perfil />
    </ApolloProvider>
  );
}
```

!!! tip "Caché automática"
    Apollo Client cachea por defecto. La misma query a `usuario(id: "1")` en varios componentes solo hace **una** petición. Los datos se comparten automáticamente.

## Fragmentos: reutilizar campos

```graphql
fragment DatosUsuario on Usuario {
  id
  nombre
  email
}

query {
  usuario(id: "1") {
    ...DatosUsuario
    posts { titulo }
  }
}
```

## Subscriptions: tiempo real

```graphql
type Subscription {
  nuevoMensaje(sala: String!): Mensaje
}
```

Se conecta vía WebSockets y el cliente recibe actualizaciones en vivo. Perfecto para chats, notificaciones o dashboards.

## Ventajas y desventajas

### ✅ Ventajas

- **Una sola petición** para datos relacionados.
- **Sin over/under-fetching**: el cliente pide lo que necesita.
- **Schema tipado**: autocompletado en el editor.
- **Versionado innecesario**: añades campos sin romper clientes.
- **Herramientas potentes**: playground, Apollo Studio, GraphiQL.

### ❌ Desventajas

- **Complejidad inicial** mayor que REST.
- **Caché HTTP compleja**: todo va por POST.
- **N+1 problem** con resolvers mal hechos (se soluciona con DataLoader).
- **Over-engineering** en proyectos pequeños.

## ¿Cuándo usar GraphQL?

### ✅ Úsalo si...

- Tienes **múltiples clientes** (web, móvil, TV) con necesidades distintas.
- Tu API es **grande y compleja** con muchas relaciones.
- Necesitas **tiempo real**.
- Estás construyendo una **plataforma pública**.

### ❌ Evítalo si...

- Es una API **pequeña y simple** (REST es suficiente).
- Solo tienes un cliente.
- El equipo no conoce GraphQL.
- Necesitas caché HTTP simple con CDN.

## Buenas prácticas

- **Diseña el schema pensando en el cliente**, no en la base de datos.
- **Usa DataLoader** para evitar el problema N+1.
- **Persiste las queries** en producción (Apollo Persisted Queries).
- **Limita la profundidad** de las queries para evitar abusos.
- **Documenta el schema** con descripciones.
- **Versiona el schema** con un historial de cambios.
- **Autentica en el contexto** del resolver.

## Ejercicios

1. Crea un servidor GraphQL básico con Apollo Server y un query `saludo`.
2. Añade una mutation `crearPost` que reciba título y contenido.
3. Consume tu API desde un componente de React con Apollo Client.
4. Añade un fragmento para reutilizar campos de usuario.
5. Implementa DataLoader para resolver el problema N+1 en una lista de posts con autor.

---

⬅️ [Capítulo 34 — Docker para frontend](34-docker.md) | ➡️ [Capítulo 36 — Micro-frontends](36-micro-frontends.md)