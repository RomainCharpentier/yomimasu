import {createReducer} from '@reduxjs/toolkit';

import {initiate, error} from './reducerHelper';
import * as actions from '../constants/BookAction';

const initialState = {
    books: [],
    pending: false,
    error: null
};

export default createReducer(initialState, {
    [actions.getBooks]: draft => {
        initiate(draft);
    },
    [actions.getBooksSuccess]: (draft, action) => {
        draft.pending = false;
        draft.books = action.payload.books;
    },
    [actions.getBooksError]: (draft, action) => {
        error(draft, action);
    }
});