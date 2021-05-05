import React from 'react';
import API from '../utils/API';
import { Route, Redirect } from 'react-router-dom';

export const GuestRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {
        if (API.isAuth()===true) {
            return ( <Redirect to='/' /> );
        } else {
            return ( <Component {...props} /> );
        }
    }} />
);