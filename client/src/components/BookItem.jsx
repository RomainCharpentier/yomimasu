import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const BookItem = ({ title, text, onClick }) => {
    
    //<Button variant="primary">{new Date(props.published).toLocaleDateString("fr-FR")}</Button>
    return (
        <Card className='btn draw-border' onClick={onClick}>
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