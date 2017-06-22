# GraphQL-Hemera

## What is GraphQL?

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

![preview](https://github.com/hemerajs/graphql-hemera/blob/master/media/preview.PNG)

This setup demonstrate how to use Hemera to resolve your GraphQL queries. Because of the flexibility of GraphQL you have to deal with many resolvers hemera can provide you a way to manage this in a very simple and flexible way. Combine GraphQL with the power of pattern matching.

- The [User Service](src/user-service) is provided by Hemera
- The [Resolvers](src/graphql/resolvers.js) are proxied to Hemera
- The [payload](src/user-service/index.js) is validated by Hemera

## Getting started

```js
npm install
npm run start
```

## GraphiQL Dashboard

```
http://localhost:3000/graphiql
```

## GraphQL endpoint

```
http://localhost:3000/graphql
```
