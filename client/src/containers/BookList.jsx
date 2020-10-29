import React, { useCallback, useEffect } from 'react';
import Book from '../components/Book.jsx';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getVisibleBooks } from '../selectors';
import { Button } from 'react-bootstrap';
import * as action from '../constants/ActionTypes';
import { itemsFetchData } from '../constants/BookAction';
import {api} from 'redux-rest-actions';

const BookList = ({ books, fetchData, hasError, isLoading }) => {
    const dispatch = useDispatch();
    const onAdd = useCallback(
        () => {
            console.log('onAdd');
            dispatch({ type: action.ADD_BOOK })
        },
        [dispatch],
    );

    useEffect(() => {
        dispatch({ type: action.GET_BOOKS });
    }, [fetchData]);
    
    if (hasError) {
        return <p>Sorry! There was an error loading the items</p>;
    }

    if (isLoading) {
        return <p>Loading…</p>;
    }

    return (
        <>
        <div style={{display: 'flex'}}>
            {books.map(book =>
                <Book key={book.id} {...book} />
            )}
        </div>
        
        <Button onClick={onAdd}>Add</Button>
        </>
    )
};

BookList.propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
}

const BookListStore = () => {
    const dispatch = useDispatch();
    dispatch({ type: 'GET_ALL' })
    //const state = useSelector(getVisibleBooks);
    return <BookList books={useSelector(state => state.list.books)} />
}

export default BookListStore;