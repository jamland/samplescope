import React from 'react';

import PlayIcon from '~/components/icons/PlayIcon';
import PauseIcon from '~/components/icons/PauseIcon';
import { SamplePreview } from '@modules/freesound-search/freesound.types';

import './index.css';

type Props = {
  sample: SamplePreview;
  isSampleActive: boolean;
  refForLastItem: {};
  isPlaying: boolean;
  onItemClick: (sample: SamplePreview) => void;
  onPlayPauseClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    sample: SamplePreview
  ) => void;
};

const SearchResultListItem: React.FunctionComponent<Props> = ({
  sample,
  isSampleActive,
  refForLastItem,
  onItemClick,
  onPlayPauseClick,
  isPlaying,
}: Props) => {
  const onClickHandler = () => onItemClick(sample);
  const onPlayPauseClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => onPlayPauseClick(e, sample);

  return (
    <li
      {...refForLastItem}
      onClick={onClickHandler}
      className="result-list-item"
      data-isactive={isSampleActive}
    >
      <div onClick={onPlayPauseClickHandler}>
        {isPlaying && isSampleActive ? (
          <PauseIcon width="24" />
        ) : (
          <PlayIcon width="24" />
        )}
      </div>
      <div>
        <h5>{sample.name}</h5>

        {/* TODO: maybe remove */}
        {/* <div className="tag-list">
          {sample.tags?.length > 0 &&
            sample.tags.map(tag => <span key={tag}>{tag}</span>)}
        </div> */}
      </div>
    </li>
  );
};

export default React.memo(SearchResultListItem);
