// This file is for general utils that can/should be extracted to a separate repo soon
const process = require('process')
const os = require('os')
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const { promisify } = require('util')

// need to promisify async node functions to convert them from callbacks to promises
const writeFile = promisify(fs.writeFile)

const success = log => console.log(chalk.green(log))
const fail = log => console.log(chalk.red(log))
const log = log => {
  if (typeof log === 'undefined') {
    console.log(); return
  }
  console.log(chalk.white(log)); return
}
const homedir = () => os.homedir()

const fileExists = path => {
  return fs.existsSync(path)
}

const getFilesInDirectory = (dir) => {
  let results = [];
  fs.readdirSync(dir).map(file => {
    file = dir + '/' + file
    let stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesInDirectory(file))
    }
    else {
      results.push(file)
    }
  });
  return results;
}

const write = (path, contents) => {
  try {
    fs.writeFileSync(path, contents)
    return
  } catch (err) {
     fail(err)
  }
}

const read = async (path, options) => {
  const readFile = promisify(fs.readFile)
  try {
    const res = await readFile(path, options)
    try {
      const json = JSON.parse(res)
      return json
    } catch (jsonErr) {}
    return res
  } catch (err) {
    fail(err)
  }
}

module.exports = {
  read,
  write,
  success,
  log,
  homedir,
  fileExists,
  getFilesInDirectory,
}