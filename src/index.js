import Hapi from 'hapi'
import { ApolloServer } from 'apollo-server-hapi'
import { makeExecutableSchema } from 'graphql-tools'
import graphqlSchema from './graphql/schema.graphql'
import createResolvers from './graphql/resolvers'
import Hemera from 'nats-hemera'
import Nats from 'nats'

// start example user service
import './user-service'

const HOST = 'localhost'
const PORT = 3000

async function InitServer(hemera, port, host) {
  // Define schema and resolvers
  const executableSchema = makeExecutableSchema({
    typeDefs: [graphqlSchema],
    resolvers: createResolvers(hemera)
  })
  const server = new ApolloServer({ schema: executableSchema })

  /* eslint-disable */
  const app = new Hapi.server({
    host,
    port,
    debug: { request: ['error'] }
  })
  /* eslint-enable */

  await server.applyMiddleware({
    app
  })

  await server.installSubscriptionHandlers(app.listener)

  return app
}

function initHemera() {
  const nats = Nats.connect()

  const hemera = new Hemera(nats, {
    logLevel: 'info',
    childLogger: true,
    tag: 'hemera-graphql'
  })

  return hemera
}

async function start() {
  try {
    const hemera = initHemera()
    await hemera.ready()

    const server = await InitServer(hemera, PORT, HOST)
    await server.start()
    console.log(`Server running at: ${server.info.uri}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()
