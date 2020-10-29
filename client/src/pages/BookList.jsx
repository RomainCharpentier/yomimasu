import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { Book } from '../components/Book.jsx';
import { useAppContext } from '../AppContext';
import PropTypes from 'prop-types';

const BookList = ({ books }) => {
    /* const dispatch = useDispatch();
    const onAdd = useCallback(
        () => {
            dispatch({ type: action.ADD_BOOK })
        },
        [dispatch],
    ); */
    return (
        <>
            <div style={{ display: 'flex' }}>
                {books.map(book =>
                    <Book key={book.id} {...book} />
                )}
            </div>

            <Button onClick={() => console.log('add')}>Add</Button>
        </>
    )
};

BookList.propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
}

const BookListStore = () => {
    const {
        state: { tasks },
        actions: { addTask, removeTask },
    } = useAppContext();
    return <BookList books={Object.entries(tasks)} />
}

export default BookListStore;