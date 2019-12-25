const columnify = require('columnify')
const { homedir, read, getFilesInDirectory, log } = require('../utils/general')

const list = async () => {
  const settings = await read(`${homedir()}/.snipster`)
  const paths = getFilesInDirectory(settings.directory)
  const snippets = paths.map(path => ({
      prefix: path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.')),
      language: path.substring(path.lastIndexOf('.') + 1),
  }))
  log()
  log(columnify(snippets))
}

module.exports = list