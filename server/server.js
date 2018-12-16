const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const koaJson = require('koa-json')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const koastatic = require('koa-static')
const cors = require('@koa/cors')
const mongoose = require('mongoose')
const session = require('koa-session')
const path = require('path')

const routes = require('./routes/index.js')
const config = require('./config/config')
const dbconfig = require('./config/database')

const app = new Koa()
onerror(app)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.connect(
  dbconfig.mongodb,
  { useNewUrlParser: true }
)
app.use(cors())
app.use(
  bodyParser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.keys = ['mengxi']

app.use(
  session(
    {
      key: dbconfig.session.key,
      maxAge: dbconfig.session.maxAge
    },
    app
  )
)

app.use(koaJson())
app.use(logger())
app.use(koastatic(path.join(__dirname, 'assets')))
console.log(path.join(__dirname, 'assets'))

app.use(async (ctx, next) => {
  const start = new Date()
  console.log(next)
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(routes.routes(), routes.allowedMethods())

console.log(app, 'testbibinin')

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error.message, 'binbin')
})

console.log(config)
const server = app.listen(config.port, () => {
  console.log("Calling app.listen's callback function.")
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
