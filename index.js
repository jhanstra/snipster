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

const addSnippetToCode = (snippet) => {

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
          snippetType: s.substring(s.lastIndexOf('.') + 1)
          snippetName: s.substring(s.lastIndexOf('/') + 1, s.lastIndexOf('.'))
          snippetBody: fs.readFileSync(s, { encoding: 'utf-8'})
        }
        addSnippetToCode(snippet);
        
        
      })
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

  