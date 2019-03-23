import React, { Component } from 'react';

class Fab extends Component {

  render() {

    return (
      <div className="fixed-action-btn horizontal" style={{ bottom: '45px', right: '24px' }} >
          <a className="btn-floating btn-large red">
            <i className="large material-icons" onClick={this.props.onClick}>add</i>
          </a>
        </div>
    );
  }
}

export default Fab;
