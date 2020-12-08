import Bugsnag from '@bugsnag/js';

Bugsnag.start({
  apiKey: process.env.BUGSNAG_MAIN_API_KEY || '',
});
