const resolvers = hemera => ({
  Query: {
    getUserById(root, { id }) {
      return hemera
        .act({
          topic: 'user',
          cmd: 'getUserById',
          id
        })
        .then(resp => resp.data)
    },
    getUserByEmail(root, { email }) {
      return hemera
        .act({
          topic: 'user',
          cmd: 'getUserByEmail',
          email
        })
        .then(resp => resp.data)
    }
  },
  Mutation: {
    createUser(root, args) {
      return hemera
        .act({
          topic: 'user',
          cmd: 'createUser',
          user: args
        })
        .then(resp => resp.data)
    }
  }
})

module.exports = resolvers
