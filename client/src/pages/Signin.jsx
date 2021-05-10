import React, { useState, useContext } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import API from '../utils/API';
import styles from '../common.scss';
import { useErrorOutlet } from '../hooks/useErrorOutlet';

export const Signin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setError = useErrorOutlet();

    const handleSubmit = () => {
        if(email.length === 0){
            return;
        }
        if(password.length === 0){
            return;
        }
        API.signin(email, password).then((data) => {
            localStorage.setItem('token', data.data.token);
            window.location = '/';
        }, (error) => {
            setError(error);
            return;
        })
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    return (
        <div className={styles.Form}>
            <h1>Connexion</h1>
            <div>
                <FormGroup controlId='email'>
                    <FormLabel>Email</FormLabel>
                    <FormControl autoFocus type='email' value={email} onChange={(event) => setEmail(event.target.value)} onKeyDown={handleKeyDown} />
                </FormGroup>
                
                <FormGroup controlId='password'>
                    <FormLabel>Password</FormLabel>
                    <FormControl value={password} onChange={(event) => setPassword(event.target.value)} type='password' onKeyDown={handleKeyDown} />
                </FormGroup>

                <Button onClick={handleSubmit} block type='submit'>
                    Connexion
                </Button>
            </div>
        </div>
    );
}