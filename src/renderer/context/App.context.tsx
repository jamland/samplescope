import React from 'react';
import { useSetState } from 'react-use';

import freesoundSearch from '@modules/freesound-search';
import { SampleInstance } from '@modules/freesound-search/freesound.types';

/**
 * Context store some global data like searchQuery, selectedSample, foundCount, volume
 * selectedSample selected in list and used in <ResulDetails />
 */

export type FoundCount = number | undefined;
export type SelectedSample = SampleInstance | null;

type ContextProps = State & {
  setSearchQuery: (searchQuery: string) => void;
  setSelectedSample: (sample: SampleInstance) => void;
  setResultCount: (count: FoundCount) => void;
};

interface State {
  searchQuery: string;
  selectedSample: SelectedSample;
  foundCount: FoundCount;
  volume: number;
}

const initialState: State = {
  searchQuery: '',
  selectedSample: null,
  foundCount: undefined,
  volume: 0.5,
};

const defaultProps = {
  ...initialState,
  setSearchQuery: () => {},
  setSelectedSample: () => {},
  setResultCount: () => {},
};

export const AppContext = React.createContext<ContextProps>(defaultProps);

export const AppContextProvider = ({
  children,
}: React.ProviderProps<undefined>) => {
  const [state, setState] = useSetState(initialState);

  const setSearchQuery = (searchQuery: string) => {
    setSelectedSample(null);
    setState({ searchQuery });
  };

  const setResultCount = (foundCount: FoundCount) => setState({ foundCount });

  const setSelectedSample = async (selectedSample: SampleInstance | null) => {
    if (!selectedSample) return;

    setState({
      selectedSample,
    });
  };

  // unused
  const fetchSampleInstance = async (
    id: string | number
    // abortController: AbortController
  ): Promise<SampleInstance> => {
    // in case of new search use this
    return freesoundSearch.fetchSoundInstance({
      id,
      // abortController,
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setSearchQuery,
        setSelectedSample,
        setResultCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
