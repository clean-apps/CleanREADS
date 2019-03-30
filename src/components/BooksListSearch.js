import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListIcon from "@material-ui/icons/List";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { grey } from "@material-ui/core/colors";
import LazyLoad from "react-lazy-load";
import Fab from "@material-ui/core/Fab";
import CardActions from "@material-ui/core/CardActions";
import { NavLink } from "react-router-dom";
import BookshelfDB from '../data/BookshelfDB';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    flex: "1 0 calc(33% - 10px)",
    background: "#fafafa"
  },
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
    color: grey,
    fontSize: 10
  },
  desc: {
    paddingTop: 15,
    fontSize: 10
  },
  booklist: {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: -10
  },
  button: {
    margin: theme.spacing.unit
  },
  nohyperlink: {
    textDecoration: "none"
  },
  lists: {
    marginLeft: theme.spacing.unit,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  button: {
    margin: theme.spacing.unit,
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'row-reverse',
  }
});

const bookshelfDB = new BookshelfDB();

class BooksListSearch extends Component {

  _getListItem(classes, each_book, index) {
    //console.log(each_book);
    var authors = each_book.volumeInfo.authors
      ? each_book.volumeInfo.authors.map((author, index2) => {
          return <span key={index2}>&nbsp; {author}</span>;
        })
      : "";

      var is_added_to_list = bookshelfDB.get_book_by_volid(each_book.id, () => {});
      var actions = is_added_to_list ? ( 
                  () => { <CardActions className={classes.cardActions}>
                            <Fab aria-label="add to list" size="small" color="primary" className={classes.button}>
                              <ListIcon />
                            </Fab>
                          </CardActions> 
                      }) : '';

    return (
      <Paper key={index} className={classes.paper} elevation={0} component="li">
        <NavLink className={classes.nohyperlink} to={"/searchdetail/" + each_book.id}>
          <Card className={classes.card}>
            <LazyLoad width={100} height={150} debounce={false} throttle={250}>
              <CardMedia
                className={classes.media}
                image={
                  each_book.volumeInfo.imageLinks
                    ? each_book.volumeInfo.imageLinks.smallThumbnail
                    : ''
                }
                title={each_book.volumeInfo.title}
              />
            </LazyLoad>

            <CardContent className={classes.content}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {each_book.volumeInfo.title}
              </Typography>

              <Typography className={classes.author} color="textSecondary">
                By{authors}
              </Typography>

              <Typography className={classes.desc} variant="h5" component="h2">
                {each_book.searchInfo
                  ? each_book.searchInfo.textSnippet
                  : each_book.volumeInfo.description}
              </Typography>
              {actions}
            </CardContent>
            
          </Card>
        </NavLink>
      </Paper>
    );
  }

  render() {
    const { classes } = this.props;
    var books_collection = this.props.books.map((each_book, index) => {
      return this._getListItem(classes, each_book, index);
    });

    return (
      <List dense={true} className={classes.booklist}>
        {books_collection}
      </List>
    );
  }
}

export default withStyles(styles)(BooksListSearch);
