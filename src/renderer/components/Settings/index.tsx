import React, { useState, useEffect } from 'react';

import analytics from '@modules/analytics.renderer';
import eventEmitter from '@modules/EventEmitter';
import BrowserLink from '@components/BrowserLink';
import SettingsHeader from './SettingsHeader';
import ServiceList from './ServiceList';
import { Twitter, GitHub } from 'react-feather';
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

    if (isOpen) {
      analytics.screenview('SETTINGS');
    }

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
            <p>
              Version:{'  '}
              {process.env.npm_package_version}
            </p>
            <p>
              Contacts:{'  '}
              <BrowserLink
                href="https://twitter.com/dadasunrise"
                data-link="https://twitter.com/dadasunrise"
                text={<Twitter />}
              />
              {'  '}
              <BrowserLink
                href="https://github.com/jamland"
                data-link="https://github.com/jamland"
                text={<GitHub />}
              />
            </p>
            <p>
              License:{'  '}
              <BrowserLink
                href="https://github.com/jamland/samplescope/blob/master/LICENSE"
                data-link="https://github.com/jamland/samplescope/blob/master/LICENSE"
                text="⚖️ MIT"
              />
            </p>
            <p>
              Privacy:{'  '}
              <BrowserLink
                href="https://github.com/jamland/samplescope/blob/master/PRIVACY"
                data-link="https://github.com/jamland/samplescope/blob/master/PRIVACY"
                text="Read on GitHub"
              />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
