import React from 'react';
import API from '../../utils/API';
import { Button, FormGroup, FormControl, FormLabel, Image } from "react-bootstrap";
import fs from 'fs'

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
            const user = data.data.user;
            self.setState({
                "email": user.email,
                "pseudo": user.pseudo,
                "avatar": user.avatar
            });
        }, (error) => {
            console.log(error);
        });
    }
    
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        //console.log(fs.readFileSync(this.state.avatar));
    }

    handleSubmit = event => {
        var _send = {
            "email": this.state.email,
            "pseudo": this.state.pseudo
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
                <p>{this.state.email}</p>

                <FormGroup controlId="avatar">
                    <Image src="../../images/default_avatar.png" alt="avatar" roundedCircle />
                    <FormControl type="file" accept="image/*" onChange={this.handleChange} />
                </FormGroup>

                <FormGroup controlId="pseudo">
                    <FormLabel>Pseudo</FormLabel>
                    <FormControl type="text" value={this.state.pseudo} onChange={this.handleChange} />
                </FormGroup>

                <Button onClick={this.handleSubmit} block type="submit">
                    Modifier
                </Button>
            </div>
        );
    }
    
    render() {
        return (
            <div className="Form">
                <h1>Profil</h1>
                { this.state && this.displayForm() }
            </div>
        );
    }
}