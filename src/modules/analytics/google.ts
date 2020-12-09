import { app } from 'electron';
import ua from 'universal-analytics';
import userId from '../../main/userId';

const GA_API_KEY = 'UA-173935505-1';
const appName = app.getName();
const appVersion = app.getVersion();

const gaApiKey = process.env.GA_API_KEY || GA_API_KEY || '';
const visitor = ua(gaApiKey, userId);
// Allows filtering by the 'Application?' field in GA
// visitor.set('ds', 'app');
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

// trackEvent('Test Event', 'test action');
visitor.event('Event Category', 'Event Action').send();

function trackScreenView(screenName: string) {
  visitor.screenview(screenName, appName, appVersion).send();
}

function trackSessionTiming(time: string) {
  visitor.timing('User interaction', 'User Session Time', time).send();
}

export default { trackEvent, trackScreenView, trackSessionTiming };
