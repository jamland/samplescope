import React, { Profiler } from 'react';

import SearchResultComponents from './components/SearchResultComponents';
import AppHeader from '@components/AppHeader';
import AudioPlayer from '@components/AudioPlayer';
import { AppContextProvider } from './context/App.context';

import './styles/global.css';
import './styles/theme.css';
import './App.css';

const App = () => {
  return (
    <AppContextProvider value={undefined}>
      <Profiler id="App" onRender={() => {}}>
        <div className="app-shell">
          <AppHeader />
          <SearchResultComponents />
          <AudioPlayer />

          {/* <SettingsScreen /> */}

          {/* <Content /> */}
        </div>
      </Profiler>
    </AppContextProvider>
  );
};

export default App;
