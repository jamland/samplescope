import React, { useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { Download, DownloadCloud, Clock } from 'react-feather';
import electronOpenLinkInBrowser from 'electron-open-link-in-browser';

import BrowserLink from '~/components/BrowserLink';
import { WrapperStl, HeaderStl, DownloadStl } from './index.style';

const { shell } = require('electron');

const SampleDetails = ({ selectedSample }) => {
  useEffect(() => {
    ipcRenderer.on('download-done', onDownloadDone);

    return () => {
      ipcRenderer.removeListener('download-done', onDownloadDone);
    };
  }, []);

  const onDownloadDone = (event, arg) => {
    console.log(arg); // prints "pong"
  };

  const handleDownloadFile = (sample: object) => {
    console.log('handleDownloadFile', sample);
    const url = sample.previews['preview-hq-mp3'];
    ipcRenderer.send('download-file', { url });
  };

  console.log('selectedSample', selectedSample);

  if (!selectedSample) return null;

  const durationRound2Decimal = selectedSample.duration
    ? Math.floor(selectedSample.duration * 100) / 100
    : 0;

  return (
    <WrapperStl>
      {selectedSample && (
        <div>
          <hr />
          <HeaderStl>
            <div>
              <h2>{selectedSample.name}</h2>
              <div>
                by <a href="#">{selectedSample.username}</a>
                {selectedSample.pack && (
                  <>
                    {' '}
                    from{' '}
                    <a href="#" data-link={selectedSample.pack}>
                      {selectedSample.pack_name || 'Unnamed Pack'}
                    </a>
                  </>
                )}
                .{' ©'} <BrowserLink href={selectedSample.license} />
              </div>
              <div>
                <DownloadCloud /> {selectedSample.num_downloads} downloads
                <Clock /> {durationRound2Decimal}s
              </div>
            </div>
            <DownloadStl>
              <button
                className="tertiary"
                onClick={e => handleDownloadFile(selectedSample, e)}
              >
                <Download /> Download
              </button>{' '}
            </DownloadStl>
          </HeaderStl>

          <hr />

          <div>
            {selectedSample.tags.map(tag => (
              <>
                <mark key={tag} className="do">
                  {tag}
                </mark>{' '}
              </>
            ))}
          </div>
          {/* <p>{selectedSample.description}</p> */}
        </div>
      )}
    </WrapperStl>
  );
};

export default SampleDetails;
