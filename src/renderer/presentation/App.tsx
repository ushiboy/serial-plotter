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
        <div className="input-group">
          <select className="form-control">{options}</select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={() => {}}
            >
              Connect
            </button>
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={() => {}}
            >
              Disconnect
            </button>
          </div>
        </div>
      </form>
      <h1>💖 Hello World!</h1>
      <p>Welcome to your Electron application.</p>
      <p>{state.version}</p>
      <p>{state.platform}</p>
    </div>
  );
};
