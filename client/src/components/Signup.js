import React from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import API from '../utils/API';
import ImageConverter from '../utils/ImageConverter';
import DefaultAvatar from '../images/default_avatar.png';

export class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password: '',
            cpassword: ''
        };
        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
    }

    handleSubmit = event => {
        if(this.state.email.length === 0){
            return;
        }
        if(this.state.password.length === 0 || this.state.password !== this.state.cpassword){
            return;
        }
        var _send = {
            email: this.state.email,
            password: this.state.password,
            avatar: DefaultAvatar
        };
        API.signup(_send).then((data) => {
            localStorage.setItem('token', data.data.token);
            window.location = '/dashboard';
        }, (error) => {
            console.log(error);
            return;
        });
    }
    
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    
    render() {
        return (
            <div className='Form'>
                <FormGroup controlId='email'>
                    <FormLabel>Email</FormLabel>
                    <FormControl autoFocus type='email' value={this.state.email} onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup controlId='password'>
                    <FormLabel>Password</FormLabel>
                    <FormControl value={this.state.password} onChange={this.handleChange} type='password'/>
                </FormGroup>

                <FormGroup controlId='cpassword'>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl value={this.state.cpassword} onChange={this.handleChange} type='password'/>
                </FormGroup>

                <Button onClick={this.handleSubmit} block type='submit'>
                    Inscription
                </Button>
            </div>
        );
    }
}