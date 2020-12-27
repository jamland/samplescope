export {};
declare global {
  interface Window {
    dataLayer: any;
  }
}

const { app } = require('electron').remote;
const { JSONStorage } = require('node-localstorage');
const nodeStorage = new JSONStorage(app.getPath('userData'));
const remote = window.require('electron').remote;
const env = remote.getGlobal('process').env;

console.log('env', env);

// const measurementId = process.env.GA4_MEASUREMENT_ID ?? env.GA4_MEASUREMENT_ID;
const measurementId = 'G-HTY5MME75G';
const apiSecret = 'Xb8Rtz75T52vgGyQ1H-d2g';
const gtagScriptUrl = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
let GA_LOCAL_STORAGE_KEY = 'ga:clientId';

function gtag() {
  window.dataLayer.push(arguments);
}

const loadScript = async (url: string) => {
  try {
    const response = await fetch(url);
    const script = await response.text();
    eval(script);
  } catch (error) {
    console.warn(`Can't load script ${url} because of the error: ${error.msg}`);
  }
};

const gtagGetPromisify = (propertyName: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    gtag('get', measurementId, propertyName, (value) => {
      resolve(value);
    });
  });
};

// Get clientId from localStorage
// or get it from gtag() and save it to localStorage
const getClientId = async () => {
  const clientIdFromLocalStorage = nodeStorage.getItem(GA_LOCAL_STORAGE_KEY);

  if (clientIdFromLocalStorage) return clientIdFromLocalStorage;
  else {
    const clientId = await gtagGetPromisify('client_id');
    nodeStorage.setItem(GA_LOCAL_STORAGE_KEY, clientId);
    return clientId;
  }
};

const register = async () => {
  await loadScript(gtagScriptUrl);

  window.dataLayer = window.dataLayer || [];
  console.log('window.dataLayer', window.dataLayer);

  if (!nodeStorage)
    return Promise.reject(`Can't start GA4. LocalStorage isn't available`);

  // @ts-ignore
  gtag('js', new Date());

  const clientId = await getClientId();

  // Use localStorage instead of cookies, since 🍪 aren't available on desktop app.
  // https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#using_localstorage_to_store_the_client_id
  const options = {
    storage: 'none',
    clientId,
  };
  // @ts-ignore
  gtag('config', measurementId, options);

  // Disable file protocol checking
  // @ts-ignore
  gtag('set', { checkProtocolTask: null });
  // @ts-ignore
  gtag('set', { checkStorageTask: null }); // Disable cookie storage checking
  // @ts-ignore
  gtag('set', { historyImportTask: null }); // Disable history checking (requires reading from cookies)
};

const sendEvent = async (name: string, params: unknown) => {
  const clientId = await getClientId();

  try {
    await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      {
        method: 'POST',
        body: JSON.stringify({
          client_id: clientId,
          user_id: 'dev_user',
          events: [
            {
              name: name,
              params: params,
            },
          ],
        }),
      }
    );
  } catch (error) {
    console.warn('Error sending event to GA4: ', error.message);
  }
};

export default {
  register,
  sendEvent,
};
