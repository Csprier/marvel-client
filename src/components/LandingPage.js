import React, { Component } from 'react';
import './css/landingpage.css';

class LandingPage extends Component {
  render() {
    return(
      <div className="langing-page-container">
        <div className="landing-page">
          <img src={require('./css/images/marvelcollage.jpg')} alt="landingpage"></img>
        </div>
      </div>
    );
  }
}

export default LandingPage;