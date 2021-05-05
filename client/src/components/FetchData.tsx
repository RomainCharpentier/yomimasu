import { AxiosResponse } from 'axios';
import React from 'react';
import useFetchData from '../hooks/useFetchData';
import Loader from './Loader';

type FetchDataProps = {
    action: () => Promise<AxiosResponse<any>>;
    children: React.Component;
}

//https://github.com/screensyt/react-custom-hook-loader
const FetchData = ({ action, children }: FetchDataProps) => {
    const [data, isLoaded, error] = useFetchData({ action });

    if (error) {
        return <p>Error</p>;

    } else if (!isLoaded) {
        return <Loader />;

    } else if (!data) {
        return null;

    } else {
        // return children(data);
        return null;
    }
};

export default FetchData;