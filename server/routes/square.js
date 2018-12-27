const router = require('koa-router')();
const axios = require('axios');
const cheerio = require('cheerio');
const translate = require('@vitalets/google-translate-api');
const SquareModel = require('../models/square');
const JSON = require('circular-json');
const fs = require('fs');

// translate.engine = 'google'
// translate.key = 'AIzaSyADMIPqDA00tGhturx2L9GcHzjBXUYDjVg'
// translate.from = 'ch'

router.post('/api/square/list', async (ctx, next) => {
  let { page, limit, keyWord } = ctx.request.body; // keyWord => 'hah,lala,gaga'
  let resTranslate = await translate(keyWord, { to: 'en', client: 'gtx' });
  let resCrawl = await axios.get(`https://www.freeimages.com/search/${resTranslate.text}`);
  let htmlString = resCrawl.data;
  fs.writeFile('./res.md', htmlString.replace(/[\n]/g, ''));
  const $ = cheerio.load(htmlString);
  let pageLength = $('.pagesimple span')
    .text()
    .slice(1);
  console.log(pageLength, 'pageLength');
  let batchReq = 2;

  // let pageUrls =
  // Promise.all([])
  // for(let i = 0; i< times; i++) {
  //   await
  // }

  let imgUrls = $('.thumbnail-rowgrid .item img').attr('src');
  // $('.thumbnail-rowgrid .item')
  ctx.body = {
    data: { res: resTranslate },
    state: { msg: '获取成功' }
  };
});

module.exports = router;
