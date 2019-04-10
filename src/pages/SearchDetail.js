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
import Button from "@material-ui/core/Button";
import List from "@material-ui/icons/List";
import Book from "@material-ui/icons/Book";
import Rating from "material-ui-rating";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { search_book_by_id_action } from "../actions/books_list_actions";
import SelectListDialog from "./SelectListDialog";

import "./Home.css";

const styles = theme => ({
  card: {
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  content_row: {
    display: "flex",
    flexDirection: "row",
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit
  },
  content_column: {
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacing.unit
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
    margin: 7,
    "-moz-box-shadow": "0 0 5px #888",
    "-webkit-box-shadow": "0 0 5px#888",
    "box-shadow": "0 0 5px #888"
  },
  title: {
    marginLeft: theme.spacing.unit
  },
  author: {
    color: "grey",
    fontSize: 12,
    marginLeft: theme.spacing.unit
  },
  desc: {
    paddingTop: 15,
    fontSize: 10
  },
  fab_fav: {
    margin: theme.spacing.unit
  },
  lists: {
    marginLeft: theme.spacing.unit,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  search_book_by_id_action: () =>
    dispatch(search_book_by_id_action(ownProps.match.params.volume_id))
});

const mapStateToProps = state => ({
  ...state
});

class SearchDetail extends Component {
  componentWillMount() {
    this.props.search_book_by_id_action();
  }

  state = {
    open_lists_selection: false
  };

  handleListViewOpen = event => {
    console.log("clicked handleListViewOpen");
    this.setState({
      open_lists_selection: true
    });
  };

  handleListViewClose = value => {
    this.props.books_list.selected_book.list_name = value;
    this.setState({
      open_lists_selection: false
    });
  };

  render() {
    const { classes } = this.props;
    var { selected_book } = this.props.books_list;
    var countProps = Object.getOwnPropertyNames(selected_book).length;

    if (countProps === 0) {
      return <div className="App" />;
    } else {
      return (
        <div className="App">
          <CssBaseline />
          <Nav title={"Book Details"} />
          <Card className={classes.card}>
            <div className={classes.content_row}>
              <LazyLoad
                width={100}
                height={150}
                debounce={false}
                throttle={250}
              >
                <CardMedia
                  className={classes.media}
                  image={selected_book.thumbnail}
                  title={selected_book.title}
                />
              </LazyLoad>
              <div className={classes.content_column}>
                <Typography
                  className={classes.title}
                  variant="h6"
                  align="left"
                  gutterBottom
                >
                  {selected_book.title}
                </Typography>
                <Typography
                  className={classes.author}
                  variant="subtitle1"
                  align="left"
                  gutterBottom
                >
                  {selected_book.authors}
                </Typography>
                <SelectListDialog
                  selectedValue={selected_book.list_name}
                  open={this.state.open_lists_selection}
                  onClose={this.handleListViewClose}
                />
                <Button
                  aria-label={selected_book.list_name}
                  size="small"
                  className={classes.lists}
                  onClick={() => this.handleListViewOpen()}
                >
                  <List className={classes.extendedIcon} />
                  {selected_book.list_name == null
                    ? "Add To List"
                    : selected_book.list_name}
                </Button>
                <Rating value={selected_book.rating} max={5} readOnly={true} />
              </div>
            </div>

            <CardContent className={classes.content}>
              <div className={classes.content_row}>
                <Button
                  color="primary"
                  variant="outlined"
                  aria-label="Add Favorite"
                  size="small"
                  className={classes.fab_fav}
                >
                  <FavoriteBorder className={classes.extendedIcon} />
                  Add Favorite
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  aria-label="Add To List"
                  size="small"
                  className={classes.fab_fav}
                >
                  <Book className={classes.extendedIcon} />
                  Google Books
                </Button>
              </div>
              <Typography variant="body1" align="left" gutterBottom>
                {selected_book.desc}
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
  )(SearchDetail)
);
