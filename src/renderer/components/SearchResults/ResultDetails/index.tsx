import React, { useState, useContext } from 'react';

import { AppContext } from '~/context/App.context';
import AudioPlayer from '@components/AudioPlayer';
import { SampleInstance } from '@modules/freesound-search/freesound.types';
import InstanceDetails from './InstanceDetails';
import DownloadButton from './DownloadButton';
import LoaderBars from '@components/icons/LoaderBars.svg';
import LoaderThreeDots from '@components/icons/LoaderThreeDots.svg';
import './index.css';

const ResultDetails: React.FC<{}> = () => {
  const { selectedSample } = useContext(AppContext);

  if (!selectedSample) return null;

  return (
    <div className="sample-details-section">
      <AudioPlayerWithVolume sample={selectedSample} />

      <div className="sample-details-text">
        <h3>{selectedSample.name}</h3>

        <InstanceDetails sample={selectedSample} />
      </div>

      <DownloadButton sample={selectedSample} />
    </div>
  );
};

/**
 * Component to wrap volume and audio player
 */

interface AudioPlayerWithVolumeProps {
  sample: SampleInstance;
}

const AudioPlayerWithVolume: React.FC<AudioPlayerWithVolumeProps> = ({
  sample,
}: AudioPlayerWithVolumeProps) => {
  const [volume, setVolume] = useState(0.5);

  const onVolumeChange = (e: Event) => {
    const { target } = e;
    const updatedVolume = +target.value;
    if (updatedVolume) {
      setVolume(updatedVolume);
    }
  };

  return (
    <div className="audio-player-container">
      <div className="audio-player-volume">
        <input
          type="range"
          id="volume"
          name="volume"
          // waveSurfer recognize value of `0` same as `1`
          //  so we need to set some zero-ish value for silence
          min="0.001"
          max="1.5"
          step=".005"
          onChange={onVolumeChange}
          defaultValue={volume}
          title={volume * 100 + '%'}
        />
      </div>

      <div className="audio-player-wave-container">
        <AudioPlayer sample={sample} volume={volume} />
      </div>
    </div>
  );
};

export default React.memo(ResultDetails);
