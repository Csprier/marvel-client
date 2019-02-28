import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Field, reduxForm } from 'redux-form';
import { reduxForm } from 'redux-form';

// import { myInput } from '../Field/Input';
// import { isTrimmed, nonEmpty, required, validEmail } from './form-validators';
// import { validators } from './form-validators';
import { editMode } from '../../actions/profileActions';
// editProfile, profileError, 

// CSS
import '../css/profile-form.css';
import FieldLevelValidationForm from '../Field/fieldLevelValidationForm';

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
		const updatedProfile = {};
		Object.keys(values).forEach(key => {
			//Check to see if the user made a change, and only pass back key/values that are submitted
			if (values[key]) {
				updatedProfile[key] = values[key];
			} 
			// else if (values.username.length === 0) {
			// 	updatedProfile[key] = this.props.username
			// }
			// else if (values.email.length === 0) {
			// 	updatedProfile[key] = this.props.email
			// }
		});
		console.log('Profile updates: ', updatedProfile);
		// this.props.dispatch(editProfile(this.props.userId, updatedProfile))
	};
	
	handleEditModeChange = () => {
    this.props.dispatch(editMode());
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
				<FieldLevelValidationForm  onSubmit={this.props.handleSubmit(values => this.onSubmit(values))} />
				{/* <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
					<fieldset>
						<legend>Edit Profile</legend>
						<label>Username
							<Field
								name="username"
								autoFocus
								className="pf-input"
								type="text"
								component="input"
								validate={[ 
									validators.required, 
									validators.nonEmpty, 
									validators.isTrimmed 
								]}
								placeholder={this.props.initialValues.username}
							/>
						</label>
						<label>Email
							<Field
								name="email"
								autoFocus
								className="pf-input"
								type="text"
								component="input"
								validate={[ 
									validators.required, 
									validators.validEmail 
								]}
								placeholder={this.props.initialValues.email}
							/>
						</label>
						<label>Password
							<Field 
								name="password"
								autoFocus
								className="pf-input"
								type="password"
								component="input"
								validate={[ 
									validators.required, 
									validators.nonEmpty, 
									validators.isTrimmed 
								]}
								autoComplete="off"
								placeholder="Enter your password to submit"
							/>
						</label>
						<div className="form-btns">
							<button className="form-submit-btn" type="submit">Submit</button>
							<button className="form-cancel-btn" onClick={this.handleEditModeChange}>Cancel</button>
              {error}
						</div>
					</fieldset>
				</form> */}
				<button className="form-cancel-btn" onClick={this.handleEditModeChange}>Cancel</button>
				<div className="note-container">
					<ul className="notes">
						<li>- Currently, will not submit without all fields having input</li>
						<li>- Will overwrite what's in the database, even if it means being an empty string</li>
						<li>- Validation is not showing</li>
					</ul>
				</div>
			</div>
		);
  }
}

const mapStateToProps = state => ({
	userId: state.profile.data.id,
	username: state.profile.data.username,
	email: state.profile.data.email
});

export default connect(mapStateToProps)(reduxForm({ 
	form: 'profile',
	onSubmitFail: (errors, dispatch) => {
		console.log(errors);
	}
})(ProfileForm));