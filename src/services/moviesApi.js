import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '03497ae682408a3f3dd9a95f7f587892';

const moviesApi = (() => {

  return {
    getMoviesByName: function(query, page) {
      return new Promise( async (resolve, reject) => {
        const url = BASE_URL + 'search/movie?api_key=' + API_KEY + '&query=' + encodeURI(query) + '&page=' + page;
    
        try {
          const response = await axios.get(url);
          resolve(response.data);
        } catch (err) {
          // reject('Error fetching');
          resolve([]);
        }
      })
    },

    getMoviesByCast: function(query, page) {
      return new Promise( async (resolve, reject) => {
        const url = BASE_URL + 'search/person?api_key=' + API_KEY + '&query=' + encodeURI(query) + '&page=' + page;
    
        try {
          const response = await axios.get(url);
          resolve(response.data);
        } catch (err) {
          // reject('Error fetching');
          resolve([]);
        }
      })
    },

    getMoviesByYearsRangeAndGenres: function(years, genres, page) {
      return new Promise( async (resolve, reject) => {
        years = years ? years.split('-') : null;
        let url = BASE_URL + 'discover/movie?api_key=' + API_KEY;
        url += years ? '&release_date.gte=' + encodeURI(years[0] + '-01-01') : '';
        url += years ? '&release_date.lte=' + encodeURI(years[1] + '-01-01') : '';
        url += genres ? '&with_genres=' + encodeURI(genres) : '';
        url += page ? '&page=' + page : '';
    
        try {
          const response = await axios.get(url);
          resolve(response.data);
        } catch (err) {
          // reject('Error fetching');
          resolve([]);
        }
      })
    },

    getPopularMovies: function(page) {
      return new Promise( async (resolve, reject) => {
        const url = BASE_URL + 'movie/popular?api_key=' + API_KEY + '&page=' + page;
    
        try {
          const response = await axios.get(url);
          resolve(response.data);
        } catch (err) {
          // reject('Error fetching');
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
          // reject('Error fetching');
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
          // reject('Error fetching');
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
          // reject('Error fetching');
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
          // reject('Error fetching');
          resolve([]);
        }
      })
    }
  }
})();

export default moviesApi;