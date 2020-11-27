import React, { useState, useEffect, useContext } from 'react';
import { Image } from 'react-bootstrap';
import API from '../utils/API';
import LoadingContext from '../components/LoadingContext.jsx';

export const User = props => {
    const {loading, setLoading} = useContext(LoadingContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        API.findUserByNickname(props.match.params.id)
            .then(result => setUser(result.data))
            .catch(err => console.log(err));
    }, []);

    if (user) {
        return (
            <LoadingContext.Consumer>
                {({ loading, setLoading }) => (
                    <div>
                        <Image src={user.avatar} />
                        <p>{user.nickname}</p>
                        <p>Rôle : {user.role}</p>
                        <p>Inscription : {new Date(user.created_at).toLocaleDateString('fr-FR')}</p>
                        <button onClick={() => setLoading(true)}>test</button>
                    </div>
                )}
            </LoadingContext.Consumer>
        );
    } else {
        return (
            <p>Utilisateur inconnu</p>
        );
    }
}