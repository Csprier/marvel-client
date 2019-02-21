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
    if (this.props.loading){
      console.log('comics loading: ', this.props.loading)
			return (<div className="loader">Loading...</div>);
    }
    
    const comicImages = this.props.images.map((comic, i) => {
      return (
        <div className="image-container" key={i}>
          <h4>{comic.title}</h4>
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
          <div className="advan-search-row">
            <h4 className="advan-search-header">Search Comics</h4>
            <button onClick={this.props.history.goBack} className="return-button">&#60; Dashboard</button>  
          </div>
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