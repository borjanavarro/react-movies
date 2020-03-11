import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';

import moviesApi from '../../services/moviesApi';
import Layout from '../Layout';
import MovieItem from '../MovieItem';
import Pagination from '../Pagination';
import usePage from '../../custom-hooks/usePage';
import FiltersContext from '../../contexts/Filters';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [page] = usePage();
  const [totalPages, setTotalPages] = useState();
  const {search} = useContext(FiltersContext);

  const getMovies = useCallback( async () => {
    const movies = await moviesApi.getBySearch(search, page);
    setMovies(movies.results);
    setTotalPages(movies.total_pages);
  }, [search, page]);

  useEffect( () => {
    if ( search ) {
      getMovies();
    } else {
      setMovies([]);
    }
  }, [getMovies, page, search]);

  if ( !movies || movies.length === 0 ) {
    return (
      <Layout>
        <Row>
          <div className="loading">
            <h2>Loading ...</h2>
          </div>
        </Row>
      </Layout>
    )
  }

  return (
    <Layout>
      <Row>
        {movies.map( (movie) => {
          return <MovieItem key={movie.id} movie={movie} />
        })}
      </Row>
      <Row>
        <Col>
          <Pagination page={page} totalPages={totalPages} />
        </Col>
      </Row>
    </Layout>
  );
}

export default MovieList;