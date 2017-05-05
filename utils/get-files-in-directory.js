const fs = require('fs')

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

module.exports = getFilesInDirectory