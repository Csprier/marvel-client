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
        <h1>Marvel API</h1>
        <div className="links-container">

          <ul>
            <li>
              <div className="nav-button">
                <Link to="/profile">Profile</Link>  
              </div>
            </li>
          
            <li>
              <div className="nav-button" onClick={this.onClickLogout}>
                <Link to="/">LogOut</Link>
              </div>    
            </li>
          </ul>

        </div>
      </div>
    );
  }
}

export default connect()(withRouter(Navigation));
