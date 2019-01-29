import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listAllComicsByTitle } from '../actions/comicsActions';
import { listAllComicsByTitleStartingWith, updateSearchTerm } from '../actions/searchActions';
import SearchForm from './SearchForm';

class Comics extends Component {
  componentDidMount() {
    this.props.dispatch(listAllComicsByTitle());
  }

  componentDidUpdate() {
    if (this.props.searchTerm !== '') {
      this.props.dispatch(listAllComicsByTitleStartingWith(this.props.searchTerm));
      let resetSearchTerm = '';
      this.props.dispatch(updateSearchTerm(resetSearchTerm));
    }
  }

  render() {
    console.log('comics this.props', this.props);
    const comicDummyInfo = this.props.comics.map((comic, i) => {
      return (
        <li key={i} className="comic-list-item">
          <div className="comic-item">
            <div className="comic-header">
              <h3>{comic.title}</h3>
            </div>
            <div className="comic-description">
              <p>ID: {comic.id}</p>
              <h4>Description:</h4>
              {/* <p>{comic.description.length !== 0 ? comic.description : '~ Description not available ~'}</p> */}
            </div>
            <div className="comic-urls">
              <h4>URLS to various external links:</h4>
              <ul>{comic.urls.map((url, i) => <li key={i}><a href={url.url}>{url.type}</a></li>)}</ul>
            </div>
            <p className="comic-attributionText">{comic.attributionText}</p>
          </div>
        </li>
      )});
    return (
      <div className="comics-container">
        <h2>Characters</h2>
        <SearchForm />
        {/* <span>Results returned: {comicDummyInfo.length}</span> */}
        <div className="comic-dummy-info">
          <ul>
            {comicDummyInfo}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comics: state.comics.data,
  searchTerm: state.searchTerm.searchTerm
});

export default connect(mapStateToProps)(Comics);