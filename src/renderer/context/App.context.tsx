import React from 'react';
import { useSetState } from 'react-use';

import freesoundSearch from '@modules/freesound-search';
import {
  SamplePreview,
  SampleInstance,
} from '@modules/freesound-search/freesound.types';

type FoundCount = number | undefined;
export type SelectedSample = SamplePreview | SampleInstance | null;

type ContextProps = State & {
  setSearchQuery: (searchQuery: string) => void;
  setSelectedSample: (sample: SamplePreview) => void;
  setResultCount: (count: FoundCount) => void;
};

interface State {
  searchQuery: string;
  selectedSample: SelectedSample;
  selectedIsLoading: boolean;
  selectedIsLoaded: boolean;
  foundCount: FoundCount;
}

const initialState: State = {
  searchQuery: '',
  selectedSample: null,
  selectedIsLoading: false,
  selectedIsLoaded: false,
  foundCount: undefined,
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

  const setSearchQuery = (searchQuery: string) => setState({ searchQuery });
  const setResultCount = (foundCount: FoundCount) => setState({ foundCount });

  const setSelectedSample = async (selectedSample: SamplePreview) => {
    // set sample preview info as sample details, before more info loaded
    // so user will see at least something, while it loads
    setState({
      selectedSample,
      selectedIsLoading: true,
      selectedIsLoaded: false,
    });

    try {
      // get sample details
      const SampleInstance = await fetchSampleInstance(selectedSample.id);

      setState({
        selectedSample: SampleInstance,
      });
    } catch (error) {
      // TODO:
      console.error(error);
    } finally {
      setState({
        selectedIsLoading: false,
        selectedIsLoaded: true,
      });
    }
  };

  const fetchSampleInstance = async (
    id: string | number
    // TODO: loop how to abort it when user clicks next samples
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
