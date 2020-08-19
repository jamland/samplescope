import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer, { WaveSurferParams } from 'wavesurfer.js';

import { SampleInstance } from '@modules/freesound-search/freesound.types';
import eventEmitter from '@modules/EventEmitter';

import './index.css';

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
  // onWaveformLoaded: () => void;
}

const AudioPlayer: React.FC<Props> = ({ sample }: Props) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer>();
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // on mount
  useEffect(() => {
    const playEvent = eventEmitter.subscribe(
      eventEmitter.play,
      (playOrStop: boolean) => {
        playSample(playOrStop);
      }
    );

    return () => {
      playEvent.unsubscribe();
    };
  }, []);

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    const url = sample.previews?.['preview-lq-mp3'];
    setPlay(false);

    if (url && waveformRef.current) {
      const params = formWaveSurferParams(waveformRef.current);
      wavesurfer.current = WaveSurfer.create(params);

      wavesurfer.current.load(url);

      wavesurfer.current.on('ready', function() {
        if (wavesurfer.current) {
          // onWaveformLoaded();
          wavesurfer.current.setVolume(volume);
          setVolume(volume);
        }
      });

      wavesurfer.current.drawer.on('click', e => {
        if (wavesurfer.current) {
          const isPlaying = wavesurfer.current.isPlaying();
          if (!isPlaying) {
            e.preventDefault();
            playSample(true);
          }
        }
      });
    }

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => {
      if (wavesurfer.current) wavesurfer.current.destroy();
    };
  }, [sample.id]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const playSample = shouldPlay => {
    setPlay(shouldPlay);

    if (shouldPlay) {
      wavesurfer.current.play();
    } else {
      wavesurfer.current.stop();
    }
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
    <div className="audio-player">
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
      <div className="audio-player-wave">
        <div id="waveform" ref={waveformRef} />
      </div>
    </div>
  );
};

export default AudioPlayer;
