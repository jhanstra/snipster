const columnify = require('columnify')
const { home, read, files, log } = require('../utils/general')
const { SNIPSTER_CONFIG } = require('../utils/constants')

const list = async () => {
  const settings = await read(SNIPSTER_CONFIG)
  const paths = files(settings.directory)
  const snippets = paths.map(path => ({
      prefix: path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.')),
      language: path.substring(path.lastIndexOf('.') + 1),
  }))
  log()
  log(columnify(snippets))
}

module.exports = list
