import UserStore from './UserStore'

const Hp = require('hemera-plugin')

export default Hp(
  async function userStorePlugin(hemera) {
    const Joi = hemera.joi
    const topic = 'user'
    const store = new UserStore()

    hemera.add(
      {
        topic,
        cmd: 'getUserById',
        id: Joi.number().required()
      },
      function getUserById(req, reply) {
        reply(null, store.getUserById(req.id))
      }
    )

    hemera.add(
      {
        topic,
        cmd: 'getUserByEmail',
        email: Joi.string()
          .email()
          .required()
      },
      function getUserByEmail(req, reply) {
        reply(null, store.getUserByEmail(req.email))
      }
    )

    hemera.add(
      {
        topic,
        cmd: 'createUser',
        user: Joi.object().keys({
          name: Joi.string().required(),
          email: Joi.string()
            .email()
            .required()
        })
      },
      function createUser(req, reply) {
        reply(null, store.createUser(req.user))
      }
    )
  },
  {
    name: 'myUserStore',
    options: {},
    dependencies: []
  }
)
