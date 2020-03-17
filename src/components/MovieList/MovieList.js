import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import moviesApi from '../../services/moviesApi';
import Layout from '../Layout';
import MovieListItem from '../MovieListItem';
import Pagination from '../Pagination';
import FiltersContext from '../../contexts/Filters';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function MovieList() {
  const {filters, filtersDispatch} = useContext(FiltersContext);
  const [movies, setMovies] = useState([]);
  const queryPage = useQuery().get('page');
  const movieSearch = useQuery().get('movie');
  const castSearch = useQuery().get('cast');
  const genresSearch = useQuery().get('genres');
  const yearsSearch = useQuery().get('years');
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');

  const getMoviesByName = useCallback( async () => {
    setLoading(true);
    const movies = await moviesApi.getMoviesByName(filters.movie, filters.pages.current);
    setMovies(movies.results);
    filtersDispatch({totalPages: movies.total_pages, type: 'CHANGE_TOTAL_PAGES'});
    setTitle([filters.movie, 'movie names', movies.total_results]);
    setLoading(false);
  }, [filters.movie, filters.pages, filtersDispatch]);

  const getMoviesByCast = useCallback( async () => {
    setLoading(true);
    const data = await moviesApi.getMoviesByCast(filters.cast, filters.pages.current);
    setMovies(filterResults(data));
    filtersDispatch({totalPages: data.total_pages, type: 'CHANGE_TOTAL_PAGES'});
    setTitle([filters.cast, 'movie cast', data.total_results]);
    setLoading(false);
  }, [filters.cast, filters.pages, filtersDispatch]);

  const getMoviesByYearsRangeAndGenres = useCallback( async () => {
    setLoading(true);
    const data = await moviesApi.getMoviesByYearsRangeAndGenres(filters.years, filters.genres, filters.pages.current);
    setMovies(data.results);
    filtersDispatch({totalPages: data.total_pages, type: 'CHANGE_TOTAL_PAGES'});
    setTitle(['discover', 'movie genres and years range', data.total_results]);
    setLoading(false);
  }, [filters.years, filters.genres, filters.pages, filtersDispatch]);

  const getPopularMovies = useCallback( async () => {
    setLoading(true);
    const data = await moviesApi.getPopularMovies(filters.pages.current);
    setMovies(data.results);
    filtersDispatch({totalPages: data.total_pages, type: 'CHANGE_TOTAL_PAGES'});
    setTitle(['popular', 'all categories', data.total_results]);
    setLoading(false);
  }, [filters.pages, filtersDispatch]);

  const filterResults = (data) => {
    let movies = [];
    let moviesIds = [];

    data.results.forEach( person => {
      person.known_for.forEach( movie => {
        if ( !moviesIds.includes(movie.id) ) {
          movies.push(movie);
          moviesIds.push(movie.id);
        }
      });
    });
    return movies;
  }

  const getFilter = useCallback ( () => {
    if ( movieSearch && queryPage ) {
      return {movie: movieSearch, page: queryPage, type: 'CHANGE_MOVIE_&_PAGE'};
    }
    if ( movieSearch && !queryPage ) {
      return {movie: movieSearch, type: 'CHANGE_MOVIE'};
    }
    if ( castSearch && queryPage ) {
      return {cast: castSearch, page: queryPage, type: 'CHANGE_CAST_&_PAGE'};
    }
    if ( castSearch && !queryPage ) {
      return {cast: castSearch, type: 'CHANGE_CAST'};
    }
    if ( (genresSearch || yearsSearch) && !queryPage ) {
      return {
        genres: genresSearch ? genresSearch : '',
        years: yearsSearch ? yearsSearch : '1920-2020',
        type: 'CHANGE_GENRES_&_YEARS'
      };
    }
    if ( (genresSearch || yearsSearch) && queryPage ) {
      return {
        genres: genresSearch ? genresSearch : '',
        years: yearsSearch ? yearsSearch : '1920-2020',
        page: queryPage,
        type: 'CHANGE_GENRES_&_YEARS_&_PAGE'
      };
    }
    history.replace('/');
    return {type: 'RESET'};
  }, [movieSearch, castSearch, genresSearch, yearsSearch, queryPage, history]);

  useEffect ( () => {
    filtersDispatch(getFilter());

    if ( movieSearch ) {
      getMoviesByName();
    } else if ( castSearch ) {
      getMoviesByCast(); 
    } else if ( yearsSearch || genresSearch ) {
      getMoviesByYearsRangeAndGenres();
    } else {
      getPopularMovies();
    }
  }, [
    movieSearch, castSearch, yearsSearch, genresSearch, filtersDispatch,
    getMoviesByName, getMoviesByCast, getMoviesByYearsRangeAndGenres, getPopularMovies, getFilter
  ]);

  if ( loading ) {
    return (
      <Layout>
          <div className="no-results">
            <h2>Loading...</h2>
          </div>
          <Pagination />
      </Layout>
    )
  }

  if ( !movies || movies.length === 0 ) {
    return (
      <Layout>
        <div className="no-results">
          <h2>No results</h2>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={title}>
      <main className="movie-list">
          {movies.map( (movie) => {
            return <MovieListItem key={movie.id} movie={movie} />
          })}
      </main>
      <Pagination />
    </Layout>
  );
}

export default MovieList;