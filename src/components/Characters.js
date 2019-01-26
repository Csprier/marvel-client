import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listAllCharactersByName } from '../actions/charactersActions';
import { listAllCharactersByNameStartingWith, updateSearchTerm } from '../actions/searchActions';
import './css/characters.css';

import SearchForm from './SearchForm';

class Characters extends Component {
  componentDidMount() {
    this.props.dispatch(listAllCharactersByName());
  }

  componentDidUpdate() {
    if (this.props.searchTerm !== '') {
      this.props.dispatch(listAllCharactersByNameStartingWith(this.props.searchTerm));
      let resetSearchTerm = '';
      this.props.dispatch(updateSearchTerm(resetSearchTerm));
    }
  }

  render() {
    const characterDummyInfo = this.props.characters.map((character, i) => {
      return (
        <li key={i} className="character-list-item">
          <div className="character-item">
            <h3>{character.name}</h3>
            <p>ID: {character.id}</p>
            <h4>Description:</h4>
            <p>{character.description.length !== 0 ? character.description : 'Description not available'}</p>
            <h4>URLs to various external:</h4>
            <ul>{character.urls.map((url, i) => <li key={i}><a href={url.url}>{url.type}</a></li>)}</ul>
          </div>
        </li>
      )});
    return (
      <div className="characters-container">
        <SearchForm />
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
  characters: state.characters.data,
  searchTerm: state.searchTerm.searchTerm
});

export default connect(mapStateToProps)(Characters);