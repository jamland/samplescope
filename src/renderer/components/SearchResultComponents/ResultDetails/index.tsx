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

  const isDetailsAvailable =
    selectedSample && (selectedSample as SampleInstance).previews;

  return (
    <div className="sample-details-section">
      <AudioPlayerWithLoader
        sample={selectedSample}
        loading={!isDetailsAvailable}
      />

      <div className="sample-details-text">
        <h3>{selectedSample.name}</h3>

        {isDetailsAvailable && <InstanceDetails sample={selectedSample} />}
      </div>

      <DownloadButton sample={selectedSample} />
    </div>
  );
};

interface AudioPlayerWithLoaderProps {
  sample: SampleInstance;
  loading: boolean;
}

const AudioPlayerWithLoader: React.FC<AudioPlayerWithLoaderProps> = ({
  sample,
  loading,
}: AudioPlayerWithLoaderProps) => {
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
        {loading && (
          <div className="audio-player-loader">
            <LoaderThreeDots height="15px" fill="white" />
          </div>
        )}
        {!loading && <AudioPlayer sample={sample} volume={volume} />}
      </div>
    </div>
  );
};

export default React.memo(ResultDetails);
