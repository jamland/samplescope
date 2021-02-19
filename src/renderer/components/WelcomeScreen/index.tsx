import React from 'react';

// import LoaderBars from '@components/icons/LoaderBars.svg';
// import LoaderThreeDots from '@components/icons/LoaderThreeDots.svg';
import PromoBg from '~/images/music.jpeg';

import './index.css';

const WelcomeScreen: React.FC<{}> = () => {
  return (
    <div
      className="sample-details-section"
      style={{
        backgroundColor: 'rgb(39,44,55)',
        display: 'flex',
        justifyContent: 'flex-end',
        fontStyle: 'italic',
        height: 'auto',
      }}
    >
      <img
        src={PromoBg}
        style={{
          objectFit: 'contain',
          borderRadius: '10px',
          position: 'absolute',
          zIndex: 0,
          top: '4em',
          left: 0,
        }}
      />

      <div
        style={{
          padding: '2em',
          position: 'relative',
          marginBottom: '1em',
          marginTop: '25vh',
        }}
      >
        <h1
          style={{
            fontSize: '6vw',
            whiteSpace: 'nowrap',
            marginBottom: '.5em',
          }}
        >
          <b>Samplescope</b>
        </h1>

        <h3>Use your keyboard to control things!</h3>

        <ul>
          <li style={{ fontStyle: 'italic' }}>
            Use <kbd>Space</kbd> &amp; <kbd>Enter ↵</kbd> to play/pause and
            replay sound.
          </li>

          <li style={{ fontStyle: 'italic' }}>
            Navigate list with <kbd>↓</kbd> &amp; <kbd>↑</kbd>
          </li>

          <li style={{ fontStyle: 'italic' }}>
            Seek track with <kbd>←</kbd> &amp; <kbd>→</kbd>
          </li>

          <li style={{ fontStyle: 'italic' }}>
            Focus search input with <kbd>⌘</kbd>+<kbd>F</kbd>
          </li>
        </ul>
      </div>

      {/* <AudioPlayerWithVolume sample={selectedSample} />

      <div className="sample-details-text">
        <h3>{selectedSample.name}</h3>

        <InstanceDetails sample={selectedSample} />
      </div> */}

      {/* <DownloadButton sample={selectedSample} /> */}
    </div>
  );
};

export default React.memo(WelcomeScreen);
