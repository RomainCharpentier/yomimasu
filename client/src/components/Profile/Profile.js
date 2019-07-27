import React from 'react';
import API from '../../utils/API';

export class Profile extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
        var token = localStorage.getItem("token");
        API.getUser(token).then((data) => {
            console.log(data.data.user);
        }, (error) => {
            console.log(error);
        });

        return(
            <div className="Profile">
                <p>test</p>
            </div>
        );
    }
}