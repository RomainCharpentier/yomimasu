import React from 'react';
import ReactDOM from 'react-dom';
import './common.scss';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './AppContext.jsx';
import axios from 'axios';

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