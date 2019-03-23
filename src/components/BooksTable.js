import React, { Component } from 'react';
import './BooksTable.css';

class BooksTable extends Component {

    _getListItem( each_book, index ){

        return  <div key={index} className="tile">
                    <img src={each_book.volumeInfo.imageLinks.smallThumbnail}/><br/>
                    <b className="fav_titles">{each_book.volumeInfo.title}</b>
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
