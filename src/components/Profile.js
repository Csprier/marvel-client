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
    console.log('Edit mode:', this.props.editing);
    console.log('----------------------------');
    this.props.dispatch(fetchProfile(this.props.userId));
  }
  
  handleEdit = () => {
    this.props.dispatch(editMode());
    console.log('Edit mode:', this.props.editing);
  };
  
  handleSubmit = (values) => {
    console.log('submit values:', values);
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

    return(
      <div className="profile-container">
        <div className="profile">
          {error}
          <header className="profile-header">
            <h2>Profile</h2>
          </header>
          {(this.props.editing)  
            ? <div className="edit-form">
                <button
                  className="profile-edit-btn"
                  title="edit button"
                  type="button"
                  onClick={this.handleEdit}
                >
                Cancel</button>
                <form>
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
              </div>
          : <section className="profile-section">
              <div>
                <button
                  className="profile-edit-btn"
                  title="edit button"
                  type="button"
                  onClick={this.handleEdit}
                >
                Edit</button>
                <div className="profile-section-details">
                  <h4>Username</h4>
                  <p>{this.props.username}</p>
                </div>
                <div className="profile-section-details">
                  <h4>Email</h4>
                  <p>{this.props.email}</p>
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