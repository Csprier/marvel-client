import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1><Link to="/">Marvel API</Link></h1>
          </header>
          <main>
              <Navigation />
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/dashboard" component={Dashboard} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
