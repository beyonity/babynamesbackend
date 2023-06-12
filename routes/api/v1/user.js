const UserController = require('../../../controllers/UserController')
async function userRoutes(fastify, options) {
    fastify.get('/test', {
        handler: UserController.test,
    })
    fastify.get('/getbabynamesbyloading', {
        handler: UserController.getBabyNamesByLoading,
    })
    fastify.get('/getreligionsbydata', {
        handler: UserController.getReligionsByData,
    })
    fastify.get('/getrashis', {
        handler: UserController.getRashi,
    })
    fastify.get('/getnakshatras', {
        handler: UserController.getNakshatra,
    })
    fastify.get('/getgendebydata',{
        handler: UserController.getgenderbydata,
    })
}


module.exports = userRoutes