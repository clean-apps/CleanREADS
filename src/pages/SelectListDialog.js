import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import AddIcon from "@material-ui/icons/Add";
import blue from "@material-ui/core/colors/blue";
import { get_all_lists_action } from "../actions/books_list_actions";
import Icon from "@material-ui/core/Icon";

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
};

const mapDispatchToProps = dispatch => ({
  get_all_lists_action: () => dispatch(get_all_lists_action())
});

const mapStateToProps = state => ({
  ...state
});

class SelectListDialog extends React.Component {
  componentWillMount() {
    this.props.get_all_lists_action();
  }

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;
    const { list_items } = this.props.books_list;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle id="simple-dialog-title">Select List</DialogTitle>
        <div>
          <List>
            {list_items.map((list, index) => (
              <ListItem
                button
                onClick={() => this.handleListItemClick(list.text)}
                key={index}
              >
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <Icon>{list.icon}</Icon>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={list.text} />
              </ListItem>
            ))}
            <ListItem
              button
              onClick={() => this.handleListItemClick("Add A List")}
            >
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="add list" />
            </ListItem>
          </List>
        </div>
      </Dialog>
    );
  }
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SelectListDialog)
);
