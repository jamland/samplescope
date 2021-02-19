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
  setPlaying: (choice: boolean) => void;
  setKeyShortcutsActive: (choice: boolean) => void;
};

interface State {
  searchQuery: string;
  selectedSample: SelectedSample;
  foundCount: FoundCount;
  /**
   * Volume controlled via volume slider
   * This value applied to AudioPlayer when new wave loaded
   * And when this volume changed
   */
  volume: number;
  /**
   * This value ONLY for visual represantation of PLAY/PAUSE button
   * It is updated via click on PLAY/PAUSE button
   * And within AudioPlayer when it is started/paused/finished
   */
  isPlaying: boolean;
  /**
   * This variable used with keyboard shortcuts
   * If TRUE player' keyboard shortcuts doesn't work
   * So, we can disable key shortcuts while user uses search or Settings screen
   */
  isKeyShortcutsActive: boolean;
  /**
   * Should show welcome screen or not
   */
  isWelcomeScreenActive: boolean;
}

const initialState: State = {
  searchQuery: '',
  selectedSample: null,
  foundCount: undefined,
  volume: 0.5,
  isPlaying: false,
  isKeyShortcutsActive: true,
  isWelcomeScreenActive: true,
};

const defaultProps = {
  ...initialState,
  setSearchQuery: () => {},
  setSelectedSample: () => {},
  setResultCount: () => {},
  setPlaying: () => {},
  setKeyShortcutsActive: () => {},
};

export const AppContext = React.createContext<ContextProps>(defaultProps);

export const AppContextProvider = ({
  children,
}: React.ProviderProps<undefined>) => {
  const [state, setState] = useSetState(initialState);

  const setSearchQuery = (searchQuery: string) => {
    setSelectedSample(null);
    setState({ searchQuery: searchQuery.trim() });
  };

  const setResultCount = (foundCount: FoundCount) => setState({ foundCount });

  const setSelectedSample = async (selectedSample: SamplePreview | null) => {
    // if (!selectedSample) return;
    console.log('setSelectedSample');

    if (selectedSample) {
      setState({
        isWelcomeScreenActive: false,
      });
    }
    /**
     * Set selected sample and stop playing if anything
     * Hide Welcome screen when sample selected, so it will be shown only on app start
     */
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
  const setKeyShortcutsActive = (isKeyShortcutsActive: boolean) =>
    setState({ isKeyShortcutsActive });

  return (
    <AppContext.Provider
      value={{
        ...state,
        setSearchQuery,
        setSelectedSample,
        setResultCount,
        setPlaying,
        setKeyShortcutsActive,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
