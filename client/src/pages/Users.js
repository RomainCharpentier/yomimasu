import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import API from '../utils/API';

export const Users = () => {
    const [users, setUsers] = useState([]);

    // useEffect in only called once
    useEffect(() => {
        API.getUsers().then((result) => {
            setUsers(result.data);
        });
    }, []);

    return (
        <div>
            <h1>Utilisateurs</h1>
            <ListGroup>
                {users.map((user, index) => <ListGroup.Item key={index}> {user.email} </ListGroup.Item>)}
            </ListGroup>
        </div>
    );
}