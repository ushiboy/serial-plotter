export type AppState = {
  serialPorts: string[];
  connected: boolean;
};

export const initState = (): AppState => {
  return {
    serialPorts: [],
    connected: false,
  };
};
