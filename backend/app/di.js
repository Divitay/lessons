const Knex = require('knex')

const config = require('../config')

const knex = Knex(config.knex)

const LessonService = require('../services/lesson')
const lessonService = new LessonService({ knex })

module.exports = {
  config,
  db: knex,
  lessonService
}
