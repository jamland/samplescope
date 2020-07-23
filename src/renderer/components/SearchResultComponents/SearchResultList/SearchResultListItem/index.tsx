import React from 'react';

import PlayIcon from '~/components/icons/PlayIcon';
import { SamplePreview } from '@modules/freesound-search/freesound.types';

import './index.css';

type Props = {
  sample: SamplePreview;
  isSampleActive: boolean;
  refForLastItem: {};
  onItemClick: (sample: SamplePreview) => void;
};

const SearchResultListItem: React.FunctionComponent<Props> = ({
  sample,
  isSampleActive,
  refForLastItem,
  onItemClick,
}: Props) => {
  return (
    <li
      {...refForLastItem}
      onClick={() => onItemClick(sample)}
      className="result-list-item"
      data-isactive={isSampleActive}
    >
      <PlayIcon width="32" />
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
