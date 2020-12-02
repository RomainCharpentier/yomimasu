import React from 'react';
 
const LoadingContext = React.createContext({
    loading: false,
    setLoading: value => {}
});
 
export default LoadingContext;