#!/usr/bin/env node --harmony
'use strict'

const snipster = require('commander')

const init = require('./commands/init')
const publish = require('./commands/publish')
const add = require('./commands/add')
const list = require('./commands/list')
const help = require('./commands/help')

snipster
  .command('init')
  .description('set up snipster with your editors and snippets directory')
  .action((req, optional) => {
    init()
  })

snipster
  .command('publish [editors]')
  .description('publish snippets to all editors [or choose which editors to publish to]')
  .action((req, optional) => {
    publish()
  })

snipster
  .command('add')
  .description('set up snipster with your editors and snippets directory')
  .action((req, optional) => {
    add()
  })

snipster
  .command('list [scope]')
  .description("list all snippets in user's snippets directory [or filter by language scope]")
  .action((req, optional) => {
    list()
  })

snipster
  .command('help')
  .description('provide help with snipster')
  .action((req, optional) => {
    help()
  })

if (!['add', 'init', 'publish', 'list', 'help'].includes(process.argv[2])) {
  publish()
}

snipster.parse(process.argv);

