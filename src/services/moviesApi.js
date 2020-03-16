import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '03497ae682408a3f3dd9a95f7f587892';

const moviesApi = (() => {

  return {
    getBySearch: function(query, page) {
      return new Promise( async (resolve, reject) => {
        const url = BASE_URL + 'search/movie?api_key=' + API_KEY + '&query=' + encodeURI(query) + '&page=' + page;
    
        try {
          const response = await axios.get(url);
          resolve(response.data);
        } catch (err) {
          reject('Error fetching');
          resolve([]);
        }
      })
    },

    findDetailsByMovieId: function(movieId) {
      return new Promise( async (resolve, reject) => {
        const url = BASE_URL + 'movie/' + movieId + '?api_key=' + API_KEY;
    
        try {
          const response = await axios.get(url);
          resolve(response.data);
        } catch (err) {
          reject('Error fetching');
          resolve([]);
        }
      })
    },

    findReviewsByMovieId: function(movieId) {
      return new Promise( async (resolve, reject) => {
        const url = BASE_URL + 'movie/' + movieId + '/reviews?api_key=' + API_KEY;
    
        try {
          const response = await axios.get(url);
          resolve(response.data);
        } catch (err) {
          reject('Error fetching');
          resolve([]);
        }
      })
    },

    findCreditsByMovieId: function(movieId) {
      return new Promise( async (resolve, reject) => {
        const url = BASE_URL + 'movie/' + movieId + '/credits?api_key=' + API_KEY;

        try {
          const response = await axios.get(url);
          resolve(response.data);
        } catch (err) {
          reject('Error fetching');
          resolve([]);
        }
      })
    },

    getAllGenres: function () {
      return new Promise( async (resolve, reject) => {
        const url = BASE_URL + 'genre/movie/list?api_key=' + API_KEY
    
        try {
          const response = await axios.get(url);
          resolve(response.data);
        } catch (err) {
          reject('Error fetching');
          resolve(null);
        }
      })
    }
  }
})();

export default moviesApi;