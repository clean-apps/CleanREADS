import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListIcon from "@material-ui/icons/List";
import { NavLink } from "react-router-dom";
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    textAlign: "left"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
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
  },
  nohyperlink: {
    textDecoration: "none"
  }
});

class NavActionBar extends Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { classes } = this.props;
    const sideList = (
      <div className={classes.list}>
        <List>
          {this.props.lists.map(list_item => (
            <NavLink
              className={classes.nohyperlink}
              to={"/lists/" + list_item.text}
            >
              <ListItem button key={list_item.text} aria-label={list_item.text}>
                <ListItemIcon>
                  <Icon className={classes.icon}>{list_item.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={list_item.text} />
              </ListItem>
            </NavLink>
          ))}
        </List>
        <Divider />
        <List>
          {this.props.categories.map((each_category, index) => (
            <ListItem
              button
              key={each_category.text}
              aria-label={each_category.text}
            >
              <NavLink
                className={classes.nohyperlink}
                to={"/category/" + each_category.text}
              >
                <ListItemIcon>
                  <Icon className={classes.icon}>{each_category.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={each_category.text} />
              </NavLink>
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </Drawer>

        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton>

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

export default withStyles(styles)(NavActionBar);
