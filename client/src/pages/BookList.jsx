import React, { useState, useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { BookItem } from '../components/BookItem.jsx';
import { useAppContext } from '../AppContext';
import PropTypes from 'prop-types';
import API from '../utils/API';
import withClick from '../hooks/withClick';
import { Redirect } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        API.getAllBooks().then(result => setBooks(result.data)).catch(err => console.log(err));
    }, []);

    return (
        <>
            <div style={{ display: 'flex' }}>
                {books.map(book =>
                    <BookItem key={book._id} {...book} onClick={() => window.location.href = `${window.location.href}/${book._id}` } />
                )}
            </div>

            <Button>Add</Button>
        </>
    )
};

export default BookList;