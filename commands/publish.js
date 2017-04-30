const fs = require('fs')
const os = require('os')
const chalk = require('chalk')
const cson = require('cson')
const _ = require('lodash')

const getLanguageScopeForAtom = require('../utils/atom-match')
const getLanguageFileNameForVSCode = require('../utils/code-match')
const getSnippetsFromDirectory = require('../utils/get-snippets')

let snippetMap = {}
let atomSnippetMap = {}

const addSnippetToMap = ({language, prefix, body}) => {
  const languages = language
    .replace('style', 'css+scss+less')
    .replace('all', 'c+clj+coffee+cs+cc+css+fs+git+go+groovy+hbs+html+jade+java+js+jsx+json+less+liquid+lua+make+md+objc+pl+php+plain+python+ps1+r+cshtml+rb+rust+scss+sh+sql+swift+toml+ts+vb+xml+xsl+yaml')
    .split('+')
  languages.map(language => {
    language = language.toLowerCase()
    if (snippetMap.hasOwnProperty(language)) {
      snippetMap[language][prefix] = {
        prefix: prefix,
        body: body
      }
    } else {
      snippetMap[language] = {}
      snippetMap[language][prefix] = {
        prefix: prefix,
        body: body
      }
    }
  })
}

const addSnippetsToAtom = () => {
  let atomSnippetMap = _.cloneDeep(snippetMap)
  for (let language in atomSnippetMap) {
    if (atomSnippetMap.hasOwnProperty(language)) {
      let languageSnippets = atomSnippetMap[language]
      let languageScope = getLanguageScopeForAtom(language)
      atomSnippetMap[languageScope] = languageSnippets
    }
  }
  fs.writeFileSync(os.homedir() + '/.atom/snippets.cson', cson.stringify(atomSnippetMap, null, 2))
}


const addSnippetsToVSCode = () => {
  let vscodeSnippetMap = _.cloneDeep(snippetMap);
  for(let language in vscodeSnippetMap) {
    if (vscodeSnippetMap.hasOwnProperty(language)) {
      let languageSnippets = vscodeSnippetMap[language]
      vscodeSnippetMap[language] = languageSnippets
      for (let snippet in vscodeSnippetMap[language]) {
        if (vscodeSnippetMap[language].hasOwnProperty(snippet)) {
          vscodeSnippetMap[language][snippet].body = vscodeSnippetMap[language][snippet].body.split('\n')
        }
      }
      const languageName = getLanguageFileNameForVSCode(language)
      fs.writeFileSync(os.homedir() + '/Library/Application\ Support/Code/User/snippets/' + languageName + '.json', JSON.stringify(vscodeSnippetMap[language], null, 2))
    }
  }
}

const addSnippetsToEditor = (editor) => {
  editor = editor.toLowerCase()
  switch (editor) {
    case ('atom' || 'a' || 'atm'):
      addSnippetsToAtom()
      break
    case ('vscode' || 'vs code' || 'code' || 'vs-code' || 'vsc' || 'v' || 'c'):
      addSnippetsToVSCode()
      break
  }
}

const publish = () => {
  let userSettings = {}
  fs.readFile(os.homedir() + '/.snipster', (err, data) => {
    if (err) {return console.log(chalk.red(err)) }
    else { userSettings = JSON.parse(data) }
    let snippets = getSnippetsFromDirectory(userSettings.directory)

    snippets.map(s => {
      const snippet = {
        language: s.substring(s.lastIndexOf('.') + 1),
        prefix: s.substring(s.lastIndexOf('/') + 1, s.lastIndexOf('.')),
        body: fs.readFileSync(s, { encoding: 'utf-8'})
      }
      addSnippetToMap(snippet);
    })

    /* Handle user-specified editors in command line options */
    let desiredEditors = process.argv.slice(3)
    if (desiredEditors.length != 0) {
      desiredEditors.map(editor => {
        addSnippetsToEditor(editor) 
      })
      console.log(chalk.green('🎉 Successfully published your snippets to these editors: ' + desiredEditors.join(', ') + ' 🎉'))
    } 
    /* Else use the editors listed in user's .snipster file */
    else {
      fs.readFile(os.homedir() + '/.snipster', (err, data) => {
        if (err) {return console.log(chalk.red(err)) }
        else { userSettings = JSON.parse(data) }
        userSettings.editors.map(editor => {
          addSnippetsToEditor(editor)
          
        })
        console.log(chalk.green('🎉  Successfully published your snippets to these editors: ' + userSettings.editors.join(', ') + ' 🎉'))
      })
    }
  })
}

module.exports = publish