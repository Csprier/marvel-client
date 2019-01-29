import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listAllComicsByTitle } from '../actions/comicsActions';
// import { listAllCharactersByNameStartingWith, updateSearchTerm } from '../actions/searchActions';

class Comics extends Component {
  componentDidMount() {
    this.props.dispatch(listAllComicsByTitle());
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}


export default connect()(Comics);