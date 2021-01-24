import React, { useState, useEffect, useCallback } from 'react';
import { Image, Container, Col, Row, Button } from 'react-bootstrap';
import API from '../utils/API';
import ImageConverter from '../utils/ImageConverter';
import Pagination from '../components/Pagination';
import styles from "./Users.module.scss";
import FetchData from '../components/FetchData.jsx';

export const Users = () => {
    const [page, setPage] = useState(0);
    let isAdmin = false;

    // useEffect in only called once
    useEffect(() => {
        isAdmin = false;
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
            <div className={styles.avatar} onClick={() => window.location.href = `${window.location.href}/${user.nickname}`}>
                <Image className={'img-thumbnail', styles.avatarImage} src={ImageConverter.dataURIToImageFile(user.avatar)} roundedCircle fluid />
                <div className={styles.avatarOverlay}>
                    <p>Voir le profil</p>
                </div>
            </div>
            <p>{user.nickname}</p>
            {isAdmin && <Button onClick={() => deleteUser(user.email)}>Delete</Button>}
        </>
    );

    return (
        <div>
            <h1>Utilisateurs</h1>
            {/* <Pagination items={users} itemsPerPage={3} refreshPage={(page) => setPage(page)} template={userTemplate} /> */}

            <FetchData action={() => API.getUsers()}>
                {data => {
                    const users = data.data;
                    return (
                        <div className={styles.displayUser}>
                            {users.map(((user, index) => (
                                // <div key={index}>{Object.entries(user)}</div>
                                // <div key={index*2} >{(userTemplate(user))} </div>
                                <Col key={index} className={styles.container} md={2} sm={4} xs={6}>
                                    {userTemplate(user)}
                                </Col>
                            )))}
                        </div>
                    );
                }}
            </FetchData>
        </div>
    );
}