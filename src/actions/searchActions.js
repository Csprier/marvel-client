import { REACT_APP_MARVEL_URL } from '../config';
import Axios from 'axios';
import {
  getCharactersRequest,
  getCharacterNames,
  getCharactersSuccess,
  getCharactersError
} from './charactersActions';
import {
  getComicsRequest,
  getComicNames,
  getComicsSuccess,
  getComicsError
} from './comicsActions';

export const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM',
  updateSearchTerm = (searchTerm) => ({
    type: UPDATE_SEARCH_TERM,
    searchTerm
  });

export const UPDATE_SEARCH_TERM_SUCCESS = 'UPDATE_SEARCH_TERM_SUCCESS',
  updateSearchTermSuccess = () => ({
    type: UPDATE_SEARCH_TERM_SUCCESS
  });  

// ASYNC with redux-thunk
// CHARACTERS BY TITLE
export const listAllCharactersByNameStartingWith = (searchTerm) => dispatch => {
  dispatch(getCharactersRequest());
  let url = `${REACT_APP_MARVEL_URL}/characters?nameStartsWith=${searchTerm}&apikey=${process.env.REACT_APP_PUBLIC_KEY}`;
  return Axios.get(url)
    .then(res => {
      const characterData = res.data.data.results.map(character => ({
        id: character.id,
        name: character.name,
        description: character.description,
        urls: character.urls
      }));
      dispatch(getCharacterNames(characterData));
      dispatch(getCharactersSuccess());
    })
    .catch(err => {
      console.error(err);
      dispatch(getCharactersError(err));
    });
};  

// COMICS BY TITLE
export const UPDATE_COMIC_SEARCH_TERM = 'UPDATE_COMIC_SEARCH_TERM',
  updateComicSearchTerm = (comicSearchTerm) => ({
    type: UPDATE_COMIC_SEARCH_TERM,
    comicSearchTerm
  });

export const UPDATE_COMIC_SEARCH_TERM_SUCCESS = 'UPDATE_COMIC_SEARCH_TERM_SUCCESS',
  updateComicSearchTermSuccess = () => ({
    type: UPDATE_COMIC_SEARCH_TERM_SUCCESS
  });  

export const listAllComicsByTitleStartingWith = (searchTerm) => dispatch => {
  dispatch(getComicsRequest());
  let url = `${REACT_APP_MARVEL_URL}/comics?titleStartsWith=${searchTerm}&apikey=${process.env.REACT_APP_PUBLIC_KEY}`;
  return Axios.get(url)
    .then(res => {
      const comicAttributionText = res.data.attributionText;
      const comicData = res.data.data.results.map(comic => ({
        id: comic.id,
        title: comic.title,
        description: comic.description,
        pageCount: comic.pageCount,
        thumbnail: comic.thumbnail,
        images: comic.images,
        urls: comic.urls,
        attributionText: comicAttributionText
      }))
      dispatch(getComicNames(comicData));
      dispatch(getComicsSuccess());
    })
    .catch(err => {
      console.error(err);
      dispatch(getComicsError(err));
    });
};  