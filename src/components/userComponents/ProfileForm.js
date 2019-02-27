import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { isTrimmed, nonEmpty, required, validEmail } from './form-validators';
import { editProfile } from '../../actions/profileActions';

class ProfileForm extends Component {
  constructor() {
		super();
		this.state = {
			error: null
		}
  }
	
	componentDidMount() {
		console.log('Profile Form loaded');
	}
	
  componentWillUnmount() {
		// Clear any possible memory leaks
		this.setState({ error: null });
  }
  
  onSubmit = values => {
		console.log('ProfileForm submit values:', values);
		const updatedProfile = {};
		Object.keys(values).forEach(key => {
			//Check to see if the user made a change, and only pass back key/values that are submitted
			if (values[key]) {
				updatedProfile[key] = values[key];
			}
		});
		console.log(updatedProfile);
		this.props.dispatch(editProfile(this.props.userId, updatedProfile))
			.catch(e => console.log('ERROR IN DISPATCH', e))
			// .then( res => {
			// 	(res) 
			// 		? this.setState({ error: res.error }) 
			// 		: this.props.setEdit();
			// });
  };
  
  render() {
		let {error} = this.state;
		if (error) {
			error = (
				<div className="error-msg" aria-live="polite">
					{this.state.error}
				</div>
			);
		}
		return (
			<div className="form-wrapper">
				<form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
					<fieldset>
						<legend>Edit Profile</legend>
						<Field
							name="username"
							label="Username"
							type="text"
							component="input"
							validate={[ required, nonEmpty, isTrimmed ]}
							placeholder="Username..."
							// placeholder={this.props.initialValues.username}
						/>
						<Field
							name="email"
							label="Email"
							type="text"
							component="input"
							validate={[ required, validEmail ]}
							placeholder="Email..."
							// placeholder={this.props.initialValues.email}
						/>
						<div className="form-field form-btns">
							<button className="form-reset-btn" type="button">Cancel</button>
							<button className="form-submit-btn" type="submit">Save</button>
              {error}
						</div>
					</fieldset>
				</form>
			</div>
		);
  }
}

// ProfileForm = reduxForm({
//   form: 'ProfileForm'
// })
const mapStateToProps = state => ({
	userId: state.profile.data.id
})

export default connect(mapStateToProps)(reduxForm({ 
	form: 'profile'
})(ProfileForm));