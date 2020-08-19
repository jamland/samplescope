import React from 'react';

import freesoundLogo from '~/images/freesound-logo.png';
import './index.css';

const ServiceList = () => {
  return (
    <div className="service-list">
      <div className="service-item">
        <img src={freesoundLogo} alt="asdf" />
        <h3>
          <a href="https://freesound.org/">Freesound.org</a>
        </h3>
        <div>~450k free samples</div>
      </div>
    </div>
  );
};

export default ServiceList;
