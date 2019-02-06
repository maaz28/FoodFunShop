import React from 'react';
import ReactDOM from 'react-dom';
import BasicRouting from './config/routes';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import {Provider} from 'react-redux'
import './style.css';
import './css/responsive/responsive.css';

ReactDOM.render( <Provider store={store}>
    <BasicRouting />
  </Provider>, document.getElementById('root'));
  
registerServiceWorker();
