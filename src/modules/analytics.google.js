const { app } = require('electron');
const ua = require('universal-analytics');
const uuid = require('uuid/v4');
const { JSONStorage } = require('node-localstorage');
const nodeStorage = new JSONStorage(app.getPath('userData'));

let userId;

const appName = app.getName();
const appVersion = app.getVersion();

if (process.env?.DEV_MODE === 'true') {
  userId = 'dev-user';
} else {
  // Retrieve the userid value, and if it's not there, assign it a new uuid.
  userId = nodeStorage.getItem('userid') || uuid();
}

// (re)save the userid, so it persists for the next app session.
nodeStorage.setItem('userid', userId);

const gaApiKey = process.env.GA_API_KEY || '';
const visitor = ua(gaApiKey, userId);
// Allows filtering by the 'Application?' field in GA
visitor.set('ds', 'app');
visitor.set('uid', userId);

function trackEvent(category, action, label, value) {
  visitor
    .event({
      ec: category,
      ea: action,
      el: label,
      ev: value,
    })
    .send();
}

function trackScreenView(screenName) {
  visitor.screenview(screenName, appName, appVersion).send();
}

function trackSessionTiming(time) {
  visitor.timing('User interaction', 'User Session Time', time).send();
}

module.exports = { trackEvent, trackScreenView, trackSessionTiming };
