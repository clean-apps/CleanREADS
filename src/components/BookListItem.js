import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ListIcon from "@material-ui/icons/List";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { grey } from "@material-ui/core/colors";
import LazyLoad from "react-lazy-load";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import { NavLink } from "react-router-dom";
import BookshelfDB from "../data/BookshelfDB";

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
    justifyContent: "space-between"
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
  nohyperlink: {
    textDecoration: "none"
  },
  lists: {
    marginLeft: theme.spacing.unit,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  cardActions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start"
  }
});

let db = BookshelfDB.getInstance();

class BookListItem extends Component {
  state = {
    book_fromDb: null
  };

  componentWillMount() {
    const { each_book } = this.props;
    db.get_book_by_volid(each_book.vol_id, book_fromDb => {
      this.setState({
        book_fromDb: book_fromDb
      });
    });
  }

  render() {
    const { classes, each_book } = this.props;
    let { book_fromDb } = this.state;

    const action_add_to_list = (
      <IconButton aria-label="add to list" size="small">
        <ListIcon />
      </IconButton>
    );

    let card_actions = null;
    if (book_fromDb) {
      if (book_fromDb.is_fav) {
        card_actions = (
          <CardActions className={classes.cardActions}>
            <IconButton aria-label={book_fromDb.is_fav} size="small">
              <FavoriteIcon />
            </IconButton>
            {action_add_to_list}
          </CardActions>
        );
      } else {
        card_actions = (
          <CardActions className={classes.cardActions}>
            <IconButton aria-label={book_fromDb.is_fav} size="small">
              <FavoriteBorderIcon />
            </IconButton>
            {action_add_to_list}
          </CardActions>
        );
      }
    } else {
      card_actions = (
        <CardActions className={classes.cardActions}>
          {action_add_to_list}
        </CardActions>
      );
    }

    let book_detail = book_fromDb
      ? "/detail/" + each_book.vol_id
      : "/searchdetail/" + each_book.vol_id;

    return (
      <Paper className={classes.paper} elevation={0} component="li">
        <NavLink className={classes.nohyperlink} to={book_detail}>
          <Card className={classes.card}>
            <LazyLoad width={100} height={150} debounce={false} throttle={250}>
              <CardMedia
                className={classes.media}
                image={each_book.thumbnail}
                title={each_book.title}
              />
            </LazyLoad>

            <CardContent className={classes.content}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {each_book.title}
              </Typography>

              <Typography className={classes.author} color="textSecondary">
                By{each_book.authors}
              </Typography>

              <Typography className={classes.desc} variant="h5" component="h2">
                {each_book.short_desc}
              </Typography>
            </CardContent>

            {card_actions}
          </Card>
        </NavLink>
      </Paper>
    );
  }
}

export default withStyles(styles)(BookListItem);
