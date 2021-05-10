import { AxiosResponse } from 'axios';
import { any } from 'prop-types';
import React, { useState, useEffect } from 'react';

const useFetchData = ({ action }) => {
    const [error, setError] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState(undefined);

    useEffect(() => {
        let unmounted = false;
        
        action().then(data => {
            if (!unmounted) {
                setData(data);
                setIsLoaded(true);
            }

        }).catch(error => {
            if (!unmounted) {
                setError(error);
                setIsLoaded(true);
            }
        });

        return () => {
            unmounted = true;
        };
    }, [action]);

    return [data, isLoaded, error];
};

export default useFetchData;