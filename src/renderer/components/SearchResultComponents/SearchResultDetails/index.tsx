import React, { useContext } from 'react';

import { AppContext } from '~/context/App.context';
import PreviewDetails from './PreviewDetails';
import InstanceDetails from './InstanceDetails';
import './index.css';

const SearchResultDetails = () => {
  const { selectedSample } = useContext(AppContext);
  console.log('selectedSample', selectedSample);

  const handleDownloadFile = () => {
    console.log('handleDownloadFile');
  };

  if (!selectedSample) return null;

  console.log('selectedSample', selectedSample);

  return (
    <div className="sample-details-section">
      <div>
        <div style={{ height: '40px' }}>
          {selectedSample?.images && (
            <img
              style={{
                mixBlendMode: 'color-dodge',
                width: '100%',
                height: '40px',
              }}
              src={selectedSample.images.waveform_m}
              alt=""
            />
          )}
        </div>
        <PreviewDetails sample={selectedSample} />
        <InstanceDetails sample={selectedSample} />
      </div>
    </div>
  );
};

export default React.memo(SearchResultDetails);
