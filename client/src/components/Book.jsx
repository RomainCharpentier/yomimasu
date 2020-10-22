import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const Book = props => {
    
    //<Button variant="primary">{new Date(props.published).toLocaleDateString("fr-FR")}</Button>
    return (
        <Card className='btn draw-border'>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.text}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

Book.PropTypes = {
    title: PropTypes.string,
    text: PropTypes.string
}