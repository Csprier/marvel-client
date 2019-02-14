import React, { Component } from 'react';
import {connect} from 'react-redux';

// import requiresLogin from './requires-login';
import ProfileForm from './userComponents/ProfileForm';

// CSS
import './css/profile.css';

class Profile extends Component {
  constructor() {
		super();
		this.state = {
			editing: false
		}
  };
  
  handleEdit = () => {
		this.setState({ editing: !this.state.editing });
	};

  render() {
    if (this.props.loading){
      return (<div className="loader">Loading...</div>);
    }

    let error;
    if(this.props.error) {
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
              className={this.state.editing ? 'profile-cancel-btn' : 'profile-edit-btn'}
              title={this.state.editing ? 'Profile cancel button' : 'Profile edit button'}
              type="button"
              onClick={this.handleEdit}>
            </button>
          </header>
          {this.state.editing
				    ? <ProfileForm
                initialValues={{
                  userId:this.props.user.id,
                  username:this.props.username,
                  email:this.props.email
                }}
                setEdit={this.handleEdit}
              />
            : <section className="profile-section">
                <div className="profile-section-details">
                  <h3>Username</h3>
                  <p>{this.props.username}</p>
                </div>
                <div className="profile-section-details">
                  <h3>Email</h3>
                  <p>{this.props.email}</p>
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
  userId: state.auth.user.id !== null,
  username: state.auth.user.username,
  email: state.auth.user.email
});

export default connect(mapStateToProps)(Profile);
// export default requiresLogin()(connect(mapStateToProps)(Profile));