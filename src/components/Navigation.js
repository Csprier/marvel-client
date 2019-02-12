import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logout } from '../actions/authActions';

import './css/navigation.css';

class Navigation extends Component {
  onClickLogout = () => {
    this.props.dispatch(logout())
    this.props.history.push('/')
  }

  render() {
    return(
      <div className="navigation-container">
        <h1>Marvel API</h1>
        <button className="logout-button" onClick={this.onClickLogout}>LogOut</button>
        <button onClick={this.props.history.goBack} className="return-button">Return</button>
      </div>
    );
  }
}

export default connect()(withRouter(Navigation));
