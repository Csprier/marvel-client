import React, { Component } from 'react';
import { connect } from 'react-redux';
import './css/alphabet.css';

class Alphabet extends Component {
  render() {
    return(
      <div className="alphabet-selector-container">
        <div className="alphabet-selector">
          <ul>
            <li className="alphabet-item">
              <button>A</button>
            </li>
            <li className="alphabet-item">
              <button>B</button>
            </li>
            <li className="alphabet-item">
              <button>C</button>
            </li>
            <li className="alphabet-item">
              <button>D</button>
            </li>
            <li className="alphabet-item">
              <button>E</button>
            </li>
            <li className="alphabet-item">
              <button>F</button>
            </li>
            <li className="alphabet-item">
              <button>G</button>
            </li>
            <li className="alphabet-item">
              <button>H</button>
            </li>
            <li className="alphabet-item">
              <button>I</button>
            </li>
            <li className="alphabet-item">
              <button>J</button>
            </li>
            <li className="alphabet-item">
              <button>K</button>
            </li>
            <li className="alphabet-item">
              <button>L</button>
            </li>
            <li className="alphabet-item">
              <button>M</button>
            </li>
            <li className="alphabet-item">
              <button>N</button>
            </li>
            <li className="alphabet-item">
              <button>O</button>
            </li>
            <li className="alphabet-item">
              <button>P</button>
            </li>
            <li className="alphabet-item">
              <button>Q</button>
            </li>
            <li className="alphabet-item">
              <button>R</button>
            </li>
            <li className="alphabet-item">
              <button>S</button>
            </li>
            <li className="alphabet-item">
              <button>T</button>
            </li>
            <li className="alphabet-item">
              <button>U</button>
            </li>
            <li className="alphabet-item">
              <button>V</button>
            </li>
            <li className="alphabet-item">
              <button>W</button>
            </li>
            <li className="alphabet-item">
              <button>X</button>
            </li>
            <li className="alphabet-item">
              <button>Y</button>
            </li>
            <li className="alphabet-item">
              <button>Z</button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default connect()(Alphabet);