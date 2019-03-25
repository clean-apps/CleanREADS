import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const styles = {
    horizontal_scroll: {
        display: 'flex',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
    },    
    icon: {
        fontSize: 60,
        color: 'darkred',
        width: 80,
        height: 80,
    },
    icon_label: {
        fontWeight: 100,
        marginTop: 0,
    },
    tile: {
        paddingTop: 20,
        paddingRight: 20,
    }
  };

class CategoryTable extends Component {

    _getListItem( classes, label, option, index ){
        return <div key={index} className={classes.tile} onClick={option.onClick}>
                    <Icon className={classes.icon}>{option.icon}</Icon><br/>
                    <p className={classes.icon_label}>{label}</p>
                </div>
    }

    render() {
        const { classes } = this.props;
          
        var category_labels = Object.keys( this.props.categories );
        var category_options =  Object.values( this.props.categories );

        var category_collection = category_labels.map( (each_category, index) => {
            return this._getListItem( classes, each_category, category_options[index], index);
        });

        return (
            <div className={classes.horizontal_scroll}>
                {category_collection}    
            </div>
        );
    }
}

export default withStyles(styles)(CategoryTable);