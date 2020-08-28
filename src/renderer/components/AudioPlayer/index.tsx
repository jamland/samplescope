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
  volume: number;
  // onWaveformLoaded: () => void;
}

const AudioPlayer: React.FC<Props> = ({ sample, volume }: Props) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer>();
  const [playing, setPlay] = useState(false);

  // on mount
  useEffect(() => {
    const playEvent = eventEmitter.subscribe(
      eventEmitter.play,
      (playOrStop: boolean) => {
        console.log('wavesurfer.current.isReady', wavesurfer.current?.isReady);

        if (wavesurfer.current?.isReady) playSample(playOrStop);
        else {
          if (!wavesurfer.current) return;
          wavesurfer.current.on('ready', function() {
            playSample(playOrStop);
          });
        }
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

  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.setVolume(volume);
    }
  }, [volume]);

  const playSample = (shouldPlay: boolean) => {
    if (!wavesurfer.current) return;
    setPlay(shouldPlay);

    if (shouldPlay) {
      wavesurfer.current.play();
    } else {
      wavesurfer.current.stop();
    }
  };

  return (
    <div className="audio-player-wave">
      <div id="waveform" ref={waveformRef} />
    </div>
  );
};

export default AudioPlayer;
