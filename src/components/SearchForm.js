import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field, 
  reduxForm
} from 'redux-form';
import myInput from './Field/Input';
import { updateSearchTerm } from '../actions/searchActions';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.submitNameStartsWithSearch = this.submitNameStartsWithSearch.bind(this);
  }

  submitNameStartsWithSearch(term) {
    console.log('Update searchTerm to: ', term);
    this.props.dispatch(updateSearchTerm(term));
  }

  render() {
    return(
      <div className="search-form">
        <form onSubmit={this.props.handleSubmit((e) => {
          this.submitNameStartsWithSearch(e.nameStartsWith);
        })} ref="form">
          <label htmlFor="nameStartsWith">Name starting with:</label>
          <Field 
            name="nameStartsWith"
            component={myInput}
            type="text"
            placeholder="Search by first letter of character's name"
          />
          <button type="submit" label="submit">Submit</button>
        </form>
      </div>
    );
  }
}

SearchForm = reduxForm({
  form: 'nameStartsWith'
})(SearchForm);

export default connect()(SearchForm);