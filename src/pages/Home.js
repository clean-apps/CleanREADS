import React, { Component } from "react";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Fab from "../components/FloatingActionButton";
import Nav from "../components/NavActionBar";
import BooksList from "../components/BooksList";
import BooksTable from "../components/BooksTable";
import CategoryTable from "../components/CategoryTable";

import {
  get_all_books_action,
  get_fav_books_action,
  get_all_lists_action,
  get_all_category_action
} from "../actions/books_list_actions";

import "./Home.css";

const mapDispatchToProps = dispatch => ({
  get_all_books_action: () => dispatch(get_all_books_action()),
  get_fav_books_action: () => dispatch(get_fav_books_action()),
  get_all_lists_action: () => dispatch(get_all_lists_action()),
  get_all_category_action: () => dispatch(get_all_category_action())
});

const mapStateToProps = state => ({
  ...state
});

class Home extends Component {
  componentWillMount() {
    this.props.get_all_books_action();
    this.props.get_fav_books_action();
    this.props.get_all_lists_action();
    this.props.get_all_category_action();
  }

  render() {
    let title = "Clean Reads";
    let { books_list } = this.props;

    return (
      <div className="App">
        <CssBaseline />
        <Nav
          title={title}
          lists={books_list.list_items}
          categories={books_list.category_items}
        />

        <p hidden={books_list.fav_books.length === 0} className="title_header">
          Favorites
        </p>
        <BooksTable books={books_list.fav_books} />

        <p className="title_header">Categories</p>
        <CategoryTable categories={books_list.category_items} />

        <p hidden={books_list.all_books.length === 0} className="title_header">
          Recently Added
        </p>
        <BooksList books={books_list.all_books} />
        <Fab />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
