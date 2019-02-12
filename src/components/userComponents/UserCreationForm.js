import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import '../css/user-component-styles/user-creation.css';

class UserCreationForm extends Component {
  onSubmit(values) {
    // this.props.dispatch(registerNewUserHandler(values.username, values.password, values.fullname))
    // .then(() => this.props.history.push('/dashboard'))
    console.log(values);
  }

  render() {
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
              />
            <label htmlFor="createpassword">Password</label>
            <Field 
              aria-label="createpassword"
              name="password" 
              id="password" 
              type="password" 
              component="input" 
            />
            <button name="submit-create-account" type="submit">CREATE ACCOUNT</button>
          </form>
      </div>
    );
  }
}

UserCreationForm = reduxForm({
  form: 'userCreationForm'
})(UserCreationForm);

export default connect()(UserCreationForm);