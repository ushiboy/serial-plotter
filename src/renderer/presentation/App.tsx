import React, { useState, useEffect } from 'react';
import { AppState } from '../../status';
import { IpcClientInterface } from '../IpcClient';
import { openSerial, closeSerial } from '../../module/Serial';

export const App: React.FC<{
  state: AppState;
  ipcClient: IpcClientInterface;
}> = (props) => {
  const { state, ipcClient } = props;
  const { serialPorts } = state;
  const [selectedPort, setSelectedPort] = useState(serialPorts[0] || '');
  const [connected, setConnected] = useState(state.connected);

  useEffect(() => {
    const unsubscribe = ipcClient.subscribeState((state: AppState): void => {
      setConnected(state.connected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const options = serialPorts.map((p) => {
    return <option key={p}>{p}</option>;
  });
  return (
    <div className="container">
      <form>
        <div className="input-group">
          <select
            className="form-control"
            value={selectedPort}
            onChange={(e) => {
              setSelectedPort(e.target.value);
            }}
          >
            {options}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-primary"
              type="button"
              disabled={connected}
              onClick={() => {
                ipcClient.dispatch(openSerial(selectedPort));
              }}
            >
              Connect
            </button>
            <button
              className="btn btn-outline-primary"
              type="button"
              disabled={!connected}
              onClick={() => {
                ipcClient.dispatch(closeSerial());
              }}
            >
              Disconnect
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
