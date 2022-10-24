const process = require('process')
const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const { success, log, exists, home, write } = require('../utils/general')
const { LANGUAGES, SNIPSTER_CONFIG } = require('../utils/constants')
const questions = require('../utils/questions')
const add = require('./add')
const publish = require('./publish')
const sync = require('./sync')

const init = async () => {
  if (exists(SNIPSTER_CONFIG)) {
    const question1 = await inquirer.prompt(questions.initAgain)
    if (!question1.reset) {
      log('Okay, exiting...')
      return
    }
  }

  success("🚀  Let's set up Snipster\n")
  const settings = await inquirer.prompt(questions.init)
  settings.editors.map(editor => { sync(editor) })

  write(SNIPSTER_CONFIG, JSON.stringify(settings, null, 2))
  log('Check out https://github.com/jhanstra/snipster/examples for snippet ideas and examples.\n')
  log('You can run `snipster add lorem.md` to add a new snippet.\n')
  publish()
  success('All set! You can start using your snippets now :D\n')
}

module.exports = init