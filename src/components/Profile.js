import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import RequiresLogin from './requires-login';

// CSS
import './css/profile.css';
import { fetchProfile, editMode, editProfile } from '../actions/profileActions';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      editUsername: '',
      editEmail: '',
      editPassword: ''
    }
  }
  
  componentDidMount() {
    console.log('----------------------------');
    console.log('Fetching Profile data');
    console.log('----------------------------');
    this.props.dispatch(fetchProfile(this.props.userId));
  }
  
  handleEditModeChange = () => {
    this.props.dispatch(editMode());
  };

  handleUsernameChange = (e) => {
    this.setState = {
      username: e.target.value
    }
  }
  handleUsernameChange = (e) => {
    this.setState = {
      email: e.target.value
    }
  }
  handlePasswordChange = (e) => {
    this.setState = {
      password: e.target.value
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log('----------------------------------------------');
    // console.log('Submitting Edits:');
    // console.log('userId:', this.props.userId);
    // console.log('New Username:', this.refs.editedUsername.value);
    // console.log('New Email:', this.refs.editedEmail.value);
    // console.log('----------------------------------------------');
    let userId = this.props.userId;
    let updatedProfile = {
      username: this.refs.editedUsername.value,
      email: this.refs.editedEmail.value,
      password: this.refs.editedPassword.value
    }
    // console.log('userId:', userId);
    // console.log('updatedProfile:', updatedProfile);
    this.props.dispatch(editProfile(userId, updatedProfile));
  }

  backToDashboard = (e) => {
    
  }
  
  render() {
    if (this.props.loading) {
      return (<div className="loader">Loading...</div>);
    }

    let error;
    if (this.props.error) {
      error = (
        <div className="error-msg" aria-live="polite" role="alert">
          {this.props.error}
        </div>
      )
    }
    console.log('Edit Mode:', this.props.editing);
    return(
      <div className="profile-container">
        <div className="profile">
          {error}
          <header className="profile-header">
            <h2>Profile</h2>
          </header>
          {(this.props.editing)  
            ? <div className="edit-form">
                <form onSubmit={this.handleSubmit}>
                  <label> Username
                    <input 
                      className="edit-form-input"
                      ref="editedUsername"
                      value={this.state.editedUsername} 
                      onChange={this.handleUsernameChange}
                      placeholder={this.props.username}
                    />
                  </label>
                  <label> Email
                    <input 
                      className="edit-form-input"
                      ref="editedEmail"
                      value={this.state.editedEmail} 
                      onChange={this.handleEmailChange}
                      placeholder={this.props.email}
                    />
                  </label>
                  <label> Password
                    <input 
                      className="edit-form-input"
                      ref="editedPassword"
                      type="password"
                      value={this.state.editedPassword} 
                      onChange={this.handlePasswordChange}
                      placeholder="Enter your password to submit changes"
                    />
                  </label>
                  <div className="profile-buttons">
                    <button 
                      className="edit-form-submit" 
                      type="submit"
                    >
                    Submit Edit</button>
                    <button
                      className="profile-edit-btn"
                      title="edit button"
                      type="button"
                      onClick={this.handleEditModeChange}
                    >
                    Cancel</button>
                  </div>
                </form>
              </div>
          : <section className="profile-section">
              <div className="profile-data-display">
                <div className="profile-section-details">
                  <h4>Username:</h4> 
                  <p>{this.props.username}</p>
                </div>
                <div className="profile-section-details">
                  <h4>Email:</h4>
                  <p>{this.props.email}</p>
                </div>
                <div className="profile-buttons">
                  <button
                    className="profile-edit-btn"
                    title="edit button"
                    type="button"
                    onClick={this.handleEditModeChange}
                  >
                  Edit</button>
                  <button
                    className="back-to-dashboard-btn"
                    title="backToDashboard-btn"
                    type="button"
                  >
                    <Link to="/dashboard">Cancel</Link>
                  </button>
                </div>
              </div>
            </section> 
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.user !== null,
  userId: state.auth.user.id,
  editing: state.profile.editing,
  loading: state.profile.loading,
  username: state.profile.data.username,
	email: state.profile.data.email,
	error: state.profile.error
});

export default RequiresLogin()(connect(mapStateToProps)(Profile));