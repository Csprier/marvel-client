import { MARVEL_URL, PUBLIC_KEY } from '../config';
import Axios from 'axios';

export const GET_CHARACTERS_REQUEST = 'GET_CHARACTERS_REQUEST',
  getCharactersRequest = () => ({
    type: GET_CHARACTERS_REQUEST
  });

export const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS',
  getCharactersSuccess = () => ({
    type: GET_CHARACTERS_SUCCESS
  });

export const GET_CHARACTER_NAMES = 'GET_CHARACTER_NAMES',
  getCharacterNames = (characters) => ({
    type: GET_CHARACTER_NAMES,
    characters
  });

// ASYNC with redux-thunk
export const listAllCharactersByName = dispatch => {
  let url = `${MARVEL_URL}/characters?orderBy=name&apikey=${PUBLIC_KEY}`;

  Axios.get(url)
    .then(res => {
      console.log(res);
    })
    .catch(e => console.error(e));
}

/*
export const getAllCharacters = () => dispatch => {
  const {
    offset,
    name,
    exactMatch,
    sortName,
    limit,
  } = Object.assign({
    offset: 0,
    name: '',
    exactMatch: false,
    sortName: '',
    limit: 20,
  }, options);

  let url = `${MARVEL_URL}characters?${PUBLIC_KEY}&offset=${offset}&orderBy=${sortName}name&limit=${limit}`;
  
  if (name) {
    if (exactMatch) { 
      url += `&name=${name}`; 
    } else { 
      url += `&nameStartsWith=${name}`; 
    }
  }

  return fetch(url, { method: 'GET' })
    .then(res => res.json())
    .then((resObj) => {
      try {
        // If the resObj.code is 200 OK
        if (resObj.code === 200) {
          // if offset is greater than resObj.data.total throw an error
          if (offset > resObj.data.total) {
            throw new Error('Page does not exist.');
          } else { // else, return an object with the characters and a page range
            const pages = Math.floor(resObj.data.total / limit);
            return {
              characters: resObj.data.results,
              maxPage: resObj.data.total % limit > 0 ? pages + 1 : pages,
            };
          }
        } else { // Else throw an error with the code
          throw new Error(`Marvel API bad response. Status code ${resObj.code}.`);
        }
      } 
      catch (e) { // Catch error and return an object with empty values
        console.error(e);
        return {
          characters: [],
          maxPage: 0,
        };
      }
    })
    .then(json => dispatch(getCharactersRequest(json)))
    .catch(err => console.error(err));
}
*/