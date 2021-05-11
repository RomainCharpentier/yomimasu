import React from 'react';
import API from '../utils/API';
import FetchData from '../components/FetchData';
import { ProfileForm } from '../components/ProfileForm';

export const Profile = () => {

    let token = localStorage.getItem('token');
    return (
        <div>
            <h1>Profil</h1>
            <FetchData action={() => API.getUser(token)}>
                {data => {
                    const user = data.data;
                    return (
                        <ProfileForm email={user.email} nickname={user.nickname} avatar={user.avatar} />
                    );
                }}
            </FetchData>
        </div>
    );
}