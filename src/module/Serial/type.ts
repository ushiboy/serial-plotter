export const OPEN_SERIAL = 'open@serial';
export const CLOSE_SERIAL = 'close@serial';

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
