import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listAllCharactersByName } from '../actions/charactersActions';

class Characters extends Component {
  componentDidMount() {
    this.props.dispatch(listAllCharactersByName());
  }

  render() {
    // const characterDummyInfo = 
    return (
      <div className="characters-container">
        <div className="character-dummy-info">
          <ul>

          </ul>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
  
// });

export default connect()(Characters);