export type AppState = {
  version: string;
  platform: string;
};

export const initState = (): AppState => {
  return {
    version: '',
    platform: '',
  };
};
