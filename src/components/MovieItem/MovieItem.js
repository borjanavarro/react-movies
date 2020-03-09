import React from 'react';
import { Col } from 'react-bootstrap';

import './styles.scss';

const POSTER_URL = 'https://image.tmdb.org/t/p/original/';

function MovieItem({ movie }) {
  let { poster_path } = movie;


  console.log(movie);
  
  return (
    <Col lg={4}>
      <div className="movie-item">
        <div className="img-container">
          <img src={ movie.poster_path ? POSTER_URL + poster_path : 'error' } alt=""/>
        </div>
      </div>
    </Col>
  )
}

export default MovieItem;