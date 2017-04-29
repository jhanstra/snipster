const fs = require('fs')

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
}

module.exports = getSnippetsFromDirectory