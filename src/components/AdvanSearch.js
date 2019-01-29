import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field, 
  reduxForm
} from 'redux-form';
import myInput from './Field/Input';
import './css/advanSearch.css';

class AdvanSearch extends Component {
  render() {
    return (
      <div className="advanced-search-container">
        <div className="advanced-search-form-container">
          <form>
            <label htmlFor="advancSearch"></label>
            <Field 
              name="advanSearch"
              component={myInput}
              type="text"
              placeholder="Search"
            />
            <button type="submit" className="search-button" label="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

AdvanSearch = reduxForm({
  form: 'advanSearch'
})(AdvanSearch);

export default connect()(AdvanSearch);