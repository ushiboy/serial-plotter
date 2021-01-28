import { Connection } from '../../main/infrastructure/SerialConnection';
import { SerialModel, OPEN_SERIAL, CLOSE_SERIAL } from './type';
import { AppAction } from '../type';

export const serialUpdater = async (
  action: AppAction,
  model: SerialModel,
  serialConnection: Connection
): Promise<SerialModel> => {
  switch (action.type) {
    case OPEN_SERIAL: {
      const { payload } = action;
      try {
        await serialConnection.open(payload.port);
        return { ...model, connected: serialConnection.isOpen() };
      } catch (e) {
        return { ...model, connected: false };
      }
    }
    case CLOSE_SERIAL:
      await serialConnection.close();
      return { ...model, connected: false };
  }
  return model;
};
