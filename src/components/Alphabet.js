import React, { Component } from 'react';
import { connect } from 'react-redux';
import './css/alphabet.css';

class Alphabet extends Component {
  state = {
    alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  }
  
  render() {
    const buttons = this.state.alphabet.map(letter => {
      return (
        <li className="alphabet-item">
          <button>{letter}</button>
        </li>
      )});
    return(
      <div className="alphabet-selector-container">
        <div className="alphabet-selector">
          <ul>
            {buttons}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect()(Alphabet);