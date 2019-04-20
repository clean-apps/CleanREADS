import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import BookListItem from "./BookListItem";

const styles = theme => ({
  booklist: {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: -10
  }
});

class BooksListSearch extends Component {
  render() {
    const { classes } = this.props;
    var books_collection = this.props.books.map((each_book, index) => {
      return <BookListItem key={index} each_book={each_book} />;
    });

    return (
      <List dense={true} className={classes.booklist}>
        {books_collection}
      </List>
    );
  }
}

export default withStyles(styles)(BooksListSearch);
