import React, { useState, useEffect } from 'react';
import { Image, Container, Col, Row } from 'react-bootstrap';
import API from '../utils/API';
import ImageConverter from '../utils/ImageConverter';
import Pagination from '../components/Pagination'
import styles from "./Users.module.scss";

export const User = props => {
    const [user, setUser] = useState({avatar: '', nickname: ''});

    // useEffect in only called once
    useEffect(() => {
        API.findUserByNickname(props.match.params.id).then(result => setUser(result.data)).catch(err => console.log(err));
        
    }, []);

    return (
        <div>
            <Image src={user.avatar} />
            <p>{user.nickname}</p>
            <p>Rôle : {user.role}</p>
            <p>Inscription : {new Date(user.created_at).toLocaleDateString('fr-FR')}</p>
        </div>
    )
}