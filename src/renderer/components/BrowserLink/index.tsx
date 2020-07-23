import React from 'react';
import './index.css';

const { shell } = require('electron');

interface IProps {
  href: URL;
  text: string;
}

const BrowserLink = ({ href, text }: IProps) => (
  <a
    className="browser-link"
    onClick={() => shell.openExternal(href?.toString() ?? '')}
  >
    {text}
  </a>
);

export default BrowserLink;
