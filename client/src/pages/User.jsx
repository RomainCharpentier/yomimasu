import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import API from '../utils/API';
import FetchData from '../components/FetchData';

const User = (props) => {
    const [user, setUser] = useState(null);

    return (
        <FetchData action={() => API.findUserByNickname(props.match.params.id)}>
            {data => {
                const user = data.data;
                if (user) {
                    return (
                        <div>
                            <Image src={user.avatar} />
                            <p>{user.nickname}</p>
                            <p>Rôle : {user.role}</p>
                            <p>Inscription : {new Date(user.created_at).toLocaleDateString('fr-FR')}</p>
                        </div>
                    );
                } else {
                    return (
                        <p>Utilisateur inconnu</p>
                    );
                }
            }}
        </FetchData>
    );
}

export default User;