import React, { Component }  from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  fab: {
    top: 'auto',
    right: theme.spacing.unit * 4,
    bottom: theme.spacing.unit * 4,
    left: 'auto',
    position: 'fixed',
    background: 'red',
  }
});

class FloatingActionButton extends Component {

  render() {

      const { classes } = this.props;
      return (
        <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.props.onClick}>
          <AddIcon />
        </Fab>
      );
  }
}
  
export default withStyles(styles)(FloatingActionButton);
  