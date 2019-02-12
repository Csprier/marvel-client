import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logoutUser } from '../actions/userActions';

import './css/navigation.css';

class Navigation extends Component {
  onClickLogout = () => {
    this.props.dispatch(logoutUser())
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
