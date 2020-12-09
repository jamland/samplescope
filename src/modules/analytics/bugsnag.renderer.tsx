import React from 'react';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import uuidv4 from 'uuid/v4';

const remote = window.require('electron').remote;
const appVersion = remote.app.getVersion();
const env = remote.getGlobal('process').env;

interface Props {}

let userId;
if (env?.DEV_MODE === 'true') {
  userId = 'dev-user';
} else {
  // Retrieve the userid value, and if it's not there, assign it a new uuid.
  userId = localStorage.getItem('userid') || uuidv4();
}

// (re)save the userid, so it persists for the next app session.
localStorage.setItem('userid', userId);

Bugsnag.start({
  apiKey: process.env.BUGSNAG_RENDERER_API_KEY || '',
  appVersion: appVersion ?? 'unknown',
  collectUserIp: false,
  user: { id: userId },
  plugins: [new BugsnagPluginReact()],
});

// Bugsnag.notify(new Error('🩸 TEST FROM RENDERER'));

const ErrorBoundary = Bugsnag.getPlugin('react')?.createErrorBoundary(React);

const ErrorTracker: React.PropsWithChildren<Props> = ({ children }: any) => {
  if (ErrorBoundary) return <ErrorBoundary>{children} </ErrorBoundary>;
  else return children;
};

export default ErrorTracker;
