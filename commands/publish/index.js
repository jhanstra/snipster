const fs = require('fs')
const os = require('os')
const chalk = require('chalk')
const cson = require('cson')
const _ = require('lodash')
const write = require('write')
const jsontoxml = require('jsontoxml')

const getLanguageScopeForAtom = require('../../utils/atom-match')
const getLanguageFileNameForVSCode = require('../../utils/vscode-match')
const getLanguageScopeForSublime = require('../../utils/sublime-match')
const getFilesInDirectory = require('../../utils/get-files-in-directory')
const atomSnipsterComment = require('../../utils/atom-comment')
const vscodeSnipsterComment = require('../../utils/vscode-comment')
const sublimeSnipsterComment = require('../../utils/sublime-comment')

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
  let atomSnippetMap = {}
  for (let language in snippetMap) {
    if (snippetMap.hasOwnProperty(language)) {
      const languageSnippets = snippetMap[language]
      const languageScope = getLanguageScopeForAtom(language)
      atomSnippetMap[languageScope] = languageSnippets
    }
  }
  let output = atomSnipsterComment() + '\n' + cson.stringify(atomSnippetMap, null, 2)
  fs.writeFile(os.homedir() + '/.atom/snippets.cson', output, (err) => {
    if (err) { console.log(chalk.red("Your Atom snippet file doesn't exist where Snipster expected to find it. Please check that you have Atom installed.\nIf you feel there is an error, please submit an issue to ") + chalk.yellow('https://github.com/jhanstra/snipster/issues.'))}
    else {
      console.log(chalk.green('🎉 Successfully published your snippets to Atom 🎉'))
    }
    
  })
}


const addSnippetsToVSCode = () => {
  let failedToPublish = false
  let vscodeSnippetMap = _.cloneDeep(snippetMap);
  for(let language in vscodeSnippetMap) {
    if (vscodeSnippetMap.hasOwnProperty(language)) {
      for (let snippet in vscodeSnippetMap[language]) {
        if (vscodeSnippetMap[language].hasOwnProperty(snippet)) {
          vscodeSnippetMap[language][snippet].body = vscodeSnippetMap[language][snippet].body.split('\n')
        }
      }
      const languageName = getLanguageFileNameForVSCode(language)
      let output = vscodeSnipsterComment() + '\n' + JSON.stringify(vscodeSnippetMap[language], null, 2)
      try {
        fs.writeFileSync(os.homedir() + '/Library/Application\ Support/Code/User/snippets/' + languageName + '.json', output)
      } catch (e) {
        failedToPublish = true
      }
    }
  }
  if (failedToPublish) {
    console.log(chalk.red("Your VSCode snippet files do not exist where Snipster expected to find them. Please check that you have VSCode installed.\nIf you feel there is an error, please submit an issue to ") + chalk.yellow('https://github.com/jhanstra/snipster/issues.'))
  } else {
    console.log(chalk.green('🎉 Successfully published your snippets to VSCode 🎉'))
  }
}

const addSnippetsToSublime = () => {
  let sublimeSnippetMap = _.cloneDeep(snippetMap)
  console.log(sublimeSnippetMap)
  for(let language in sublimeSnippetMap) {
    if (sublimeSnippetMap.hasOwnProperty(language)) {
      for (let snippet in sublimeSnippetMap[language]) {
        let sublimeSnippet = {snippet: {}}
        sublimeSnippet.snippet.tabTrigger = sublimeSnippetMap[language][snippet].prefix
        sublimeSnippet.snippet.scope = getLanguageScopeForSublime(language)
        sublimeSnippet.snippet.content = jsontoxml.cdata(sublimeSnippetMap[language][snippet].body)
        let xml = jsontoxml(sublimeSnippet, { prettyPrint: true })
        write.sync(os.homedir() + '/Library/Application\ Support/Sublime\ Text\ 3/Packages/User/snipster/' + sublimeSnippetMap[language][snippet].prefix + '.' + language + '.sublime-snippet', sublimeSnipsterComment() + xml)
      }
    }
  }
}

const addSnippetsToEditor = (editor) => {
  console.log(editor)
  editor = editor.toLowerCase()
  switch (editor) {
    case ('atom' || 'a' || 'atm'):
      addSnippetsToAtom()
      break
    case ('vscode' || 'vs code' || 'code' || 'vs-code' || 'vsc' || 'v' || 'c'):
      addSnippetsToVSCode()
      break
    case ('sublime' || 'subl' || 's' || 'sublime text' || 'sublime text 3' || 'sublime text 2'):
      console.log('subl')
      addSnippetsToSublime()
      break
  }
}

const publish = () => {
  let userSettings = {}
  fs.readFile(os.homedir() + '/.snipster', (err, data) => {
    if (err) {return console.log(chalk.red(err)) }
    else { userSettings = JSON.parse(data) }
    let snippets = getFilesInDirectory(userSettings.directory)

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
    } 
    /* Else use the editors listed in user's .snipster file */
    else {
      fs.readFile(os.homedir() + '/.snipster', (err, data) => {
        if (err) {return console.log(chalk.red(err)) }
        else { userSettings = JSON.parse(data) }
        userSettings.editors.map(editor => {
          addSnippetsToEditor(editor)
        })
      })
    }
  })
}

module.exports = publish