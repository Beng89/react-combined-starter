import * as React from 'react';
import { hydrate } from 'react-dom';
import { App } from './App';

hydrate(React.createElement(App), document.getElementById('app'));
