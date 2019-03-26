import React, { Component } from 'react';
import './BooksTable.css';

class BooksTable extends Component {

    _getListItem( each_book, index ){

        var maxLength = 25; // maximum number of characters to extract
        var title = each_book.volumeInfo.title;
        var trimmedTitle = title;
        if( title.length >= maxLength ){
            var trimmedTitle = title.substr(0, maxLength);
            trimmedTitle = title.substr(0, Math.min(trimmedTitle.length, trimmedTitle.lastIndexOf(" ")))
            trimmedTitle += '...'
        }

        return  <div className="tile" key={index}>
                    <img className="book_thumbnail" 
                         src={each_book.volumeInfo.imageLinks.smallThumbnail}
                         alt={trimmedTitle}/>
                </div>
    }

    render() {

        var books_collection = this.props.books.map( (each_book, index) => {
            return this._getListItem(each_book, index);
        });

        return (
            <div className="container">
               <div className="horizontal_scroll">
                    {books_collection}    
                </div>
            </div>
        );
    }
}

export default BooksTable;
