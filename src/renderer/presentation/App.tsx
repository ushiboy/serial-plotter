import React from 'react';
import { AppState } from '../../status';
import { IpcClientInterface } from '../IpcClient';

export const App: React.FC<{
  state: AppState;
  ipcClient: IpcClientInterface;
}> = (props) => {
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
    </div>
  );
};
