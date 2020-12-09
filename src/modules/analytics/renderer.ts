/**
 * This module abstract methods for analytics.
 * It uses GA and Nucleus analytics for further considerations which is better
 */
// import Nucleus from '@modules/analytics.nucleus';

const { remote } = require('electron');
const analyticsGoogle = remote.getGlobal('analyticsGoogle');

/**
 * GA started in main process
 * Nucleus in renderer
 */
const startAnalytics = () => {
  // Nucleus.appStarted();
};

const trackEvent = ({
  name,
  action,
  label,
  value,
}: {
  name: string;
  action: string;
  label: string;
  value: string | number;
}) => {
  analyticsGoogle.event?.(name, action, label, value);
  // Nucleus.track?.(name, {
  //   searchQuery: value,
  // });
};

/**
 * GA can track screen views separatly from other events
 * Nucleas track as another event
 */
const screenview = (screenName: string) => {
  analyticsGoogle.screenview?.(screenName);
  // Nucleus.track?.(screenName);
};

export default {
  startAnalytics,
  trackEvent,
  screenview,
};
