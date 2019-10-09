const lib = require('../../../app/lib')
const Joi = require('joi')

module.exports = (LessonService) => {
  /**
   * search Lesson
   * @param {Object} filters        params searching
   * @return {Array}                result searching
   */
  LessonService.prototype.findByAttr = async function ({ filters = {}, trx = this.knex }) {
    const { consts: { TABLE, DEFAULTS } } = this

    const sortBy = DEFAULTS.SORT_BY // 'desc'
    const orderBy = DEFAULTS.ORDER_BY // 'id'
    const perPage = filters.lessonsPerPage || DEFAULTS.LESSONS_PER_PAGE // 5
    const page = filters.page || DEFAULTS.PAGE // 1
    const offset = ((page - 1) * perPage)

    let query = trx(`${TABLE.LESSONS} as lessons`)
      .select('lessons.*', 'lesson_students.count_visitors', 'students.students_arr as students', 'teachers.teachers_arr as teachers')
      .innerJoin(trx.raw(`
            (
              SELECT
                COUNT(*) as count_visitors,
                lesson_id 
                FROM
                  ${TABLE.LESSON_STUDENTS} AS lesson_students
                GROUP BY 
                  lesson_id
            ) AS lesson_students ON lessons.id = lesson_students.lesson_id
          `))
      .innerJoin(trx.raw(`
              (
                SELECT 
                  array_agg(json_build_object('id', students.id, 'name', students.name, 'visit', lesson_students.visit)) as students_arr,
                  lesson_students.lesson_id
                FROM 
                  ${TABLE.STUDENTS} as students 
                INNER JOIN ${TABLE.LESSON_STUDENTS} as lesson_students
                  ON lesson_students.student_id = students.id
                GROUP BY
                  lesson_students.lesson_id
              ) AS students ON students.lesson_id = lessons.id
            `))
      .innerJoin(trx.raw(`
            (
              SELECT 
                array_agg(row_to_json(teachers)) as teachers_arr,
                lesson_teachers.lesson_id
              FROM 
                ${TABLE.TEACHERS} as teachers 
              INNER JOIN ${TABLE.LESSON_TEACHERS} as lesson_teachers
                ON lesson_teachers.teacher_id = teachers.id
              GROUP BY
                lesson_teachers.lesson_id
            ) AS teachers ON teachers.lesson_id = lessons.id
          `))
      .limit(perPage)
      .offset(offset)
      .orderBy(orderBy, sortBy)

    if (filters.date) {
      const date = filters.date.split(',')

      // Validate
      lib.joiAssert(date, Joi.array().items(Joi.date().iso()))

      if (date.length > 1) {
        query = query
          .where('lessons.date', '>=', date[0])
          .where('lessons.date', '<=', date[1])
      } else {
        query = query
          .where('lessons.date', '=', date[0])
      }
    }

    if (filters.teacherIds) {
      filters.teacherIds = filters.teacherIds && filters.teacherIds.split(',')
      // Validate
      lib.joiAssert(filters.teacherIds, Joi.array().items(Joi.number().integer()))

      query = query
        .innerJoin(`${TABLE.LESSON_TEACHERS} as lesson_teachers`, `lessons.id`, `lesson_teachers.lesson_id`)
        .whereIn('lesson_teachers.teacher_id', filters.teacherIds)
    }

    if (filters.status) {
      query = query
        .where('lessons.status', filters.status)
    }

    return query
  }
}
