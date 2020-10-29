import * as books from './constants/BookAction';

export default {
    getBooks: {
        url: '/api/books',
        actions: [books.getBooks, books.getBooksSuccess, books.getBooksError]
    },
    getBook: {
        url: '/api/books/:id',
        actions: [books.getBook, books.getBookSuccess, books.getBookError]
    },
    addBook: {
        url: '/api/books',
        actions: [books.addBook, books.addBookSuccess, books.addBookError]
    },
    updateBook: {
        url: '/api/books/:id',
        actions: [books.updateBook, books.updateBookSuccess, books.updateBookError]
    },
    deleteBook: {
        url: '/api/books/:id',
        actions: [books.deleteBook, books.deleteBookSuccess, books.deleteBookError]
    }
}