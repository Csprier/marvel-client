import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import '../css/user-component-styles/user-login.css'

class UserLoginForm extends Component {
  onSubmit(values) {
    // this.props.dispatch(loginUserHandler(this.props.history, values.username, values.password));
    console.log(values);
  }

  render() {
    return (
      <div className="user-login-form">
        <h2>Login to an Account</h2>
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
          {/* {this.props.loginFail} */}
        </form>
        {/* <button name="demo-login" type="submit" title="login as demo user" onClick={() => this.props.dispatch(loginUserHandler(this.props.history, 'testuser', 'password'))}>DEMO</button> */}
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   loginFail: state.user.error
// })

UserLoginForm = reduxForm({
  form: 'UserLoginForm'
})(UserLoginForm);

export default connect()(UserLoginForm);