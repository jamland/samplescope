import React from 'react';

import BrowserLink from '~/components/BrowserLink';
import freesoundLogo from '~/images/freesound-logo.png';
import './index.css';

const ServiceList = () => {
  return (
    <div className="service-list">
      <div className="service-item">
        <img src={freesoundLogo} alt="asdf" />
        <h3>
          <BrowserLink
            href="https://freesound.org/"
            data-link="https://freesound.org/"
            text="Freesound.org"
          />
        </h3>
        <div>~480k free samples</div>
      </div>
    </div>
  );
};

export default ServiceList;
