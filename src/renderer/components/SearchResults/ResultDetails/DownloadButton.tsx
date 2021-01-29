import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { DownloadCloud } from 'react-feather';

import { SelectedSample } from '~/context/App.context';
import { SamplePreview } from '@modules/freesound-search/freesound.types';
import analytics from '@modules/analytics/renderer';
// import GA4 from '@modules/analytics/ga4';

interface Props {
  sample: SamplePreview;
}

type ProgressNumbers = {
  percent: number;
  totalBytes: number;
  transferredBytes: number;
};

type ProgressResult = {
  message: string;
  result: string;
};

type DownloadProgress = ProgressNumbers | ProgressResult;

const DownloadButton: React.FC<Props> = ({ sample }: Props) => {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    ipcRenderer.on('download-done', onDownloadDone);
    ipcRenderer.on('download-progress', onProgressUpdate);

    return () => {
      ipcRenderer.removeListener('download-done', onDownloadDone);
    };
  }, []);

  const onProgressUpdate = (event: Event, downloadState: DownloadProgress) => {
    if ('percent' in downloadState && downloadState.percent) {
      const rounded = Math.round(downloadState.percent * 100);
      setProgress(rounded);
    }
  };

  const onDownloadDone = (event: Event, arg: any) => {
    setDownloading(false);
    console.log('download done!', arg);

    // TODO: error msg
    // {message: "no url param for download", result: "error"}

    // TODO: succes msg
  };

  const handleDownloadFile = () => {
    if (!sample || downloading) return;

    const url = getUrlFrom(sample);
    if (url) {
      const type = url.split('.').pop();
      const filename = sample.name + '.' + type;
      ipcRenderer.send('download-file', { url, filename });

      setDownloading(true);
      setProgress(0);

      analytics.trackEvent({
        name: 'DOWNLOAD',
        action: 'File Downloaded',
        label: sample.id,
        value: `#${sample.id} ${sample.name}`,
      });

      // GA4.sendEvent('download', {
      //   file_name: `${sample.id} ${sample.name}`,
      //   sample_id: sample.id,
      // });
    }
  };

  const isDetailsAvailable = sample && 'previews' in sample;

  return (
    <div className="download-container">
      <button
        onClick={handleDownloadFile}
        disabled={downloading || !isDetailsAvailable}
        className="button button-outline"
      >
        <DownloadCloud />
        {downloading ? (
          <>
            <span>Downloading</span>{' '}
            <span className="download-progress">{progress}%</span>
          </>
        ) : (
          'Download'
        )}
      </button>
    </div>
  );
};

// get file with highest available qualitty
// preview-hq-mp3 and preview-lq-mp3 (for ~128kbps quality and ~64kbps quality mp3 respectively)
// preview-hq-ogg and preview-lq-ogg (for ~192kbps quality and ~80kbps quality ogg respectively)
const getUrlFrom = (sample: SelectedSample) => {
  if (!sample || !('previews' in sample)) return null;

  if ('preview-hq-mp3' in sample.previews)
    return (sample as SamplePreview).previews['preview-hq-mp3'];
  else if ('preview-hq-ogg' in sample.previews)
    return (sample as SamplePreview).previews['preview-hq-ogg'];
  else if ('preview-lq-ogg' in sample.previews)
    return (sample as SamplePreview).previews['preview-lq-ogg'];
  else if ('preview-lq-mp3' in sample.previews)
    return (sample as SamplePreview).previews['preview-lq-mp3'];
  else return null;
};

export default React.memo(DownloadButton);
