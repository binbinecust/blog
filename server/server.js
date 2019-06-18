const Koa = require('koa');
// const bodyParser = require('koa-bodyparser')
const koaJson = require('koa-json');
const logger = require('koa-logger');
const onerror = require('koa-onerror');
const koastatic = require('koa-static');
const cors = require('@koa/cors');
const mongoose = require('mongoose');
const path = require('path');
const koaBody = require('koa-body');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const routes = require('./routes/index.js');
const config = require('./config/config');
const dbconfig = require('./config/database');

const app = new Koa();
onerror(app);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// mongoose.connect(DB_HOST, //mongodb://mongodb:27017/mydb
//   {
//       user:
//       pass: DB_PASSWORD, //password
//       auth: {
//           authdb: DB_AUTHDB //admin
//       },
//       autoIndex: NODE_ENV === 'dev',
//       useNewUrlParser: true,
//       reconnectTries: Number.MAX_VALUE,
//       reconnectInterval: 500, // Reconnect every 500ms
//       poolSize: 10 // Maintain up to 10 socket connections
//   }
// );
mongoose.connect(dbconfig.mongodb, {
  useNewUrlParser: true,
  user: 'fangbinbin',
  pass: '157248',
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  poolSize: 10
});
app.use(cors());

app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    }
  })
);
// app.use(
//   bodyParser({
//     enableTypes: ['json', 'form', 'text']
//   })
// )

app.keys = ['mengxi'];

app.use(async (ctx, next) => {
  let rawCookie = ctx.cookies.request.headers.cookie;
  console.log(ctx.request, 'ctx.request');
  let userId;
  if (rawCookie) {
    const verifySecret = fs.readFileSync(path.resolve(__dirname, './rsa_public_key.pem'));
    let token = rawCookie.split('=')[1];
    jwt.verify(token, verifySecret, { algorithms: ['RS256'] }, (e, decode) => {
      if (e) {
        console.log(e.message);
        return;
      }
      userId = decode.userId;
      ctx.request.body.userId = userId;
    });
  }
  await next();
  if (!rawCookie) {
    const signSecret = fs.readFileSync(path.resolve(__dirname, './rsa_private_key.pem'));
    console.log(JSON.parse(ctx.body), 'ctx.body.test');
    if (JSON.parse(ctx.body).result) {
      userId = JSON.parse(ctx.body).result.data.userId;
    } else if (JSON.parse(ctx.body).data.user) {
      userId = JSON.parse(ctx.body).data.user.id;
    }
    // userId = JSON.parse(ctx.body).result ? JSON.parse(ctx.body).result.data.userId : JSON.parse(ctx.body).data.user.id;
    const token = jwt.sign({ userId }, signSecret, { expiresIn: '2 days', algorithm: 'RS256' });
    let options = {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      signed: false,
      httpOnly: false
    };
    ctx.cookies.set(dbconfig.session.key, token, options);
  }
});

// app.use(
//   session(
//     {
//       key: dbconfig.session.key,
//       maxAge: dbconfig.session.maxAge,
//       signed: false
//     },
//     app
//   )
// );

app.use(koaJson());
app.use(logger());
// app.use(koastatic(path.resolve(__dirname, '../')));

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(routes.routes(), routes.allowedMethods());

console.log(app, 'testbibinin');

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error.message, 'binbin');
});

console.log(config);
const server = app.listen(config.port, () => {
  console.log("Calling app.listen's callback function.");
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
