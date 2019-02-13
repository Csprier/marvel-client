// require('dotenv').config()
export const REACT_APP_PRIVATE_KEY=process.env.PRIVATE_KEY;
export const REACT_APP_PUBLIC_KEY=process.env.PUBLIC_KEY;
export const REACT_APP_MARVEL_URL='https://gateway.marvel.com/v1/public'
// console.log(`config: ${JSON.stringify(process.env, null, 2)}`);

// export const API_BASE_URL = process.env.NODE_ENV === 'production'
// 	? 'https://frames-server.herokuapp.com/api' : 'http://localhost:8080/api';

export const API_BASE_URL='http://localhost:8080';