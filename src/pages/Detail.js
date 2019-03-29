import React, { Component } from "react";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Fab from "../components/FloatingActionButton";
import Nav from "../components/NavBackActionBar";
import BooksList from "../components/BooksList";
import BooksTable from "../components/BooksTable";
import CategoryTable from "../components/CategoryTable";

import { simpleAction } from "../actions/simpleAction";
import {
  get_all_books_action,
  get_fav_books_action
} from "../actions/books_list_action";

import "./Home.css";

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction()),
  get_all_books_action: () => dispatch(get_all_books_action()),
  get_fav_books_action: () => dispatch(get_fav_books_action())
});

const mapStateToProps = state => ({
  ...state
});

class Detail extends Component {
  simpleAction = event => {
    this.props.simpleAction();
  };

  get_all_books_action = event => {
    this.props.get_all_books_action();
  };

  componentWillMount() {
    this.props.get_all_books_action();
    this.props.get_fav_books_action();
  }

  brand = "Clean Reads";

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Nav title={this.brand} />
        <BooksList books={this.props.books_list.all_books} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
