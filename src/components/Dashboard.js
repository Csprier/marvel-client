import React, { Component } from 'react';
// import Characters from './Characters';
// import Comics from './Comics';
import Navigation from './Navigation';
import './css/dashboard.css';

class Dashboard extends Component {
  goToComics(e) {
    e.preventDefault();
    this.props.history.push('/comics');
  }

  render() {
    return(
      <div className="dashboard-container">
        <div className="db-navigation-container">
          <Navigation />
        </div>
        <div className="dashboard">
          <form onSubmit={e => this.goToComics(e)} className="dashboard-comics-form">
            <button className="comics-button">Comics</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Dashboard;