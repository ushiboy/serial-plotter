import { AppAction } from './type';
import { Model } from './model';
import { serialUpdater, SerialModel, serialInit } from './Serial';
import { logUpdater, LogModel } from './Log';

export type Subscriber = (state: Model) => void;
export type Unsubscriber = () => void;

export type Update<T> = (action: AppAction, model: T, any: any) => Promise<T>;

export type UpdateConfig<T> = {
  [K in keyof T]: Update<T[K]>;
};

export type Store = {
  dispatch: (action: AppAction) => void;
  subscribe: (subscriber: Subscriber) => Unsubscriber;
};

export const createStore = (
  initialState: Model,
  updateConfigs: UpdateConfig<Model>
): Store => {
  return {
    dispatch(action: AppAction): void {},
    subscribe(subscriber: Subscriber): Unsubscriber {
      return (): void => {};
    },
  };
};

export const store = createStore(
  {
    serial: serialInit(),
    log: {
      logs: [],
    },
  },
  {
    serial: serialUpdater,
    log: logUpdater,
  }
);
