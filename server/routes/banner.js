const axios = require('axios');
const banner = require('./urlConfig');
const router = require('koa-router')();

router.get('/banner', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  let response = await axios.get(banner);
  ctx.body = response.data;
});

module.exports = router;
