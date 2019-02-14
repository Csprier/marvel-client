import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

export default () => WrappedComponent => {

	function RequiresLogin(props) {
		const {authenticating, loggedIn, error, ...passThroughProps} = props;
		if (authenticating) {
			return <div>Logging in...</div>;
    } 
    else if (!loggedIn || error) {
			return <Redirect to="/"/>;
		}
		return <WrappedComponent {...passThroughProps} />;
	}

	const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

	RequiresLogin.displayName = `RequiresLogin(${displayName})`;

	const mapStateToProps = (state) => ({
		authenticating: state.auth.loading,
		loggedIn: state.auth.user !== null,
		error: state.auth.error
	});
	return connect(mapStateToProps)(RequiresLogin);
};