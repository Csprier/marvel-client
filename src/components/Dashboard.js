import React, { Component } from 'react';
import Navigation from './Navigation';
import './css/dashboard.css';

class Dashboard extends Component {
  goToCharacters(e) {
    e.preventDefault();
    this.props.history.push('/characters');
  }

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
          <div className="characters form-container">
            <form onSubmit={e => this.goToCharacters(e)} className="dashboard-characters-form">
              <button className="dashboard-button">CHARACTERS</button>
            </form>
          </div>
          
          <div className="comics form-container">
            <form onSubmit={e => this.goToComics(e)} className="dashboard-comics-form">
              <button className="dashboard-button">COMICS</button>
            </form>
          </div>
        
        </div>
      </div>
    );
  }
}

export default Dashboard;