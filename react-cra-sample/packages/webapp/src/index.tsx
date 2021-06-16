import React from 'react';
import ReactDOM from 'react-dom';
//
import App from '@/App';
import { setup } from '@/utils';
//
import '@/index.scss';

setup();

ReactDOM.render(<App />, document.getElementById('root'));
