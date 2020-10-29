import {
    createSelector
} from 'reselect'
import {
    SHOW_ALL,
    SHOW_COMPLETED,
    SHOW_ACTIVE
} from '../constants/BookFilters'

const getFilter = state => state.filter;
const getBooks = state => state.books;

export const getVisibleBooks = createSelector(
    [getFilter, getBooks],
    (filter, books) => {
        switch (filter) {
            case undefined:
            case 'ALL':
            case SHOW_ALL:
                return books
            case SHOW_COMPLETED:
                return books.filter(t => t.completed)
            case SHOW_ACTIVE:
                return books.filter(t => !t.completed)
            default:
                throw new Error('Unknown filter: ' + filter)
        }
    }
);

export const getCompletedTodoCount = createSelector(
    [getBooks],
    books => (
        books.reduce((count, book) =>
            book.completed ? count + 1 : count,
            0
        )
    )
);