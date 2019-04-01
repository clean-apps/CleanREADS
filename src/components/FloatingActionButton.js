import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { NavLink } from "react-router-dom";

const styles = theme => ({
  fab: {
    top: "auto",
    right: theme.spacing.unit * 4,
    bottom: theme.spacing.unit * 4,
    left: "auto",
    position: "fixed"
  },
  nohyperlink: {
    textDecoration: "none"
  }
});

class FloatingActionButton extends Component {
  render() {
    const { classes } = this.props;
    return (
      <NavLink className={classes.nohyperlink} to={"/search"}>
        <Fab color="secondary" aria-label="Add" className={classes.fab}>
          <AddIcon />
        </Fab>
      </NavLink>
    );
  }
}

export default withStyles(styles)(FloatingActionButton);
