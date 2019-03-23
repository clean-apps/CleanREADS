import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-materialize'

class NavHeader extends Component {

    render() {

        var nav_labels = Object.keys( this.props.nav );
        var nav_functions = Object.values( this.props.nav );

        var navItems = nav_labels.map( ( label, index ) => {
            return <NavItem key={index} onClick={nav_functions[index]}>{label}</NavItem>
        });

        return (
            <Navbar brand={this.props.title} right>
                {navItems}
            </Navbar>
        );
    }
}

export default NavHeader;
