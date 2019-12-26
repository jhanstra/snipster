const child_process = require('child_process')
const exec = require('child_process').exec
const inquirer = require('inquirer')
const publish = require('./publish')
const { log, read, write, home, fail } = require('../utils/general')

const add = async () => {
  let filename, prefix, lang
  if (process.argv.length > 3) {
    filename = process.argv[3]
    prefix = filename.split('.')[0]
    lang = filename.split('.')[1]
  } else {
    log('\n✂️  Add a snippet:')
    const answers = await inquirer.prompt([{
      type: 'input',
      name: 'prefix',
      message: 'Prefix (the trigger keyword for your snippet):'
    },{
      type: 'input',
      name: 'langs',
      message: 'Languages (separated by +s)'
    }])
    filename = `${answers.prefix}.${answers.langs}`
  }
  const editor = process.env.EDITOR || 'vi'
  const child = child_process.spawn(editor, [`/tmp/${filename}`], {
    stdio: 'inherit'
  })
  child.on('exit', async function (e, code) {
    if (e) { fail(e) }
    const settings = await read(`${home()}/.snipster`)
    const contents = await read(`/tmp/${filename}`)
    const file = await write(`${settings.directory}/added/${filename}`, contents)
    const published = await publish()
  })
}

module.exports = add