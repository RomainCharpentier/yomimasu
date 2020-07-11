import React from 'react';
import API from '../utils/API';
import ImageConverter from '../utils/ImageConverter';
import { Button, FormGroup, FormControl, FormLabel, Image, Alert } from 'react-bootstrap';
import { ImageInput } from './ImageInput.js';

export class Profile extends React.Component {
    
    constructor(props){
        super(props);
        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
        this.displayForm.bind(this);
        this.handleFileChange.bind(this);
    }

    componentDidMount() {
        const self = this;
        var token = localStorage.getItem('token');
        API.getUser(token).then((data) => {
            const user = data.data.user;
            // Conversion de l'image
            const image_file = ImageConverter.dataURIToImageFile(user.avatar);
            self.setState({
                email: user.email,
                pseudo: user.pseudo,
                avatar: user.avatar,
                avatar_width: 1,
                avatar_height: 1,
                default_avatar: image_file,
                avatar_image: image_file
            });
        }, (error) => {
            console.log(error);
        });
    }

    handleFileChange = event => {
        delete this.state.server_message;
        this.setState(this.state);
        var file = event.target.files[0];

        // get data
        var callback = (image, dataURI) => {
            this.setState({
                avatar: dataURI,
                avatar_width: image.naturalWidth,
                avatar_height: image.naturalHeight,
                avatar_image: ImageConverter.dataURIToImageFile(dataURI)
            });
            return ImageConverter.dataURIToImageFile(dataURI);
        };
        callback.bind(this);
        ImageConverter.fileToDataURL(file, callback);
    }
    
    handleChange = event => {
        // On efface le message du serveur
        delete this.state.server_message;
        this.setState(this.state);
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        var _send = {
            user: {
                email: this.state.email,
                pseudo: this.state.pseudo,
                avatar: this.state.avatar
            },
            avatar_width: this.state.avatar_width,
            avatar_height: this.state.avatar_height
        };
        // Calling the update method using API
        API.updateUser(_send).then((data) => {
            // Maj du token
            localStorage.setItem('token', data.data.token);
            this.setState({
                default_avatar: this.state.avatar_image,
                server_message: data.data.message
            });
            /* event.target.value = null; */
        }, (error) => {
            console.log(error.response);
            this.setState({
                avatar_image: this.state.default_avatar,
                server_message: error.response.data.message
            });
            /* event.target.value = null; */
            return;
        });
    }

    displayForm() {
        return (
            <div>
                <p>{this.state.email}</p>
                <ImageInput action={this.handleFileChange} />
                <Image src={this.state.avatar_image} />

                <FormGroup controlId='pseudo'>
                    <FormLabel>Pseudo</FormLabel>
                    <FormControl type='text' value={this.state.pseudo} onChange={this.handleChange} />
                </FormGroup>

                <Button onClick={this.handleSubmit} block type='submit'>
                    Modifier
                </Button>
            </div>
        );
    }
    
    render() {
        // Message from server (error or not)
        const isError = this.state && this.state.server_message;
        let message = (<Alert variant={isError && this.state.server_message.type}>{isError && this.state.server_message.message}</Alert>);
        return (
            <div className='Form'>
                {isError && message}
                <h1>Profil</h1>
                { this.state && this.displayForm() }
            </div>
        );
    }
}