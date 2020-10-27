import React, { useCallback } from 'react';
import Book from '../components/Book.jsx';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getVisibleBooks } from '../selectors';
import { Button } from 'react-bootstrap';
import * as action from '../constants/ActionTypes';

const BookList = ({ books }) => {
    const dispatch = useDispatch();
    const onAdd = useCallback(
        () => {
            dispatch({ type: action.ADD_BOOK })
        },
        [dispatch],
    );
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
    const books = useSelector(getVisibleBooks);
    return <BookList books={books} />
}

export default BookListStore;