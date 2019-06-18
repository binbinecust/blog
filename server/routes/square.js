const router = require('koa-router')();
const axios = require('axios');
const superagent = require('superagent');
const requestProxy = require('superagent-proxy');
const userAgents = require('../config/userAgents');

requestProxy(superagent);
let myMacIP = 'http://10.0.114.49';

async function doRequest(url) {
  let userAgent = userAgents[parseInt(Math.random() * userAgents.length)];
  console.log(userAgent);
  try {
    return await superagent
      .get(url)
      .set({ 'User-Agent': userAgent })
      .proxy(myMacIP);
  } catch (e) {
    console.log(e);
  }
  // .end(async (err, res) => {
  //   // 处理数据
  // });
}
const cheerio = require('cheerio');
const translate = require('@vitalets/google-translate-api');
const SquareModel = require('../models/square');

router.post('/api/square/list', async (ctx, next) => {
  let { page, limit, keyWord } = ctx.request.body; // keyWord => 'hah,lala,gaga'
  let oTranslate = await translate(keyWord, { to: 'en', client: 'gtx' });
  console.log(oTranslate.text);
  let enKeyword = oTranslate.text.replace(/,?\s+/g, '-');
  console.log(enKeyword);
  let findKeywordInDB = await SquareModel.find({ keyWord: enKeyword }, { imgUrl: 1, _id: 0 })
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 })
    .exec();
  if (findKeywordInDB.length) {
    let total = await SquareModel.countDocuments({ keyWord: enKeyword });
    ctx.body = {
      data: { imgs: findKeywordInDB, total: total },
      state: { msg: '获取成功' }
    };
  } else {
    let imgUrls = [];
    let isFetchError = false;
    let resCrawl;
    let pageLength;
    let $;
    let htmlString;
    let firstPageImgUrl = [];
    try {
      let crawUrl = enKeyword ? `https://www.freeimages.com/search/${enKeyword}` : 'https://www.freeimages.com';
      console.log('is ok');
      resCrawl = await doRequest(crawUrl);
      console.log(resCrawl, 'resCrawl');
      htmlString = resCrawl.data;
      $ = cheerio.load(htmlString);
      pageLength = $('.pagesimple span')
        .text()
        .slice(1);

      $('.thumbnail-rowgrid .item img').each((i, ele) => {
        firstPageImgUrl.push($(ele).attr('src'));
      });
      imgUrls.push(...firstPageImgUrl);
      console.log(imgUrls, 'imgUrls');
      if (!imgUrls.length) {
        throw new Error('获取错误');
      }
    } catch (e) {
      ctx.status = 500;
      ctx.body = {
        data: { res: '' },
        state: { msg: `本次抓取有错误，请打开https://www.freeimages.com/search输入验证码后再进行搜索` }
      };
      return;
    }
    if (pageLength) {
      // 好像每次加到最后一页的时候会出问题
      for (let i = 2; i < +pageLength; i++) {
        try {
          let delayOneSec = new Promise((resolve, reject) => {
            setTimeout(async () => {
              let crawl = await axios.get(`https://www.freeimages.com/search/${enKeyword}/${i}`);
              resolve(crawl);
            }, 1000);
          });
          // let resCrawl = await axios.get(`https://www.freeimages.com/search/${enKeyword}/${i}`);
          let resCrawl = await delayOneSec;
          console.log(`https://www.freeimages.com/search/${enKeyword}/${i}`, +pageLength);
          let htmlString = resCrawl.data;
          let $ = cheerio.load(htmlString);
          let pageImgUrls = [];
          $('.thumbnail-rowgrid .item img').each((i, ele) => {
            pageImgUrls.push($(ele).attr('src'));
          });
          imgUrls.push(...pageImgUrls);
        } catch (e) {
          isFetchError = true;
        }
      }
    }
    console.log(isFetchError, 'isFetchError');
    if (!isFetchError) {
      await SquareModel.insertMany(imgUrls.map(item => ({ keyWord: enKeyword, imgUrl: item })));
      let res = await SquareModel.find({ keyWord: enKeyword })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec();
      let total = await SquareModel.countDocuments({ keyWord: enKeyword });
      ctx.body = {
        data: { imgs: res, total: total },
        state: { msg: '获取成功' }
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        data: { res: '' },
        state: { msg: `本次抓取有错误，请打开https://www.freeimages.com/search输入验证码后再进行搜索` }
      };
    }
  }
});

module.exports = router;
