import React from 'react';
import API from '../utils/API';

export class Signout extends React.Component {

    constructor(props) {
        super(props);
        API.signout();
    }
    
    render() {
        return (
            <div></div>
        );
    }
}