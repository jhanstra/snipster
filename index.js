#!/usr/bin/env node --harmony
'use strict'

const snipster = require('commander')

const init = require('./commands/init')
const publish = require('./commands/publish')
const list = require('./commands/list')

snipster.version('0.0.1')

snipster
  .command('list [scope]')
  .description("list all snippets in user's snippets directory [or filter by language scope]")
  .action((req, optional) => {
    list()
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

  