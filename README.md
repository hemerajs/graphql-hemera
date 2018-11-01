## What is GraphQL?

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

[![preview](https://github.com/hemerajs/graphql-hemera/blob/master/media/preview.PNG)](http://localhost:3000/graphql)

## What is Hemera?

[Hemera](https://github.com/hemerajs/hemera) is a small wrapper around the official [NATS](https://nats.io/) driver. [NATS](https://nats.io/) is a simple, fast and reliable solution for the internal communication of a distributed system.

This demo demonstrate how you can use Hemera for resolving your GraphQL queries. Because of the flexibility of GraphQL you have to deal with many resolvers Hemera can help you to manage this in a very simple and flexible way. Combine GraphQL with the power of pattern matching.

## Getting started

Here you can see a simple example to resolve a graphql query with Hemera. Hemera act as a api gateway to your services.

1. Add a GraphQL  primitive to the [schema](/src/graphql/schema.graphql).
2. Add a [resolver](/src/graphql/resolvers.js) bridge to your hemera service.
3. Implement your Hemera service [resolver](/src/plugins/user-management/index.js).

This demo also provide a sample GraphQL  subscription. Subscriptions allows to push messages to the client in realtime.
[Here](/demo.md) you can find some GraphQL  queries which can be executed in the playground.

## Getting started

```js
npm install
npm start
```

## GraphiQL Dashboard

```
http://localhost:3000/graphql
```

## GraphQL endpoint

```
http://localhost:3000/graphql
```
