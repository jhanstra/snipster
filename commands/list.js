const fs = require('fs')
const os = require('os')
const columnify = require('columnify')

const getFilesInDirectory = require('../utils/get-files-in-directory')

const list = () => {
  let userSettings = {}
  fs.readFile(os.homedir() + '/.snipster', (err, data) => {
    if (err) {return console.log(chalk.red(err)) }
    else { userSettings = JSON.parse(data) }
    let snippets = getFilesInDirectory(userSettings.directory)
    let desiredScope = process.argv.slice(3)
    let snippetList = {}
    if (desiredScope.length != 0) {
      desiredScope.map(scope => {
        snippets.map(s => {
          let snippetScope = s.substring(s.lastIndexOf('.') + 1)
          if (snippetScope == scope) {
            snippetList[s.substring(s.lastIndexOf('/') + 1, s.lastIndexOf('.'))] = snippetScope
          }
        })
      })
    } else {
      snippets.map(s => {
        snippetList[s.substring(s.lastIndexOf('/') + 1, s.lastIndexOf('.'))] = s.substring(s.lastIndexOf('.') + 1)
      })
    }

    console.log('\n')
    console.log(columnify(snippetList, {columns: ['Prefix', 'Language scope']}))
  })
}

module.exports = list