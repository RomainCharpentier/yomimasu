import {createAction} from '@reduxjs/toolkit';

export const getBooks = createAction('GET_BOOKS', filters =>
    filters ? {payload: {params: {...filters}}} : {}
);
export const getBooksSuccess = createAction('GET_BOOKS_SUCCESS');
export const getBooksError = createAction('GET_BOOKS_ERROR');

export const getBook = createAction('GET_BOOK', id => ({payload: {id}}));
export const getBookSuccess = createAction('GET_BOOK_SUCCESS');
export const getBookError = createAction('GET_BOOK_ERROR');

export const addBook = createAction('ADD_BOOK', book => ({
    payload: {data: {...book, completed: false}}
}));
export const addBookSuccess = createAction('ADD_BOOK_SUCCESS');
export const addBookError = createAction('ADD_BOOK_ERROR');

export const updateBook = createAction('UPDATE_BOOK', (id, book) => ({
    payload: {id, data: book}
}));
export const updateBookSuccess = createAction('UPDATE_BOOK_SUCCESS');
export const updateBookError = createAction('UPDATE_BOOK_ERROR');

export const deleteBook = createAction('DELETE_BOOK', id => ({payload: {id}}));
export const deleteBookSuccess = createAction('DELETE_BOOK_SUCCESS');
export const deleteBookError = createAction('DELETE_BOOK_ERROR');