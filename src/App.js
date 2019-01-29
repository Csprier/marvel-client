import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
// import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Comics from './components/Comics';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <main>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/comics" component={Comics} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
