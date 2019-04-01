import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Nav from "../components/NavSearchActionBar";
import BooksList from "../components/BooksList";
import { search_books } from "../actions/books_list_actions";

import "./Home.css";

const mapDispatchToProps = dispatch => ({
  search_books: search_txt => dispatch(search_books(search_txt))
});

const mapStateToProps = state => ({
  ...state
});

class Search extends Component {
  search_books = event => {
    this.props.search_books(event.target.value);
  };

  render() {
    if (this.props.books_list.searched_books) {
      return (
        <div className="App">
          <CssBaseline />
          <Nav
            text={this.props.books_list.search_text}
            onChange={this.search_books}
          />
          <BooksList books={this.props.books_list.searched_books} />
        </div>
      );
    } else {
      return (
        <div className="App">
          <CssBaseline />
          <Nav text="" onChange={this.search_books} />
        </div>
      );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
