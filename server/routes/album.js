const router = require('koa-router')()
const AlbumModel = require('../models/album')

router.post('/api/album/list', async (ctx, next) => {
  let { page, limit, userId } = ctx.request.body
  try {
    console.log(ctx.request.body, 'binbintest')
    let res = await AlbumModel.find({ userId }, { name: 1, url: 1, _id: 0 })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec()

    ctx.body = {
      result: {
        data: {
          imgList: res,
          total: res.length
        },
        state: { msg: '' }
      }
    }
  } catch (e) {
    ctx.status = 500
    ctx.body = {
      result: {
        data: ''
      },
      state: {
        msg: e
      }
    }
  }
})

module.exports = router
