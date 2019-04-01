import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Icon from "@material-ui/core/Icon";

const styles = {
  horizontal_scroll: {
    display: "flex",
    overflowX: "auto",
    whiteSpace: "nowrap"
  },
  icon: {
    fontSize: 60,
    color: "darkgrey",
    width: 80,
    height: 80
  },
  icon_label: {
    fontWeight: "bold",
    marginTop: 0,
    color: "darkgrey"
  },
  tile: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  nohyperlink: {
    textDecoration: "none"
  }
};

class CategoryTable extends Component {
  _getListItem(classes, label, icon, index) {
    return (
      <NavLink className={classes.nohyperlink} to={"/category/" + label}>
        <div key={index} className={classes.tile}>
          <Icon className={classes.icon}>{icon}</Icon>
          <br />
          <p className={classes.icon_label}>{label}</p>
        </div>
      </NavLink>
    );
  }

  render() {
    const { classes } = this.props;

    var category_collection = this.props.categories.map(
      (each_category, index) => {
        return this._getListItem(
          classes,
          each_category.text,
          each_category.icon,
          index
        );
      }
    );

    return (
      <div className={classes.horizontal_scroll}>{category_collection}</div>
    );
  }
}

export default withStyles(styles)(CategoryTable);
