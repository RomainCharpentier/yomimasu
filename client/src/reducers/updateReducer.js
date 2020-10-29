import {
    createReducer
} from '@reduxjs/toolkit';

import {
    initiate,
    error
} from './reducerHelper';
import * as actions from '../constants/BookAction';

const initialState = {
    pending: false,
    error: null
};

export default createReducer(initialState, {
    // For edit and delete actions, fetching the book or the
    // books list clears any previous error.
    [actions.getBooks]: (draft, action) => {
        draft.error = null;
    },
    [actions.getBook]: (draft, action) => {
        draft.error = null;
    },
    // add a BOOK
    [actions.addBook]: draft => {
        initiate(draft);
        console.log('addBook 2');
    },
    [actions.addBookSuccess]: draft => {
        draft.pending = false;
        console.log('addBookSuccess');
    },
    [actions.addBookError]: (draft, action) => {
        error(draft, action);
        console.log('addBookError');
    },
    // update a book
    [actions.updateBook]: draft => {
        initiate(draft);
    },
    [actions.updateBookSuccess]: draft => {
        draft.pending = false;
    },
    [actions.updateBookError]: (draft, action) => {
        error(draft, action);
    },
    // delete a book
    [actions.deleteBook]: draft => {
        initiate(draft);
    },
    [actions.deleteBookSuccess]: draft => {
        draft.pending = false;
    },
    [actions.deleteBookError]: (draft, action) => {
        error(draft, action);
    }
});