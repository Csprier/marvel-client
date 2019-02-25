import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { isTrimmed, nonEmpty, required, validEmail } from './form-validators';
import { editProfile } from '../../actions/profileActions';

export class ProfileForm extends React.Component {
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
		const updatedProfile = {};
		Object.keys(values).forEach(key => {
			//Check to see if the user made a change, and only pass back key/values that are submitted
			if (values[key]) {
				updatedProfile[key] = values[key];
			}
		});
		this.props.dispatch(editProfile(this.props.initialValues.userId, updatedProfile))
			.then( res => {
				(res) 
					? this.setState({ error: res.error }) 
					: this.props.setEdit();
			});
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
				<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
					<fieldset>
						<legend>Edit Profile</legend>
						<Field
							name="username"
							label="Username"
							type="text"
							component="input"
							validate={[ required, nonEmpty, isTrimmed ]}
							// placeholder={this.props.initialValues[0]}
						/>
						<Field
							name="email"
							label="Email"
							type="text"
							component="input"
							validate={[ required, validEmail ]}
							// placeholder={this.props.initialValues[1]}
						/>
						<div className="form-field form-btns">
							<button className="form-reset-btn" type="button" onClick={this.props.setEdit}>Cancel</button>
							<button className="form-submit-btn	" type="submit">Save</button>
              {error}
						</div>
					</fieldset>
				</form>
			</div>
		);
  }
}

ProfileForm = reduxForm({
  form: 'ProfileForm'
})

export default connect()(ProfileForm);