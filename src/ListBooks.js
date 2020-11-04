import React, { Component } from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'

class ListBooks extends Component {
    render() {
        const { books, onChangeShelf, shelfTypes } = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {Object.keys(shelfTypes).map(shelf =>
                            <div className="bookshelf" key={shelf}>
                                <h2 className="bookshelf-title">{shelfTypes[shelf]}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {books.filter(book => book.shelf === shelf).map(book =>
                                            <li key={book.id}>
                                                <Book book={book} onChangeShelf={onChangeShelf} shelfTypes={shelfTypes} />
                                            </li>
                                        )}
                                    </ol>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'><button>Add a book</button></Link>
                </div>
            </div>
        )
    }
}

export default ListBooks;