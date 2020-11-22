import React, { useState, useEffect } from 'react';
import { Image, Container, Col, Row } from 'react-bootstrap';
import API from '../utils/API';
import ImageConverter from '../utils/ImageConverter';
import Pagination from '../components/Pagination'
import styles from "./Users.module.scss";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [usersDisp, setUsersDisp] = useState([]);
    let isAdmin = true;

    // useEffect in only called once
    useEffect(() => {
        API.getUsers().then((result) => {
            setUsersDisp(result.data);
        });
        isAdmin = API.isAdmin();
        /* setUsersDisp(usersDisp.fill(
            {
                email: 'email',
                pseudo: 'Pseudo',
                role: 'user',
                avatar: ''
            }
        ), 0, 6); */
    }, []);

    /* return (
        <Pagination items={users} itemsPerPage={1} refreshPage={() => console.log('refresh')}>
            <div className='usersContainer'>
                <h1>Utilisateurs</h1>
                <table className='table table-hover usersTable'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Avatar</th>
                            <th>Pseudo</th>
                            <th>Email</th>
                            {isAdmin && <th>Role</th>}
                        </tr>
                    </thead>
                    <tbody> 
                        {usersDisp.map((user, index) => 
                            <tr key={index} style={{verticalAlign: 'middle'}}>
                                <td className='usersLine' style={{width:'5%'}}>{index}</td>
                                <td className='usersLine' style={{width:'10%'}}><Image src={ImageConverter.dataURIToImageFile(user.avatar)} fluid /></td>
                                <td className='usersLine'>{user.pseudo}</td>
                                <td className='usersLine'>{user.email}</td>
                                {isAdmin && <td className='usersLine'>{user.role}</td>}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Pagination>
    ); */

    return (
        <Container>
            <Row>
                <h1>Utilisateurs</h1>
            </Row>
            <Row>
                {usersDisp.map((user, index) =>
                    <Col key={index} className={styles.container} md={2} onClick={() => window.location.href = `${window.location.href}/${user.nickname}`}>
                        <Image className={'img-thumbnail', styles.myImg} src={ImageConverter.dataURIToImageFile(user.avatar)} roundedCircle fluid />
                        <div className={styles.avatarOverlay}>
                            <p>Voir le profil</p>
                        </div>
                        <p>{user.email}</p>
                        <p>{user.nickname}</p>
                        <btn onClick={() => API.deleteUser(user.email)}>Delete</btn>
                    </Col>
                )}
            </Row>
        </Container>
    )
}