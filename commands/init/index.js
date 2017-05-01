const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const fs = require('fs')
const os = require('os')

let userSettings = {}
prompt.message = ''

const init = () => {
  co(function *() {
    console.log('\n')
    console.log(chalk.green("Let's set up snipster to easily manage your snippets."))

    /* Get snippets directory */
    console.log('\n')
    console.log(chalk.green("Where is your top-level snippets folder located?"))
    console.log(chalk.white("Hint: navigate to your snippets directory, type ") + chalk.yellow('pwd') + chalk.white(' and copy/paste the directory here.'))
    const directory = yield prompt('directory: ');

    /* Get text editors */
    console.log('\n')
    console.log(chalk.green("Which editors do you wish to publish snippets to? Enter all, comma-delimited."))
    console.log(chalk.white("Options: VSCode, Atom, Sublime, Brackets"))
    const editorsPrompt = yield prompt('editors: ')
    const editorsArray = editorsPrompt.replace(' ', '').split(',')
    let editors = []
    editorsArray.map(e => {
      if (e.includes('Code') || e.includes('code') || e == 'c' || e == 'vsc') { editors.push('VSCode') }
      else if (e.includes('Atom') || e.includes('atom') || e == 'a') { editors.push('Atom')}
      else if (e.includes('Subl') || e.includes('subl') || e == 's') { editors.push('Sublime')}
      else if (e.includes('Brackets') || e.includes('brackets') || e == 'b') { editors.push('Brackets')}
    })

    /* Store user settings and write to .snipster file in user's home directory */
    userSettings = {
      directory: directory,
      editors: editors
    }
    fs.writeFile(os.homedir() + '/.snipster', JSON.stringify(userSettings, null, 2), err => {
      if (err) { return console.log(chalk.red(err)) }
      console.log(chalk.green("Your information has been saved! Run ") + chalk.yellow('snipster publish') + chalk.green(' to publish your snippets to your text editors.'))
      process.exit()
    })
  })
}

module.exports = init