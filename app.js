require('dotenv').config()
const userRoutes = require('./routes/api/v1/user')
const path = require('path')
let fastify = undefined
if (process.env.NODE_ENV === 'development') {
    fastify = require('fastify')({
        logger: true
    })
}else {
    fastify = require('fastify')({
        logger: true
    })
}

fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'static/images'),
    prefix: '/images/', // optional: default '/'
  })
  







fastify.register(userRoutes, { prefix: '/api/v1/user' })


const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

['SIGINT','SIGTERM'].forEach(signal => {

    process.on(signal, () => {
        fastify.log.info(`Signal received: ${signal}`)
        fastify.close().then(() => {
            fastify.log.info('Closing Fastify')
            process.exit(0)
        })
    })
})

start()