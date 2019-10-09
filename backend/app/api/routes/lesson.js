const Joi = require('joi')
const router = require('koa-router')()

const di = require('../../di')

const middleware = require('../middlewares')

router.get('/',
  middleware.validation(Joi.object().keys({
    'date': Joi.string(), // => dateFrom, dateTo
    'status': Joi.number().min(0).max(1),
    'teacherIds': Joi.string(), // 1,2,3
    'studentsCount': Joi.string(),
    'page': Joi.number().integer().min(di.lessonService.consts.DEFAULTS.PAGE),
    'lessonsPerPage': Joi.number().integer()
      .min(di.lessonService.consts.DEFAULTS.MIN_LESSONS_PER_PAGE)
      .max(di.lessonService.consts.DEFAULTS.MAX_LESSONS_PER_PAGE)
      .default(di.lessonService.consts.DEFAULTS.LESSONS_PER_PAGE)
  }), 'query'),
  async (ctx) => {
    const {
      request: { query: filters }
    } = ctx

    let result

    try {
      result = await di.lessonService.findByAttr({ filters })
    } catch (err) {
      if (err && err.isJoi) {
        ctx.status = 400
        ctx.body = err.details
        return
      } else {
        throw err
      }
    }

    ctx.body = result
    ctx.status = 200
  })

router.post('/lessons',
  middleware.validation(Joi.object().keys({
    'teacherIds': Joi.array().items(Joi.number().integer().required()),
    'title': Joi.string(),
    'days': Joi.array().items(Joi.number().integer().min(0).max(6).required()),
    'firstDate': Joi.date().iso(),
    'lessonsCount': Joi.number().integer(),
    'lastDate': Joi.date().iso()
  }).xor('lessonsCount', 'lastDate'), 'body'),
  async (ctx) => {
    const {
      teacherIds, title, days, firstDate, lessonsCount, lastDate
    } = ctx.request.body

    ctx.body = await di.db.transaction(async (trx) => {
      return di.lessonService.createLessons({ teacherIds, title, days, firstDate, lessonsCount, lastDate, trx })
    })

    ctx.status = 200
  })

module.exports = router
