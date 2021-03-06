import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

// Validators
import { validators } from './form-validators';
import renderField from '../Field/renderField';

// ACTIONS
import { login } from '../../actions/authActions.js';

// CSS
import '../css/user-component-styles/user-login.css'
import './forms.css';

class UserLoginForm extends Component {
  handleLoginSubmit(values) {
    this.props.dispatch(login(values.username, values.password))
  }

  render() {
    let error;
    if (this.props.loginFail) {
      error = (
        <div className="form-field-error" aria-live="polite">
          {this.props.loginFail}
        </div>
      );
    }

    return (
      <div className="user-login-form">
        <h2>Login</h2>
        <form onSubmit={this.props.handleSubmit(values =>
          this.handleLoginSubmit(values)
        )}>
          <label htmlFor="username">Username</label>
          <Field 
            aria-label="username"
            name="username"
            id="loginusername" 
            type="text" 
            component={renderField}
            validate={[ validators.required, validators.nonEmpty, validators.isTrimmed ]}
            placeholder="Username..."
            />
          <label htmlFor="password">Password</label>
          <Field 
            aria-label="password"
            name="password" 
            id="loginpassword" 
            type="password" 
            component={renderField}
            validate={[ validators.required, validators.nonEmpty ]}
            placeholder="Password..."
          />
          <button className="login-button" name="submit-login" type="submit">LOG IN</button>
          {error}
        </form>
        <p className="sign-up-link">
          Don't have an account?
          <Link to="/register">Sign Up</Link>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.user !== null,
  loginFail: state.auth.error
});

UserLoginForm = reduxForm({
  form: 'UserLoginForm',
  // onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(UserLoginForm);

export default connect(mapStateToProps)(UserLoginForm);