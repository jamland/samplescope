import { app, BrowserWindow, ipcMain } from 'electron';
import { download, Progress } from 'electron-dl';
import windowStateKeeper from 'electron-window-state';
import logger from 'electron-log';
import appMenu from './menu';
import '../modules/analytics/bugsnag.main';

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

// auto-update module
require('update-electron-app')({
  updateInterval: '1 hour',
  logger,
  // notifyUser: false,
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const defaultWidth = 920;
const defaultHeight = 800;

// for tracking user session time
let startTime: number;

const isDevMode = process.env?.DEV_MODE === 'true';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow;

const createWindow = () => {
  // Load the previous window state with fallback to defaults
  const mainWindowState = windowStateKeeper({
    defaultWidth,
    defaultHeight,
  });

  // Create the browser window.
  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 350,
    minHeight: 500,
    webPreferences: {
      nodeIntegration: true,
      // allow main process be accesible in renderer via `remote` prop
      enableRemoteModule: true,
      // enable devtools only for dev mode
      devTools: isDevMode,
      contextIsolation: false,
    },
    backgroundColor: '#ffffff',
    show: false,
    // Native toolbar is hidden, instead custom added within /renderer/index file
    titleBarStyle: 'hidden',
    frame: false,
  });

  // Create main app menu
  appMenu({
    appName: app.name,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (isDevMode) {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }

  // Showing window gracefully
  // prevent visual flash while scripts loading
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    startTime = new Date().getMilliseconds();
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  app.on('window-all-closed', function () {
    // For macOS
    // Close whole app when all windows closed
    if (process.platform === 'darwin') {
      app.quit();
    }
  });

  // register listeners on the window, so windowStateKeeper can update the state
  // automatically (the listeners will be removed when the window is closed)
  // and restore the maximized or full screen state
  mainWindowState.manage(mainWindow);
};

// ipcMain.on('download-file', async (event, { url }) => {
//   const focusedWindow = mainWindow.getFocusedWindow();
//   console.log(await download(focusedWindow, url));
// });

ipcMain.on('download-file', async (event, arg) => {
  const { url, filename } = arg;

  if (!url) {
    event.reply('download-done', {
      result: 'error',
      message: 'no URL param provided for download',
    });
  } else {
    const focusedWindow = BrowserWindow.getFocusedWindow();

    try {
      const options = {
        ...savedFileOptions,
        filename,
      };
      await download(focusedWindow, url, options);

      event.reply('download-done', {
        result: 'success',
        message: 'File downloaded!',
      });
    } catch (error) {
      event.reply('download-done', {
        result: 'error',
        message: error.message,
      });
    }
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  console.log(app.getName());
  console.log(app.getVersion());
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

const savedFileOptions = {
  // Type: boolean
  // Default: false
  // Show a Save As… dialog ins tead of downloading immediately.
  // Note: Only use this option when strictly necessary.
  // Downloading directly without a prompt is a much better user experience.
  saveAs: false,

  // Type: string
  // Default: User's downloads directory
  // Directory to save the file in.
  // directory: '',

  // Type: string
  // Default: downloadItem.getFilename()
  // Name of the saved file.
  // This option only makes sense for electronDl.download().
  // filename: '',

  // Type: string
  // Default: Download Error
  // Title of the error dialog. Can be customized for localization.
  // errorTitle: '',

  // Type: string
  // Default: The download of {filename} was interrupted
  // Message of the error dialog. {filename} is replaced with the name of the actual file. Can be customized for localization.
  // errorMessage: '',

  // Type: Function
  // Optional callback that receives the download item. You can use this for advanced handling such as canceling the item like item.cancel().
  onStarted: () => {},

  // Type: Function
  // Optional callback that receives a number between 0 and 1 representing the progress of the current download.
  onProgress: (progress: Progress) => {
    mainWindow.webContents.send('download-progress', { progress });
  },

  // Type: Function
  // Optional callback that receives the download item for which the download has been cancelled.
  onCancel: () => {},

  // Type: boolean
  // Default: false
  // Reveal the downloaded file in the system file manager, and if possible, select the file.
  openFolderWhenDone: false,

  // Type: boolean
  // Default: true
  // Shows the file count badge on macOS/Linux dock icons when download is in progress.
  // showBadge: true,
};
