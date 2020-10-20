import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import API from '../utils/API';
import ImageConverter from '../utils/ImageConverter';
import './Users.css';

export const Users = () => {
    const [users, setUsers] = useState([]);

    // useEffect in only called once
    useEffect(() => {
        API.getUsers().then((result) => {
            setUsers(result.data);
        });
    }, []);

    return (
        <div className='users-container'>
            <h1>Utilisateurs</h1>
            <table className='table table-hover users-table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Avatar</th>
                        <th>Pseudo</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody> 
                    {users.map((user, index) => 
                        <tr key={index} style={{verticalAlign: 'middle'}}>
                            <td className='users-line' style={{width:'5%'}}>{index}</td>
                            <td className='users-line' style={{width:'10%'}}><Image src={ImageConverter.dataURIToImageFile(user.avatar)} fluid /></td>
                            <td className='users-line'>{user.pseudo}</td>
                            <td className='users-line'>{user.email}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}