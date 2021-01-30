import { AppAction } from './type';
import { Model } from './model';

export type Subscriber = (state: Model) => void;
export type Unsubscriber = () => void;

export type Store = {
  dispatch: (action: AppAction) => void;
  subscribe: (subscriber: Subscriber) => Unsubscriber;
};

export const createStore = (initialState: Model): Store => {
  return {
    dispatch(action: AppAction): void {},
    subscribe(subscriber: Subscriber): Unsubscriber {
      return (): void => {};
    },
  };
};
