import React, { useState, useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useAppContext } from '../AppContext';
import PropTypes from 'prop-types';
import API from '../utils/API';
import withClick from '../hooks/withClick';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Book } from '../models/book';

type TParams = { id: string };

const Book = ({ match } : RouteComponentProps<TParams>) => {
    const [book, setBook] = useState<Book>();

    useEffect(() => {
        API.getBook(match.params.id).then(result => setBook(result.data)).catch(err => console.log(err));
    }, []);

    return (
        <>
            <p>{Object.entries(book)}</p>
            <p>{book?.title}</p>
            <p>{book?.author}</p>
            <p>{book?.keywords}</p>
            <p>{book?.text}</p>
            <p>{book?.published}</p>
        </>
    );
};

export default Book;