export type AppState = {
  version: string;
  platform: string;
  serialPorts: string[];
};

export const initState = (): AppState => {
  return {
    version: '',
    platform: '',
    serialPorts: [],
  };
};
