import React, { useEffect, useRef, useState } from 'react';

import WaveSurfer, { WaveSurferParams } from 'wavesurfer.js';
import { SampleInstance } from '@modules/freesound-search/freesound.types';

const formWaveSurferParams = (ref: HTMLDivElement): WaveSurferParams => ({
  container: ref,
  waveColor: '#eee',
  progressColor: 'OrangeRed',
  cursorColor: 'OrangeRed',
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 50,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
});

interface Props {
  sample: SampleInstance;
}

const AudioPlayer: React.FC<Props> = ({ sample }: Props) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    const url = sample.previews?.['preview-lq-mp3'];

    if (url && waveformRef.current) {
      const params = formWaveSurferParams(waveformRef.current);
      wavesurfer.current = WaveSurfer.create(params);

      wavesurfer.current.load(url);

      wavesurfer.current.on('ready', function() {
        // https://wavesurfer-js.org/docs/methods.html
        // wavesurfer.current.play();
        // setPlay(true);

        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      });
    }

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [sample.id]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const onVolumeChange = e => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };

  return (
    <div>
      <div id="waveform" ref={waveformRef} />
      <div>
        <input
          type="range"
          id="volume"
          name="volume"
          // waveSurfer recognize value of `0` same as `1`
          //  so we need to set some zero-ish value for silence
          min="0.001"
          max="1"
          step=".005"
          onChange={onVolumeChange}
          defaultValue={volume}
        />
        <button onClick={handlePlayPause}>{!playing ? 'Play' : 'Pause'}</button>
      </div>
    </div>
  );
};

export default AudioPlayer;
