import React, { Profiler } from 'react';

import SearchResults from './components/SearchResults';
import AppHeader from '@components/AppHeader';
import Settings from '@components/Settings';
import ErrorTracker from '@modules/analytics/bugsnag.renderer';
import { AppContextProvider } from './context/App.context';
import GA4 from '@modules/analytics/ga4';

import './styles/global.css';
import './styles/theme.css';
import './App.css';

import os from 'os';

const App = () => {
  const platform = os?.platform();
  try {
    GA4.register();
  } catch (error) {
    console.warn('Error registering GA4: ', error.message);
  }

  return (
    // @ts-ignore
    <ErrorTracker>
      <AppContextProvider value={undefined}>
        <Profiler id="App" onRender={() => {}}>
          <div className="app-shell" data-platform={platform}>
            <Settings />

            <div className="main-screen">
              <AppHeader />
              <SearchResults />
            </div>
          </div>
        </Profiler>
      </AppContextProvider>
    </ErrorTracker>
  );
};

export default App;
