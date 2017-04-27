#!/usr/bin/env node --harmony
'use strict'

const snipster = require('commander')

const init = require('./commands/init')
const publish = require('./commands/publish')

snipster.version('0.0.1')

snipster
  .command('list')
  .description('list all snippets')
  .action((req, optional) => {
  })

snipster
  .command('publish')
  .description('publish snippets to editors')
  .action((req, optional) => {
    publish()
  })

snipster
  .command('init')
  .description('set up snipster with your editors and snippets directory')
  .action((req, optional) => {
    init()
  })

snipster.parse(process.argv); 

  