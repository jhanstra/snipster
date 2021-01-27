// This file is for general node utils that can/should be extracted to a separate repo soon
const process = require('process')
const os = require('os')
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const stripJsonComments = require('strip-json-comments')
const { promisify } = require('util')

// need to promisify async node functions to convert them from callbacks to promises
const writeFile = promisify(fs.writeFile)

const success = log => console.log(chalk.green(log))
const fail = log => console.log(chalk.red(log))
const log = log => {
  if (typeof log === 'undefined') {
    console.log(); return
  }
  console.log(chalk.yellow(log)); return
}
const home = () => os.homedir()

const exists = path => {
  return fs.existsSync(path)
}


// Options:
// type: 'filename', 'absPath', 'relPath'
// const files = (dir) => {
//   let results = [];
//   fs.readdirSync(dir).map(file => {
//     file = dir + '/' + file
//     let stat = fs.statSync(file)
//     if (stat && stat.isDirectory()) {
//       results = results.concat(files(file))
//     }
//     else {
//       results.push(file)
//     }
//   });
//   return results;
// }

const files = (dir, options = {}) => {
  const { levels = 100, type = 'fullPaths' } = options
  let results = []
  fs.readdirSync(dir).map(item => {
    item = dir + '/' + item
    let stat = fs.statSync(item)
    if (stat && stat.isDirectory() && levels > 0) {
      results = results.concat(files(item, { levels: levels - 1 }))
    }
    else {
      results.push(item)
    }
  })
  if (type === 'filename' || type === 'filenames') {
    return results.map(result => {
      return result.substring(result.lastIndexOf('/') + 1)
    })
  }
  return results;
}

const create = path => {
  const dirPath = path.substring(0, path.lastIndexOf('/'))
  return fs.mkdirSync(dirPath, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
  });
}

const write = (path, contents) => {
  const file = path.substring(path.lastIndexOf('/') + 1)
  if (!file) {
    fail('Write to a file please')
  }
  create(path)
  try {
    fs.writeFileSync(path, contents)
    return
  } catch (err) {
     fail(err)
  }
}

const readRaw = async (path, options) => {
  const readFile = promisify(fs.readFile)
  try {
    const res = await readFile(path, options || 'utf-8')
    return res
  } catch (err) {
    fail(err)
  }
}

const read = async (path, options) => {
  const res = await readRaw(path, options)
  return JSON.parse(stripJsonComments(res))
}

const copy = (pathFrom, pathTo) => {
  if (!exists(pathTo)) {
    create(pathTo)
  }
  fs.copySync(pathFrom, pathTo)
}

module.exports = {
  read,
  readRaw,
  write,
  copy,
  success,
  log,
  fail,
  home,
  exists,
  files,
}