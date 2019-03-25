import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';

const styles = theme => ({
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
     },
    card: {
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
    },
    media: {
        minWidth: 100,
        maxWidth: 100,
        minHeight: 150,
        maxHeight: 150,
        margin: 7,
    },
    title: {
        fontWeight: 'Bold',
        color: 'black',
        fontSize: 14,
    },
    author: {
        color: grey,
        fontSize: 10,
    },
    desc: {
        paddingTop: 15,
        fontSize: 10,
    },
  });

class BooksList extends Component {

    _getListItem( classes, each_book, index ){

        var authors = each_book.volumeInfo.authors.map( (author, index2) => {
            return <span key={index2}>&nbsp; {author}</span>
        })

        return  <Paper className={classes.paper} elevation={1}>
                <Card key={index} className={classes.card}>

                    <CardMedia  className={classes.media}
                                image={each_book.volumeInfo.imageLinks.smallThumbnail}
                                title={each_book.volumeInfo.title}  />

                    <CardContent className={classes.content}>
                        
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {each_book.volumeInfo.title}
                        </Typography>

                        <Typography className={classes.author} color="textSecondary">
                            By{authors}
                        </Typography>

                        <Typography className={classes.desc}  variant="h5" component="h2">
                            {each_book.searchInfo.textSnippet}
                        </Typography>
                        
                    </CardContent>

                </Card>
                </Paper>
    }

    render() {

        const { classes } = this.props;
        var books_collection = this.props.books.map( (each_book, index) => {
            return this._getListItem(classes, each_book, index);
        });

        return (
            <List dense='true'>
                {books_collection}
            </List>
        );
    }
}

export default withStyles(styles)(BooksList);
