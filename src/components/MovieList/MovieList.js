import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import moviesApi from '../../services/moviesApi';
import Layout from '../Layout';
import MovieListItem from '../MovieListItem';
import Pagination from '../Pagination';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function MovieList() {
  const [movies, setMovies] = useState([]);
  const queryPage = useQuery().get('page');
  const movieSearch = useQuery().get('movie');
  const castSearch = useQuery().get('cast');
  const genresSearch = useQuery().get('genres');
  const yearsSearch = useQuery().get('years');
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [listHeight, setListHeight] = useState({});

  const getMoviesByName = useCallback( async (query, page) => {
    setLoading(true);
    const data = await moviesApi.getMoviesByName(query, page);
    setMovies(data.results);
    setTotalPages(data.total_pages);
    setTitle([query, 'movie names', data.total_results]);
    getHeight(data.results);
    setLoading(false);
  }, []);

  const getMoviesByCast = useCallback( async (query, page) => {
    setLoading(true);
    let data = await moviesApi.getMoviesByCast(query, page);
    setTitle([query, 'movie cast', data.total_results]);
    data = filterResults(data);
    setMovies(data);
    setTotalPages(data.total_pages);
    getHeight(data);
    setLoading(false);
  }, []);

  const getMoviesByYearsRangeAndGenres = useCallback( async (years, genres, page) => {
    setLoading(true);
    const data = await moviesApi.getMoviesByYearsRangeAndGenres(years, genres, page);
    setMovies(data.results);
    setTotalPages(data.total_pages);
    setTitle(['discover', 'movie genres and years range', data.total_results]);
    getHeight(data.results);
    setLoading(false);
  }, []);

  const getPopularMovies = useCallback( async (page) => {
    setLoading(true);
    const data = await moviesApi.getPopularMovies(page);
    setMovies(data.results);
    setTotalPages(data.total_pages);
    setTitle(['popular', 'all categories', data.total_results]);
    getHeight(data.results);
    setLoading(false);
  }, []);

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

  const getHeight = (data) => {
    let value = Math.ceil(data.length / 4) * 270;
    setListHeight({minHeight:  value > 574 ? value : 574 + 'px' });
  }

  useEffect ( () => {
    const page = parseInt(queryPage) ? queryPage : 1;

    if ( movieSearch ) {
      getMoviesByName(movieSearch, page);
    } else if ( castSearch ) {
      getMoviesByCast(castSearch, page); 
    } else if ( yearsSearch || genresSearch ) {
      getMoviesByYearsRangeAndGenres(yearsSearch, genresSearch, page);
    } else {
      getPopularMovies(page);
    }
  }, [
    queryPage,
    movieSearch, castSearch, yearsSearch, genresSearch,
    getMoviesByName, getMoviesByCast, getMoviesByYearsRangeAndGenres, getPopularMovies
  ]);

  if ( loading ) {
    return (
      <Layout title={title} titleClass="">
        <main className="movie-list" style={listHeight}>
          <div className="no-results">
            <h2>Loading...</h2>
          </div>
        </main>
        <Pagination />
      </Layout>
    )
  }

  if ( !movies || movies.length === 0 ) {
    return (
      <Layout title={title} titleClass="">
        <main className="movie-list" style={listHeight}>
          <div className="no-results">
            <h2>No results</h2>
          </div>
        </main>
      </Layout>
    )
  }

  return (
    <Layout title={title} titleClass="">
      <main className="movie-list" style={listHeight}>
          {movies.map( (movie) => {
            return <MovieListItem key={movie.id} movie={movie} />
          })}
      </main>
      <Pagination totalPages={totalPages} />
    </Layout>
  );
}

export default MovieList;