import * as types from './ActionTypes';
import axios from 'axios';
const headers = {
    'Content-Type': 'application/json'
};

const burl = 'http://localhost:8000';

export function itemsHaveError(bool) {
    return {
        type: 'ITEMS_HAVE_ERROR',
        hasError: bool
    };
}

export function itemsAreLoading(bool) {
    return {
        type: 'ITEMS_ARE_LOADING',
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}
export const addBook = (text, cat = 'default') => ({
	type: types.ADD_BOOK,
	text,
	cat,
});
export const removeBook = (id, cat) => ({
	type: types.REMOVE_BOOK,
	id,
	cat
});
export const setVisibilityFilter = (filter) => ({
	type: types.SET_VISIBILITY_FILTER,
	filter
});

export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsAreLoading(true));

        axios.post(`${burl}/${url}`, {headers: headers})
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(itemsAreLoading(false));

                return response;
            })
            .then((response) => dispatch(itemsFetchDataSuccess(response.data)))
            .catch(() => dispatch(itemsHaveError(true)));
    };
}