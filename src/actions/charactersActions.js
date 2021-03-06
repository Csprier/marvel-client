import { REACT_APP_MARVEL_URL } from '../config';
import Axios from 'axios';

export const GET_CHARACTERS_REQUEST = 'GET_CHARACTERS_REQUEST',
  getCharactersRequest = () => ({
    type: GET_CHARACTERS_REQUEST
  });

export const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS',
  getCharactersSuccess = () => ({
    type: GET_CHARACTERS_SUCCESS
  });

export const GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR',
  getCharactersError = (err) => ({
    type: GET_CHARACTERS_ERROR,
    err
  });

export const GET_CHARACTER_NAMES = 'GET_CHARACTER_NAMES',
  getCharacterNames = (characters) => ({
    type: GET_CHARACTER_NAMES,
    characters
  });

// ASYNC with redux-thunk
// WORKING VERSION
// Axios.get() does not require a .then(res => res.json())
export const listAllCharactersByName = () => dispatch => {
  dispatch(getCharactersRequest())
  let url = `${REACT_APP_MARVEL_URL}/characters?orderBy=name&apikey=${process.env.REACT_APP_PUBLIC_KEY}`;

  return Axios.get(url)
    .then(res => {
      const characterAttributionText = res.data.attributionText;
      const characterData = res.data.data.results.map(character => ({
        id: character.id,
        name: character.name,
        description: character.description,
        urls: character.urls,
        attributionText: characterAttributionText,
        thumbnail: character.thumbnail
      }));
      dispatch(getCharacterNames(characterData));
      dispatch(getCharactersSuccess());
    })
    .catch(err => {
      console.error(err);
      dispatch(getCharactersError(err));
    });
};

// export const listAllCharactersByName = () => dispatch => {
//   dispatch(getCharactersRequest())
//   let url = `${REACT_APP_MARVEL_URL}/characters?orderBy=name&apikey=${process.env.REACT_APP_PUBLIC_KEY}`;
//   return fetch(url, { method: 'GET' })
//     .then(res => res.json())
//     .then(res => {
//       console.log(`res: ${JSON.stringify(res, null, 2)}`);
//       const characterNames = res.data.results.map(character => ({
//         id: character.id,
//         name: character.name,
//         resourceURI: character.resourceURI
//       }));
//       dispatch(getCharacterNames({characterNames}))
//       dispatch(getCharactersSuccess())
//     })
//     .catch(err => {
//       console.error(err);
//       dispatch(getCharactersError(err))
//     });
// };