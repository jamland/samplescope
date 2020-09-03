import React, { useState, useEffect } from 'react';

import SettingsHeader from './SettingsHeader';
import ServiceList from './ServiceList';
import eventEmitter from '@modules/EventEmitter';
import './index.css';

interface Props {}

export enum MenuItems {
  Services = 'services',
  About = 'about',
}

const Settings: React.FC<Props> = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(MenuItems.Services);

  useEffect(() => {
    const toggleSidebarEvent = eventEmitter.subscribe(
      eventEmitter.toggleSidebar,
      () => {
        setIsOpen(!isOpen);
      }
    );

    return () => {
      toggleSidebarEvent.unsubscribe();
    };
  }, [isOpen]);

  const handleMenuItemClick = (itemActive: MenuItems) => {
    setActiveMenuItem(itemActive);
  };

  return (
    <div className="settings-sidebar" data-open={isOpen}>
      <SettingsHeader active={activeMenuItem} onClick={handleMenuItemClick} />

      <div className="settings-content">
        {activeMenuItem === MenuItems.Services && <ServiceList />}

        {activeMenuItem === MenuItems.About && (
          <div className="about-app">
            <div>Version: {process.env.npm_package_version}</div>
            <div>Contacts: Twitter, Github</div>
            <div>License ....</div>
            <div>Privacy ....</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
