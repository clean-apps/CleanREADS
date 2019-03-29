import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import { NavLink } from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    textAlign: "left"
  },
  backButton: {
    marginLeft: -12,
    marginRight: 20,
    color: "white"
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  icon: {
    fontSize: 16
  },
  appBar: {
    background: "#009688"
  }
});

class NavBackActionBar extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <NavLink to={"/"}>
              <IconButton
                className={classes.backButton}
                color="inherit"
                aria-label="Back"
              >
                <ChevronLeft />
              </IconButton>
            </NavLink>

            <Typography variant="h6" color="inherit" className={classes.grow}>
              {this.props.title}
            </Typography>

            <IconButton color="inherit" aria-label="Search">
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavBackActionBar);
