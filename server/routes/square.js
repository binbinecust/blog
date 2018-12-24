const router = require('koa-router')()
const axios = require('axios')
const cheerio = require('cheerio')
const translate = require('@vitalets/google-translate-api')

// translate.engine = 'google'
// translate.key = 'AIzaSyADMIPqDA00tGhturx2L9GcHzjBXUYDjVg'
// translate.from = 'ch'

router.post('/api/square/list', async (ctx, next) => {
  let { page, limit, keyWord } = ctx.request.body // keyWord => 'hah,lala,gaga'
  // let test = await translate(keyWord, { to: 'en' })
  // console.log(test, 'test')
  ctx.body = {
    data: {},
    state: { msg: '获取成功' }
  }
})

module.exports = router
