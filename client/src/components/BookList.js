import React from 'react';
import API from '../utils/API';
import { Alert } from 'react-bootstrap';
import { Book } from './Book.js';

export class BookList extends React.Component {
    
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
        const listItems = this.state.books.map((book) => <Book {...book} />);
        return (
            <div className='flex-container'>
                {listItems}
            </div>
        );
    }
    
    render() {
        // Message from server (error or not)
        const isError = this.state && this.state.server_message;
        let message = (<Alert variant={isError && this.state.server_message.type}>{isError && this.state.server_message.message}</Alert>);
        return (
            <div className='Form'>
                {isError && message}
                <h1>Book List</h1>
                { this.state && this.displayList() }
            </div>
        );
    }
}