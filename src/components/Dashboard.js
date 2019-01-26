import React, { Component } from 'react';
import Characters from './Characters';

class Dashboard extends Component {
  render() {
    return(
      <div className="dashboard-container">
        <Characters />
      </div>
    );
  }
}

export default Dashboard;