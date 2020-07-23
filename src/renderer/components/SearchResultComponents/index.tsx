import React, { useContext, useEffect } from 'react';

import SearchResultList from '~/components/SearchResultComponents/SearchResultList';
import SearchResultDetails from '~/components/SearchResultComponents/SearchResultDetails';
import useSampleSearch from '@hooks/useSampleSearch';
import { AppContext } from '~/context/App.context';

import './index.css';

const SearchResultsComponents = () => {
  const { searchQuery, setResultCount, foundCount } = useContext(AppContext);

  const {
    loading,
    error,
    samples,
    hasMore,
    setNextPageToLoad,
    meta,
  } = useSampleSearch(searchQuery);

  useEffect(() => {
    const count = meta.count;
    setResultCount(count);
  }, [meta.count]);

  const updatePagination = () => setNextPageToLoad();

  return (
    <div className="search-results-wrapper">
      <SearchResultDetails />

      <div style={{ backgroundColor: 'tomato' }}>{error && 'Error'}</div>

      <div
        style={{
          borderBottom: '1px solid rgba(0,0,0,.15)',
          padding: '.5em 2em',
        }}
      >
        {!loading && (
          <small>{Number(foundCount).toLocaleString()} samples found</small>
        )}
      </div>

      <div className="search-results-list">
        <SearchResultList
          loading={loading}
          hasMore={hasMore}
          samples={samples}
          updatePagination={updatePagination}
        />
      </div>
    </div>
  );
};

export default SearchResultsComponents;
