const chalk = require('chalk')
const fs = require('fs')
const os = require('os')
const inquirer = require('inquirer')

// Just force all snippet files into ~/.snipster, and if the user wants to put them somewhere else, have them symlink it.
// snipster - if set up, publish. if not, set things up
// snipster watch - watch the ~/.snipster directory and publish whenever a file changes
// snipster add - add a new snippet file quickly
//



const syncPreExistingSnippets = require('./sync')

const init = async () => {
  let directory = ''
  chalk.green("🚀 Let's set up your snippets!")
  const editors = await inquirer.prompt({
    type: 'checkbox',
    name: 'editors',
    message: 'Which editors do you use? (select all that apply)',
    choices: [
      { name: 'vscode' },
      { name: 'atom' },
      { name: 'sublime' },
      { name: 'vim' },
    ],
  })

  answers.editors.map(editor => {
    syncPreExistingSnippets(editor, directory)
  })

  /* Store user settings and write to .snipster file in user's home directory */
  // userSettings = {
  //   directory: answers.directory,
  //   editors: answers.editors
  // }

  fs.writeFile(os.homedir() + '/.snipster/config.json', JSON.stringify(answers, null, 2), err => {
    if (err) { return console.log(chalk.red(err)) }
    console.log(chalk.green("\nYour information has been saved!"))
    console.log(chalk.green("You now have a single central directory from which to manage your snippets:"))
    console.log(chalk.white('  ' + answers.directory))
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
}

module.exports = init