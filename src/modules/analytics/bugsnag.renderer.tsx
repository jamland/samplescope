import React from 'react';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';

interface Props {}

Bugsnag.start({
  apiKey: process.env.BUGSNAG_RENDERER_API_KEY || '',
  plugins: [new BugsnagPluginReact()],
});

// Bugsnag.notify(new Error('🩸 TEST FROM MAKE'));

const ErrorBoundary = Bugsnag.getPlugin('react')?.createErrorBoundary(React);

const ErrorTracker: React.PropsWithChildren<Props> = ({ children }: any) => {
  if (ErrorBoundary) return <ErrorBoundary>{children} </ErrorBoundary>;
  else return children;
};

export default ErrorTracker;
