import Hemera from 'nats-hemera'
import HemeraJoi from 'hemera-joi'
import Nats from 'nats'

const nats = Nats.connect()
const topic = 'user'
const hemera = new Hemera(nats, {
  logLevel: 'info',
  childLogger: true,
  tag: 'hemera-graphql'
})

hemera.use(HemeraJoi)

let id = 1
const users = [{ id, name: 'peter', email: 'peter@gmail.com' }]

hemera.ready(() => {
  let Joi = hemera.joi

  hemera.add(
    {
      topic,
      cmd: 'getUserById',
      id: Joi.number().required()
    },
    function(req, reply) {
      const matchedUser = users.filter(x => x.id === req.id)
      reply(null, matchedUser.length ? matchedUser[0] : null)
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
    function(req, reply) {
      const matchedUser = users.filter(x => x.email === req.email)
      reply(null, matchedUser.length ? matchedUser[0] : null)
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
    function(req, reply) {
      req.user.id = ++id
      users.push(req.user)
      reply(null, true)
    }
  )
})
