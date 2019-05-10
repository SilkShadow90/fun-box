import React from 'react';
import classNames from 'classnames';

import { Map, Sidebar } from './components';
import './App.css';

const App = () => (
  <div className={classNames('App')}>
    <Sidebar />
    <Map />
  </div>
);

export default App;
