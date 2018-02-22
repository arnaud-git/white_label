const path = require('path');
const fs = require('fs');
const configDir = path.join(__dirname, '../../config/shippingConfig');

function updateShippingFile(config, callback) {
  const inputFile = path.join(__dirname, '../../config/selectedConfig.js.tml');
  const outputFile = path.join(__dirname, '../../config/selectedConfig.js');

  fs.readFile(inputFile, 'utf8', function(err, data) {
    if (err) return callback(err);

    const result = data.replace('{{config}}', config);

    fs.writeFile(outputFile, result, 'utf8', callback);
  });
}

function selectShippingConfig(config, callback) {
  updateShippingFile(config, callback);
}

module.exports = {
  configDir,
  selectShippingConfig
};
