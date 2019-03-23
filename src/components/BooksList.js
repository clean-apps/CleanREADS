import React, { Component } from 'react';
import { Collection, Col, Card, CardTitle } from 'react-materialize'
import './BooksList.css';

class BooksList extends Component {

    _getListItem( each_book, index ){

        var authors = each_book.volumeInfo.authors.map( (author, index2) => {
            return <span key={index2}>&nbsp; {author}</span>
        })

        return  <div key={index} className="container">
                    <Col key={index} m={7} s={12}>
                        <Card className="card" horizontal 
                                header={
                                    <CardTitle image={each_book.volumeInfo.imageLinks.smallThumbnail}></CardTitle>
                                }>

                            <div className="book_title">{each_book.volumeInfo.title}</div>
                            <div className="author_names">By{authors}</div>
                            <div className="description">{each_book.searchInfo.textSnippet}</div>
                        </Card>
                    </Col>
                </div>
    }

    render() {

        var books_collection = this.props.books.map( (each_book, index) => {
            return this._getListItem(each_book, index);
        });

        return (
            <Collection>
                {books_collection}
            </Collection>
        );
    }
}

export default BooksList;
