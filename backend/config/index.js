const fs = require('fs')

const config = {}

fs.readdirSync('./config').map(file => {
  if (file !== 'index.js') {
    config[file.replace('.js', '')] = require(`./${file}`)
  }
})

module.exports = config
