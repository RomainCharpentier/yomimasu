import React from 'react';
import useFetchData from '../hooks/useFetchData.js';
import Loader from './Loader';

//https://github.com/screensyt/react-custom-hook-loader
const FetchData = ({ action, children }) => {
    const [data, isLoaded, error] = useFetchData({ action });

    if (error) {
        return <p>Error</p>;

    } else if (!isLoaded) {
        return <Loader />;

    } else if (!data) {
        return null;

    } else {
        return children(data);
    }
};

export default FetchData;