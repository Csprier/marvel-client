import { REACT_APP_MARVEL_URL } from '../config';
import Axios from 'axios';

export const GET_COMICS_REQUEST = 'GET_COMICS_REQUEST',
  getComicsRequest = () => ({
    type: GET_COMICS_REQUEST
  });

export const GET_COMICS_SUCCESS = 'GET_COMICS_SUCCESS',
  getComicsSuccess = () => ({
    type: GET_COMICS_SUCCESS
  });

export const GET_COMICS_ERROR = 'GET_COMICS_ERROR',
  getComicsError = (err) => ({
    type: GET_COMICS_ERROR,
    err
  });

export const GET_COMIC_NAMES = 'GET_COMIC_NAMES',
  getComicNames = (comics) => ({
    type: GET_COMIC_NAMES,
    comics
  });

// ASYNC with redux-thunk
// WORKING VERSION
// Axios.get() does not require a .then(res => res.json())
export const listAllComicsByTitle = () => dispatch => {
  dispatch(getComicsRequest())
  let url = `${REACT_APP_MARVEL_URL}/comics?orderBy=title&apikey=${process.env.REACT_APP_PUBLIC_KEY}`;

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