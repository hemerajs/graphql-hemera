import hapi from 'hapi'
import { graphqlHapi } from 'graphql-server-hapi'
import { graphiqlHapi } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'
import graphqlSchema from './graphql/schema.graphql'
import createResolvers from './graphql/resolvers'
import Hemera from 'nats-hemera'
import Nats from 'nats'

// start example user service
import './user-service'

const server = new hapi.Server()

const HOST = 'localhost'
const PORT = 3000

server.connection({
  host: HOST,
  port: PORT
})

const nats = Nats.connect()

const hemera = new Hemera(nats, {
  logLevel: 'info',
  childLogger: true,
  tag: 'hemera-graphql',
  generators: true
})

hemera.ready(() => {
  // Define schema and resolvers
  const executableSchema = makeExecutableSchema({
    typeDefs: [graphqlSchema],
    resolvers: createResolvers(hemera)
  })

  // Register graphql server
  server.register({
    register: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions: {
        schema: executableSchema
      },
      route: {
        cors: true
      }
    }
  })

  // Register graphql introspection endpoint
  server.register({
    register: graphiqlHapi,
    options: {
      path: '/graphiql',
      graphiqlOptions: {
        endpointURL: '/graphql'
      }
    }
  })

  server.start((err) => {
    if (err) {
      throw err
    }
    console.log(`Server running at: ${server.info.uri}`)
  })
})
