import React from 'react';
import { Card } from 'react-bootstrap';
import styles from '../common.scss';

export const BookItem = ({ title, text, onClick }) => {
    
    //<Button variant="primary">{new Date(props.published).toLocaleDateString("fr-FR")}</Button>
    return (
        <Card className={styles.drawBorder} onClick={onClick}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {text.substring(0,20)}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
