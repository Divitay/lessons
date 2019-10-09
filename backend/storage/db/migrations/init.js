const fs = require('fs')

exports.up = async (knex) => {
  const script = fs.readFileSync(`${__dirname}/init.sql`).toString()
  await knex.raw(script)
}

exports.down = () => {}
