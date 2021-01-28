export const ADD_LOG = 'add@log';

export type LogModel = {
  logs: string[];
};

export type LogAction = AddLogAction;

export type AddLogAction = {
  type: typeof ADD_LOG;
  payload: {
    log: string;
  };
};
