const resolvers = hemera => ({
  Query: {
    async getUserById(root, { id }) {
      return (await hemera.act({
        topic: 'user',
        cmd: 'getUserById',
        id
      }))
    },
    async getUserByEmail(root, { email }) {
      return (await hemera.act({
        topic: 'user',
        cmd: 'getUserByEmail',
        email
      })).data
    }
  },
  Mutation: {
    async createUser(root, args) {
      return (await hemera.act({
        topic: 'user',
        cmd: 'createUser',
        user: args.input
      })).data
    }
  }
})

module.exports = resolvers
