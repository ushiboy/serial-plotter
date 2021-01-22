import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './presentation/App';

const { ipcClient } = window.API;

(async function () {
  const state = await ipcClient.loadState();
  ReactDOM.render(<App state={state} />, document.getElementById('app'));
})();
