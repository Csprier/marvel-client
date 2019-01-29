import React, { Component } from 'react';
// import Characters from './Characters';
import Comics from './Comics';
import Navigation from './Navigation';
import './css/dashboard.css';
import AdvanSearch from './AdvanSearch';

class Dashboard extends Component {
  render() {
    return(
      <div className="dashboard-container">
        <div className="db-navigation-container">
          <Navigation />
        </div>
        <div className="dashboard">
          <AdvanSearch />
          {/* <Characters /> */}
          <Comics />
        </div>
      </div>
    );
  }
}

export default Dashboard;