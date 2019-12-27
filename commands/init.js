const process = require('process')
const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const syncPreExistingSnippets = require('../utils/sync')
const { success, log, fileExists, home, write } = require('../utils/general')
const questions = require('../utils/questions')
const { LANGUAGES } = require('../utils/constants')
const add = require('./add')

const init = async () => {
  const settingsFilePath = `${home()}/.snipster`
  if (fileExists(settingsFilePath)) {
    const question1 = await inquirer.prompt(questions.initAgain)
    if (!question1.reset) {
      log('Okay, exiting...')
      return
    }
  }

  success("🚀  Let's set up Snipster\n")
  const settings = await inquirer.prompt(questions.init)
  settings.editors.map(editor => {
    syncPreExistingSnippets(editor, settings.directory)
  })

  write(`${home()}/.snipster`, JSON.stringify(settings, null, 2))
  success('Success!\n')
  log('Check out https://github.com/jhanstra/snipster/examples for snippet ideas and examples.\n')
  log('You can run `snipster add lorem.md` to add a new snippet.\n')
  const question2 = await inquirer.prompt(questions.addSnippets)
  if (!question2.addSnippets) {
    log('Okay, exiting...')
    return
  }
  add()
}

module.exports = init