const OPEN_SERIAL = 'open@serial';
const CLOSE_SERIAL = 'close@serial';

export type SerialModel = {
  connected: boolean;
};

export type SerialAction = OpenSerialAction | CloseSerialAction;

export type OpenSerialAction = {
  type: typeof OPEN_SERIAL;
  payload: {
    port: string;
  };
};

export type CloseSerialAction = {
  type: typeof CLOSE_SERIAL;
};

export const openSerial = (port: string): OpenSerialAction => {
  return {
    type: OPEN_SERIAL,
    payload: {
      port,
    },
  };
};

export const closeSerial = (): CloseSerialAction => {
  return {
    type: CLOSE_SERIAL,
  };
};

export const serialInit = (): SerialModel => {
  return {
    connected: false,
  };
};

export const serialUpdater = async (
  action: SerialAction,
  model: SerialModel
): Promise<SerialModel> => {
  switch (action.type) {
    case OPEN_SERIAL: {
      const { payload } = action;
      console.log(payload);
      return { ...model, connected: true };
    }
    case CLOSE_SERIAL:
      return { ...model, connected: false };
  }
  return model;
};
