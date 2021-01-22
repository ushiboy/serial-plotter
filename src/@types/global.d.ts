import { IpcClientInterface } from '../renderer/IpcClient';

declare global {
  interface Window {
    API: {
      ipcClient: IpcClientInterface;
    };
  }
}
