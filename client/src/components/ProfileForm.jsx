import React, { useState, KeyboardEvent } from 'react';
import API from '../utils/API';
import ImageConverter from '../utils/ImageConverter';
import { Button, Form, FormControl, FormGroup, FormLabel, Image } from 'react-bootstrap';
import ImageInput from '../components/ImageInput';

export const ProfileForm = ({ email, nickname, avatar }) => {

    const [mail, setEmail] = useState(email);
    const [nick, setNickname] = useState(nickname);
    const [vatar, setAvatar] = useState(avatar);
    const [avatar_width, setAvatarWidth] = useState(1);
    const [avatar_height, setAvatarHeight] = useState(1);
    const [avatar_image, setAvatarImage] = useState(ImageConverter.dataURIToImageFile(avatar));
    const [default_avatar, setDefaultAvatar] = useState(ImageConverter.dataURIToImageFile(avatar));
    
    const handleFileChange = (file) => {
        setAvatar(file);
        setAvatarWidth(300);
        setAvatarHeight(300);
        setAvatarImage(ImageConverter.dataURIToImageFile(file));
    }

    const handleSubmit = event => {
        const _send = {
            user: {
                email: mail,
                nickname: nick,
                avatar: vatar
            },
            avatar_width: avatar_width,
            avatar_height: avatar_height
        };
        // Calling the update method using API
        API.updateUser(_send).then((data) => {
            // Update the token
            localStorage.setItem('token', data.data.token);
            setDefaultAvatar(avatar_image);
        }, (error) => {
            console.log(error);
            setAvatarImage(default_avatar);
            return;
        });
    }
    
    return (
        <div>
            <Image src={avatar_image} className='rounded-circle' />
            <ImageInput action={handleFileChange} />

            <FormGroup controlId='email'>
                <FormLabel>Email</FormLabel>
                <FormControl type='text' value={mail} disabled />
                <Form.Text className="text-muted">
                    Votre adresse email ne peut être modifiée car elle vous sert d'identifiant.
                </Form.Text>
            </FormGroup>

            <FormGroup controlId='nickname'>
                <FormLabel>Pseudo</FormLabel>
                <FormControl type='text' value={nick} onChange={event => setNickname(event.target.value)} />
            </FormGroup>

            <Button onClick={handleSubmit} block type='submit'>
                Modifier
            </Button>
        </div>
    );
}