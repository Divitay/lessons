module.exports = {
  validation: require('./joi'),
  bodyParser: require('koa-bodyparser'),
  cors: require('kcors')({
    credentials: true,
    exposeHeaders: []
  })
}
