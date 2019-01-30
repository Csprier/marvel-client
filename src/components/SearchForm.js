import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field, 
  reduxForm
} from 'redux-form';
import myInput from './Field/Input';
import { updateSearchTerm } from '../actions/searchActions';
import './css/searchForm.css';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alphabet: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ]
    }
    this.submitNameStartsWithSearch = this.submitNameStartsWithSearch.bind(this);
  }

  submitNameStartsWithSearch(term) {
    console.log('Update searchTerm to: ', term);
    this.props.dispatch(updateSearchTerm(term));
  }

  render() {
    const alphabetSearch = this.state.alphabet.map((letter, i) => {
      const letterObj = { letter: letter }
      return (
        <li key={i} className="character-ab-search-li">
          <form onSubmit={this.props.handleSubmit(() => {
            this.submitNameStartsWithSearch(letterObj.letter);
          })} ref="form">
            <button type="submit" className="character-alphabet-search-button">{letter}</button>
          </form>
        </li>
      );
    });

    return(
      <div className="search-container">
        <div className="search-form-container">
          <form onSubmit={this.props.handleSubmit((e) => {
            this.submitNameStartsWithSearch(e.nameStartsWith);
          })} ref="form">
            <label htmlFor="nameStartsWith"></label>
            <Field 
              name="nameStartsWith"
              component={myInput}
              type="text"
              placeholder="Search by first letter of character's name"
            />
            <button type="submit" label="submit">&#x26B2;</button>
          </form>
          <div className="character-alphabet-search-container">
            <ul className="character-ab-search">
              {alphabetSearch}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

SearchForm = reduxForm({
  form: 'nameStartsWith'
})(SearchForm);

export default connect()(SearchForm);