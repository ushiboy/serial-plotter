import { AppAction } from './type';
import { AppState } from '../status';

export type Subscriber = (state: AppState) => void;
export type Unsubscriber = () => void;

export type Store = {
  dispatch: (action: AppAction) => void;
  subscribe: (subscriber: Subscriber) => Unsubscriber;
};
