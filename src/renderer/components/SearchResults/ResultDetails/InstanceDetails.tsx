import React from 'react';

import BrowserLink from '~/components/BrowserLink';
import Author from './Author';
import { SamplePreview } from '@modules/freesound-search/freesound.types';

interface Props {
  sample: SamplePreview;
}

const InstanceDetails: React.FunctionComponent<Props> = ({ sample }: Props) => {
  const duration = formatDuration(sample.duration);
  const sampleRate = formatSampleRate(sample.samplerate);
  const channels = formatChannels(sample.channels);
  const filesize = formatBytesToSize(sample.filesize);
  const bitrate = sample.bitrate + ' Kbps';

  return (
    <>
      <div className="detailsTable">
        <div className="detailsCol">
          <DetailsRow key="duration" name="duration" value={duration} />
          <DetailsRow key="samplerate" name="samplerate" value={sampleRate} />
          <DetailsRow key="bitdepth" name="bitdepth" value={sample.bitdepth} />
          <DetailsRow key="bitrate" name="bitrate" value={bitrate} />
        </div>
        <div className="detailsCol">
          <DetailsRow key="type" name="type" value={sample.type} />
          <DetailsRow key="channels" name="channels" value={channels} />
          <DetailsRow key="filesize" name="filesize" value={filesize} />
          <DetailsRow
            key="downloads"
            name="downloads"
            value={sample.num_downloads}
          />
        </div>
      </div>

      <Author sample={sample} />

      <div>
        {' ©'} <BrowserLink href={sample.license} text="License" />
      </div>
      <div>Created: {sample.created}</div>

      <div>{sample.description}</div>
    </>
  );
};

const formatSampleRate = (rate: number) => rate / 1000 + ' kHz';
const formatDuration = (d: number) => {
  const durationRound2Decimal = d ? Math.floor(d * 100) / 100 : 0;
  return durationRound2Decimal + 's';
};
const formatChannels = (channels: number): string => {
  if (channels === 1) return 'Mono';
  else if (channels === 2) return 'Stereo';
  else return channels.toString();
};

const formatBytesToSize = (bytes: number): string => {
  var sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb'];
  if (bytes === 0) return '0 Byte';
  var i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
};

interface DetailsRowProps {
  name: string;
  value: string | number;
}

const DetailsRow: React.FC<DetailsRowProps> = ({
  name,
  value,
}: DetailsRowProps) => (
  <div className="detailsRow">
    <div className="detailsCellTh">
      <small>{name}</small>
    </div>
    <div className="detailsCellValue">{value}</div>
  </div>
);

export default InstanceDetails;
