import React, { useState, useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useAppContext } from '../AppContext';
import PropTypes from 'prop-types';
import API from '../utils/API';
import withClick from '../hooks/withClick';
import { Redirect } from 'react-router-dom';

const Book = (props) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        API.getBook(props.match.params.id).then(result => setBooks(result.data)).catch(err => console.log(err));
    }, []);
    return (
        <>
            <p>{Object.entries(books)}</p>
            <p>{books.title}</p>
            <p>{books.author}</p>
            <p>{books.keywords}</p>
            <p>{books.text}</p>
            <p>{books.published}</p>
        </>
    );
};

export default Book;