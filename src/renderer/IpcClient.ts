import { IpcRendererEvent, IpcRenderer } from 'electron';
import { AppState } from '../status';
import * as Keys from '../main/ipc/const';
import { AppAction } from '../module';

export type Unsubscriber = () => void;
export type AppStateListener = (state: AppState) => void;

export type IpcClientInterface = {
  loadState: () => Promise<AppState>;
  subscribeState: (listener: AppStateListener) => Unsubscriber;
  dispatch: (action: AppAction) => void;
};

export const IpcClient = (ipcRenderer: IpcRenderer): IpcClientInterface => {
  return {
    loadState(): Promise<AppState> {
      return ipcRenderer.invoke(Keys.LOAD_APP_STATE);
    },
    subscribeState(listener: AppStateListener): Unsubscriber {
      const f = (event: IpcRendererEvent, state: AppState): void => {
        listener(state);
      };
      ipcRenderer.on(Keys.CHANGE_APP_STATE, f);
      return (): void => {
        ipcRenderer.removeListener(Keys.CHANGE_APP_STATE, f);
      };
    },
    dispatch(action: AppAction): void {
      ipcRenderer.send(Keys.DISPATCH_ACTION, action);
    },
  };
};
