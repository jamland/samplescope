import React, { useContext, useState } from 'react';
import { useDebounce } from 'react-use';

import { AppContext } from '~/context/App.context';
import SearchIcon from '~/components/icons/SearchIcon';
import { WithErrorBoundary } from '@components/Errors/ErrorBoundary';
import eventEmitter from '@modules/EventEmitter';
import analytics from '@modules/analytics/renderer';
// import GA4 from '@modules/analytics/ga4';

import freesoundLogo from '~/images/samplescope-icon.png';
import './index.css';

const AppHeader: React.FC<{}> = () => {
  const [inputValue, setInputValue] = useState('');
  const {
    setSearchQuery: setDebouncedValue,
    foundCount,
    setKeyShortcutsActive,
  } = useContext(AppContext);

  useDebounce(
    () => {
      setDebouncedValue(inputValue);

      // GA4.sendEvent('search', {
      //   search_term: inputValue ?? '',
      // });
      analytics.trackEvent({
        name: 'SEARCH_TEXT',
        action: 'Search query changed',
        label: 'Search Query',
        value: inputValue,
      });
    },
    300,
    [inputValue]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    setInputValue(value);
  };

  const handleSettingsOpen = () => {
    eventEmitter.emit(eventEmitter.toggleSidebar, true);
  };

  const onInputFocus = () => {
    console.log('onInputFocus');
    setKeyShortcutsActive(false);
  };

  const onInputBlur = () => {
    console.log('onInputBlur');
    setKeyShortcutsActive(true);
  };

  const placeholderText = foundCount
    ? `Search over ${Number(foundCount).toLocaleString()} samples`
    : 'Search';

  return (
    <div className="app-header">
      <div className="app-header-search">
        <div>
          <button
            className=" button-clear settings-toggler"
            onClick={handleSettingsOpen}
          >
            <div className="menu-icon">
              <div></div>
              <div></div>
              <div></div>
            </div>
            {/* <img src={sampleScopeIcon} alt="samplescope logo" /> */}
            <img src={freesoundLogo} alt="asdf" />
          </button>
        </div>

        <div className="search-box">
          <SearchIcon />
          <input
            // set value so it will be reflected here when changed from other places
            value={inputValue}
            type="text"
            placeholder={placeholderText}
            onChange={handleSearch}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            autoFocus={true}
          />
        </div>
      </div>
    </div>
  );
};

const AppHeaderMemo = React.memo(AppHeader);
const WrappedAppHeader = WithErrorBoundary(AppHeaderMemo);

export default React.memo(WrappedAppHeader);
