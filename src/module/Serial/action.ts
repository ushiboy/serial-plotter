import {
  OPEN_SERIAL,
  CLOSE_SERIAL,
  OpenSerialAction,
  CloseSerialAction,
} from './type';

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
