import React, { useRef, useCallback, useContext } from 'react';
import { useKeyPressEvent } from 'react-use';

import {
  SampleList,
  SamplePreview,
} from '@modules/freesound-search/freesound.types';
import { AppContext } from '~/context/App.context';
import SearchResultListItem from './SearchResultListItem';
import eventEmitter from '@modules/EventEmitter';

type Props = {
  loading: boolean;
  hasMore: boolean;
  samples: SampleList;
  updatePagination: () => void;
};

type Ref = IntersectionObserver;

const SearchResultList: React.FunctionComponent<Props> = ({
  loading,
  hasMore,
  samples,
  updatePagination,
}: Props) => {
  // observer persist over rerenders with ref
  const observer = useRef<Ref>();
  const {
    selectedSample,
    setSelectedSample,
    isPlaying,
    setPlaying,
    isKeyShortcutsActive,
  } = useContext(AppContext);

  // each time last item ref created we call this fn
  const lastSampleElementRef = useCallback(
    (node) => {
      // if loading don't trigger scroll
      // otherwise it will constantly call API
      if (loading) return;

      // remove ref from prev node
      // so new will be hooked correctly
      if (observer.current) observer.current.disconnect();

      // asynchronously observe changes in the intersection
      observer.current = new IntersectionObserver((entries) => {
        // if node is visible on screen && hasMore
        if (entries[0].isIntersecting && hasMore) {
          updatePagination();
        }
      });

      // connect observer to the new node
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const setRefForLastItemInList = (samples: SampleList, index: number) =>
    samples.length === index + 1 ? { ref: lastSampleElementRef } : {};

  const onItemClick = (sample: SamplePreview) => {
    if (sample.id !== selectedSample?.id) setSelectedSample(sample);
  };

  const onNextClick = () => {
    const indexSelected = samples.findIndex(
      (el) => el.id === selectedSample?.id
    );
    const nextSample = samples[indexSelected + 1];
    setSelectedSample(nextSample);
  };

  /**
   * If user click different file than active one
   * -> set new active sample to the context
   *    this will trigger loading this sample to the AudioPlayer.
   *    And set playing icon (isPlaying) to play state.
   *    And emit autoplay event on AudioPlayer,
   *    so it will start play as soon as will be loaded.
   *
   * -> Else, emit play / pause event on AudioPlayer.
   *    And play/pause icon (isPlaying)
   */
  const playPauseOnClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    sample: SamplePreview
  ) => {
    // prevent propogated click on whole sample row
    e.stopPropagation();

    if (sample.id !== selectedSample?.id) {
      setSelectedSample(sample);
      setPlaying(true);
      eventEmitter.emit(eventEmitter.autoplay);
    } else {
      eventEmitter.emit(eventEmitter.play, !isPlaying);
      setPlaying(!isPlaying);
    }
  };

  const playOrReplay = () => {
    if (selectedSample) {
      eventEmitter.emit(eventEmitter.play, true);
    } else {
      setSelectedSample(samples[0]);
      eventEmitter.emit(eventEmitter.play, true);
    }
  };

  const playPause = () => {
    if (selectedSample) {
      eventEmitter.emit(eventEmitter.playPause);
    } else {
      setSelectedSample(samples[0]);
      eventEmitter.emit(eventEmitter.playPause);
    }
  };

  /**
   *
   * Keyboard Shortcuts goes here
   *
   */
  useKeyPressEvent('ArrowDown', () => {
    const indexSelected = samples.findIndex(
      (el) => el.id === selectedSample?.id
    );

    if (indexSelected < samples.length - 1) {
      // select next or firest in list
      const nextSample = samples[indexSelected + 1];
      setSelectedSample(nextSample);
    }
  });

  useKeyPressEvent('ArrowUp', () => {
    const indexSelected = samples.findIndex(
      (el) => el.id === selectedSample?.id
    );
    if (indexSelected > 0) {
      const nextSample = samples[indexSelected - 1];
      setSelectedSample(nextSample);
    }
  });

  // useKeyPressEvent('ArrowRight', () => {
  //   if (isKeyShortcutsActive) {
  //     playPause();
  //   }
  // });

  useKeyPressEvent('Enter', playOrReplay);

  const SPACEBAR = ' ';
  useKeyPressEvent(SPACEBAR, () => {
    if (isKeyShortcutsActive) playPause();
  });

  useKeyPressEvent('ArrowLeft', () => {
    if (selectedSample && isKeyShortcutsActive) {
      eventEmitter.emit(eventEmitter.seekRewind);
    }
  });

  useKeyPressEvent('ArrowRight', () => {
    console.log('ArrowRight');

    if (selectedSample && isKeyShortcutsActive) {
      console.log('ArrowRight 2');

      eventEmitter.emit(eventEmitter.seekForward);
    }
  });

  /**
   *
   *
   */

  return (
    <div>
      <ul>
        {samples.map((sample, index) => {
          const refForLastItem = setRefForLastItemInList(samples, index);
          const isSampleActive = sample.id === selectedSample?.id;

          return (
            <SearchResultListItem
              isSampleActive={isSampleActive}
              key={sample.id}
              sample={sample}
              refForLastItem={refForLastItem}
              onItemClick={onItemClick}
              onPlayPauseClick={playPauseOnClick}
              isPlaying={isPlaying}
            />
          );
        })}
      </ul>
      <div>{loading && 'Loading...'}</div>
    </div>
  );
};

export default SearchResultList;
