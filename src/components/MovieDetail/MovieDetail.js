import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';

import Layout from '../Layout';
import moviesApi from '../../services/moviesApi';

const mode = 'original'
const POSTER_URL = 'https://image.tmdb.org/t/p/' + mode + '/';

function MovieDetail() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const img = useRef();

  const getMovie = useCallback( async () => {
    const details = moviesApi.findDetailsByMovieId(movieId);
    const reviews = moviesApi.findReviewsByMovieId(movieId);
    const credits = moviesApi.findCreditsByMovieId(movieId);
    let movie = {};
    
    Promise.all([details, reviews, credits]).then(([details, reviews, credits]) => {
      movie.details = details ? details : null;
      movie.reviews = reviews ? reviews.results : null;
      movie.cast = credits ? credits.cast : null;
      movie.crew = credits ? credits.crew : null;
      console.log(movie);
      setMovie(movie);
    });
  }, [movieId]);

  useEffect( () => {
    getMovie();
  }, [getMovie]);

  const arrayToString = (array, filter) => {
    if ( !filter ) {
      return array
              .map( item => item.name )
              .join(', ');
    }
    return array
            .filter( item => item.job === filter )
            .map( item => item.name )
            .join(', ');
  }

  const getImage = (e, i) => {
    console.log(i);
    setTimeout(() => {
      e.target.src = "https://thispersondoesnotexist.com/image?hola=" + Math.floor(Math.random() * 100000);
    }, 1500 * (i + 1) * 1.5, e.persist());
  }

  if ( !movie ) {
    return (
      <Layout>
        <div className="no-results">
          <h2>No results</h2>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="movie-detail">
        <img src={movie.details.poster_path ? POSTER_URL + movie.details.poster_path : ''} alt="Movie Poster" />
        <div className="title">
          <h1>{movie.details.original_title}</h1>
          <h2>{movie.details.tagline}</h2>
        </div>
        <div className="data">
          <p><strong>Year</strong>: {movie.details.release_date.substr(0, 4)}</p>
          <p><strong>Running time</strong>: {movie.details.runtime}</p>
          <p><strong>Country</strong>: {arrayToString(movie.details.production_countries)}</p>
          <p><strong>Director</strong>: {arrayToString(movie.crew, 'Director')}</p>
          <p><strong>Screenplay</strong>: {arrayToString(movie.crew, 'Screenplay')}</p>
          <p><strong>Cast</strong>: {arrayToString(movie.cast.slice(0, 20))}</p>
          <p><strong>Producer</strong>: {arrayToString(movie.crew, 'Producer')}</p>
          <p><strong>Genre</strong>: {arrayToString(movie.details.genres)}</p>
          <p><strong>Overview</strong>: {movie.details.overview}</p>
        </div>
        <h4>{ movie.reviews.length !== 0 ? 'Reviews' : ''}</h4>
        <div className="review-list">
          {movie.reviews.map( (review, i) => {
            return <div className="review-item" key={i}>
              <div className="author">
                <img src="example" onError={(e) => getImage(e, i)} alt="" />
                <h6>{review.author}</h6>
              </div>
              <p>{review.content}</p>
            </div>;
          })}
        </div>
      </div> 
    </Layout>
  );
}

export default MovieDetail;