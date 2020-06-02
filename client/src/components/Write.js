import React from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import API from '../utils/API';

export class Write extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title : '',
            text: ''
        };
        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
    }

    handleSubmit = event => {
        if(this.state.title.length === 0){
            return;
        }
        API.createBook(this.state).then((data) => {
            window.location = '/book';
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
        return (
            <div className='Form'>
                <FormGroup controlId='title'>
                    <FormLabel>Titre</FormLabel>
                    <FormControl as="textarea" onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup controlId='text'>
                    <FormLabel>Texte</FormLabel>
                    <FormControl as="textarea" rows="3" onChange={this.handleChange}/>
                </FormGroup>

                <Button onClick={this.handleSubmit} block type='submit'>
                    Sauvegarde
                </Button>
            </div>
        );
    }
}