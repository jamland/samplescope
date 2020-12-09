import Bugsnag from '@bugsnag/js';
const BUGSNAG_MAIN_API_KEY = '8daa28b93dd39ce3245ecc43d4860a58';

Bugsnag.start({
  apiKey: BUGSNAG_MAIN_API_KEY || '',
});

// Bugsnag.notify(new Error('🩸 MAIN PROCESS'));
