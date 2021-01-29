/**
 * This module abstract methods for analytics.
 * It uses GA and Nucleus analytics for further considerations which is better
 */
import Nucleus from '@modules/analytics/nucleus';

// const { remote } = require('electron');
// const analyticsGoogle = remote.getGlobal('analyticsGoogle');

/**
 * GA started in main process
 * Nucleus in renderer
 */
const startAnalytics = () => {
  try {
    Nucleus.appStarted();
  } catch (error) {
    console.warn(`Error trying start analytics: ${error.message}`);
  }
};

type TrackEventProps = {
  name: string;
  action: string;
  label: string | number;
  value: string | number;
};

const trackEvent = ({ name, action, label, value }: TrackEventProps) => {
  try {
    // analyticsGoogle.trackEvent?.(name, action, label, value);

    const data = selectData({ name, label, value });
    Nucleus.track?.(name, data);
  } catch (error) {
    console.warn(`Error trying track analytics: ${error.message}`);
  }
};

const selectData = ({ name, label, value }: Partial<TrackEventProps>) => {
  switch (name) {
    case 'DOWNLOAD':
      return {
        id: label,
        fileName: value,
      };
    case 'SEARCH_TEXT':
    default:
      return {
        searchQuery: value,
      };
  }
};

/**
 * GA can track screen views separatly from other events
 * Nucleas track as another event
 */
const screenview = (screenName: string) => {
  try {
    // analyticsGoogle.screenview?.(screenName);
    Nucleus.track?.(`${screenName} Screen`);
  } catch (error) {
    console.warn(`Error trying track analytics: ${error.message}`);
  }
};

export default {
  startAnalytics,
  trackEvent,
  screenview,
};
