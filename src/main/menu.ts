import { Menu, shell } from 'electron';

interface Props {
  appName: string;
}

const isDevMode = process.env?.DEV_MODE === 'true';

/**
 * Module function to create main app menu.
 * Each item can be added simply as { role: 'appMenu' }
 * but we want to modify menu items, so we write extended version for each
 */
const appMenu = ({ appName }: Props) => {
  const isMacOS = process.platform === 'darwin';

  // modified version of { role: 'appMenu' }
  // Mac requires specific first item in menu with name of app
  const appMenu = isMacOS
    ? {
        label: appName,
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideothers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' },
        ],
      }
    : {
        label: 'App',
        submenu: [{ role: 'quit' }],
      };

  // TODO: Add Open Downloads folder item
  // modified version of { role: 'viewMenu' }
  const viewMenu = {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      ...(isDevMode && [{ role: 'toggleDevTools' }]),
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' },
    ],
  };

  // modified version of { role: 'windowMenu' }
  const windowMenu = {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMacOS
        ? [
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' },
          ]
        : [{ role: 'close' }]),
    ],
  };

  // modified version of { role: 'helpMenu' }
  const helpMenu = {
    role: 'help',
    submenu: [
      {
        label: 'Learn more',
        click: () => {
          shell.openExternal('https://github.com/jamland/samplescope');
        },
      },
      // TODO: add contacts later if it is required
      // and What’s New…
      // {
      //     label: 'Contact',
      // click: () => {
      //     // open some chat group
      // }
      // }
    ],
  };

  // Menu template
  const template: any[] = [appMenu, viewMenu, windowMenu, helpMenu];

  // Build menu
  const menu = Menu.buildFromTemplate(template);

  // Set as main app menu
  Menu.setApplicationMenu(menu);
};

export default appMenu;
