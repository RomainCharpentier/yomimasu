import React, { useState, useEffect } from 'react';
import FetchData from '../components/FetchData';
import API from '../utils/API';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Icone from '../images/book_icon.png';
import styles from "./Book.module.scss";

const Book = ({ match }) => {
    return (
        <FetchData action={() => API.getBook(match.params.id)}>
            {data => {
                const book = data.data;
                return (
                    <Container>
                        <Row className="justify-content-md-center">
                            <Image className={styles.bookIcon} src={Icone} />
                            <h1>{book.title}</h1>
                        </Row>
                        <Row className={styles.info}>
                            <Col>Auteur: {book.author}</Col>
                            <Col>Mots-clés: {book.keywords}</Col>
                            <Col>Date: {new Date(book.published).toLocaleDateString()}</Col>
                        </Row>
                        <Row className={styles.bookContent}>
                            <Col>{book.text}</Col>
                        </Row>
                    </Container>
                );
            }}
        </FetchData>
    );
};

export default Book;