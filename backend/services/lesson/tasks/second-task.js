const assert = require('assert')
const Promise = require('bluebird')

module.exports = (LessonService) => {
  LessonService.prototype.createTeacherLessons = async function ({ teacherIds, lessonId, trx }) {
    assert(Array.isArray(teacherIds) && teacherIds.length > 0, `LessonService_ccreateTeacherLessons_10 teacherIds: ${JSON.stringify(teacherIds)} required`)
    assert(lessonId, `LessonService_createLessons_19 lessonId required`)
    assert(trx, `LessonService_createLessons_19 trx required`)

    const { consts: { TABLE } } = this

    await Promise.map(teacherIds, async (teacherId) => {
      await trx(TABLE.LESSON_TEACHERS)
        .insert({
          lesson_id: lessonId,
          teacher_id: teacherId
        })
    })
  }

  LessonService.prototype.createLessons = async function ({ teacherIds, title, days, firstDate, lessonsCount, lastDate, trx }) {
    assert((lessonsCount && !lastDate) || (!lessonsCount && lastDate), `LessonService_createLessons_10 lessonsCount: ${lessonsCount} && lastDate: ${lastDate} conflict`)
    assert(Array.isArray(teacherIds) && teacherIds.length > 0, `LessonService_createLessons_11 teacherIds: ${JSON.stringify(teacherIds)} required and must be array`)
    assert(Array.isArray(days) && days.length > 0, `LessonService_createLessons_12 days: ${JSON.stringify(days)} required and must be array`)

    const allowedDays = days.filter(day => day <= 6 && day >= 0)
    assert(allowedDays.length > 0 && allowedDays.length === days.length, `LessonService_createLessons_13 days: ${JSON.stringify(days)} !== allowedDays: ${JSON.stringify(allowedDays)}`)

    assert(title, `LessonService_createLessons_14 title: ${title} required`)
    assert(firstDate, `LessonService_createLessons_15 firstDate: ${firstDate} required`)
    assert(trx, `LessonService_createLessons_19 trx required`)

    const {
      consts: { TABLE, DEFAULTS }
    } = this

    const dateEnd = lastDate && new Date(lastDate)
    const lessonIds = []

    const create = async ({ date, lessonsCount }) => {
      if (!lessonsCount || (dateEnd && (date.getTime() + DEFAULTS.MILISECONDS_IN_DAY) > dateEnd.getTime())) {
        return
      }

      // console.log(date, lessonsCount, new Date(firstDate))
      if (days.includes(date.getDay())) {
        const lessonId = (await trx(TABLE.LESSONS)
          .insert({
            date,
            title
          })
          .returning('id'))[0]
        if (lessonId) {
          await this.createTeacherLessons({ teacherIds, lessonId, trx })
          lessonIds.push(lessonId)
          lessonsCount--
        }
      }
      await create({ date: new Date(date.setDate(date.getDate() + 1)), lessonsCount })
    }

    await create({ date: new Date(firstDate), lessonsCount: lessonsCount || DEFAULTS.MAX_LESSONS_AT_A_TIME })

    return lessonIds
  }
}
