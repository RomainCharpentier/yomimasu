import React, { useCallback } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as action from '../constants/ActionTypes';
import { useDispatch } from 'react-redux';
import styles from "./Book.module.scss";

const Book = ({ id, title, text }) => {
    //<Button variant="primary">{new Date(props.published).toLocaleDateString("fr-FR")}</Button>
    const dispatch = useDispatch();
    const onRemove = useCallback(
        () => {
            dispatch({ type: action.REMOVE_BOOK, id: id })
        },
        [dispatch],
    );
    return (
        <Card className={styles.btn, styles.draw_border}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {text}
                </Card.Text>
            </Card.Body>
            <Button onClick={onRemove}>remove</Button>
        </Card>
    );
}

Book.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string
}

export default Book;