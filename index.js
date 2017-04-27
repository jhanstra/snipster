#!/usr/bin/env node --harmony
'use strict'

const snipster = require('commander')
const chalk = require('chalk')
const co = require('co')
const prompt = require('co-prompt')
const _ = require('lodash')
const fs = require('fs')
const util = require('util')
const os = require('os')
const cson = require('cson')

prompt.message = ''

let userSettings = {}

snipster.version('0.0.1')
  .command('list')
  .description('list all snippets')
  .action((req, optional) => {
  })

const getAllSnippets = (dir) => {
  var results = [];
  fs.readdirSync(dir).forEach(file => {
    file = dir+'/'+file;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
        results = results.concat(getAllSnippets(file))
    } else results.push(file);
  });
  return results;
};

const getLanguageFileNameForVSCode = (language) => {
  switch(language) {
    case (''):
      return 'plaintext'
    case ('clj' || 'cljs' || 'cljc' || 'edn' ):
      return 'clojure'
    case ('coffee' || 'coffeelit'):
      return 'coffeescript'
    case ('cs'):
      return 'csharp'
    case ('cc'):
      return 'cpp'
    case ('f#' || 'fs' || 'fsi' || 'ml' || 'mli' || 'fsx' || 'fsscript'):
      return 'fsharp'
    case ('git' || 'gitcommit' || 'gitrebase'):
      return 'git-commit'
    case ('hbs'):
      return 'handlebars'
    case ('js' || 'javascript'):
      return 'javascript'
    case ('jsx' || 'react'):
      return 'javascriptreact'
    case ('make'):
      return 'makefile'
    case ('md' || 'markdown' || 'gfm' || 'mark' || 'mkdown' || 'mdml' || 'mdown' || 'mdtext'):
      return 'markdown'
    case ('m' || 'h' || 'objc' || 'objective-c' || 'objectivec' || 'oc'):
      return 'objective-c'
    case ('ps1' || 'ps' || 'pwrshell'):
      return 'powershell'
    case ('cshtml' || 'vbhtml'):
      return 'razor'
    case ('rb' || 'so' || 'ror' || 'rubyonrails'):
      return 'ruby'
    case ('sass' || 'scss'):
      return 'scss'
    case ('sh' || 'bash' || 'shell'):
      return 'shellscript'
    case ('ts'):
      return 'typescript'
    case ('yml'):
      return 'yaml'
    default:
      return language
  }
}

const getLanguageScopeForAtom = (language) => {
  switch(language) {
    case (''):
      return '.text.plain'
    case ('clj' || 'cljs' || 'cljc' || 'edn' ):
      return '.source.clojure'
    case ('coffee' || 'coffeelit'):
      return '.source.coffee'
    case ('cs', 'csharp'):
      return '.source.cs'
    case ('css'):
      return '.source.css'
    case ('cc' || 'cpp'):
      return '.source.cpp'
    case ('f#' || 'fs' || 'fsi' || 'ml' || 'mli' || 'fsx' || 'fsscript'):
      return '.source.fs'
    case ('git' || 'gitcommit' || 'gitrebase'):
      return '.text.git-commit'
    case ('handlebars' || 'hbs'):
      return '.source.hbs'
    case ('html'):
      return '.text.html'
    case ('js' || 'javascript'):
      return '.source.js'
    case ('jsx' || 'react'):
      return '.source.jsx'
    case ('less'):
      return '.source.css.less'
    case ('make'):
      return '.source.makefile'
    case ('md' || 'markdown' || 'gfm' || 'mark' || 'mkdown' || 'mdml' || 'mdown' || 'mdtext'):
      return '.source.gfm'
    case ('mustache'):
      return '.text.html.mustache'
    case ('m' || 'h' || 'objc' || 'objective-c' || 'objectivec' || 'oc'):
      return '.source.objc'
    case ('php'):
      return '.text.html.php'
    case ('ps1' || 'ps' || 'pwrshell'):
      return '.source.powershell'
    case ('cshtml' || 'vbhtml'):
      return '.source.razor'
    case ('rb' || 'so'):
      return '.source.html.erb'
    case ('ror' || 'rubyonrails'):
      return '.text.html.ruby'
    case ('sass' || 'scss'):
      return '.source.scss'
    case ('sh' || 'bash' || 'shell'):
      return '.source.shell'
    case ('ts'):
      return '.source.ts, .source.tsx'
    case ('xml'):
      return '.text.xml'
    case ('yml'):
      return '.source.yaml'
    default:
      return '.source.' + language
  }
}

let snippetMap = {}
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
      fs.writeFile(os.homedir() + '/Library/Application Support/Code/User/snippets/' + languageName + '.json', JSON.stringify(languageSnippets, null, 2), (err) => {
        console.log(chalk.red(err))
      })
    }
  }
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
  fs.writeFile(os.homedir() + '/.atom/snippets.cson', cson.stringify(snippetMap, null, 2), (err) => {
    console.log(chalk.red(err))
  })
  
}


snipster
  .command('publish')
  .description('publish snippets to editors')
  .action((req, optional) => {
    let userSettings = {}
    fs.readFile(os.homedir() + '/.snipster', (err, data) => {
      if (err) {return console.log(chalk.red(err)) }
      else { userSettings = JSON.parse(data) }
      let snippets = getAllSnippets(userSettings.directory)
      console.log(snippets)

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
      console.log(JSON.stringify(snippetMap, null, 2))
    })
    
  })

snipster
  .command('init')
  .description('set up snipster with your editors and snippets directory')
  .action((req, optional) => {
    co(function *() {
      console.log('\n')
      console.log(chalk.green("Let's set up snipster to easily manage your snippets."))

      /* Get snippets directory */
      console.log('\n')
      console.log(chalk.green("Where is your top-level snippets folder located?"))
      console.log(chalk.white("Hint: navigate to your snippets directory, type ") + chalk.yellow('pwd') + chalk.white(' and copy/paste the directory here.'))
      const directory = yield prompt('directory: ');

      /* Get text editors */
      console.log('\n')
      console.log(chalk.green("Which editors do you wish to publish snippets to? Enter all, comma-delimited."))
      console.log(chalk.white("Options: VSCode, Atom, Sublime, Brackets"))
      const editorsPrompt = yield prompt('editors: ')
      const editorsArray = editorsPrompt.replace(' ', '').split(',')
      let editors = []
      editorsArray.map(e => {
        if (e.includes('Code') || e.includes('code') || e == 'c' || e == 'vsc') { editors.push('VSCode') }
        else if (e.includes('Atom') || e.includes('atom') || e == 'a') { editors.push('Atom')}
        else if (e.includes('Subl') || e.includes('subl') || e == 's') { editors.push('Sublime')}
        else if (e.includes('Brackets') || e.includes('brackets') || e == 'b') { editors.push('Brackets')}
      })

      /* Store user settings and write to .snipster file in user's home directory */
      userSettings = {
        directory: directory,
        editors: editors
      }
      console.log(userSettings)
      fs.writeFile(os.homedir() + '/.snipster', JSON.stringify(userSettings, null, 2), err => {
        if (err) { return console.log(chalk.red(err)) }
        console.log(chalk.green("Your information has been saved! Run ") + chalk.yellow('snipster publish') + chalk.green(' to publish your snippets to your text editors.'))
        process.exit()
      })
    })
  })

snipster.parse(process.argv); 

  