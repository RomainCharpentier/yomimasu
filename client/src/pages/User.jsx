import React, { useState, useEffect } from 'react';
import { Image, Container, Col, Row } from 'react-bootstrap';
import API from '../utils/API';
import ImageConverter from '../utils/ImageConverter';
import Pagination from '../components/Pagination'
import styles from "./Users.module.scss";

export const Users = () => {
    const [user, setUser] = useState([]);

    // useEffect in only called once
    useEffect(() => {
        API.findUserByNickname(props.match.params.id).then((result) => {
            setUser(result.data);
        });
    }, []);
    
    return (
        <p>Boo</p>
    )
}