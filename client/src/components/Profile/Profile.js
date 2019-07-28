import React from 'react';
import API from '../../utils/API';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

export class Profile extends React.Component {
    constructor(props){
        super(props);
        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
        this.displayForm.bind(this);
    }

    componentDidMount() {
        const self = this;
        var token = localStorage.getItem("token");
        API.getUser(token).then((data) => {
            self.setState({"user": data.data.user});
            console.log(data.data.user);
        }, (error) => {
            console.log(error);
        });
    }    
    
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        var _send = {
            "email": this.state.user.email,
            "password": this.state.user.password
        };
        API.updateUser(_send).then((data) => {
            localStorage.setItem("token", data.data.token);
        }, (error) => {
            console.log(error);
            return;
        })
    }   

    displayForm = function() {
        return (
            <div>
                <FormGroup controlId="email" bsSize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl type="email" value={this.state.user.email} onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl value={this.state.user.password} onChange={this.handleChange} type="password"/>
                </FormGroup>

                <Button onClick={this.handleSubmit} block bsSize="large" type="submit">
                    Modifier
                </Button>
            </div>
        );
    }
    
    render() {
        return(
            <div className="Login">
                <h1>Profil</h1>
                { this.state && this.state.user && this.displayForm() }
            </div>
        );
    }
}