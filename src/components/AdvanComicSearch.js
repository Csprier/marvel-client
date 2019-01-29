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
    this.submitTitleStartsWithSearch = this.submitTitleStartsWithSearch.bind(this);
  }

  submitTitleStartsWithSearch(term) {
    console.log('Update searchTerm to: ', term);
    this.props.dispatch(updateComicSearchTerm(term));
  }

  render() {
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
      </div>
    );
  }
}

AdvanComicSearch = reduxForm({
  form: 'advanComicSearch'
})(AdvanComicSearch);

export default connect()(AdvanComicSearch);