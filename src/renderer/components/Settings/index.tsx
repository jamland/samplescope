import React, { useState, useEffect } from 'react';

import eventEmitter from '@modules/EventEmitter';
import SettingsHeader from './SettingsHeader';
import ServiceList from './ServiceList';
import AboutApp from './AboutApp';

import './index.css';

interface Props {}

export enum MenuItems {
  Services = 'services',
  About = 'about',
}

const Settings: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(MenuItems.Services);

  useEffect(() => {
    const toggleSidebarEvent = eventEmitter.subscribe(
      eventEmitter.toggleSidebar,
      () => {
        setIsOpen(!isOpen);
      }
    );

    // if (isOpen) {
    //   analytics.screenview('SETTINGS');
    // }

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

        {activeMenuItem === MenuItems.About && <AboutApp />}
      </div>
    </div>
  );
};

export default Settings;
