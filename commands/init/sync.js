const fs = require('fs')
const os = require('os')
const chalk = require('chalk')
const cson = require('cson')
const write = require('write')
const stripJsonComments = require('strip-json-comments')
const leftPad = require('left-pad')

const getExtensionFromAtomLanguageScope = require('../../utils/reverse-atom-match')
const getExtensionFromVSCodeLanguageScope = require('../../utils/reverse-vscode-match')

const transferMapToSnipster = (preSnipsterMap, editor, userDirectory) => {
  let snippetFilesSynced = []
  let languageExtension
  for (let languageScope in preSnipsterMap) {
    if (preSnipsterMap.hasOwnProperty(languageScope)) {
      let languageSnippets = preSnipsterMap[languageScope]
      if (editor == 'atom') {
        languageExtension = getExtensionFromAtomLanguageScope(languageScope)
      } else if (editor == 'vscode') {
        languageExtension = getExtensionFromVSCodeLanguageScope(languageScope)
      }
      for (let snippet in preSnipsterMap[languageScope]) {
        let filename = preSnipsterMap[languageScope][snippet].prefix + '.' + languageExtension
        snippetFilesSynced.push(filename)
        try {
          if (editor == 'vscode') {
            let body = preSnipsterMap[languageScope][snippet].body.join('\n')
            write.sync(userDirectory + '/' + editor + '/' + filename, body)
          } else {
            write.sync(userDirectory + '/' + editor + '/' + filename, preSnipsterMap[languageScope][snippet].body)
          }
        } catch(e) {
          if (e) { console.log(chalk.red(e))}
        }
      }
    }
  }
  return snippetFilesSynced
}

const syncSnippetsFromAtom = (userDirectory) => {
  let atomPreSnipsterMap = {}
  try {
    atomPreSnipsterMap = cson.parse(fs.readFileSync(os.homedir() + '/.atom/snippets.cson', 'utf-8'))
  } catch(e) {
    console.log(chalk.red("Snipster tried to find your pre-existing Atom snippets, but the snippets file does not exist. Please check that you have Atom installed.\nIf you feel there is an error, please submit an issue to ") + chalk.yellow('https://github.com/jhanstra/snipster/issues.'))
  }
  let snippetFilesSynced = transferMapToSnipster(atomPreSnipsterMap, 'atom', userDirectory)
  // console.log(chalk.green('\n\n\nSuccess! 🎉\x20 Snipster created the following snippets from your ') + chalk.blue('Atom') + chalk.green(' snippets.cson file and added them to your directory:\n'))
  // console.log(chalk.yellow(snippetFilesSynced.join(', ')))
}

const syncSnippetsFromVSCode = (userDirectory) => {
  let vscodePreSnipsterMap = {}
  let files = fs.readdirSync(os.homedir() + '/Library/Application\ Support/Code/User/snippets/')
  files.map(file => {
    if (!(file == '.DS_Store')) {
      let language = file.split('.')[0]
      try {
        fileBody = fs.readFileSync(os.homedir() + '/Library/Application\ Support/Code/User/snippets/' + file, 'utf-8')
        vscodePreSnipsterMap[language] = JSON.parse(stripJsonComments(fileBody))
      } catch(e) {
        console.log(chalk.red("Snipster encountered a problem syncing the file " + file + " from your VSCode snippets. \nCheck that your file is formatted correctly and run ") + chalk.yellow('snipster init') + chalk.red(' again if you wish to try syncing it again.'))
        console.log('\t' + os.homedir() + '/Library/Application\ Support/Code/User/snippets/' + file + '\n')
      }
    }
  })
  let snippetFilesSynced = transferMapToSnipster(vscodePreSnipsterMap, 'vscode', userDirectory)
  
  // console.log(chalk.green('\n\n\nSuccess! 🎉\x20 Snipster created the following snippets from your ') + chalk.blue('VSCode') + chalk.green(' snippets files and added them to your directory:\n'))
  // console.log(chalk.yellow(snippetFilesSynced.join(', ')))
}

const syncPreExistingSnippets = (editor, userDirectory) => {
  editor = editor.toLowerCase()
  switch (editor) {
    case ('atom' || 'a' || 'atm'):
      syncSnippetsFromAtom(userDirectory)
      break
    case ('vscode' || 'vs code' || 'code' || 'vs-code' || 'vsc' || 'v' || 'c'):
      syncSnippetsFromVSCode(userDirectory)
      break
  }
}

module.exports = syncPreExistingSnippets