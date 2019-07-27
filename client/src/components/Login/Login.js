import React from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from '../../utils/API';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password: ""
        };
        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
    }

    handleSubmit = event => {
        if(this.state.email.length === 0){
            return;
        }
        if(this.state.password.length === 0){
            return;
        }
        API.login(this.state.email, this.state.password).then((data) => {
            localStorage.setItem("token", data.data.token);
            window.location = "/dashboard"
        }, (error) => {
            console.log(error);
            return;
        })
    }    

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    
    render() {
        return(
            <div className="Login">
                <FormGroup controlId="email" bsSize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange}/>
                </FormGroup>
                
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl value={this.state.password} onChange={this.handleChange} type="password"/>
                </FormGroup>

                <Button onClick={this.handleSubmit} block bsSize="large" type="submit">
                    Connexion
                </Button>
            </div>
        )
    }
}