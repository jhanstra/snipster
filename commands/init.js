const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const fs = require('fs')
const os = require('os')

const syncPreExistingSnippets = require('../utils/sync')

let userSettings = {}
prompt.message = '

const init = () => {
  co(function *() {
    console.log('\n')
    console.log(chalk.white("Let's set up snipster to easily manage your snippets."))

    /* Get snippets directory */
    console.log('\n')
    console.log(chalk.green("Where is your top-level snippets directory located? If you do not have a snippets directory yet, where would you like to create one?"))
    console.log(chalk.white("Hint: navigate to your snippets directory (or where you'd like it to be created), type ") + chalk.yellow('pwd') + chalk.white(', and copy/paste the directory here.'))
    const directory = yield prompt('directory: ');

    /* Get text editors */
    console.log('\n')
    console.log(chalk.green("Which editors do you wish to publish snippets to? Enter all, comma-delimited."))
    console.log(chalk.white("Options: VSCode, Atom, Sublime"))
    const editorsPrompt = yield prompt('editors: ')
    const editorsArray = editorsPrompt.replace(' ', '').split(',')
    let editors = []
    editorsArray.map(e => {
      if (e.includes('Code') || e.includes('code') || e == 'c' || e == 'vsc') { editors.push('VSCode') }
      else if (e.includes('Atom') || e.includes('atom') || e == 'a') { editors.push('Atom')}
      else if (e.includes('Subl') || e.includes('subl') || e == 's') { editors.push('Sublime')}
      else if (e.includes('Brackets') || e.includes('brackets') || e == 'b') { editors.push('Brackets')}
    })

    editors.map(editor => {
      syncPreExistingSnippets(editor, directory)
    })

    /* Store user settings and write to .snipster file in user's home directory */
    userSettings = {
      directory: directory,
      editors: editors
    }
    fs.writeFile(os.homedir() + '/.snipster', JSON.stringify(userSettings, null, 2), err => {
      if (err) { return console.log(chalk.red(err)) }
      console.log(chalk.green("\nYour information has been saved!"))
      console.log(chalk.green("You now have a single central directory from which to manage your snippets:"))
      console.log(chalk.white('  ' + userSettings.directory))
      console.log(chalk.green("\nYou may organize the snippets in this directory however you'd like."))
      console.log(chalk.green("Add a snippet by creating a new file in your directory:"))
      console.log(chalk.yellow("  snippet prefix == filename"))
      console.log(chalk.yellow("  snippet language/scope == file extension"))
      console.log(chalk.yellow("  snippet body == contents of file"))
      console.log(chalk.green("\nExample: lorem.md"))
      console.log(chalk.yellow("  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.\n"))

      console.log(chalk.green("When you add a new snippet to your directory (or several), run") + chalk.yellow(' snipster publish. '))
      console.log(chalk.green('This will add all of your snippets to all of your text editors.\n'))
      console.log(chalk.green("All of your pre-existing snippets from the editors you chose have been copied over to your new directory and 'snipster-ified' to use this new format."))
      console.log(chalk.green("\nFor more information on using snipster, head to https://github.com/jhanstra/snipster. "))
      console.log(chalk.green("Enjoy! 🎉"))
      process.exit()
    })
  })
}

module.exports = init