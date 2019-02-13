import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, focus } from 'redux-form';

// Validators
import { required, nonEmpty, isTrimmed } from './form-validators.js';

// ACTIONS
import { login } from '../../actions/authActions.js';

// CSS
import '../css/user-component-styles/user-login.css'
import './forms.css';

class UserLoginForm extends Component {
  onSubmit(values) {
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
          this.onSubmit(values)
        )}>
          <label htmlFor="username">Username</label>
          <Field 
            aria-label="username"
            name="username"
            id="loginusername" 
            type="text" 
            component="input"
            validate={[ required, nonEmpty, isTrimmed ]}
            />
          <label htmlFor="password">Password</label>
          <Field 
            aria-label="password"
            name="password" 
            id="loginpassword" 
            type="password" 
            component="input"
            validate={[ required, nonEmpty ]}
          />
          <button className="login-button" name="submit-login" type="submit">LOG IN</button>
          {error}
        </form>
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
  obSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(UserLoginForm);

export default connect(mapStateToProps)(UserLoginForm);