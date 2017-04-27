const fs = require('fs')
const os = require('os')
const chalk = require('chalk')
const cson = require('cson')

const getLanguageScopeForAtom = require('../utils/atom-match')
const getLanguageFileNameForVSCode = require('../utils/code-match')

let snippetMap = {}
let atomSnippetMap = {}
let vscodeSnippetMap = {}

const getSnippetsFromDirectory = (dir) => {
  let results = [];
  fs.readdirSync(dir).map(file => {
    file = dir + '/' + file
    let stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      results = results.concat(getSnippetsFromDirectory(file))
    } 
    else {
      results.push(file)
    }
  });
  return results;
};

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
  for (let language in snippetMap) {
    if (snippetMap.hasOwnProperty(language)) {
      const languageSnippets = snippetMap[language]
      const languageScope = getLanguageScopeForAtom(language)
      atomSnippetMap[languageScope] = languageSnippets
    }
  }
  fs.writeFileSync(os.homedir() + '/.atom/snippets.cson', cson.stringify(atomSnippetMap, null, 2))
}

const addSnippetsToVSCode = () => {
  for(let language in snippetMap) {
    if (snippetMap.hasOwnProperty(language)) {
      const languageSnippets = snippetMap[language]
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
      addSnippetsToAtom()
      addSnippetsToVSCode()
    })
}

module.exports = publish