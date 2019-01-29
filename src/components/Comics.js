import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listAllComicsByTitle } from '../actions/comicsActions';
// import { listAllComicsByTitleStartingWith, updateComicSearchTerm } from '../actions/searchActions';
// import SearchForm from './SearchForm';
import './css/comics.css';

class Comics extends Component {
  componentDidMount() {
    this.props.dispatch(listAllComicsByTitle());
  }

  render() {
    const comicImages = this.props.images.map((comic, i) => {
      return (
        <div className="image-container">
          <h4>{comic.title}</h4>
          <p>ID: {comic.id}</p>
          <img src={`${comic.image.path}.${comic.image.extension}`} key={i} alt=""></img>
        </div>
      );
    })

    return (
      <div className="comics-container">
        <h2>Comics</h2>
        <div className="comic-dummy-info">
          {comicImages}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comics: state.comics.data,
  searchTerm: state.searchTerm.searchTerm,
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