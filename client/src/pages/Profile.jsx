import React from 'react';
import API from '../utils/API';
import ImageConverter from '../utils/ImageConverter';
import { Button, FormGroup, FormControl, FormLabel, Image, Alert, Form } from 'react-bootstrap';
import ImageInput from '../components/ImageInput.jsx';
import styles from '../common.scss';

export class Profile extends React.Component {

    constructor(props) {
        super();
        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
        this.displayForm.bind(this);
        this.handleFileChange.bind(this);
        this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        const self = this;
        var token = localStorage.getItem('token');
        API.getUser(token).then((data) => {
            const user = data.data;
            // Convert the image
            const image_file = ImageConverter.dataURIToImageFile(user.avatar);
            self.setState({
                email: user.email,
                nickname: user.nickname,
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

        this.setState({
            avatar: event,
            avatar_width: 300,
            avatar_height: 300,
            avatar_image: ImageConverter.dataURIToImageFile(event)
        });
    }

    handleChange = event => {
        // On efface le message du serveur
        delete this.state.server_message;
        delete this.state.server_status;
        this.setState(this.state);
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleKeyDown = event => {
        // If the key is Enter
        if (event.key === 'Enter') {
            this.handleSubmit();
        }
    }

    handleSubmit = event => {
        var _send = {
            user: {
                email: this.state.email,
                nickname: this.state.nickname,
                avatar: this.state.avatar
            },
            avatar_width: this.state.avatar_width,
            avatar_height: this.state.avatar_height
        };
        // Calling the update method using API
        API.updateUser(_send).then((data) => {
            // Update the token
            localStorage.setItem('token', data.data.token);
            this.setState({
                default_avatar: this.state.avatar_image,
                server_status: data.status
            });
        }, (error) => {
            console.log(error);
            this.setState({
                avatar_image: this.state.default_avatar,
                server_status: error.status,
                server_message: error
            });
            return;
        });
    }

    displayForm() {
        return (
            <div>
                <Image src={this.state.avatar_image} className='rounded-circle' />
                <ImageInput action={this.handleFileChange} />

                <FormGroup controlId='email'>
                    <FormLabel>Email</FormLabel>
                    <FormControl type='text' value={this.state.email} disabled />
                    <Form.Text className="text-muted">
                        Votre adresse email ne peut être modifiée car elle vous sert d'identifiant.
                    </Form.Text>
                </FormGroup>

                <FormGroup controlId='nickname'>
                    <FormLabel>Pseudo</FormLabel>
                    <FormControl type='text' value={this.state.nickname} onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
                </FormGroup>

                <Button onClick={this.handleSubmit} block type='submit'>
                    Modifier
                </Button>
            </div>
        );
    }

    createAlert(status, message) {
        let variant = 'success';
        let content = 'Modification réussie.';
        if (status != 200) {
            variant = 'danger';
            content = message;
        }
        return <Alert variant={variant}>{content}</Alert>;
    }

    render() {
        // Message from server (error or not)
        const isAlert = this.state && this.state.server_status;
        let alert = isAlert && this.createAlert(this.state.server_status, this.state.server_message);
        return (
            <div className={styles.Form}>
                {isAlert && alert}
                <h1>Profil</h1>
                { this.state && this.displayForm() }
            </div>
        );
    }
}