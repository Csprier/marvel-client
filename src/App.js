import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <Navigation />
        </header> */}
        <main>
          <Navigation />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/dashboard" component={Dashboard} />
        </main>
      </div>
    );
  }
}

export default App;
