const process = require('process')
const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const syncPreExistingSnippets = require('../utils/sync')
const { success, log, fileExists, parseJsonFile, homedir } = require('../utils/general')

const questions = [
  {
    type: 'input',
    name: 'directory',
    message: `Enter a pathname to your snippets folder`,
  },
  {
    type: 'checkbox',
    name: 'editors',
    message: "Which editors would you like to publish to?",
    choices: [
      { name: 'VSCode', checked: false },
      { name: 'Atom', checked: false },
      { name: 'Sublime Text', checked: false },
    ]
  },
]

const initNew = async () => {
  const settingsFilePath = `${homedir()}/.snipster`
  if (fileExists(settingsFilePath)) {
    const answers = await inquirer.prompt([{
      type: 'confirm',
      name: 'reset',
      message: 'You have a .snipster config file already set up. Do you want to set up again?'
    }])
    if (!answers.reset) {
      log('Okay, exiting...')
      return
    }
  }
  success("🚀  Let's set up Snipster")
  log()
  const settings = await inquirer.prompt(questions)
  settings.editors.map(editor => {
    syncPreExistingSnippets(editor, settings.directory)
  })

  fs.writeFile(`${homedir()}/.snipster`, JSON.stringify(settings, null, 2), err => {
    if (err) return chalk.red(err)
    success('Success!')
    log()
    log('Check out https://github.com/jhanstra/snipster/examples for snippet ideas and examples.')
    log()
    log('You can run `snipster add lorem.md` to add a new snippet')
  })
}

module.exports = initNew