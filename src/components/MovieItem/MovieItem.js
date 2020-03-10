import React from 'react';
import { Col } from 'react-bootstrap';

const mode = 'w500'
const POSTER_URL = 'https://image.tmdb.org/t/p/' + mode + '/';

function MovieItem({ movie }) {
  let { poster_path } = movie;


  console.log(movie);
  
  // return (
  //   <Col lg={4}>
  //     <div className="movie-item">
  //       <div className="img-container">
  //       </div>
  //     </div>
  //   </Col>
  // )

  return (
    <Col lg={3}>
      <div className="movie-item">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
                <img src={ movie.poster_path ? POSTER_URL + poster_path : 'error' } alt=""/>
            </div>
            <div className="flip-card-back">
              <h5 className="title">{movie.title}<br/>({movie.release_date.substr(0, 4)})</h5> 
              <h6>
                <i className="far fa-star"></i>
                {movie.vote_count ? ' ' + parseFloat(movie.vote_average).toFixed(1) : ' No rating'}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </Col>
  )
}

export default MovieItem;


