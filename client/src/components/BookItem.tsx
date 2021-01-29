import React from 'react';
import { Card } from 'react-bootstrap';
import styles from '../common.scss';

type BookItemProps = {
    title: string;
    text: string;
    onClick?: ()=>void;
}

export const BookItem = ({ title, text, onClick }: BookItemProps) => {
    
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
