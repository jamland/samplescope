import React from 'react';
import { SvgProps } from './types';

const SVG = ({
  style = {},
  fill = 'currentcolor',
  width = '100%',
  className = '',
  viewBox = '0 0 17 20',
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
      d="M2 .566A2 2 0 013.043.86l12.164 7.433a2 2 0 010 3.414L3.043 19.14A2 2 0 010 17.434V2.566a2 2 0 012-2zm0 16.868L14.165 10 2 2.566v14.868z"
      fill={fill}
      className="svg-icon"
    />
  </svg>
);

export default React.memo(SVG);
