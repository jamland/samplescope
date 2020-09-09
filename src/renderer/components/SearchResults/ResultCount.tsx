import React from 'react';

import { FoundCount } from '~/context/App.context';
import './index.css';

interface Props {
  loading: boolean;
  foundCount: FoundCount;
}

const ResultCount: React.FC<Props> = ({ loading, foundCount }: Props) => {
  return (
    <div className="result-count">
      {loading && <small>loading...</small>}
      {!loading && (
        <small>{Number(foundCount).toLocaleString()} samples found</small>
      )}
    </div>
  );
};

export default React.memo(ResultCount);
