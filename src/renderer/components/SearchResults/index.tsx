import React, { useContext, useEffect } from 'react';

import SearchResultList from '~/components/SearchResults/SearchResultList';
import ResultDetails from '~/components/SearchResults/ResultDetails';
import ResultCount from '~/components/SearchResults/ResultCount';
import { WithErrorBoundary } from '@components/Errors/ErrorBoundary';
import useSampleSearch from '@hooks/useSampleSearch';
import { AppContext } from '~/context/App.context';

import './index.css';

/**
 * This component holds all request fetches for sample via `useSampleSearch` hook
 * It uses searchQuery from App.context set in <AppHeader />
 * It render result search list and sample details
 */

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
      <ResultDetails />

      <div style={{ backgroundColor: 'tomato' }}>{error && 'Error'}</div>

      <ResultCount loading={loading} foundCount={foundCount} />

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

const SearchResultsComponentsMemo = React.memo(SearchResultsComponents);
const WrappedSearchResultsComponents = WithErrorBoundary(
  SearchResultsComponentsMemo
);

export default React.memo(WrappedSearchResultsComponents);
