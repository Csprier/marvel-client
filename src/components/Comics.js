import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listAllComicsByTitle } from '../actions/comicsActions';
import { listAllComicsByTitleStartingWith, updateComicSearchTerm } from '../actions/searchActions';
import AdvanComicSearch from './AdvanComicSearch';
import Navigation from './Navigation';
import './css/comics.css';

class Comics extends Component {
  componentDidMount() {
    this.props.dispatch(listAllComicsByTitle());
  }

  componentDidUpdate() {
    if (this.props.comicSearchTerm !== '') {
      this.props.dispatch(listAllComicsByTitleStartingWith(this.props.comicSearchTerm));
      let resetSearchTerm = '';
      this.props.dispatch(updateComicSearchTerm(resetSearchTerm));
    }
  }

  render() {
    const comicImages = this.props.images.map((comic, i) => {
      return (
        <div className="image-container" key={i}>
          <h4>{comic.title}</h4>
          {/* <p>ID: {comic.id}</p> */}
          {(comic.image) 
            ? <img src={`${comic.image.path}.${comic.image.extension}`} alt=""></img> 
            : <div><p>Image not available</p></div>}
        </div>
      );
    })

    return (
      <div className="comics-container">
        <Navigation />
        <div className="comics-search-container">
          <h4>Search Comics</h4>
          <AdvanComicSearch />
        </div>
        <div className="comic-info">
          <ul>
            {comicImages}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comics: state.comics.data,
  comicSearchTerm: state.searchTerm.comicSearchTerm,
  images: state.comics.data.map(comic => ({
    image: comic.images[0],
    title: comic.title,
    id: comic.id
  }))
});

export default connect(mapStateToProps)(Comics);