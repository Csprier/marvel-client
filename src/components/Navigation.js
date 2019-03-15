import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
        <div className="nav-header-container">
          <h1>Marvel API</h1>
        </div>
        <div className="links-container">
          <ul className="links">
            <li>
              <Link to="/profile">Profile</Link>  
            </li>
            <li>
              <Link to="/" onClick={this.onClickLogout}>LogOut</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default connect()(withRouter(Navigation));
