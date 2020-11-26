import React, { useState, useEffect } from 'react';
import { Image, Container, Col, Row, Button } from 'react-bootstrap';
import styles from "../pages/Users.module.scss";

const Pagination = (props) => {
    const { items, itemsPerPage, refreshPage, template } = props;
    const [page, setPage] = useState(0);
    const [itemsOnPage, setItemsOnPage] = useState([]);
    const maxPage = (items.length / itemsPerPage) - 1;

    const updateItemsOnPage = () => {
        const first = (page - 1) * itemsPerPage;
        setItemsOnPage(items.slice(first, first + itemsPerPage));
    }

    useEffect(() => {
        updateItemsOnPage();
        refreshPage(page);
    }, [page])

    const moveToPrevious = () => {
        moveTo(page - 1);
    }

    const moveToNext = () => {
        moveTo(page + 1);
    }

    const moveTo = (newPage) => {
        setPage(Math.max(Math.min(newPage, maxPage), 0));
    }

    const getArray = () => {
        let array = [];
        for (let i=Math.max(page-2, 0); i<=Math.min(page+2, maxPage); i++) {
            array.push(i);
        }
        return array;
    }

    return (
        <Container>
            <Row>
                {items.map((item, index) =>
                    (Math.trunc(index / itemsPerPage) == page) && (
                        <Col key={index} className={styles.container} md={2}>
                            {template(item)}
                        </Col>
                    )
                )}
            </Row>
            <Row>
                <Button onClick={moveToPrevious} disabled={page <= 0}>Précédent</Button>
                {getArray().map(index => <Button key={index} onClick={() => moveTo(index)} disabled={page == index}>{index}</Button>)}
                <Button onClick={moveToNext} disabled={page >= maxPage}>Suivant</Button>
            </Row>
        </Container>
    );
}

export default Pagination;