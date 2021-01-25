export type AppState = {
  version: string;
  platform: string;
  serialPorts: string[];
  connected: boolean;
};

export const initState = (): AppState => {
  return {
    version: '',
    platform: '',
    serialPorts: [],
    connected: false
  };
};
