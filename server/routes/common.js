const router = require('koa-router')();
const fs = require('fs');
const AlbumModel = require('../models/album');

router.post('/api/upload', async (ctx, next) => {
  console.log(ctx.request.body);
  const isAlbumPost = ctx.request.files.album;
  const file = isAlbumPost ? ctx.request.files.album : ctx.request.files.avatar; // 获取上传文件
  const reader = fs.createReadStream(file.path); // 创建可读流
  const ext = file.name.split('.')[1]; // 获取上传文件扩展名
  const originFilename = file.name.split('.')[0];
  let filename = `${Math.random()
    .toString(36)
    .substr(2)}.${ext}`;
  const upStream = fs.createWriteStream(`../assets/${isAlbumPost ? 'album' : 'avatar'}/${filename}`); // 创建可写流
  reader.pipe(upStream); // 可读流通过管道写入可写流
  let url = `http://39.96.173.235:8080/assets/${isAlbumPost ? 'album' : 'avatar'}/${filename}`;
  if (isAlbumPost) {
    let userId = ctx.request.body.userId;

    await AlbumModel.create({
      userId,
      url: url,
      name: originFilename
    });
    console.log(userId, 'userId');
  }
  ctx.body = {
    result: {
      data: {
        url: url,
        name: originFilename
      },
      state: {
        msg: '文件上传成功！'
      }
    }
  };
});

module.exports = router;
