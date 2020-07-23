import React, { useState, useContext, useEffect } from 'react';
import { useAudio } from 'react-use';

import { AppContext } from '~/context/App.context';
import './index.css';

const AudioPlayer = () => {
  const { selectedSample } = useContext(AppContext);
  const [audioPlayerProps, setAudioPlayerProps] = useState({
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    autoPlay: false,
  });

  useEffect(() => {
    if (selectedSample && selectedSample.url) {
      const audioFile = selectedSample.previews['preview-hq-mp3'];

      setAudioPlayerProps({
        src: audioFile,
        autoPlay: true,
      });
    }
  }, [selectedSample?.url]);

  const [audio, audioState, controls] = useAudio(
    <audio {...audioPlayerProps} />
  );

  return (
    <div className="player-wrapper">
      <div>
        {/* audio is React's <audio> element that you have to insert somewhere in your render tree */}
        <small>{audio}</small>
        {/* <small style={{ fontSize: '.75em' }}>
            <pre>{JSON.stringify(audioState, null, 2)}</pre>
          </small> */}

        <button className="button" onClick={controls.play}>
          Play
        </button>
        <button className="button button-outline" onClick={controls.pause}>
          Pause
        </button>

        <button className="button button-outline" onClick={controls.mute}>
          Mute
        </button>
        <button className="button button-outline" onClick={controls.unmute}>
          Un-mute
        </button>
        <br />
        <button
          className="Namebutton button-outline"
          onClick={() => controls.volume(0.1)}
        >
          Volume: 10%
        </button>
        <button
          className="button button-outline"
          onClick={() => controls.volume(0.5)}
        >
          Volume: 50%
        </button>
        <button
          className="button button-outline"
          onClick={() => controls.volume(1)}
        >
          Volume: 100%
        </button>
        <button
          className="Namebutton button-outline"
          onClick={() => controls.seek(audioState.time - 5)}
        >
          -5 sec
        </button>
        <button
          className="Namebutton button-outline"
          onClick={() => controls.seek(audioState.time + 5)}
        >
          +5 sec
        </button>
      </div>
    </div>
  );
};

export default React.memo(AudioPlayer);
