import uuidv4 from 'uuid/v4';
const { app } = require('electron').remote;
const Nucleus = require('nucleus-nodejs');

console.log('Nucleus', Nucleus);

const { JSONStorage } = require('node-localstorage');
const nodeStorage = new JSONStorage(app.getPath('userData'));

let userId;

if (process.env?.DEV_MODE === 'true') {
  userId = 'dev-user';
} else {
  // Retrieve the userid value, and if it's not there, assign it a new uuid.
  userId = nodeStorage.getItem('userid') || uuidv4();
}

// (re)save the userid, so it persists for the next app session.
nodeStorage.setItem('userid', userId);

const nucleusApiKey = process.env.NUCLEUS_API_KEY || '';
Nucleus.init(nucleusApiKey);

Nucleus.setUserId(userId);

Nucleus.setProps({
  version: process.env.npm_package_version ?? 'unknown',
});

console.log('Nucleus', Nucleus);

export default Nucleus;
