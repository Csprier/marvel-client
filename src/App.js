import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Characters from './components/Characters';
import Comics from './components/Comics';
import history from './history';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <main>
            <Route exact path="/" component={LandingPage} />
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
