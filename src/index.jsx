import React from 'react';
import ReactDOM from 'react-dom';

import './global.styl';

import App from './components/App';

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('root')
  );
};

render(App);
