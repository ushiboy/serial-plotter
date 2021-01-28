import { ADD_LOG, LogModel } from './type';
import { AppAction } from '../type';

export const logUpdater = async (
  action: AppAction,
  model: LogModel
): Promise<LogModel> => {
  switch (action.type) {
    case ADD_LOG:
      return { ...model, logs: [...model.logs, action.payload.log] };
  }
  return model;
};
