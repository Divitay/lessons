const Joi = require('joi')

module.exports.joiAssert = (value, schema) => {
  const result = Joi.validate(value, schema)

  if (result.error) {
    console.log('LIB_JOI_ERROR', result.error)
    throw result.error
  }

  value = result.value
}
