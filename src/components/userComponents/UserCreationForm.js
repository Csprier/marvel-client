import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

// Validators
import { required, nonEmpty, isTrimmed, passwordsMatch, length, validEmail } from './form-validators.js';

// ACTIONS
import { createUser } from '../../actions/userActions';
import { loginError } from '../../actions/authActions';

// CSS
import '../css/user-component-styles/user-creation.css';

// Password validation
const passwordLength = length({ min: 8, max: 72 });
const validPassword = passwordsMatch('password');

class UserCreationForm extends Component {
  onSubmit(values) {
    this.props.dispatch(createUser(values.username, values.email, values.password))
      .then(() => this.props.history.push('/dashboard'))
  }

  render() {
    let error;
    if (this.props.usernameerror) {
      error = (
        <div className="form-field-error" aria-live="polite">
          {this.props.usernameerror}
        </div>
      );
    }
    else if (this.props.emailerror) {
      error = (
        <div className="form-field-error" aria-live="polite">
          {this.props.emailerror}
        </div>
      );
    } 
    else if (this.props.passworderror) {
      error = (
        <div className="form-field-error" aria-live="polite">
          {this.props.passworderror}
        </div>
      );
    }
    else if (this.props.confirmpassworderror) {
      error = (
        <div className="form-field-error" aria-live="polite">
          {this.props.confirmpassworderror}
        </div>
      );
    }

    return (
      <div className="user-creation-form">
          <h2>Create an Account</h2>
          <form onSubmit={this.props.handleSubmit(values =>
            this.onSubmit(values)
          )}>
            <label htmlFor="createusername">Username</label>
            <Field 
              aria-label="createusername"
              name="username" 
              id="username" 
              type="text" 
              component="input"
              validate={[ required, nonEmpty, isTrimmed ]}
              autoComplete="off"
              placeholder="Username..."
              />
            <label htmlFor="createemail">Email</label>
            <Field 
              aria-label="createemail"
              name="email" 
              id="email" 
              type="text" 
              component="input"
              validate={[ required, nonEmpty, validEmail ]}
              autoComplete="off"
              placeholder="Email..."
              />
            <label htmlFor="createpassword">Password</label>
            <Field 
              aria-label="createpassword"
              name="password" 
              id="password" 
              type="password" 
              component="input" 
              validate={[ required, nonEmpty, isTrimmed, passwordLength ]}
              autoComplete="off"
              placeholder="Password..."
            />
            <label htmlFor="confirmpassword">Confirm Password</label>
            <Field 
              aria-label="confirmpassword"
              name="confirmpassword" 
              id="confirmpassword" 
              type="password" 
              component="input" 
              validate={[ required, nonEmpty, validPassword ]}
              autoComplete="off"
              placeholder="Confirm Password..."
            />
            <button 
              className="creation-button" 
              name="submit-create-account" 
              type="submit"
            >CREATE ACCOUNT</button>
            {error}
          </form>
          <p>
            <Link to="/">&#60; Go back</Link>
          </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.user !== null,
  usernameerror: (state.auth.error !== null && state.auth.error.username !== null) ? state.auth.error.username : undefined, 
  emailerror: (state.auth.error !== null && state.auth.error.email !== null) ? state.auth.error.email : undefined,
  passworderror: (state.auth.error !== null && state.auth.error.password !== null) ? state.auth.error.password : undefined,
  confirmpassworderror: (state.auth.error !== null && state.auth.error.confirmpassword !== null) ? state.auth.error.confirmpassword : undefined
});

UserCreationForm = reduxForm({
  form: 'userCreationForm', // save form name
  destroyOnUnmount: false, // preserve form data
  forceUnregisterOnUnmount: true, // unregister fields on unmount
  onSubmitFail: (submitError, dispatch) => {
    dispatch(loginError(submitError))
  }
})(UserCreationForm);

export default connect(mapStateToProps)(UserCreationForm);