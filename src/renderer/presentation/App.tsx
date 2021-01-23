import React from 'react';
import { AppState } from '../../status';

export const App: React.FC<{ state: AppState }> = (props) => {
  const { state } = props;
  const { serialPorts } = state;

  const options = serialPorts.map((p) => {
    return <option key={p}>{p}</option>;
  });
  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label>Serial port</label>
          <select className="form-control">{options}</select>
        </div>
      </form>
      <h1>💖 Hello World!</h1>
      <p>Welcome to your Electron application.</p>
      <p>{state.version}</p>
      <p>{state.platform}</p>
    </div>
  );
};
