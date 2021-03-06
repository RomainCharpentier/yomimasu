import React, { useState, useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { BookItem } from '../components/BookItem';
import API from '../utils/API';
import FetchData from '../components/FetchData';

const BookList = () => {

    return (
        <>
            <FetchData action={() => API.getAllBooks()}>
                {data => {
                    const books = data.data;
                    return (
                        <div style={{ display: 'flex' }}>
                            {books.map(book =>
                                <BookItem key={book._id} {...book} onClick={() => window.location.href = `${window.location.href}/${book._id}`} />
                            )}
                        </div>
                    );
                }}
            </FetchData>
            <Button>Add</Button>
        </>
    )
};

export default BookList;