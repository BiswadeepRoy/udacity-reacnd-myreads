import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: [],
    selectedBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books: books
      }))
    })
  }

  updateShelf = (book) => {

    if (this.state.books.find(b => b.id === book.id)) {
      this.setState((currentState) => ({
        books: currentState.books.map(b => b.id === book.id ? book : b)
      }))
    }
    else {
      this.setState((currentState) => ({
        books: currentState.books.concat(book)
      }))
    }

    BooksAPI.update(book, book.shelf);
  }


  searchBooksByQuery = (query) => {
    BooksAPI.search(query).then((searchedBooks) => {
      if (typeof (searchedBooks) === 'undefined') {
        this.setState(() => ({
          selectedBooks: []
        }))
      }
      else if (searchedBooks.error === 'Please provide a query in the request body' || searchedBooks.error === 'empty query') {
        this.setState(() => ({
          selectedBooks: ['error']
        }))
      }
      else {
        this.setState((currentState) => ({
          selectedBooks: searchedBooks.map(book => currentState.books.filter(b => b.id === book.id).length > 0 ? currentState.books.filter(b => b.id === book.id)[0] : book)
        }))
      }
    })
  }

  render() {

    const shelfTypes = {
      'wantToRead': 'Want To Read',
      'currentlyReading': 'Currently Reading',
      'read': 'Read'
    }

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks books={this.state.books} onChangeShelf={this.updateShelf} shelfTypes={shelfTypes} />
        )}>
        </Route>
        <Route exact path='/search' render={() =>
          <SearchBooks books={this.state.selectedBooks} onSearch={this.searchBooksByQuery} onChangeShelf={this.updateShelf} shelfTypes={shelfTypes} />}>
        </Route>
      </div>
    )
  }
}

export default BooksApp
