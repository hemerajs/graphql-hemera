const resolvers = (hemera) => ({
  Query: {
    getUserById (root, { id }) {
      return hemera.act({
        topic: 'user',
        cmd: 'getUserById',
        id
      })
    },
    getUserByEmail (root, { email }) {
      return hemera.act({
        topic: 'user',
        cmd: 'getUserByEmail',
        email
      })
    }
  },
  Mutation: {
    createUser (root, args) {
      return hemera.act({
        topic: 'user',
        cmd: 'createUser',
        user: args
      })
    }
  }
})

module.exports = resolvers
