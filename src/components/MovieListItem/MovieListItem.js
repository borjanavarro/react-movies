import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

const mode = 'w500'
const POSTER_URL = 'https://image.tmdb.org/t/p/' + mode + '/';

function MovieListItem({ movie }) {
  let { id, title, poster_path, release_date, vote_average, vote_count } = movie;

  return (
    <Link to={'/detail/' + id}>
    <div className="movie-item">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
              <img src={ poster_path ? POSTER_URL + poster_path : 'error' } alt={title} />
          </div>
          <div className="flip-card-back">
            <p className="title">{title}<br/>{release_date ? '(' + release_date.substr(0, 4) + ')' : ''}</p> 
            <p className="rating">
              <i className="far fa-star"></i>&nbsp;
              {vote_count ? parseFloat(vote_average).toFixed(1) : 'No rating'}
            </p>
          </div>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default MovieListItem;


