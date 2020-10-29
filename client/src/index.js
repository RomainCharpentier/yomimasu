import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';
import './common.scss';
import App from './containers/App.jsx';

import configureStore from './store';
import apiConfig from './apiConfig';
import {configureApi} from 'redux-rest-actions';

const store = configureStore();
configureApi(store, apiConfig);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();