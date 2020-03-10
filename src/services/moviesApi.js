import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '03497ae682408a3f3dd9a95f7f587892';

function moviesApi_getAll(query, page) {
  return new Promise( async (resolve, reject) => {
    let borja = BASE_URL + 'search/movie?api_key=' + API_KEY + '&query=' + encodeURI(query) + '&page=' + page;

    try {
      const response = await axios.get(borja);
      resolve(response.data);
    } catch (err) {
      reject('Error fetching');
    }
  })
}

export { moviesApi_getAll };