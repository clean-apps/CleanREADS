import React, { Component } from 'react';
import { connect } from 'react-redux';

import Fab from './components/Fab';
import NavHeader from './components/NavHeader';
import BooksList from './components/BooksList';
import BooksTable from './components/BooksTable';
import CategoryTable from './components/CategoryTable';

import { simpleAction } from './actions/simpleAction'
import { get_all_books_action, get_fav_books_action } from './actions/books_list_action';

import './App.css';

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction()),
  get_all_books_action: () => dispatch(get_all_books_action()),
  get_fav_books_action: () => dispatch(get_fav_books_action())
})

const mapStateToProps = state => ({
  ...state
})

class App extends Component {

  simpleAction = (event) => {
    this.props.simpleAction();
  }

  get_all_books_action = (event) => {
    this.props.get_all_books_action();
  }

  componentWillMount(){
    this.props.get_all_books_action();
    this.props.get_fav_books_action();
  }

  brand = 'My Books';
  nav_items = {
      'Getting Started':  (event) => { this.props.simpleAction(); },
      'Components': (event) => { this.props.simpleAction(); }
  };

  category_items = {
    'Music': { icon: 'music_note', onClick: (event) => { this.props.simpleAction(); } },
    'Art': { icon: 'format_paint', onClick: (event) => { this.props.simpleAction(); } },
    'Fitness': { icon: 'fitness_center', onClick: (event) => { this.props.simpleAction(); } },
    'Drama': { icon: 'filter_drama', onClick: (event) => { this.props.simpleAction(); } },
    'Thriller': { icon: 'format_size', onClick: (event) => { this.props.simpleAction(); } }
  }

  render() {

    return (
      <div className="App">
        <NavHeader title={this.brand} nav={this.nav_items} />
        <BooksTable books={this.props.books_list.fav_books} />
        <CategoryTable categories={this.category_items} />
        <BooksList books={this.props.books_list.all_books} />
        <Fab onClick={this.simpleAction} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
