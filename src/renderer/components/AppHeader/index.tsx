import React, { useContext, useState } from 'react';
import { useDebounce } from 'react-use';

import { AppContext } from '~/context/App.context';
import SearchIcon from '~/components/icons/SearchIcon';
import { WithErrorBoundary } from '@components/Errors/ErrorBoundary';
import './index.css';

const AppHeader: React.FC<{}> = () => {
  const [inputValue, setInputValue] = useState('');
  const { setSearchQuery: setDebouncedValue, foundCount } = useContext(
    AppContext
  );

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

  const placeholderText = foundCount
    ? `Search over ${Number(foundCount).toLocaleString()} samples`
    : 'Search';

  return (
    <div className="app-header">
      <div className="app-header-search">
        <SearchIcon />
        <input
          // set value so it will be reflected here when changed from other places
          value={inputValue}
          type="text"
          placeholder={placeholderText}
          onChange={handleSearch}
          autoFocus={true}
        />
      </div>
    </div>
  );
};

const AppHeaderMemo = React.memo(AppHeader);
const WrappedAppHeader = WithErrorBoundary(AppHeaderMemo);

export default React.memo(WrappedAppHeader);
