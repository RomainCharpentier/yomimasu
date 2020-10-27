import {
    ADD_BOOK,
    REMOVE_BOOK
} from '../constants/ActionTypes';

const initialState = [{
    text: 'Use Redux',
    completed: false,
    id: 0
}];

const books = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BOOK:
            return [
                ...state,
                {
                    id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                    text: action.text,
                    completed: false
                }
            ];
        case REMOVE_BOOK:
            return state.filter((book) => book.id !== action.id);
            
        default:
            return state;
    }
}

export default books;