import React, { Profiler } from 'react';

import SearchResults from './components/SearchResults';
import AppHeader from '@components/AppHeader';
import Settings from '@components/Settings';
import ErrorTracker from '~/components/Errors/ErrorTracker';
import { AppContextProvider } from './context/App.context';

import './styles/global.css';
import './styles/theme.css';
import './App.css';

import os from 'os';

console.log('os', os.platform())

const App = () => {
  const platform = os?.platform()

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
