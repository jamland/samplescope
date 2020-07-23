import React, { useContext, useState } from 'react';
import { useDebounce } from 'react-use';

import { AppContext } from '~/context/App.context';
import SearchIcon from '~/components/icons/SearchIcon';
import './index.css';

const AppHeader = () => {
  const [inputValue, setInputValue] = useState('');
  const { setSearchQuery: setDebouncedValue } = useContext(AppContext);

  useDebounce(
    () => {
      setDebouncedValue(inputValue);
    },
    300,
    [inputValue]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    setInputValue(value);
  };

  return (
    <div className="app-header">
      <div className="app-header-search">
        <SearchIcon />
        <input
          // set value so it will be reflected here when changed from other places
          value={inputValue}
          type="text"
          placeholder="search"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default React.memo(AppHeader);
