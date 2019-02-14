import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Characters from './components/Characters';
import Comics from './components/Comics';
import Profile from './components/Profile';

// History object
import history from './history';

// User forms for landing page
import UserCreationForm from './components/userComponents/UserCreationForm';
import UserLoginForm from './components/userComponents/UserLoginForm';

import './App.css';

class App extends Component {
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

export default App;
