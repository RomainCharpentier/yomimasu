import React from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import API from '../utils/API';
import DefaultAvatar from '../images/default_avatar.png';
import styles from '../common.scss';

export class Signup extends React.Component {

    constructor(props: any) {
        super(props);
        this.state = {
            email : '',
            nickname : '',
            password: '',
            cpassword: ''
        };
        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
    }

    handleSubmit = event => {
        if(this.state.email.length === 0 || this.state.nickname.length === 0 
            || this.state.password.length === 0 || this.state.password !== this.state.cpassword){
            return;
        }
        var _send = {
            email: this.state.email,
            nickname: this.state.nickname,
            password: this.state.password,
            avatar: DefaultAvatar
        };
        API.signup(_send).then((data) => {
            localStorage.setItem('token', data.data.token);
            window.location = '/';
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
            <div className={styles.Form}>
                <h1>Inscription</h1>
                <div>
                    <FormGroup controlId='email'>
                        <FormLabel>Email</FormLabel>
                        <FormControl autoFocus type='email' value={this.state.email} onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup controlId='nickname'>
                        <FormLabel>Pseudo</FormLabel>
                        <FormControl type='text' value={this.state.nickname} onChange={this.handleChange}/>
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
            </div>
        );
    }
}