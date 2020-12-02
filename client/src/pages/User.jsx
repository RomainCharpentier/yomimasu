import React, { useState, useEffect, useContext } from 'react';
import { Image } from 'react-bootstrap';
import API from '../utils/API';
import LoadingContext from '../components/LoadingContext.jsx';

export const User = props => {
    const {loading, setLoading} = useContext(LoadingContext);
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        let unmounted = false;
        
        API.findUserByNickname(props.match.params.id)
            .then(result => {
                if (!unmounted) {
                    setUser(result.data);
                }
            })
            .catch(err => console.log(err));

        return () => {
            unmounted = true;
        };
    }, []);

    useEffect(() => {
        let unmounted = false;
        
        API.findUserByNickname(props.match.params.id)
            .then(result => {
                setLoading(true);
                if (!unmounted) {
                    setUser(result.data);
                }
                setLoading(false);
            })
            .catch(err => console.log(err));

        return () => {
            unmounted = true;
        };
    }, []);

    if (user) {
        return (
            <div>
                <Image src={user.avatar} />
                <p>{user.nickname}</p>
                <p>Rôle : {user.role}</p>
                <p>Inscription : {new Date(user.created_at).toLocaleDateString('fr-FR')}</p>
                <button onClick={() => setLoading(true)}>test</button>
            </div>
        );
    } else {
        return (
            <p>Utilisateur inconnu</p>
        );
    }
}