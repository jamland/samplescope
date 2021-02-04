import React from 'react';
import { useSetState } from 'react-use';

import freesoundSearch from '@modules/freesound-search';
import { SamplePreview } from '@modules/freesound-search/freesound.types';

/**
 * Context store some global data like searchQuery, selectedSample, foundCount, volume
 * selectedSample selected in list and used in <ResulDetails />
 */

export type FoundCount = number | undefined;
export type SelectedSample = SamplePreview | null;

type ContextProps = State & {
  setSearchQuery: (searchQuery: string) => void;
  setSelectedSample: (sample: SamplePreview) => void;
  setResultCount: (count: FoundCount) => void;
  setPlaying: (isPlaying: boolean) => void;
};

interface State {
  searchQuery: string;
  selectedSample: SelectedSample;
  foundCount: FoundCount;
  volume: number;
  isPlaying: boolean;
}

const initialState: State = {
  searchQuery: '',
  selectedSample: null,
  foundCount: undefined,
  volume: 0.5,
  isPlaying: false,
};

const defaultProps = {
  ...initialState,
  setSearchQuery: () => {},
  setSelectedSample: () => {},
  setResultCount: () => {},
  setPlaying: () => {},
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

  const setSelectedSample = async (selectedSample: SamplePreview | null) => {
    if (!selectedSample) return;

    setState({
      selectedSample,
      isPlaying: false,
    });
  };

  // unused
  const fetchSamplePreview = async (
    id: string | number
    // abortController: AbortController
  ): Promise<SamplePreview> => {
    // in case of new search use this
    return freesoundSearch.fetchSoundInstance({
      id,
      // abortController,
    });
  };

  const setPlaying = (isPlaying: boolean) => setState({ isPlaying });

  return (
    <AppContext.Provider
      value={{
        ...state,
        setSearchQuery,
        setSelectedSample,
        setResultCount,
        setPlaying,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
