import React, { Component } from 'react';
import {connect} from 'react-redux';

import RequiresLogin from './requires-login';
import ProfileForm from './userComponents/ProfileForm';

// CSS
import './css/profile.css';
import { fetchProfile, editMode } from '../actions/profileActions';

class Profile extends Component {
  constructor() {
		super();
		this.state = {
			editing: false
		}
  };

  componentDidMount() {
    console.log('----------------------------');
    console.log('Fetching Profile data');
    console.log('Edit mode:', this.props.editing);
    console.log('----------------------------');
    this.props.dispatch(fetchProfile(this.props.userId));
  }
  
  handleEdit = () => {
    console.log('Edit button pushed, engage editMode');
    this.props.dispatch(editMode());
    console.log('Edit mode:', this.props.editing);
	};

  render() {
    if (this.props.loading) {
      return (<div className="loader">Loading...</div>);
    }

    let editForm;
    if (this.props.editing) {
      editForm = (
        <ProfileForm
          initialValues={{
            username: this.props.username,
            email: this.props.email
          }}
          setEdit={this.handleEdit}
        />
      );
    };

    let currentData;
    if (!this.props.editing) {
      currentData = (
        <section className="profile-section">
          <div className="profile-section-details">
            <h3>Username</h3>
            <p>{this.props.username}</p>
          </div>
          <div className="profile-section-details">
            <h3>Email</h3>
            <p>{this.props.email}</p>
          </div>
        </section>
      );
    };

    let error;
    if (this.props.error) {
      error = (
        <div className="error-msg" aria-live="polite" role="alert">
          {this.props.error}
        </div>
      )
    }

    return(
      <div className="profile-container">
        <div className="profile">
          {error}
          <header className="profile-header">
            <h2>Profile</h2>
            <button
              className="profile-edit-btn"
              title="edit button"
              type="button"
              onClick={this.handleEdit}
            >
            Edit</button>
          </header>
          {this.props.editing ? editForm : currentData}
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