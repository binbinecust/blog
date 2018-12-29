const router = require('koa-router')();
const DailyModel = require('../models/daily');

router.post('/api/daily/create', async (ctx, next) => {
  let { content, userId } = ctx.request.body;
  // const userDaily = await DailyModel.findOne({ userId })
  try {
    // if (userDaily) {
    //   let doc = { content: content }
    //   await DailyModel.updateOne({ userId }, doc)
    // } else {
    //   await DailyModel.updateOne({ userId }, { content })
    // }

    await DailyModel.create({
      userId,
      content: content
    });
    ctx.body = {
      data: {},
      state: { msg: '发布成功！' }
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      result: {
        data: ''
      },
      state: {
        msg: e
      }
    };
  }
});

router.post('/api/daily/list', async (ctx, next) => {
  let { page, limit } = ctx.request.body;
  try {
    let res = await DailyModel.find(null, { content: 1, _id: 0, userId: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ created_at: -1 })
      .exec();
    let total = await DailyModel.countDocuments();
    ctx.body = {
      result: {
        data: {
          daily: res,
          total
        },
        state: { msg: '' }
      }
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      result: {
        data: ''
      },
      state: {
        msg: e
      }
    };
  }
});

module.exports = router;
