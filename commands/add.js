const chalk = require('chalk')
const os = require('os')
const fs = require('fs')
const write = require('write')
const child_process = require('child_process')
const exec = require('child_process').exec

const add = () => {
  const filename = process.argv.slice(3)[0]
  let snippetPath = process.argv.slice(4)[0]
  let userSettings = {}
  if (filename.length == 0) {
    console.log(chalk.red('Please supply a filename (e.g. lorem.js) and the contents of the snippet as arguments'))
  } else {
    const editor = process.env.EDITOR || 'vi'
    const child = child_process.spawn(editor, ['/tmp/' + filename], {
      stdio: 'inherit'
    })
    child.on('exit', function (e, code) {
      if (e) { console.log(chalk.red(e)) }
      fs.readFile(os.homedir() + '/.snipster', (err, data) => {
        if (err) {return console.log(chalk.red(err)) }
        else { userSettings = JSON.parse(data) }
        fs.readFile('/tmp/' + filename, (err, data) => {
          let writePath = ''
          if (snippetPath) { 
            if (snippetPath[0] == '/') { snippetPath = snippetPath.slice(1)}
            if (snippetPath.substr(snippetPath.length - 1) == '/') { snippetPath.slice(0,-1) }
            writePath = userSettings.directory + '/' + snippetPath + '/' + filename 
          }
          else { writePath = userSettings.directory + '/snipster-cli/' + filename }
          try {
            write.sync(writePath, data)
          } catch(e) {
            console.log(chalk.red('Failed to add ' + filename + ' to your snippets directory.'))
          }
        }) 
        exec('snipster publish', (err, stdout, stderr) => {
          if (err) {
            console.error(`error: ${err}`)
          }
          console.log(`${stdout}`)
          fs.unlinkSync('/tmp/' + filename)
        })
      })
    })
  }
}

module.exports = add