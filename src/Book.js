import React, { Component } from 'react'

class Book extends Component {
    render() {

        const { book, onChangeShelf, shelfTypes } = this.props
        const shelfOptions = ['move', 'currentlyReading', 'wantToRead', 'read', 'none']
        return (<div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${typeof (book.imageLinks) !== 'undefined' ? book.imageLinks.thumbnail : ''}")` }}></div>
                <div className="book-shelf-changer">
                    <select defaultValue={typeof (book.shelf) === 'undefined' ? 'none' : book.shelf} onChange={(event) => {
                        book.shelf = event.target.value === 'none' ? book.shelf : event.target.value
                        onChangeShelf(book);
                    }}>
                        {shelfOptions.map(shelfOption =>
                            shelfOption === 'move' ? <option key="move" value="move" disabled>Move to...</option> : shelfOption === 'none' ?
                                <option key={shelfOption} value={shelfOption}>{shelfOption}</option> :
                                <option key={shelfOption} value={shelfOption}>{shelfTypes[shelfOption]}</option>
                        )}
                    </select>
                </div>
            </div>
            {typeof (book.title) !== 'undefined' ? <div className="book-title">{book.title}</div> : <div className="book-title"></div>}
            {typeof (book.authors) !== 'undefined' ? <div className="book-authors">{book.authors[0]}</div> : <div className="book-authors"></div>}

        </div>)
    }
}

export default Book;