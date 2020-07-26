import React, { useContext } from 'react';

import { AppContext } from '~/context/App.context';
import AudioPlayer from '@components/AudioPlayer';
import { SampleInstance } from '@modules/freesound-search/freesound.types';
import InstanceDetails from './InstanceDetails';
import DownloadButton from './DownloadButton';
import './index.css';

const ResultDetails: React.FC<{}> = () => {
  const { selectedSample } = useContext(AppContext);

  console.log('selectedSample', selectedSample);

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
  return (
    <div className="audio-player-container">
      {loading && <div>loading...</div>}
      {!loading && <AudioPlayer sample={sample} />}
    </div>
  );
};

export default React.memo(ResultDetails);
