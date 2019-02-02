import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listAllCharactersByName } from '../actions/charactersActions';
import { listAllCharactersByNameStartingWith, updateSearchTerm } from '../actions/searchActions';
import './css/characters.css';

import Navigation from './Navigation';
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
            <div className="character-header">
              <h3>{character.name}</h3>
            </div>
            <div className="character-description">
              <p>ID: {character.id}</p>  
              <h4>Description:</h4>
              <p>{character.description.length !== 0 ? character.description : '~Description not available~'}</p>  
            </div>
            <div className="character-urls">
              <h4>URLs to various external links:</h4>
              <ul>{character.urls.map((url, i) => <li key={i}><a href={url.url}>{url.type}</a></li>)}</ul>  
            </div>
            <p className="attributionText">{character.attributionText}</p>
          </div>
        </li>
      )});

    return (
      <div className="characters-container">
        <Navigation />
        <h2>Characters</h2>
        <SearchForm />
        <div className="character-info">
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