import React, { Component } from 'react';
import './CategoryTable.css';

class CategoryTable extends Component {

    _getListItem( label, option, index ){
        return <div key={index} className="tile" onClick={option.onClick}>
                    <i className="medium material-icons">{option.icon}</i><br/>
                    {label}
                </div>
    }

    render() {

        var category_labels = Object.keys( this.props.categories );
        var category_options =  Object.values( this.props.categories );

        var category_collection = category_labels.map( (each_category, index) => {
            return this._getListItem(each_category, category_options[index], index);
        });

        return (
            <div className="container">
               <div className="horizontal_scroll">
                    {category_collection}    
                </div>
            </div>
        );
    }
}

export default CategoryTable;
