import React from 'react';

import { SamplePreview } from '@modules/freesound-search/freesound.types';

interface Props {
  sample: SamplePreview;
}

const Author: React.FC<Props> = ({ sample }: Props) => (
  <div>
    by {sample.username} <PackNameMemo sample={sample} />
  </div>
);

type PackNameProps = Props;

const PackName: React.FunctionComponent<Props> = ({
  sample,
}: PackNameProps) => {
  if (sample.pack)
    return (
      <>
        from {sample.pack_name || 'Unnamed Pack'}
      </>
    );
  else return null;
};

const PackNameMemo = React.memo(PackName);

export default React.memo(Author);
