import React, { Component } from 'react';
import Characters from './Characters';
import Navigation from './Navigation';
import './css/dashboard.css';

class Dashboard extends Component {
  render() {
    return(
      <div className="dashboard-container">
        <div className="db-navigation-container">
          <Navigation />
        </div>
        <div className="dashboard">
          <h1>Dashboard</h1>
          <Characters />
        </div>
      </div>
    );
  }
}

export default Dashboard;