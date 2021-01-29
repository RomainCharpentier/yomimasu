import React, { createContext, useReducer, useContext } from 'react';
import reducer from './reducers';

const API_URL = 'https://api.ipify.org/?format=json';

const AppContext = createContext();

export { AppContext };

export function AppContextProvider(props) {
    let [state, dispatch] = useReducer(reducer, reducer({}, { type: 'INIT' }));

    // Grouping async actions together into this object is analagous to using a thunk in a Redux action creator.
    // We can also make action creators for synchronous dispatch calls to make our code more Reduxy, too.
    let actions = {
        async fetchIP() {
            dispatch({ type: 'IP_REQUEST' });
            const resp = await fetch(API_URL);
            const { ip } = await resp.json();
            dispatch({ type: 'IP_RECEIVE', ip });
        },
        resetIP() {
            dispatch({ type: 'IP_RESET' });
        },
        incrementCounter() {
            dispatch({ type: 'COUNTER_INC' });
        },
        decrementCounter() {
            dispatch({ type: 'COUNTER_DEC' });
        },
        addTask(task) {
            dispatch({ type: 'TASK_ADD', task });
        },
        removeTask(id) {
            dispatch({ type: 'TASK_REMOVE', id });
        },
    };

    let value = { state, dispatch, actions };

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
}

export const AppContextConsumer = AppContext.Consumer;

export const useAppContext = () => useContext(AppContext);