import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, withRouter } from 'react-router-dom';

// Components
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Characters from './components/Characters';
import Comics from './components/Comics';
import Profile from './components/Profile';
// User forms for landing page
import UserCreationForm from './components/userComponents/UserCreationForm';
import UserLoginForm from './components/userComponents/UserLoginForm';

import { refreshAuthToken } from './actions/authActions';

// History object
import history from './history';

// CSS
import './App.css';

class App extends Component {
  // trigger each time a prop value is changed
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } 
    else if (prevProps.loggedIn && !this.props.loggedIn) {
      // stop refreshing when we log out
      this.startPeriodicRefresh();
    }
  }

  // Perform any clean up before the component is 'destroyed'
  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()), 
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }
    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <main>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/" component={UserLoginForm} />
            <Route exact path="/register" component={UserCreationForm} />
            
            <Route exact path="/profile" component={Profile} />
            
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/characters" component={Characters} />
            <Route exact path="/comics" component={Comics} />
          </main>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.user !== null
})

export default withRouter(connect(mapStateToProps)(App));
