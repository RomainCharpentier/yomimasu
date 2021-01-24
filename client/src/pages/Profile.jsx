import React, { useState } from 'react';
import API from '../utils/API';
import ImageConverter from '../utils/ImageConverter';
import { Button, FormGroup, FormControl, FormLabel, Image, Alert, Form } from 'react-bootstrap';
import ImageInput from '../components/ImageInput.jsx';
import FetchData from '../components/FetchData.jsx';
import styles from '../common.scss';

export const Profile = () => {

    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatar_width, setAvatarWidth] = useState('');
    const [avatar_height, setAvatarHeight] = useState('');
    const [avatar_image, setAvatarImage] = useState('');
    const [default_avatar, setDefaultAvatar] = useState('');
    const [server_status, setServerStatus] = useState('');
    const [server_message, setServerMessage] = useState('');

    const handleFileChange = event => {
        setServerMessage('');
        setAvatar(event);
        setAvatarWidth(300);
        setAvatarHeight(300);
        setAvatarImage(ImageConverter.dataURIToImageFile(event));
    }

    const handleKeyDown = event => {
        // If the key is Enter
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    const handleSubmit = event => {
        var _send = {
            user: {
                email: email,
                nickname: nickname,
                avatar: avatar
            },
            avatar_width: avatar_width,
            avatar_height: avatar_height
        };
        // Calling the update method using API
        API.updateUser(_send).then((data) => {
            // Update the token
            localStorage.setItem('token', data.data.token);
            setDefaultAvatar(avatar_image);
            setServerStatus(data.status);
        }, (error) => {
            console.log(error);
            setAvatarImage(default_avatar);
            setServerStatus(error.status);
            setServerMessage(error);
            return;
        });
    }

    const createAlert = (status, message) => {
        let variant = 'success';
        let content = 'Modification réussie.';
        if (status != 200) {
            variant = 'danger';
            content = message;
        }
        return <Alert variant={variant}>{content}</Alert>;
    }

    // Message from server (error or not)
    const isAlert = server_status !== '';
    let alert = isAlert && createAlert(server_status, server_message);
    let token = localStorage.getItem('token');
    return (
        <div className={styles.Form}>
            {isAlert && alert}
            <h1>Profil</h1>
            <FetchData action={() => API.getUser(token)}>
                {data => {
                    const user = data.data;
                    // Convert the image
                    const image_file = ImageConverter.dataURIToImageFile(user.avatar);
                    // setEmail(user.email);
                    // setNickname(user.nickname);
                    // setAvatar(user.avatar);
                    // setAvatarWidth(1);
                    // setAvatarHeight(1);
                    // setDefaultAvatar(image_file);
                    // setAvatarImage(image_file);
                    return (
                        <div>
                            <Image src={image_file} className='rounded-circle' />
                            <ImageInput action={handleFileChange} />

                            <FormGroup controlId='email'>
                                <FormLabel>Email</FormLabel>
                                <FormControl type='text' value={user.email} disabled />
                                <Form.Text className="text-muted">
                                    Votre adresse email ne peut être modifiée car elle vous sert d'identifiant.
                                </Form.Text>
                            </FormGroup>

                            <FormGroup controlId='nickname'>
                                <FormLabel>Pseudo</FormLabel>
                                <FormControl type='text' value={user.nickname} onChange={event => setNickname(event.target.value)} onKeyDown={handleKeyDown} />
                            </FormGroup>

                            <Button onClick={handleSubmit} block type='submit'>
                                Modifier
                            </Button>
                        </div>
                    );
                }}
            </FetchData>
        </div>
    );
}