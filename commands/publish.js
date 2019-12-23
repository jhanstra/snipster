const fs = require('fs')
const os = require('os')
const chalk = require('chalk')
const cson = require('cson')
const _ = require('lodash')
const write = require('write')
const jsontoxml = require('jsontoxml')

const init = require('./init')
const { atomMatcher, vscodeMatcher, sublimeMatcher } = require('../utils/matchers')
const { atomComment, vscodeComment, sublimeComment } = require('../utils/comments')
const { getFilesInDirectory, homedir, fileExists, parseJsonFile } = require('../utils/general')

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
      const languageScope = atomMatcher(language)
      atomSnippetMap[languageScope] = languageSnippets
    }
  }
  let output = atomComment() + '\n' + cson.stringify(atomSnippetMap, null, 2)
  fs.writeFile(os.homedir() + '/.atom/snippets.cson', output, (err) => {
    if (err) { console.log(chalk.red("Your Atom snippet file doesn't exist where Snipster expected to find it. Please check that you have Atom installed.\nIf you feel there is an error, please submit an issue to ") + chalk.yellow('https://github.com/jhanstra/snipster/issues.'))}
    else {
      console.log(chalk.green('🎉  Successfully published your snippets to Atom'))
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
      const languageName = vscodeMatcher(language)
      let output = vscodeComment() + '\n' + JSON.stringify(vscodeSnippetMap[language], null, 2)
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
    console.log(chalk.green('🎉  Successfully published your snippets to VSCode'))
  }
}

const addSnippetsToSublime = () => {
  let failedToPublish = false
  let sublimeSnippetMap = _.cloneDeep(snippetMap)
  for(let language in sublimeSnippetMap) {
    if (sublimeSnippetMap.hasOwnProperty(language)) {
      for (let snippet in sublimeSnippetMap[language]) {
        let sublimeSnippet = {snippet: {}}
        sublimeSnippet.snippet.tabTrigger = sublimeSnippetMap[language][snippet].prefix
        sublimeSnippet.snippet.scope = sublimeMatcher(language)
        sublimeSnippet.snippet.content = jsontoxml.cdata(sublimeSnippetMap[language][snippet].body)
        let xml = jsontoxml(sublimeSnippet, { prettyPrint: true })
        try {
          write.sync(os.homedir() + '/Library/Application\ Support/Sublime\ Text\ 3/Packages/User/snipster/' + sublimeSnippetMap[language][snippet].prefix + '.' + language + '.sublime-snippet', sublimeComment() + xml)
        } catch(e) {
          failedToPublish = true
        }
      }
    }
  }
  if (failedToPublish) {
    console.log(chalk.green("Something went wrong while publishing your snippets to Sublime. Please check that you have Sublime installed.\nIf you feel there is an error, please submit an issue to ") + chalk.yellow('https://github.com/jhanstra/snipster/issues.'))
  } else {
    console.log(chalk.green('🎉  Successfully published your snippets to Sublime'))
  }
}

const addSnippetsToEditor = (editor) => {
  switch (editor) {
    case 'Atom':
      addSnippetsToAtom()
      break
    case 'VSCode':
      addSnippetsToVSCode()
      break
    case 'Sublime Text':
      addSnippetsToSublime()
      break
  }
}

const publish = async () => {
  const settingsFilePath = `${homedir()}/.snipster`
  let settings
  if (!fileExists(settingsFilePath)) {
    console.log('doesnt exist')
    init()
    return
  }
  settings = await parseJsonFile(settingsFilePath)
  let snippets = getFilesInDirectory(settings.directory)

  snippets.map(s => {
    const snippet = {
      language: s.substring(s.lastIndexOf('.') + 1),
      prefix: s.substring(s.lastIndexOf('/') + 1, s.lastIndexOf('.')),
      body: fs.readFileSync(s, { encoding: 'utf-8'})
    }
    addSnippetToMap(snippet);
  })
  // console.log('snip', snippets)

  let editors = process.argv[3] ? process.argv.slice(3) : settings.editors
  editors.map(editor => {
    addSnippetsToEditor(editor)
  })
}

module.exports = publish