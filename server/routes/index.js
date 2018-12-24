const userRouter = require('./user')
const commonRouter = require('./common')
const dailyRouter = require('./daily')
const albumRouter = require('./album')
const squareRouter = require('./square')
const router = require('koa-router')()

router.use(userRouter.routes(), userRouter.allowedMethods())
router.use(commonRouter.routes(), commonRouter.allowedMethods())
router.use(dailyRouter.routes(), dailyRouter.allowedMethods())
router.use(albumRouter.routes(), albumRouter.allowedMethods())
router.use(squareRouter.routes(), squareRouter.allowedMethods())

module.exports = router
