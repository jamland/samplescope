import React from 'react';

import PlayIcon from '~/components/icons/PlayIcon';
import { SampleInstance } from '@modules/freesound-search/freesound.types';

import './index.css';

type Props = {
  sample: SampleInstance;
  isSampleActive: boolean;
  refForLastItem: {};
  onItemClick: (sample: SampleInstance) => void;
  onPlayPauseClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    sample: SampleInstance
  ) => void;
};

const SearchResultListItem: React.FunctionComponent<Props> = ({
  sample,
  isSampleActive,
  refForLastItem,
  onItemClick,
  onPlayPauseClick,
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
        <PlayIcon width="24" />
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
