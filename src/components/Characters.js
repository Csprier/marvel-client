import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { listAllCharactersByName } from '../actions/charactersActions';

import { REACT_APP_MARVEL_URL/*, REACT_APP_PUBLIC_KEY*/ } from '../config';
import Axios from 'axios';

class Characters extends Component {
  // componentDidMount() {
  //   this.props.dispatch(listAllCharactersByName());
  // }
    state = {
      characters: []
    }

  componentDidMount() {
    let url = `${REACT_APP_MARVEL_URL}/characters?orderBy=name&apikey=${process.env.REACT_APP_PUBLIC_KEY}`;
    // console.log(url);
    Axios.get(url)
      .then(res => {
        console.log(res.data.data);
        const characterNames = res.data.data.results
        // console.log(characterNames);
        // this.setState({ characters })
      })
  }

  render() {
    return (
      <div className="characters-container">

      </div>
    );
  }
}

export default connect()(Characters);