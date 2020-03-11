import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';

import moviesApi from '../../services/moviesApi';
import Layout from '../Layout';
import MovieItem from '../MovieItem';
import Pagination from '../Pagination';
import FiltersContext from '../../contexts/Filters';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function MovieList() {
  const {filters, filtersDispatch} = useContext(FiltersContext);

  const [movies, setMovies] = useState([]);
  const queryPage = useQuery().get('page');
  const querySearch = useQuery().get('q');
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const getMovies = useCallback( async () => {
    setLoading(true);
    const movies = await moviesApi.getBySearch(filters.search, filters.pages.current);
    setMovies(movies.results);
    filtersDispatch({totalPages: movies.total_pages, type: 'CHANGE_TOTAL_PAGES'});
    setLoading(false);
  }, [filters.search, filters.pages, filtersDispatch]);

  const getFilter = useCallback ( () => {
    if ( querySearch && queryPage ) {
      return {search: querySearch, page: queryPage, type: 'CHANGE_SEARCH_&_PAGE'};
    }
    if ( querySearch && !queryPage ) {
      return {search: querySearch, type: 'CHANGE_SEARCH'};
    }
    history.replace('/');
    return {type: 'RESET'};
  }, [querySearch, queryPage, history]);

  useEffect ( () => {
    filtersDispatch(getFilter());

    if ( querySearch ) {
      getMovies();
    } else {
      setMovies([]);
    }
  }, [querySearch, filtersDispatch, getMovies, getFilter]);

  if ( loading ) {
    return (
      <Layout>
        <Row>
          <div className="no-results">
            <h2>Loading...</h2>
          </div>
        </Row>
        <Row>
          <Col>
            <Pagination />
          </Col>
        </Row>
      </Layout>
    )
  }

  if ( !movies || movies.length === 0 ) {
    return (
      <Layout>
        <Row>
          <div className="no-results">
            <h2>No results</h2>
          </div>
        </Row>
      </Layout>
    )
  }

  return (
    <Layout>
      <main className="movie-list">
        <Row>
            {movies.map( (movie) => {
              return <MovieItem key={movie.id} movie={movie} />
            })}
        </Row>
      </main>
      <Row>
        <Col>
          <Pagination />
        </Col>
      </Row>
    </Layout>
  );
}

export default MovieList;