import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer, { WaveSurferParams } from 'wavesurfer.js';

import { SampleInstance } from '@modules/freesound-search/freesound.types';
import LoaderThreeDots from '@components/icons/LoaderThreeDots.svg';
import eventEmitter from '@modules/EventEmitter';

import './index.css';

const formWaveSurferParams = (ref: HTMLDivElement): WaveSurferParams => ({
  container: ref,
  waveColor: '#e1e4e8',
  progressColor: '#dbab09',
  cursorColor: '#dbab09',
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
}

/**
 * This component play audio and generates / show waveform for it
 * using wavesurfer.js
 */
const AudioPlayer: React.FC<Props> = ({ sample, volume }: Props) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer>();
  const [waveFormLoaded, setWaveformLoaded] = useState(false);

  // on mount
  useEffect(() => {
    const playEvent = eventEmitter.subscribe(
      eventEmitter.play,
      (playOrStop: boolean) => {
        if (wavesurfer.current?.isReady) playSample(playOrStop);
        else {
          if (!wavesurfer.current) return;
          wavesurfer.current.on('ready', function () {
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
    setWaveformLoaded(false);

    if (url && waveformRef.current) {
      const params = formWaveSurferParams(waveformRef.current);
      wavesurfer.current = WaveSurfer.create(params);

      wavesurfer.current.load(url);

      wavesurfer.current.on('ready', function () {
        if (wavesurfer.current) {
          setWaveformLoaded(true);
          wavesurfer.current.setVolume(volume);
        }
      });

      wavesurfer.current.drawer.on('click', (e: Event) => {
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

    if (shouldPlay) {
      wavesurfer.current.skipBackward();
      wavesurfer.current.play();
    } else {
      wavesurfer.current.stop();
    }
  };

  return (
    <div className="audio-player-wave">
      {!waveFormLoaded && (
        <div className="audio-player-loader">
          <LoaderThreeDots height="15px" fill="white" />
        </div>
      )}
      <div id="waveform" ref={waveformRef} />
    </div>
  );
};

export default AudioPlayer;
