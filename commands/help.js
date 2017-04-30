const exec = require('child_process').exec

const help = () => {
  exec('snipster --help', (err, stdout, stderr) => {
    if (err) {
      console.error(`error: ${err}`);
      return;
    }
    console.log(`${stdout}`);
  });
}

module.exports = help