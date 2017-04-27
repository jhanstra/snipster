const fs = require('fs')
const os = require('os')
const chalk = require('chalk')
const cson = require('cson')

const getLanguageScopeForAtom = require('../utils/atom-match')
const getLanguageFileNameForVSCode = require('../utils/code-match')

let snippetMap = {}

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
  const languages = language.replace('style', 'css+scss+less').split('+')
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

const addSnippetsToAtom = (snippetMap) => {
  for (let language in snippetMap) {
    if (snippetMap.hasOwnProperty(language)) {
      const languageSnippets = snippetMap[language]
      const languageScope = getLanguageScopeForAtom(language)
      snippetMap[languageScope] = languageSnippets
      delete snippetMap[language]
    }
  }
  fs.writeFile(os.homedir() + '/.atom/snippets.cson', cson.stringify(snippetMap, null, 2))
}

const addSnippetsToVSCode = (snippetMap) => {
  for(let language in snippetMap) {
    if (snippetMap.hasOwnProperty(language)) {
      const languageSnippets = snippetMap[language]
      const languageName = getLanguageFileNameForVSCode(language)
      for (let snippet in languageSnippets) {
        if (languageSnippets.hasOwnProperty(snippet)) {
          languageSnippets[snippet].body = languageSnippets[snippet].body.split('\n')
        }
      }
      fs.writeFile(os.homedir() + '/Library/Application Support/Code/User/snippets/' + languageName + '.json', JSON.stringify(languageSnippets, null, 2))
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
      addSnippetsToAtom(snippetMap)
      addSnippetsToVSCode(snippetMap)
    })
}

module.exports = publish