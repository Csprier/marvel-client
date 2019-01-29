import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field, 
  reduxForm
} from 'redux-form';
import myInput from './Field/Input';
import './css/advanSearch.css';
import { updateComicSearchTerm } from '../actions/searchActions';

class AdvanComicSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alphabet: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ]
    }
    this.submitTitleStartsWithSearch = this.submitTitleStartsWithSearch.bind(this);
  }

  submitTitleStartsWithSearch(term) {
    console.log('Update searchTerm to: ', term);
    this.props.dispatch(updateComicSearchTerm(term));
  }

  render() {
    const alphabetSearch = this.state.alphabet.map((letter, i) => {
      const letterObj = { letter: letter }
      return (
        <li key={i} className="ab-search-li">
          <form onSubmit={this.props.handleSubmit(() => {
            this.submitTitleStartsWithSearch(letterObj.letter);
          })} ref="form">
            <button type="submit" className="alphabet-search-button">{letter}</button>
          </form>
        </li>
      );
    });

    return (
      <div className="advanced-search-container">
        <div className="advanced-search-form-container">
          <form onSubmit={this.props.handleSubmit((e) => {
            this.submitTitleStartsWithSearch(e.advanComicSearch);
          })} ref="form">
            <label htmlFor="advanComicSearch"></label>
            <Field 
              name="advanComicSearch"
              component={myInput}
              type="text"
              placeholder="Search"
            />
            <button type="submit" className="search-button" label="submit">&#x26B2;</button>
          </form>
        </div>
        <ul className="ab-search">
          {alphabetSearch}
        </ul>
      </div>
    );
  }
}

AdvanComicSearch = reduxForm({
  form: 'advanComicSearch'
})(AdvanComicSearch);

export default connect()(AdvanComicSearch);