#!/usr/bin/env node

const program = require('commander');
const Promise = require('bluebird');
require('colors');

let config;

const shippingConfigs = require('./lib/shippingConfigs');

function selectShippingConfig() {
  console.log('');
  console.log(('Selecting the ' + config + ' shipping configuration to use in the javascript').yellow);
  return Promise.promisify(shippingConfigs.selectShippingConfig)(config)
    .catch(err => {
      console.log('Error selecting the configuration in the src/config folder'.red);
      console.log(err);
      throw err;
    })
    .then(() => {
      console.log('Shipping config selected'.green);
    });
}

program
  .version(require('../package').version)
  .description('Prepare the application to build for a given configuration and a given environment')
  .arguments('<config>')
  .action(cfg => {
    config = cfg;
  })
  .parse(process.argv);

selectShippingConfig();
