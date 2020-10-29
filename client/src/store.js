import {
    configureStore,
    getDefaultMiddleware
} from '@reduxjs/toolkit';
import {
    configureApiMiddleware
} from 'redux-rest-actions';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

const apiMiddleware = configureApiMiddleware();
if (process.env.NODE_ENV !== 'production') {
    //apiMiddleware.push(createLogger());
};

export default function configureAppStore(preloadedState) {
    const store = configureStore({
        reducer: rootReducer,
        middleware: composeWithDevTools(
            [apiMiddleware, ...getDefaultMiddleware()]
        ),
        preloadedState
    });
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
    }
    return store;
}