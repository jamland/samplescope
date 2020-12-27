/**
 * API for Freesound.org
 * 📚 https://freesound.org/docs/api/resources_apiv2.html
 */

import API from './endpoints';
import ErrorEmitter from '@modules/ErrorEmitter';

import {
  SearchTextRequest,
  SearchTextResponse,
  SampleInstance,
} from './freesound.types';

export type searchProps = SearchTextRequest;

const config: {
  apiKey?: string;
} = {
  apiKey: undefined,
};

const searchQuery: {
  response?: object;
} = {};

const init = (apiKey: string): void => {
  config.apiKey = apiKey;
};

const defaultTextSearchProps: {
  query: string;
  abortController: AbortController;
} = {
  query: '',
  // duration: [0, 1],
  abortController: null,
};

type RequestCache = {
  [key: string]: SearchTextResponse;
};

const cache: any = {};

const getByURL = async (
  url: string,
  abortController: AbortController = new AbortController()
): Promise<SearchTextResponse | null> => {
  // return cached response if it was done before already
  if (cache[url]) return Promise.resolve(cache[url]);
  else {
    try {
      const postfix = `&token=${config.apiKey}`;
      const response = await fetch(url + postfix, {
        signal: abortController.signal,
      });
      const body = await response.json();

      if (!response.ok) {
        const detail = {
          response,
          message: body.detail,
        };
        const event = new CustomEvent('requestError', { detail });
        ErrorEmitter.emit(event.type, event.detail);
        // window.dispatchEvent(event);
        return Promise.reject(new Error(body.detail));
      } else {
        searchQuery.response = body;
        // cache response for further repeated calls
        cache[url] = searchQuery.response;
        // @ts-ignore
        return Promise.resolve(searchQuery.response);
        // const result = await sf.query({
        //   search: [ 'drum', 'bass' ],
        //   duration: [ 0.01, 1 ]
        // });
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        return Promise.resolve(null);
      } else {
        const detail = {
          message: error.message,
        };
        const event = new CustomEvent('requestError', { detail });
        window.dispatchEvent(event);
        return Promise.reject(new Error(error.message));
      }
    }
  }
};

/**
 * SEARCHING
 * There are several ways in which you can search sounds.
 * The most basic one is using the
 *
 * 1. TEXT SEARCH resource which allows you to define
 * some query terms and other parameters to filter query results.
 *
 * 2. CONTENT SEARCH resource used to perform queries and define filters
 * based on audio features (descriptors) rather than tags and textual metadata.
 *
 * 3. COMBINED SEARCH is a combination of Text Search and Content Search.
 **/

/**
 * Text Search
 * This resource allows searching sounds in Freesound by matching their tags and other kinds of metadata.
 * https://freesound.org/docs/api/resources_apiv2.html#text-search
 *
 * GET /apiv2/search/text/
 *
 * @param query - string text query to search
 * @param duration [float, float]
 */
const searchText = async ({
  query,
  duration,
  abortController,
}: SearchTextRequest = defaultTextSearchProps): Promise<SearchTextResponse> => {
  const fields = [
    'id',
    'name',
    'username',
    'previews',
    'bitdepth',
    'bitrate',
    'channels',
    'created',
    'description',
    'duration',
    'filesize',
    'license',
    'num_downloads',
    'pack',
    'pack_name',
    'samplerate',
    'similar_sounds',
    'tags',
    'type',
  ].join(',');
  const sort = query === '' ? 'created_desc' : 'score';
  const url = `${API.SEARCH_TEXT}?query=${query}&sort=${sort}&fields=${fields}`;

  return getByURL(url, abortController);
};

/**
 * TODO:
 * Content Search
 * This resource allows searching sounds in Freesound based on their content descriptors.
 * https://freesound.org/docs/api/resources_apiv2.html#content-search
 *
 * GET /apiv2/search/content/
 * POST /apiv2/search/content/
 *
 * @param ...
 */
const searchContent = async (): Promise<void> => {
  // const url = `${API.SEARCH_TEXT}?query=${query}`;
  // const postfix = `&token=${config.apiKey}`;
  // const result = await fetch(url + postfix);
  // const json = await result.json();
  // searchQuery.response = json;
  // return searchQuery.response;
  // const result = await sf.query({
  //   search: [ 'drum', 'bass' ],
  //   duration: [ 0.01, 1 ]
  // });
};

/**
 * TODO:
 * Combined Search
 * This resource is a combination of Text Search and Content Search
 * https://freesound.org/docs/api/resources_apiv2.html#combined-search
 *
 * GET /apiv2/search/combined/
 * POST /apiv2/search/combined/
 *
 * @param ...
 */
const searchCombined = async (): Promise<void> => {
  // const url = `${API.SEARCH_TEXT}?query=${query}`;
  // const postfix = `&token=${config.apiKey}`;
  // const result = await fetch(url + postfix);
  // const json = await result.json();
  // searchQuery.response = json;
  // return searchQuery.response;
  // const result = await sf.query({
  //   search: [ 'drum', 'bass' ],
  //   duration: [ 0.01, 1 ]
  // });
};

// --------------------------------------------------------
// Sound resources
// --------------------------------------------------------

/**
 * Sound Instance
 * This resource allows the retrieval of detailed information about a sound.
 * https://freesound.org/docs/api/resources_apiv2.html#sound-instance
 * @param id - sound id
 */

interface SearchInstanceRequest {
  id: string | number;
}

const fetchSoundInstance = async ({
  id,
}: SearchInstanceRequest): Promise<SampleInstance> => {
  const url = `${API.SOUNDS}${id}/?`;

  try {
    const result = await getByURL(url);
    // @ts-ignore
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  init,
  getByURL,
  searchText,
  searchContent,
  searchCombined,
  fetchSoundInstance,
};

/**
 * TODO:
 * Similar Sounds
 * This resource allows the retrieval of sounds similar to the given sound target.
 * https://freesound.org/docs/api/resources_apiv2.html#similar-sounds
 *
 * GET /apiv2/sounds/<sound_id>/similar/
 */

//  .....
//  .....
//  .....
//  .....
//  .....
//  .....

/**
 * TODO:
 * Upload Sound (OAuth2 required)
 * This resource allows you to download a sound in its original format/quality.
 * https://freesound.org/docs/api/resources_apiv2.html#download-sound-oauth2-required
 *
 * GET /apiv2/sounds/<sound_id>/download/
 */

//  .....
//  .....
//  .....
//  .....
//  .....
//  .....

// ------------------------------------------------
// 🙋‍♀️ User resources
// ------------------------------------------------

/**
 * TODO:
 * User Instance
 * This resource allows the retrieval of information about a particular Freesound user.
 * https://freesound.org/docs/api/resources_apiv2.html#user-instance
 *
 * GET /apiv2/users/<username>/
 */

//  .....
//  .....
//  .....
//  .....
//  .....
//  .....

/**
 * TODO:
 * User Sounds
 * This resource allows the retrieval of a list of sounds uploaded by a particular Freesound user.
 * https://freesound.org/docs/api/resources_apiv2.html#user-sounds
 *
 * GET /apiv2/users/<username>/sounds/
 */

//  .....
//  .....
//  .....
//  .....
//  .....
//  .....

/**
 * TODO:
 * User Packs
 * This resource allows the retrieval of a list of packs created by a particular Freesound user.
 * https://freesound.org/docs/api/resources_apiv2.html#user-packs
 *
 * GET /apiv2/users/<username>/packs/
 */

//  .....
//  .....
//  .....
//  .....
//  .....
//  .....

// ------------------------------------------------
// Pack resources
// ------------------------------------------------

/**
 * TODO:
 * Pack Instance
 * This resource allows the retrieval of information about a pack.
 * https://freesound.org/docs/api/resources_apiv2.html#pack-instance
 *
 * GET /apiv2/packs/<pack_id>/
 */

//  .....
//  .....
//  .....
//  .....
//  .....
//  .....

/**
 * TODO:
 * Pack Sounds
 * This resource allows the retrieval of the list of sounds included in a pack.
 * https://freesound.org/docs/api/resources_apiv2.html#pack-sounds
 *
 * GET /apiv2/packs/<pack_id>/sounds/
 */

//  .....
//  .....
//  .....
//  .....
//  .....
//  .....

/**
 * TODO:
 * Download Pack (OAuth2 required)
 * This resource allows you to download all the sounds of a pack in a single zip file.
 * It requires OAuth2 authentication.
 * https://freesound.org/docs/api/resources_apiv2.html#download-pack-oauth2-required
 *
 * GET /apiv2/packs/<pack_id>/download/
 */

//  .....
//  .....
//  .....
//  .....
//  .....
//  .....
