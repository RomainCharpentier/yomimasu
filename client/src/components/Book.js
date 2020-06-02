import React from 'react';
import API from '../utils/API';
import { Alert } from 'react-bootstrap';

export class Book extends React.Component {
    
    constructor(props){
        super(props);
        this.displayList.bind(this);
    }

    componentDidMount() {
        const self = this;
        API.getAllBooks().then((data) => {
            const booksArray = data.data.books;
            self.setState({
                books: booksArray
            });
        }, (error) => {
            console.log(error);
        });
    }

    displayList() {
        const listItems = this.state.books.map((book) => <li key={book._id}>{book.title} - {book.text} - {new Date(book.published).toLocaleDateString("fr-FR")}</li>);
        return (
            <div>
                {listItems}
            </div>
        );
    }
    
    render() {
        // Message du serveur (erreur ou non)
        const isError = this.state && this.state.server_message;
        let message = (<Alert variant={isError && this.state.server_message.type}>{isError && this.state.server_message.message}</Alert>);
        return (
            <div className='Form'>
                {isError && message}
                <h1>Book</h1>
                { this.state && this.displayList() }
            </div>
        );
    }
}