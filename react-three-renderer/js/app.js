require('babel-polyfill');

import Simple from './simple';
import React from 'react';
import ReactDOM from 'react-dom';

window.onload = function(){

  ReactDOM.render(
    <Simple />,
    document.getElementById('app')
  );
};
