import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col } from 'react-bootstrap';

import {moviesApi_getAll} from '../../services/moviesApi';
import Layout from '../Layout';
import Movie from '../MovieItem';
import Pagination from '../Pagination';
import usePage from '../../custom-hooks/usePage';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [page] = usePage();
  const [totalPages, setTotalPages] = useState();

  const search = 'a';

  const getMovies = useCallback( async () => {
    const movies = await moviesApi_getAll(search, page);
    setMovies(movies.results);
    setTotalPages(movies.total_pages);
  }, [search, page]);

  useEffect( () => {
    getMovies();
  }, [getMovies]);

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
          return <Movie key={movie.id} movie={movie} />
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