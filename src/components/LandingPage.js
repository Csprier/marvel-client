import React, { Component } from 'react';
import './css/landingpage.css';

class LandingPage extends Component {
  goToBoard(e) {
    e.preventDefault();
    this.props.history.push('/dashboard');
  }

  render() {
    return(
      <div className="landing-page">
        <div className="landing-page-info-container">
          <div className="landing-page-info">
            <span>Powered by <a href="https://www.marvel.com/">Marvel's</a> Portal API, this app aims to be a one-stop-shop for Super Hero information! Search your favorite heros and see what they are about, what comics there are and which they have appeared in! Who their creators were, and more!</span>
          </div>
          <form onSubmit={e => this.goToBoard(e)} className="landing-page-form">
            <button className="marvel-button">Go to the Dashboard</button>
          </form>
        </div>
      </div>
    );
  }
}

export default LandingPage;