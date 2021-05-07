import React, { useState, useEffect } from 'react';
import API from '../utils/API';

const Book = ({ match }) => {
    const [book, setBook] = useState();

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