export type AppState = {
  serialPorts: string[];
  connected: boolean;
  logs: string[];
};

export const initState = (): AppState => {
  return {
    serialPorts: [],
    connected: false,
    logs: [],
  };
};
