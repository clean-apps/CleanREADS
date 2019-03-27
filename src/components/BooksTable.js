import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';
import './BooksTable.css';

class BooksTable extends Component {

    _getListItem( each_book, index ){

        var maxLength = 25; // maximum number of characters to extract
        var title = each_book.volumeInfo.title;
        var trimmedTitle = title;
        if( title.length >= maxLength ){
            trimmedTitle = title.substr(0, maxLength);
            trimmedTitle = title.substr(0, Math.min(trimmedTitle.length, trimmedTitle.lastIndexOf(" ")))
            trimmedTitle += '...'
        }

        return  <div className="tile" key={index}>
                    <LazyLoad 
                        width={100}
                        height={150}
                        debounce={false}
                        throttle={250} >

                        <img className="book_thumbnail" 
                             src={each_book.volumeInfo.imageLinks.smallThumbnail}
                             alt={trimmedTitle} />

                    </LazyLoad>
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
