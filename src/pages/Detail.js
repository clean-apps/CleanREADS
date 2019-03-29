import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Nav from "../components/NavBackActionBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import LazyLoad from "react-lazy-load";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/icons/List";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { get_book_by_id_action } from "../actions/books_list_action";

import "./Home.css";

const styles = theme => ({
  card: {
    textAlign: "left",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  content: {
    display: "flex",
    flexDirection: "column"
  },
  media: {
    minWidth: 100,
    maxWidth: 100,
    minHeight: 150,
    maxHeight: 150,
    margin: 7
  },
  title: {
    fontWeight: "Bold",
    color: "black",
    fontSize: 14
  },
  author: {
    color: "grey",
    fontSize: 10
  },
  desc: {
    paddingTop: 15,
    fontSize: 10
  },
  fab_fav: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  get_book_by_id_action: () =>
    dispatch(get_book_by_id_action(ownProps.match.params.volume_id))
});

const mapStateToProps = state => ({
  ...state
});

class Detail extends Component {
  componentWillMount() {
    this.props.get_book_by_id_action();
  }

  render() {
    const { classes } = this.props;
    var { selected_book } = this.props.books_list;
    var countProps = Object.getOwnPropertyNames(selected_book).length;

    if (countProps === 0) {
      return <div className="App" />;
    } else {
      var authors = selected_book.volumeInfo.authors.map((author, index2) => {
        return <span key={index2}>&nbsp; {author}</span>;
      });

      return (
        <div className="App">
          <CssBaseline />
          <Nav title={selected_book.volumeInfo.title} />
          <Card className={classes.card}>
            <LazyLoad width={100} height={150} debounce={false} throttle={250}>
              <CardMedia
                className={classes.media}
                image={selected_book.volumeInfo.imageLinks.smallThumbnail}
                title={selected_book.volumeInfo.title}
              />
            </LazyLoad>

            <CardContent className={classes.content}>
              <Typography variant="h6" align="left" gutterBottom>
                {selected_book.volumeInfo.title}
              </Typography>
              <Typography variant="subtitle1" align="left" gutterBottom>
                {authors}
              </Typography>
              <div className={classes.card}>
                <Fab
                  color="secondary"
                  variant="extended"
                  aria-label="Add"
                  size="medium"
                  className={classes.fab_fav}
                >
                  <FavoriteBorder className={classes.extendedIcon} />
                  Add Favorite
                </Fab>
                <Fab
                  color="primary"
                  variant="extended"
                  aria-label="Add"
                  size="medium"
                  className={classes.fab_fav}
                >
                  <List className={classes.extendedIcon} />
                  Add to List
                </Fab>
              </div>
              <Typography variant="body1" align="left" gutterBottom>
                {selected_book.volumeInfo.description}
              </Typography>
            </CardContent>
          </Card>
        </div>
      );
    }
  }
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Detail)
);
