import React from 'react';
import { SvgProps } from './types';

const SVG = ({
  style = {},
  fill = 'currentcolor',
  width = '100%',
  className = '',
  viewBox = '0 0 32 32',
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
      d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
    />
  </svg>
);

export default React.memo(SVG);
