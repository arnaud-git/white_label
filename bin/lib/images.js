const shippingConfigs = require('./shippingConfigs');
const path = require('path');
const utils = require('./utils');
const ncp = require('ncp');

const iosAssetsDir = path.join(__dirname, '../../ios/white_label/Images.xcassets/LaunchImage.launchimage');
const destDirName = shippingConfigs.configDir;
const afterConfigDirName = 'splashScreens';

function copySplashcreens(config, options) {
  const initialDir = path.join(destDirName, config, afterConfigDirName, 'ios');
  const destDir = iosAssetsDir;

  return new Promise((successCb, errorCb) => {
    utils.cleanFolder(destDir, error => {
      if (error) return errorCb(error);

      console.log('Copying the ios splash screens');
      ncp(initialDir, destDir, err => {
        if (err) {
          console.log('Error during the copy of the ios folder'.red);
          console.log(err);
          errorCb(err);
          return;
        }
        console.log('iOS splash screen successfully restored'.green);
        successCb();
      });
    });
  });
}

function restoreSplashscreens(config, options) {
  console.log('');
  console.log(('Restoring the splashScreen for ' + config + ' config').yellow);

  return Promise.all([copySplashcreens(config, options)]);
}

module.exports = {
  restoreSplashscreens
};
