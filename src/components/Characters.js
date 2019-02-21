import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listAllCharactersByName } from '../actions/charactersActions';
import { listAllCharactersByNameStartingWith, updateSearchTerm } from '../actions/searchActions';
import './css/characters.css';

import '../loader.css';
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
    if (this.props.loading){
      console.log('characters loading: ', this.props.loading)
			return (<div className="loader">Loading...</div>);
    }
    
    const characterInfo = this.props.characters.map((character, i) => {
      return (
        <li key={i} className="character-list-item">
          <div className="character-item">
            <div className="character-header">
              <h3>{character.name}</h3>
            </div>

            <div className="character-item-info-container">
              {(character.thumbnail) 
                  ? <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} className="character-thumbnail" alt="" /> 
                  : <img src={'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'} className="character-thumbnail" alt="no thumbnail available" />}
              
              <div className="character-description">
                <p>ID: {character.id}</p>  
                <h4>Description:</h4>
                <p>{character.description.length !== 0 ? character.description : '~Description not available~'}</p>  
                <div className="character-urls">
                  <h4>URLs to various external links:</h4>
                  <ul>{character.urls.map((url, i) => <li key={i}><a href={url.url}>{url.type}</a></li>)}</ul>  
                </div>
                <p className="attributionText">{character.attributionText}</p>
              </div>

            </div>

          </div>
        </li>
      )});

    return (
      <div className="characters-container">
        <Navigation />
        <div className="searchform-container">
          <div className="search-row">
            <h4 className="search-header">Search Characters</h4>
            <button onClick={this.props.history.goBack} className="return-button">&#60; Dashboard</button>  
          </div>
          <SearchForm />
        </div>
        <div className="character-info">
          <ul>
            {characterInfo}
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