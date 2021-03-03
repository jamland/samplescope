import React from 'react';

import PromoBg from '~/images/music.png';
import './index.css';

const remote = window.require('electron').remote;
const platform = remote.getGlobal('process').platform;

const WelcomeScreen: React.FC<{}> = () => {
  const ctrlKeyName = platform === 'darwin' ? '⌘' : 'Ctrl';

  return (
    <div className="welcome-screen">
      <img src={PromoBg} className="welcome-img" />

      <div className="welcome-text">
        <h1>
          <b>Samplescope</b>
          <br />
        </h1>

        <h3>Use your keyboard to control things!</h3>

        <ul>
          <li>
            Use <kbd>Space</kbd> &amp; <kbd>Enter ↵</kbd> to play/pause and
            replay sound
          </li>

          <li>
            Navigate list with <kbd>↓</kbd> &amp; <kbd>↑</kbd>
          </li>

          <li>
            Seek track with <kbd>←</kbd> &amp; <kbd>→</kbd>
          </li>

          <li>
            Focus search input with <kbd>{ctrlKeyName}</kbd>+<kbd>F</kbd> (Find)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default React.memo(WelcomeScreen);
