module.exports = function (schema, checkedObjectName = 'body') {
  return async function validate (ctx, next) {
    if (schema && schema.error && (typeof schema.error === 'string')) {
      ctx.status = 400
      ctx.body = schema.error
      return
    }

    delete ctx.request.query.godUserId

    const objects = {
      body: ctx.request.body,
      query: ctx.request.query,
      path: ctx.params
    }

    const checkedObject = objects[checkedObjectName]

    const result = schema.validate(checkedObject)

    if (result.error) {
      ctx.status = 400
      ctx.body = result.error.annotate(true)

      return
    }

    return next()
  }
}
