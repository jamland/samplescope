import React, { useEffect, useRef, useState, useContext } from 'react';
import WaveSurfer, { WaveSurferParams } from 'wavesurfer.js';

import { SamplePreview } from '@modules/freesound-search/freesound.types';
import LoaderThreeDots from '@components/icons/LoaderThreeDots.svg';
import eventEmitter from '@modules/EventEmitter';
import { AppContext } from '~/context/App.context';

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
  sample: SamplePreview;
  volume: number;
}

enum seekDirection {
  forward,
  rewind,
}

/**
 * This component play audio and generates / show waveform for it
 * using wavesurfer.js
 */
const AudioPlayer: React.FC<Props> = ({ sample, volume }: Props) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer>();
  const [waveFormLoaded, setWaveformLoaded] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const { setPlaying } = useContext(AppContext);

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

    const autoPlayEvent = eventEmitter.subscribe(eventEmitter.autoplay, () => {
      setAutoPlay(true);
    });

    const playPauseEvent = eventEmitter.subscribe(
      eventEmitter.playPause,
      playPause
    );

    const seekForwardEvent = eventEmitter.subscribe(
      eventEmitter.seekForward,
      () => {
        console.log('forward...');
        seekForward();
      }
    );

    const seekRewindEvent = eventEmitter.subscribe(
      eventEmitter.seekRewind,
      () => {
        console.log('rewind...');
        seekRewind();
      }
    );

    return () => {
      playEvent.unsubscribe();
      autoPlayEvent.unsubscribe();
      playPauseEvent.unsubscribe();
      seekForwardEvent.unsubscribe();
      seekRewindEvent.unsubscribe();
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

          if (autoPlay) {
            console.log('autplaying.................🔊');
            wavesurfer.current.play();
            setAutoPlay(false);
          }
        }
      });

      wavesurfer.current.on('play', function () {
        if (wavesurfer.current) {
          console.log('🔥 play');
          setPlaying(true);
        }
      });

      wavesurfer.current.on('pause', function () {
        if (wavesurfer.current) {
          console.log('🔥 pause');
          setPlaying(false);
        }
      });

      wavesurfer.current.on('finish', function () {
        if (wavesurfer.current) {
          console.log('🔥 finish');
          setPlaying(false);
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
      // wavesurfer.current.skipBackward();
      wavesurfer.current.stop();
      wavesurfer.current.play();
    } else {
      wavesurfer.current.stop();
    }
  };

  const playPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
    }
  };

  const seekForward = () => {
    if (wavesurfer.current) {
      const seekTime = getSeekTime(seekDirection.forward);
      wavesurfer.current.seekTo(seekTime);
    }
  };

  const seekRewind = () => {
    if (wavesurfer.current) {
      const seekTime = getSeekTime(seekDirection.rewind);
      wavesurfer.current.seekTo(seekTime);
    }
  };

  const getSeekTime = (choice: seekDirection) => {
    const seekBy = 5;
    const currentTime = wavesurfer.current.getCurrentTime();
    const duration = wavesurfer.current.getDuration();
    const onePercent = duration / 100;
    const direction = choice === seekDirection.forward ? 1 : -1;

    const newTime = currentTime + onePercent * seekBy * direction;
    const newTimeInPercents = newTime / onePercent;
    // Seek time need to be within [0..1]
    console.log('newTimeInPercents', newTimeInPercents);

    const seekTime =
      choice === seekDirection.forward
        ? Math.min(newTimeInPercents / 100, 1)
        : Math.max(newTimeInPercents / 100, 0);

    return seekTime;
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
