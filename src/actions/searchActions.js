// import { REACT_APP_MARVEL_URL } from '../config';
// import Axios from 'axios';

export const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM',
  updateSearchTerm = (searchTerm) => ({
    type: UPDATE_SEARCH_TERM,
    searchTerm
  });

export const UPDATE_SEARCH_TERM_SUCCESS = 'UPDATE_SEARCH_TERM_SUCCESS',
  updateSearchTermSuccess = () => ({
    type: UPDATE_SEARCH_TERM_SUCCESS
  });  

/*
// ASYNC with redux-thunk
export const listAllCharactersByName = () => dispatch => {
  // dispatch(getCharactersRequest())
  let url = `${REACT_APP_MARVEL_URL}/characters?nameStartsWith=${searchTerm}&apikey=${process.env.REACT_APP_PUBLIC_KEY}`
  return Axios.get(url)
    .then(res => {
      // const characterData = res.data.data.results.map(character => ({
      //   id: character.id,
      //   name: character.name,
      //   description: character.description,
      //   urls: character.urls
      // }));
      // dispatch(getCharacterNames(characterData));
      dispatch(updateSearchTermSuccess());
    })
    .catch(err => {
      console.error(err);
      dispatch(getCharactersError(err));
    });
};  
*/