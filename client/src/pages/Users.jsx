import React, { useState, useEffect, useCallback } from 'react';
import { Image, Container, Col, Row, Button } from 'react-bootstrap';
import API from '../utils/API';
import ImageConverter from '../utils/ImageConverter';
import Pagination from '../components/Pagination';
import styles from "./Users.module.scss";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    let isAdmin = true;

    // useEffect in only called once
    useEffect(() => {
        loadUsers();
        isAdmin = API.isAdmin();
    }, []);

    const loadUsers = useCallback(() => {
        API.getUsers().then((result) => {
            setUsers(result.data);
        });
    }, []);

    const deleteUser = useCallback((email) => {
        API.deleteUser(email).then(() => {
            loadUsers();
        }, (error) => {
            console.log(error);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const userTemplate = (user) => (
        <>
            <div onClick={() => window.location.href = `${window.location.href}/${user.nickname}`}>
                <Image className={'img-thumbnail', styles.myImg} src={ImageConverter.dataURIToImageFile(user.avatar)} roundedCircle fluid />
            </div>
            <div className={styles.avatarOverlay}>
                <p>Voir le profil</p>
            </div>
            <p>{user.email}</p>
            <p>{user.nickname ? user.nickname : 'Pas de pseudo'}</p>
            <Button onClick={() => deleteUser(user.email)}>Delete</Button>
        </>
    );

    return (
        <div>
            <h1>Utilisateurs</h1>
            <Pagination items={users} itemsPerPage={1} refreshPage={(page) => setPage(page)} template={userTemplate} />
        </div>
    );
}