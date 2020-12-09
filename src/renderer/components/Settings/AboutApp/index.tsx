import React from 'react';

import BrowserLink from '~/components/BrowserLink';
import './index.css';

const appVersion = window.require('electron').remote.app.getVersion();

const AboutApp = () => {
  return (
    <div className="about-app">
      <p>
        Version
        <h2>{appVersion}</h2>
      </p>
      <p>
        License:{' '}
        <BrowserLink
          href="https://github.com/jamland/samplescope/blob/master/LICENSE"
          data-link="https://github.com/jamland/samplescope/blob/master/LICENSE"
          text="⚖️ MIT"
        />
        <br />
        Privacy:{' '}
        <BrowserLink
          href="https://github.com/jamland/samplescope/blob/master/PRIVACY"
          data-link="https://github.com/jamland/samplescope/blob/master/PRIVACY"
          text="Read on GitHub"
        />
      </p>
      <p>
        Contacts
        <h2>
          <BrowserLink
            href="https://twitter.com/dadasunrise"
            data-link="https://twitter.com/dadasunrise"
            text={<Twitter />}
          />
          {'  '}
          <BrowserLink
            href="https://github.com/jamland/samplescope/discussions"
            data-link="https://github.com/jamland/samplescope/discussions"
            text={<GitHub />}
          />
        </h2>
      </p>
    </div>
  );
};

const Twitter = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 250 204"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M78.62 203.59c94.34 0 145.94-78.16 145.94-145.94 0-2.22 0-4.43-.15-6.63A104.36 104.36 0 00250 24.47a102.38 102.38 0 01-29.46 8.07 51.47 51.47 0 0022.55-28.37 102.79 102.79 0 01-32.57 12.45C194.62-.286 169.357-4.424 148.895 6.527c-20.461 10.95-31.032 34.266-25.785 56.873A145.62 145.62 0 0117.4 9.81C3.786 33.246 10.74 63.229 33.28 78.28A50.91 50.91 0 0110 71.86v.65c.007 24.416 17.218 45.445 41.15 50.28a51.21 51.21 0 01-23.16.88c6.72 20.894 25.976 35.208 47.92 35.62a102.92 102.92 0 01-63.7 22A104.41 104.41 0 010 180.55a145.21 145.21 0 0078.62 23"
      fill="#1DA1F2"
      fillRule="nonzero"
    />
  </svg>
);

const GitHub = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 65 63"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M32.317.455C14.65.455.32 14.782.32 32.456c0 14.138 9.168 26.131 21.884 30.363 1.601.294 2.185-.694 2.185-1.542 0-.759-.028-2.772-.044-5.442-8.9 1.933-10.779-4.29-10.779-4.29-1.455-3.698-3.553-4.682-3.553-4.682-2.906-1.984.22-1.945.22-1.945 3.212.226 4.901 3.299 4.901 3.299 2.854 4.89 7.49 3.477 9.313 2.658.291-2.067 1.118-3.477 2.032-4.277-7.106-.807-14.577-3.554-14.577-15.816 0-3.493 1.248-6.35 3.295-8.586-.33-.81-1.428-4.065.314-8.47 0 0 2.686-.86 8.799 3.282 2.552-.712 5.29-1.065 8.011-1.079 2.719.014 5.455.367 8.011 1.079 6.11-4.142 8.791-3.281 8.791-3.281 1.746 4.404.648 7.66.32 8.469 2.051 2.235 3.289 5.093 3.289 8.586 0 12.294-7.483 14.999-14.61 15.79 1.147.989 2.17 2.941 2.17 5.927 0 4.277-.039 7.728-.039 8.778 0 .856.578 1.852 2.2 1.54C55.16 58.575 64.32 46.59 64.32 32.456 64.32 14.782 49.991.455 32.317.455"
      fill="#161514"
      fillRule="evenodd"
    />
  </svg>
);

export default AboutApp;
