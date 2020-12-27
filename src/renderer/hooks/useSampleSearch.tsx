import { useEffect } from 'react';
import { useSetState } from 'react-use';

import freesoundSearch from '@modules/freesound-search';
import { SampleList } from '@modules/freesound-search/freesound.types';

const remote = window.require('electron').remote;
const env = remote.getGlobal('process').env;

/**
 * This is dump way to scale freesound.org resources.
 * Freesound have limit of 2k requests daily.
 * So, we randomly distribute it over array of different API keys
 */
const getApiKey = () => {
  // get key from renderer process otherwise from main process
  const apiKeys = [
    process.env.SAMPLESCOPE_FREESOUND_API_KEY_01 ??
      env.SAMPLESCOPE_FREESOUND_API_KEY_01,
    process.env.SAMPLESCOPE_FREESOUND_API_KEY_02 ??
      env.SAMPLESCOPE_FREESOUND_API_KEY_02,
    process.env.SAMPLESCOPE_FREESOUND_API_KEY_03 ??
      env.SAMPLESCOPE_FREESOUND_API_KEY_03,
    process.env.SAMPLESCOPE_FREESOUND_API_KEY_04 ??
      env.SAMPLESCOPE_FREESOUND_API_KEY_04,
  ];

  // TODO: set separate API key for dev purposes
  const apiKeyDev =
    process.env.SAMPLESCOPE_FREESOUND_API_KEY ??
    env.SAMPLESCOPE_FREESOUND_API_KEY;

  const randomInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const randomIdx = randomInteger(0, apiKeys.length);
  const apiKey = apiKeys[randomIdx] ?? apiKeyDev;
  return apiKey;
};

const apiKey = getApiKey();

interface State {
  loading: boolean;
  error: boolean;
  samples: SampleList;
  hasMore: boolean;
  meta: Meta;
  nextPageToLoad: string | null;
}

interface Meta {
  count: number;
  next: string | null;
  previous: string | null;
}

interface SearchResponse {
  results: any;
  count: any;
  next: any;
  previous: any;
}

const initMeta: Meta = {
  count: 0,
  next: null,
  previous: null,
};

const initialState: State = {
  loading: true,
  error: false,
  samples: [],
  hasMore: false,
  meta: initMeta,
  nextPageToLoad: null,
};

const useSampleSearch = (query: string) => {
  const [state, setState] = useSetState<State>(initialState);

  useEffect(() => {
    if (!apiKey) {
      // TODO: disaptch Error
    } else freesoundSearch.init(apiKey);
  }, []);

  // clear list when search text changed
  useEffect(() => {
    setState(initialState);
  }, [query]);

  useEffect(() => {
    setState({
      loading: true,
      error: false,
    });

    const abortController = new AbortController();

    (async function () {
      try {
        const freeSoundResponse = await fetchSamples(
          state.nextPageToLoad,
          query,
          abortController
        );

        if (freeSoundResponse) updateSampleList(freeSoundResponse);
      } catch (e) {
        console.dir('fetch error', e.name);
        if (e.name !== 'AbortError') {
          setState({ error: true });
        }
      }
    })();

    // abort last request on new one to avoid spamming API
    // * instead of debounce
    return () => abortController.abort();
  }, [query, state.nextPageToLoad]);

  const fetchSamples = async (
    url: string | null,
    query: string,
    abortController: AbortController
  ): Promise<SearchResponse | null> => {
    // in case of new search use this
    if (url === null) {
      return freesoundSearch.searchText({
        query,
        abortController,
      });
    } else {
      return freesoundSearch.getByURL(url, abortController);
    }
  };

  const updateSampleList = (freeSoundResponse: SearchResponse) => {
    if (!freeSoundResponse) {
      // throw error  ???
    }

    const newSamples = freeSoundResponse.results;
    const { count, next, previous } = freeSoundResponse;
    const hasMore = next !== null;

    setState((prevState) => ({
      samples: [...prevState.samples, ...newSamples],
      hasMore,
      loading: false,
      meta: { count, next, previous },
    }));
  };

  // this will trigger next page loading
  const setNextPageToLoad = () => {
    setState((prevState: State) => ({
      nextPageToLoad: prevState.meta.next,
    }));
  };

  return { ...state, setNextPageToLoad };
};

export default useSampleSearch;
