import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import API from '../utils/API';
import ImageConverter from '../utils/ImageConverter';
import Pagination from '../components/Pagination'
import './Users.css';

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [usersDisp, setUsersDisp] = useState([]);
    let isAdmin = true;

    // useEffect in only called once
    useEffect(() => {
        /* API.getUsers().then((result) => {
            setUsers(result.data);
        });
        isAdmin = API.isAdmin(); */
        setUsersDisp([
            {
                email: 'email',
                pseudo: 'Pseudo',
                role: 'user',
                avatar: ''
            },
            {
                email: 'email2',
                pseudo: 'Pseudo2',
                role: 'user',
                avatar: ''
            },
            {
                email: 'email3',
                pseudo: 'Pseudo3',
                role: 'user',
                avatar: ''
            }
        ]);
    }, []);

    return (
        <Pagination items={users} itemsPerPage={1} refreshPage={() => console.log('refresh')}>
            <div className='users-container'>
                <h1>Utilisateurs</h1>
                <table className='table table-hover users-table'>
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
                                <td className='users-line' style={{width:'5%'}}>{index}</td>
                                <td className='users-line' style={{width:'10%'}}><Image src={ImageConverter.dataURIToImageFile(user.avatar)} fluid /></td>
                                <td className='users-line'>{user.pseudo}</td>
                                <td className='users-line'>{user.email}</td>
                                {isAdmin && <td className='users-line'>{user.role}</td>}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Pagination>
    );
}