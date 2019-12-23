const fs = require('fs-extra')
const os = require('os')
const chalk = require('chalk')
const cson = require('cson')
const write = require('write')
const stripJsonComments = require('strip-json-comments')
const parseString = require('xml2js').parseString

const getExtensionFromAtomLanguageScope = require('./reverse-atom-match')
const getExtensionFromVSCodeLanguageScope = require('./reverse-vscode-match')
const getExtensionFromSublimeLanguageScope = require('./reverse-sublime-match')
const getFilesInDirectory = require('./get-files-in-directory')

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
      } else if (editor == 'sublime') {
        languageExtension = getExtensionFromSublimeLanguageScope(languageScope)
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
    write.sync(os.homedir() + '/.atom/snippets.cson.snipster-backup-' + Date.now(), fs.readFileSync(os.homedir() + '/.atom/snippets.cson', 'utf-8'))
  } catch(e) {
    console.log(chalk.red("Snipster tried to find your pre-existing Atom snippets, but the snippets file does not exist. Please check that you have Atom installed.\nIf you feel there is an error, please submit an issue to ") + chalk.yellow('https://github.com/jhanstra/snipster/issues.'))
  }
  let snippetFilesSynced = transferMapToSnipster(atomPreSnipsterMap, 'atom', userDirectory)
}

const syncSnippetsFromVSCode = (userDirectory) => {
  let vscodePreSnipsterMap = {}
  let files = fs.readdirSync(os.homedir() + '/Library/Application\ Support/Code/User/snippets/')

  /* Create backup folder */
  fs.copySync(os.homedir() + '/Library/Application\ Support/Code/User/snippets', os.homedir() + '/Library/Application\ Support/Code/User/snipster-backup-' + Date.now())

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
}

const syncSnippetsFromSublime = (userDirectory) => {
  let sublimePreSnipsterMap = {}
  let sublimeSnippetFiles = getFilesInDirectory(os.homedir() + '/Library/Application\ Support/Sublime\ Text\ 3/Packages/User')
  sublimeSnippetFiles.map(file => {
    if (file.includes('sublime-snippet')) {
      let fileBody = fs.readFileSync(file, 'utf-8')
      parseString(fileBody, (err, result) => {
        let language = 'all'
        if (result.snippet.hasOwnProperty('scope')) { language = result.snippet.scope[0] }
        let snippet = result.snippet.tabTrigger[0]
        sublimePreSnipsterMap[language] = {}
        sublimePreSnipsterMap[language][snippet] = {
          prefix: snippet,
          body: result.snippet.content[0]
        }
      })
    }
  })
  let snippetFilesSynced = transferMapToSnipster(sublimePreSnipsterMap, 'sublime', userDirectory)
}

const syncPreExistingSnippets = (editor, userDirectory) => {
  editor = editor.toLowerCase()
  switch (editor) {
    case 'atom':
    case 'a':
    case 'atm':
      syncSnippetsFromAtom(userDirectory)
      break
    case 'vscode':
    case 'vs code':
    case 'code':
    case 'vs-code':
    case 'vsc':
    case 'v':
    case 'c':
      syncSnippetsFromVSCode(userDirectory)
      break
    case 'sublime':
      syncSnippetsFromSublime(userDirectory)
      break
  }
}

module.exports = syncPreExistingSnippets