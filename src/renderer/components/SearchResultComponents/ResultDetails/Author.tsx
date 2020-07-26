import React from 'react';

import BrowserLink from '~/components/BrowserLink';
import { SampleInstance } from '@modules/freesound-search/freesound.types';

interface Props {
  sample: SampleInstance;
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
        from{' '}
        <BrowserLink
          href={sample.pack}
          data-link={sample.pack}
          text={sample.pack_name || 'Unnamed Pack'}
        />
      </>
    );
  else return null;
};

const PackNameMemo = React.memo(PackName);

export default React.memo(Author);
