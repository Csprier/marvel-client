import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './css/navigation.css';

class Navigation extends Component {
  render() {
    return(
      <div className="navigation-container">
        <h1>Marvel API</h1>
        <button onClick={this.props.history.goBack} className="marvel-button">Return</button>
      </div>
    );
  }
}

export default withRouter(Navigation);