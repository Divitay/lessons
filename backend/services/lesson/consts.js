
module.exports = {
  TABLE: {
    LESSONS: 'lessons',
    LESSON_STUDENTS: 'lesson_students',
    LESSON_TEACHERS: 'lesson_teachers',
    STUDENTS: 'students',
    TEACHERS: 'teachers'
  },
  DEFAULTS: {
    MAX_LESSONS_AT_A_TIME: 300,
    MILISECONDS_IN_DAY: 60 * 1000 * 60 * 24,
    MIN_LESSONS_PER_PAGE: 3,
    MAX_LESSONS_PER_PAGE: 10,
    LESSONS_PER_PAGE: 5,
    SORT_BY: 'asc',
    ORDER_BY: 'id',
    PAGE: 1
  }
}
