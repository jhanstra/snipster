const process = require('process')
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const questions = require('./initQuestions')
const syncPreExistingSnippets = require('../utils/sync')


const init = async () => {
  chalk.green("🚀  Let's set up Snipster")
  const answers = await inquirer.prompt(questions)
  answers.editors.map(editor => {
    syncPreExistingSnippets(editor, directory)
  })
  fs.writeFile(`${os.homedir()}/.snipster`, JSON.stringify(answers, null, 2), err => {
    if (err) return chalk.red(err)
    chalk.green('Success!')
    console.log()
    chalk.white('Check out https://github.com/jhanstra/snipster/examples for snippet ideas and examples.')
    console.log()
    chalk.white('You can run `snipster add lorem.md` to add a new snippet')
  }
}