import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const Pagination = (props) => {
    const {items, itemsPerPage, refreshPage} = props;
    const [page, setPage] = useState(0);
    const [itemsOnPage, setItemsOnPage] = useState([]);
    const maxPage = (items.length/itemsPerPage)-1;

    const updateItemsOnPage = () => {
        const first = (page-1) * itemsPerPage;
        setItemsOnPage(items.slice(first, first + itemsPerPage));
    }

    useEffect(() => {
        console.log(page)
    }, [page])

    const moveToPrevious = () => {
        moveTo(page-1);
    }

    const moveToNext = () => {
        moveTo(page+1);
    }

    const moveTo = (newPage) => {
        setPage(Math.max(Math.min(newPage, maxPage), 0));
        updateItemsOnPage();
        refreshPage(itemsOnPage);
    }

    return(
        <div>
            {props.children}
            <Button onClick={moveToPrevious} disabled={page <= 0}>Précédent</Button>
            <Button onClick={moveToNext} disabled={page >= maxPage}>Suivant</Button>
        </div>
    );
}

export default Pagination;