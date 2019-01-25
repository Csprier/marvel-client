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
  submitNameStartsWithSearch(values) {
    console.log('sNSW: ', values);
    this.props.dispatch(updateSearchTerm(values));
  }

  render() {
    return(
      <div className="search-form">
        <form onSubmit={this.props.handleSubmit((e) => {
          // console.log('e: ', e.nameStartsWith);
          this.submitNameStartsWithSearch(e.nameStartsWith);
        })}>
          <label htmlFor="nameStartsWith">Name starting with:</label>
          <Field 
            name="nameStartsWith"
            component={myInput}
            type="text"
            placeholder="nameStartsWith"
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