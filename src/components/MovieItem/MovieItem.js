import React from 'react';
import { Col } from 'react-bootstrap';

const mode = 'w500'
const POSTER_URL = 'https://image.tmdb.org/t/p/' + mode + '/';

function MovieItem({ movie }) {
  let { title, poster_path, release_date, vote_average, vote_count } = movie;


  // console.log(movie);

  return (
    <Col lg={3}>
      <div className="movie-item">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
                <img src={ poster_path ? POSTER_URL + poster_path : 'error' } alt="" />
            </div>
            <div className="flip-card-back">
              <h5 className="title">{title}<br/>{release_date ? '(' + release_date.substr(0, 4) + ')' : ''}</h5> 
              <h6>
                <i className="far fa-star"></i>
                {vote_count ? ' ' + parseFloat(vote_average).toFixed(1) : ' No rating'}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </Col>
  )
}

export default MovieItem;


