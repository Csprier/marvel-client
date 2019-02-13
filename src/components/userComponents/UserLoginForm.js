import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, focus } from 'redux-form';

// ACTIONS
import { login } from '../../actions/authActions.js';

// CSS
import '../css/user-component-styles/user-login.css'

class UserLoginForm extends Component {
  onSubmit(values) {
    this.props.dispatch(login(values.username, values.password))
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-field-error" aria-live="polite">
          {this.props.error}
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
            />
          <label htmlFor="password">Password</label>
          <Field 
            aria-label="password"
            name="password" 
            id="loginpassword" 
            type="password" 
            component="input" 
          />
          <button className="login-button" name="submit-login" type="submit">LOG IN</button>
          {error}
        </form>
        {/* <button name="demo-login" type="submit" title="login as demo user" onClick={() => this.props.dispatch(loginUserHandler(this.props.history, 'testuser', 'password'))}>DEMO</button> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.user !== null,
  user: state.auth.user,
  error: state.auth.error
});

UserLoginForm = reduxForm({
  form: 'UserLoginForm',
  obSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(UserLoginForm);

export default connect(mapStateToProps)(UserLoginForm);