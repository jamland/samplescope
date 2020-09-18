const { notarize } = require('electron-notarize');

// load env variables to this process
require('dotenv').config();

// Path from here to your build app executable:
const buildOutput = require('path').resolve(
  __dirname,
  '../..',
  'out',
  'Samplescope-darwin-x64',
  'Samplescope.app'
);

module.exports = function () {
  if (process.platform !== 'darwin') {
    console.log('Not a Mac; skipping notarization');
    return;
  }

  console.log('\n  Notarizing App at ', buildOutput);

  return notarize({
    appBundleId: 'com.github.jamland.samplescope',
    appPath: buildOutput,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_ID_PASSWORD,
  }).catch((e) => {
    console.error(e);
    throw e;
  });
};
