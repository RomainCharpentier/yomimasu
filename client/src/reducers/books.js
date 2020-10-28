import {
    ADD_BOOK,
    REMOVE_BOOK
} from '../constants/ActionTypes';

const initialState = {
    books: [{
        text: 'Use Redux',
        completed: false,
        id: 0
    }],
    isLoading: false,
    hasError: false
};

const books = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BOOK:
            return [
                ...state.books,
                {
                    id: state.books.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                    text: action.text,
                    completed: false
                }
            ];
        case REMOVE_BOOK:
            return state.books.filter((book) => book.id !== action.id);
        case 'ITEMS_ARE_LOADING':
            return {...state, isLoading: action.isLoading};
        case 'ITEMS_HAVE_ERROR':
            return {...state, hasError: action.hasError};
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return {...state, isLoading: false};
        default:
            return state;
    }
}

export default books;