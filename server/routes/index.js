const userRouter = require('./user');
const router = require('koa-router')();

router.use(userRouter.routes(), userRouter.allowedMethods());

module.exports = router;
