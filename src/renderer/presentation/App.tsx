import React from 'react';
import { AppState } from '../../status';

export const App: React.FC<{ state: AppState }> = (props) => {
  const { state } = props;
  return (
    <div className="container">
      <h1>💖 Hello World!</h1>
      <p>Welcome to your Electron application.</p>
      <p>{state.version}</p>
      <p>{state.platform}</p>
    </div>
  );
};
