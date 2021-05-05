import React, { useState, KeyboardEvent } from 'react';
import API from '../utils/API';
import ImageConverter from '../utils/ImageConverter';
import FetchData from '../components/FetchData';
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import ImageInput from '../components/ImageInput';
import { User } from '../models/user';

export const Profile = () => {

    const [email] = useState('');
    const [nickname] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatar_width, setAvatarWidth] = useState(0);
    const [avatar_height, setAvatarHeight] = useState(0);
    const [avatar_image, setAvatarImage] = useState('');
    const [default_avatar, setDefaultAvatar] = useState('');
    
    const handleFileChange = (file: string) => {
        setAvatar(file);
        setAvatarWidth(300);
        setAvatarHeight(300);
        setAvatarImage(ImageConverter.dataURIToImageFile(file));
    }

    let token = localStorage.getItem('token');
    return (
        <div>
            <h1>Profil</h1>
            <FetchData action={() => API.getUser(token!)}>
                {data => {
                    const user: User = data.data;
                    // Convert the image
                    const image_file = ImageConverter.dataURIToImageFile(user.avatar);
                    setEmail(user.email);
                    setNickname(user.nickname);
                    setAvatar(user.avatar);
                    setAvatarWidth(1);
                    setAvatarHeight(1);
                    setDefaultAvatar(image_file);
                    setAvatarImage(image_file);
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