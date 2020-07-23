import React from 'react';
import PropTypes from 'prop-types';

import BrowserLink from '~/components/BrowserLink';
import { SelectedSample } from '~/context/App.context';

interface Props {
  sample: SelectedSample;
}

const PreviewDetails: React.FunctionComponent<Props> = ({ sample }: Props) => {
  return (
    <div>
      <h3>{sample.name}</h3>
      <div>
        by {sample.username} <PackNameMemo sample={sample} />
      </div>
      <div>
        {' ©'} <BrowserLink href={sample.license} text="License" />
      </div>
    </div>
  );
};

type PackNameProps = Props;

const PackName: React.FunctionComponent<Props> = ({
  sample,
}: PackNameProps) => {
  if (sample?.pack)
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

export default PreviewDetails;
