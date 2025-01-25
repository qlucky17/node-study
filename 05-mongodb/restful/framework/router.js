const router = require('koa-router')()
const {init, get, create, update, del} = require('./api')

router.get('/api/:model', init, get)
router.post('/api/:model', init, create)
router.put('/api/:model/:id', init, update)
router.delete('/api/:model/:id', init, del)

module.exports = router.routes()