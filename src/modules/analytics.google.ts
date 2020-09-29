import { app } from 'electron';
import ua from 'universal-analytics';
import { JSONStorage } from 'node-localstorage';
import uuidv4 from 'uuid/v4';

const nodeStorage = new JSONStorage(app.getPath('userData'));
const appName = app.getName();
const appVersion = app.getVersion();
let userId;

if (process.env?.DEV_MODE === 'true') {
  userId = 'dev-user';
} else {
  // Retrieve the userid value, and if it's not there, assign it a new uuid.
  userId = nodeStorage.getItem('userid') || uuidv4();
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

export default { trackEvent, trackScreenView, trackSessionTiming };
