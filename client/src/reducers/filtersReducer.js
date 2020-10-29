import { createReducer } from '@reduxjs/toolkit';

import { setFilters } from '../constants/BookAction';

//TODO: Créer des filtres
const initialState = {
    search: '',
    visibility: 'ALL'
};

export default createReducer(initialState, {
    [setFilters]: (draft, action) => action.payload
});