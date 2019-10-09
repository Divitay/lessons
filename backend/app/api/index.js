const Koa = require('koa')
const middlewares = require('./middlewares')
const di = require('../di')

const app = new Koa()

app.use(middlewares.cors)
app.use(middlewares.bodyParser())

console.log('Config parsed', { ...di.config })

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.app.emit('error', err, ctx)

    console.error('API_Error_Handler_1', err)
  }
})

app.use(require('./routes/lesson').routes())

app.on('error', (err, ctx) => {
  console.error('APP_Error_1', err)
})

const port = di.config.app.api.port

console.log(`Listening on port ${port}`)

app.listen(port)
