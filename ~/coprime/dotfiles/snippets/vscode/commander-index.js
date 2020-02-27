#!/usr/bin/env node --harmony
'use strict'

const $1 = require('commander')

const $2 = require('./commands/$2')
const $3 = require('./commands/$3')
const $4 = require('./commands/$4')
const $5 = require('./commands/$5')

$1.version('0.0.1')

$1
  .command('$1')
  .description('$5')
  .action((req, optional) => {
    $1()
  })

$1
  .command('$2')
  .description('$6')
  .action((req, optional) => {
    $2()
  })

$1
  .command('$3')
  .description('$7')
  .action((req, optional) => {
    $3()
  })

$1
  .command('$4')
  .description("$8")
  .action((req, optional) => {
    $4()
  })


$1.parse(process.argv);
