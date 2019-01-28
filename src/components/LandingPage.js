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
        {/* <img src={require('./css/images/marvelcollage.jpg')} alt="landingpage"></img> */}
        <form onSubmit={e => this.goToBoard(e)} className="landing-page-form">
          <button className="marvel-button">Go to the Dashboard</button>
        </form>
      </div>
    );
  }
}

export default LandingPage;