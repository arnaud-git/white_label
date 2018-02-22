const spawn = require('child_process').spawn;
const fs = require('fs');
require('colors');

function cleanFolder(path, cb) {
  console.log(('Deleting ' + path).red);
  const rmDir = spawn('rm', ['-Rf', path], { stdio: 'inherit' });

  rmDir.on('close', code => {
    if (code !== 0) {
      console.log('Error during the deletion'.red);
      cb(code);
      return;
    }

    console.log('Recreating ' + path);
    fs.mkdir(path, err => {
      if (err) {
        console.log('Error during the creation'.red);
        console.log(err);
        return cb(err);
      }
      return cb();
    });
  });
}

module.exports = {
  cleanFolder
};
