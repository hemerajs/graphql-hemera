import Hapi from 'hapi'
import { graphqlHapi, graphiqlHapi } from 'apollo-server-hapi'
import { makeExecutableSchema } from 'graphql-tools'
import graphqlSchema from './graphql/schema.graphql'
import createResolvers from './graphql/resolvers'
import Hemera from 'nats-hemera'
import Nats from 'nats'

// start example user service
import './user-service'

const HOST = 'localhost'
const PORT = 3000

async function InitServer(port, host) {
  // Define schema and resolvers
  const executableSchema = makeExecutableSchema({
    typeDefs: [graphqlSchema],
    resolvers: createResolvers(hemera)
  })
  /* eslint-disable */
  const server = new Hapi.server({
    host,
    port,
    debug: { request: ['error'] }
  })
  /* eslint-enable */

  // Register graphql server
  await server.register({
    plugin: graphqlHapi,
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
  await server.register({
    plugin: graphiqlHapi,
    options: {
      path: '/graphiql',
      graphiqlOptions: {
        endpointURL: '/graphql'
      }
    }
  })

  return server
}

function InitHemera() {
  const nats = Nats.connect()

  const hemera = new Hemera(nats, {
    logLevel: 'info',
    childLogger: true,
    tag: 'hemera-graphql'
  })

  return hemera
}

const hemera = InitHemera()
hemera.ready(async () => {
  const server = await InitServer(PORT, HOST)

  try {
    await server.start()
  } catch (err) {
    console.log(`Error while starting server: ${err.message}`)
  }

  console.log(`Server running at: ${server.info.uri}`)
})
