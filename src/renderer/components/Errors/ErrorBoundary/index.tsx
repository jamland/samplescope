import React from 'react';
import { AlertTriangle } from 'react-feather';
import { ErrorBoundary } from 'react-error-boundary';

import './index.css';

interface Props {
  error: Error;
  resetErrorBoundary?: () => {};
}

const ErrorFallback: React.FC<Props> = ({
  // componentStack,
  // resetErrorBoundary = () => {},
  error,
}: Props) => {
  return (
    <div role="alert" className="error-boundary">
      <div className="error-warning-section">
        <div className="error-warning-icon">
          <AlertTriangle />
        </div>
        <div className="error-warning-text">
          This section has been crashed.
          <br /> Restart app
          {/* <button onClick={resetErrorBoundary}>Try again</button> */}
        </div>
      </div>
      <div className="error-details">
        {console.warn(error.message)}

        {/* if (DEV) { */}
        {/* <pre style={{ color: 'red' }}>{error.message}</pre> */}
        {/* } */}
      </div>
    </div>
  );
};

// How to use reset

// onReset={() => {
//   setUsername('')
//   usernameRef.current.focus()
// }}
// resetKeys={[username]}

export const WithErrorBoundary = (Component: ReactNode) => (props: any) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Component {...props} />
  </ErrorBoundary>
);

export default ErrorBoundary;
