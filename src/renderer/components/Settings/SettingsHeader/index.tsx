import React from 'react';

import { CloudLightning, Info } from 'react-feather';
import { MenuItems } from '../index';
import './index.css';

const iconSize = '2.25em';

interface Props {
  active: MenuItems;
  onClick: (item: MenuItems) => void;
}

const SettingsHeader: React.FC<Props> = ({ active, onClick }: Props) => {
  return (
    <div className="app-header">
      <div className="settings-menu">
        <div
          className="settings-menu-item"
          data-active={active === MenuItems.About}
          onClick={() => onClick(MenuItems.About)}
        >
          <Info size={iconSize} />
          <div>
            <small>About</small>
          </div>
        </div>

        <div
          className="settings-menu-item"
          data-active={active === MenuItems.Services}
          onClick={() => onClick(MenuItems.Services)}
        >
          <CloudLightning size={iconSize} />
          <div>
            <small>SERVICES</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsHeader;
