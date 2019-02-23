import React, { Component } from 'react';
import {connect} from 'react-redux';

import RequiresLogin from './requires-login';
// import ProfileForm from './userComponents/ProfileForm';

// CSS
import './css/profile.css';
import { fetchProfile, editMode } from '../actions/profileActions';

class Profile extends Component {
  componentDidMount() {
    console.log('----------------------------');
    console.log('Fetching Profile data');
    console.log('----------------------------');
    this.props.dispatch(fetchProfile(this.props.userId));
  }
  
  handleEditModeChange = () => {
    console.log('this.handleEditModeChange()');
    this.props.dispatch(editMode());
  };
  
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit values:', e.target.values);
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
                <form onSubmit={(values) => this.handleSubmit(values)}>
                  <label> Username
                    <input 
                      className="edit-form-input"
                      placeholder={this.props.username}
                    />
                  </label>
                  <label> Email
                    <input 
                      className="edit-form-input"
                      placeholder={this.props.email}
                    />
                  </label>
                  <button className="edit-form-submit" type="submit">Submit Edit</button>
                </form>
                <button
                  className="profile-edit-btn"
                  title="edit button"
                  type="button"
                  onClick={this.handleEditModeChange}
                >
                Cancel</button>
              </div>
          : <section className="profile-section">
              <div className="profile-data-display">
                <div className="profile-section-details">
                  <span>Username: {this.props.username}</span>
                </div>
                <div className="profile-section-details">
                  <span>Email: {this.props.email}</span>
                </div>
                <button
                  className="profile-edit-btn"
                  title="edit button"
                  type="button"
                  onClick={this.handleEditModeChange}
                >
                Edit</button>
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