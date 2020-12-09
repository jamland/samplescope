import Bugsnag from '@bugsnag/js';
import userId from '../../main/userId';

const BUGSNAG_MAIN_API_KEY = '8daa28b93dd39ce3245ecc43d4860a58';

/**
 * Bugsnag main process tracked as Node.js app
 * It doesn't store user IP by default
 */

Bugsnag.start({
  apiKey: BUGSNAG_MAIN_API_KEY || '',
  appVersion: process.env.npm_package_version ?? 'unknown',
  user: { id: userId },
});

// Bugsnag.notify(new Error('🩸 MAIN PROCESS'));
