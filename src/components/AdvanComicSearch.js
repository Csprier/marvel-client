import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field, 
  reduxForm
} from 'redux-form';
import myInput from './Field/Input';
import './css/advanSearch.css';

class AdvanComicSearch extends Component {
  render() {
    return (
      <div className="advanced-search-container">
        <div className="advanced-search-form-container">
          <form>
            <label htmlFor="advanComicSearch"></label>
            <Field 
              name="advanComicSearch"
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

AdvanComicSearch = reduxForm({
  form: 'advanComicSearch'
})(AdvanComicSearch);

export default connect()(AdvanComicSearch);