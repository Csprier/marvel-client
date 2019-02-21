import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './css/landingpage.css';

class LandingPage extends Component {
  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return(
      <div className="landing-page">
        <div className="landing-page-info-container">
          <div className="landing-page-info">
            <h1>Marvel App</h1>
            <span>Powered by <a href="https://www.marvel.com/">Marvel's</a> Portal API, this app aims to be a one-stop-shop for Super Hero information!</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.user !== null
});

export default connect(mapStateToProps)(LandingPage);