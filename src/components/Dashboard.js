import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Navigation from './Navigation';
import CharacterForm from './CharacterForm';
import ComicForm from './ComicForm';

// HOC
import RequiresLogin from './requires-login';

// CSS
import './css/dashboard.css';



class Dashboard extends Component {
  goToCharacters(e) {
    e.preventDefault();
    const { history } = this.props;
    history.push('/characters');
  }

  goToComics(e) {
    e.preventDefault();
    const { history } = this.props;
    history.push('/comics');
  }

  render() {
    return(
      <div className="dashboard-container">
        <div className="db-navigation-container">
          <Navigation />
        </div>

        <div className="dashboard">
          <CharacterForm onSubmit={e => this.goToCharacters(e)} />
          <ComicForm onSubmit={e => this.goToComics(e)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { username } = state.auth.user;
  return {
    username
  }
}

export default RequiresLogin(connect(mapStateToProps)(Dashboard));