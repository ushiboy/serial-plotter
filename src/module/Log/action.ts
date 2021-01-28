import { ADD_LOG, AddLogAction } from './type';

export const addLog = (log: string): AddLogAction => {
  return {
    type: ADD_LOG,
    payload: {
      log,
    },
  };
};
