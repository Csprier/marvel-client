import React, { Component } from 'react';
import './css/characterForm.css';

class CharacterForm extends Component {
  render() {
    return (
      <div className="characters form-container">
        <form onSubmit={this.props.onSubmit} className="dashboard-characters-form">
          <button className="dashboard-button">CHARACTERS</button>
        </form>
      </div>
    );
  }
}

export default CharacterForm;