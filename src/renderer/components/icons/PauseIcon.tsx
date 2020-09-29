import React from 'react';
import { SvgProps } from './types';

const SVG = ({
  style = {},
  fill = 'currentcolor',
  width = '100%',
  className = '',
  viewBox = '0 0 16 20',
}: SvgProps) => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ''}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      fill={fill}
      className="svg-icon"
      d="M4 0a2 2 0 012 2v16a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2h2zM2 2v16h2V2H2zM14 0a2 2 0 012 2v16a2 2 0 01-2 2h-2a2 2 0 01-2-2V2a2 2 0 012-2h2zm-2 2v16h2V2h-2z"
    />
  </svg>
);

export default React.memo(SVG);
