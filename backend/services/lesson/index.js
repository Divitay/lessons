const assert = require('assert')

const consts = require('./consts')

const firstTask = require('./tasks/first-task')
const secondTask = require('./tasks/second-task')

/**
 * @class {LessonService} LessonService Class specification
 * @param {function} knex driver pg db knex
 **/
class LessonService {
  constructor ({ knex }) {
    assert(knex, 'LessonService_0 "knex" is required')

    this.knex = knex
    this.consts = consts
    // customErrors
  }
}

firstTask(LessonService)
secondTask(LessonService)

module.exports = LessonService
