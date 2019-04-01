import React, { Component } from "react";
import LazyLoad from "react-lazy-load";
import { NavLink } from "react-router-dom";
import "./BooksTable.css";

class BooksTable extends Component {
  _getListItem(each_book, index) {
    return (
      <div className="tile" key={index}>
        <LazyLoad width={100} height={150} debounce={false} throttle={250}>
          <NavLink to={"/detail/" + each_book.id}>
            <img
              className="book_thumbnail"
              src={each_book.thumbnail}
              alt={each_book.title}
            />
          </NavLink>
        </LazyLoad>
      </div>
    );
  }

  render() {
    var books_collection = this.props.books.map((each_book, index) => {
      return this._getListItem(each_book, index);
    });

    return (
      <div className="container">
        <div className="horizontal_scroll">{books_collection}</div>
      </div>
    );
  }
}

export default BooksTable;
