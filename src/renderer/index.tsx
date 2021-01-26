/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Titlebar, Color } from 'custom-electron-titlebar';

import App from './App';
import analytics from '@modules/analytics/renderer';
analytics.startAnalytics();

const grey900 = '#24292e';
new Titlebar({
  backgroundColor: Color.fromHex(grey900),
});

ReactDOM.render(<App />, document.getElementById('root'));
