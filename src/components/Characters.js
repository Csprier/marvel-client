import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listAllCharactersByName } from '../actions/charactersActions';

class Characters extends Component {
  componentDidMount() {
    this.props.dispatch(listAllCharactersByName());
  }

  render() {
    console.log(this.props);
    const characterDummyInfo = this.props.characters.map(character => {
      return (
        <li>
          <h3>{character.name}</h3>
          <p>ID: {character.id}</p>
          <h4>Description:</h4>
          <p>{character.description}</p>
          <p>URLs to various external: {character.urls.map(url => <li><a href={url.url}>{url.type}</a></li>)}</p>
        </li>
      )
    })
    return (
      <div className="characters-container">
        <div className="character-dummy-info">
          <ul>
            {characterDummyInfo}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  characters: state.characters.data
});

export default connect(mapStateToProps)(Characters);