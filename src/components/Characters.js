import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { listAllCharactersByName } from '../actions/charactersActions';

import { MARVEL_URL, PUBLIC_KEY } from '../config';
import Axios from 'axios';

class Characters extends Component {
  // componentDidMount() {
  //   this.props.dispatch(listAllCharactersByName());
  // }
    state = {
      characters: []
    }

  componentDidMount() {
    let url = `${MARVEL_URL}/characters?orderBy=name&apikey=${PUBLIC_KEY}`;
    console.log(url);
    // Axios.get(url)
    //   .then(res => {
    //     console.log(res);
        // const characterNames = res.data
        // this.setState({ characters })
      // })
  }

  render() {
    return (
      <div className="characters-container">

      </div>
    );
  }
}

export default connect()(Characters);