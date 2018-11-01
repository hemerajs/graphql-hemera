import Hapi from 'hapi'
import { ApolloServer } from 'apollo-server-hapi'
import { makeExecutableSchema } from 'graphql-tools'
import graphqlSchema from './graphql/schema.graphql'
import createResolvers from './graphql/resolvers'
import UserManagement from './plugins/user-management'
import HemeraJoi from 'hemera-joi'
import Hemera from 'nats-hemera'
import Nats from 'nats'

const HOST = 'localhost'
const PORT = 3000

async function createServer(hemera, port, host) {
  /* eslint-disable-next-line */
  const app = new Hapi.server({
    host,
    port,
    debug: { request: ['error'], log: ['error'] }
  })
  // Define schema and resolvers
  const executableSchema = makeExecutableSchema({
    typeDefs: [graphqlSchema],
    resolvers: createResolvers(hemera)
  })
  const server = new ApolloServer({
    schema: executableSchema,
    formatError: error => {
      app.log(['error', 'graphql'], error)
      return error
      // Or, you can delete the exception information
      // delete error.extensions.exception;
      // return error;
    }
  })

  await server.applyMiddleware({
    app
  })

  await server.installSubscriptionHandlers(app.listener)

  return app
}

function createHemera() {
  const nats = Nats.connect()
  const hemera = new Hemera(nats, {
    logLevel: 'info',
    childLogger: true,
    tag: 'hemera-graphql'
  })

  hemera.use(HemeraJoi)
  hemera.use(UserManagement)

  return hemera
}

async function start() {
  try {
    const hemera = createHemera()
    await hemera.ready()

    const server = await createServer(hemera, PORT, HOST)
    await server.start()
    console.log(`🚀  Server running at: ${server.info.uri}`)
    console.log(`🚀  Graphql Server running at: ${server.info.uri}/graphql`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()
