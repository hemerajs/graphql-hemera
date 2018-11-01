const USER_ADDED = 'USER_ADDED'
export default ({ hemera, pubsub }) => ({
  Subscription: {
    userAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([USER_ADDED])
    }
  },
  Query: {
    async getUserById(root, { id }) {
      return (await hemera.act({
        topic: 'user',
        cmd: 'getUserById',
        id
      })).data
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
      const result = await hemera.act({
        topic: 'user',
        cmd: 'createUser',
        user: args.input
      })
      pubsub.publish(USER_ADDED, { userAdded: result.data })
      return result.data
    }
  }
})
