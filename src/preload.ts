import { contextBridge, ipcRenderer } from 'electron';
import { IpcClient } from './renderer/IpcClient';

contextBridge.exposeInMainWorld('API', {
  ipcClient: IpcClient(ipcRenderer),
});
