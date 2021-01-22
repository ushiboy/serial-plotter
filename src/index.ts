import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import * as Keys from './main/ipc/const';
import { initState } from './status';
// eslint-disable-next-line
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const state = initState();

ipcMain.handle(Keys.LOAD_APP_STATE, async () => {
  state.platform = process.platform;
  return state;
});

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(
        app.getAppPath(),
        '.webpack/renderer/main_window/preload.js'
      ),
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY).then(() => {
    mainWindow.webContents.send(Keys.CHANGE_APP_STATE, state);
  });

  if (process.env.NODE_ENV !== 'production') {
    mainWindow.webContents.openDevTools();
  }
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
