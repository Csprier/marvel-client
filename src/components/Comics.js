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


// componentDidUpdate() {
  // if (this.props.comicSearchTerm !== '') {
  //   this.props.dispatch(listAllComicsByTitleStartingWith(this.props.comicSearchTerm));
  //   let resetComicSearchTerm = '';
  //   this.props.dispatch(updateComicSearchTerm(resetComicSearchTerm));
  // }
// }

// const comicDummyInfo = this.props.comics.map((comic, i) => {
    //   return (
    //     <li key={i} className="comic-list-item">
    //       <div className="comic-images">
    //         {/* {comic.images.map((comic, i) => <li className="comic-li" key={i}><img src={`${comic.path}.${comic.extension}`} alt=""></img></li>)} */}
    //         <img src={`${comic.images[0].path}.${comic.images[0].extension}`} alt=""></img>
    //       </div>
    //       <div className="comic-item">
    //         <div className="comic-header">
    //           <h3>{comic.title}</h3>
    //         </div>
    //         <div className="comic-description">
    //           <p>ID: {comic.id}</p>
    //           <h4>Description:</h4>
    //           {/* <p>{comic.description.length !== 0 ? comic.description : '~ Description not available ~'}</p> */}
    //           <p>~ Description not available ~</p>
    //         </div>
    //         <div className="comic-urls">
    //           <h4>URLS to various external links:</h4>
    //           <ul>
    //             {comic.urls.map((url, i) => <li key={i}><a href={url.url}>{url.type}</a></li>)}
    //           </ul>
    //         </div>
    //         <p className="comic-attributionText">{comic.attributionText}</p>
    //       </div>
    //     </li>
    //   )});