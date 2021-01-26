import React from 'react';
import ReactDOM from 'react-dom';
import './common.scss';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { AppContextProvider } from './AppContext';
import axios, { axiosResponse } from 'axios';

// Axios Interceptor
axios.interceptors.response.use(async value => {
    await new Promise(res => setTimeout(res, 1000));
    return value;
});


ReactDOM.render(
    <AppContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AppContextProvider>, 
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();