import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends Component {

    state = {
        query: ''
    }

    searchQuery = (query) => {
        this.setState(() => ({
            query: query
        }))

        if (this.props.onSearch) {
            this.props.onSearch(query);
        }
    }

    render() {

        const { books, onChangeShelf, shelfTypes } = this.props;

        return (<div className="search-books">
            <div className="search-books-bar">
                <Link to='/' onClick={() => this.searchQuery('')}><button className="close-search">Close</button></Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" onChange={(event) => this.searchQuery(event.target.value)} />
                </div>
            </div>
            <div className="search-books-results">
                <div className='search-books-number'>
                    {books.length === 0 ? <span></span> : books.length === 1 && books[0] === 'error' ?
                        <span>No results fetched / Error occured</span> : <span>Showing {books.length} results</span>}
                </div>
                <ol className="books-grid">
                    {(books.length !== 0 && books[0] !== 'error') && (books.map(book =>
                        <li key={book.id}><Book book={book} onChangeShelf={onChangeShelf} shelfTypes={shelfTypes} /></li>
                    ))}
                </ol>
            </div>
        </div>)
    }
}

export default SearchBooks;