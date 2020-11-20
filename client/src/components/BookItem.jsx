import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from '../common.scss';

export const BookItem = ({ title, text, onClick }) => {
    
    //<Button variant="primary">{new Date(props.published).toLocaleDateString("fr-FR")}</Button>
    return (
        <Card className={styles.drawBorder} onClick={onClick}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {text}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

BookItem.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func
}