import hapi from 'hapi';
import { graphqlHapi } from 'graphql-server-hapi';
import { apolloHapi, graphiqlHapi } from 'apollo-server'                                     ;
import { makeExecutableSchema } from 'graphql-tools';
import graphqlSchema from './graphql/schema.graphql';
import createResolvers from './graphql/resolvers';

const server = new hapi.Server();

const HOST = 'localhost';
const PORT = 3000;

server.connection({
    host: HOST,
    port: PORT,
});

// Define schema and resolvers
const executableSchema = makeExecutableSchema({
  typeDefs: [graphqlSchema],
  resolvers: createResolvers({ }),
});

// Register graphql server
server.register({
    register: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions: {
        schema: executableSchema,
      },
      route: {
        cors: true
      }
    },
});

// Register graphql introspection endpoint
server.register({
  register: graphiqlHapi,
  options: {
    path: '/graphiql',
    graphiqlOptions: {
      endpointURL: '/graphql',
    },
  },
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});