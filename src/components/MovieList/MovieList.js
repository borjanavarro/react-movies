import React, { useState, useEffect, useCallback } from 'react';
import { Row } from 'react-bootstrap';

import {moviesApi_getAll} from '../../services/moviesApi';
import Layout from '../Layout';
import Movie from '../MovieItem';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const search = 'a';

  const getMovies = useCallback( async () => {
    const movies = await moviesApi_getAll(search);
    setMovies(movies.results);
  }, [search]);

  useEffect( () => {
    getMovies();
  }, [getMovies]);

  return (
    <Layout>
      <Row>
        {movies.map( (movie) => {
          return <Movie key={movie.id} movie={movie} />
        })}
      </Row>
    </Layout>
  );
}

export default MovieList;