import React, {useState, useCallback, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';

import moviesApi from '../../services/moviesApi';

function GenresCloud({reset, setReset, setFocused}) {
  const [genres, setGenres] = useState([]);
  const params = new URLSearchParams(useLocation().search);
  const genresParam = params.get('genres');
  const history = useHistory();

  const init = useCallback( () => {
    let genresIds = genresParam.split(',');
    genresIds = genresIds.map( id => parseInt(id) );

    const genres = document.querySelectorAll('.genre-cloud .genre');
    genres.forEach( genre => {
      if ( genresIds.includes(parseInt(genre.dataset.id)) ) genre.classList.add('selected');
    });
  }, [genresParam])

  const clear = useCallback( () => {
    const genres = document.querySelectorAll('.genre-cloud .genre');
    genres.forEach( genre => genre.classList.remove('selected') );
  }, [])

  const getGenres = useCallback( async () => {
    const genres = await moviesApi.getAllGenres();
    setGenres(genres.genres);
  }, []);

  const handleClick = (e) => {
    const genreId = e.currentTarget.dataset.id;
    let newGenres = genresParam ? genresParam.split(',') : [];

    if ( e.currentTarget.classList.contains('selected') ) {
      newGenres = newGenres.filter( genre => parseInt(genre) !== parseInt(genreId));
    } else {
      newGenres.push(genreId);
    }
    e.currentTarget.classList.toggle('selected');
    setFocused('discover');
    setReset(true);
    params.delete('cast');
    params.delete('movie');
    params.delete('page');
    if ( newGenres.length !== 0 ) {
      params.set('genres', newGenres.join(','));
      history.push('/?' + params.toString() );
    } else {
      if ( params.toString() === '' ) {
        history.push('/');
      } else {
        params.delete('genres');
        history.push('/?' + params.toString() );
      }
    }
  }

  useEffect ( () => {
    getGenres();
  }, [getGenres])

  useEffect( () => {
    if ( genres && genresParam ) init();
  }, [genres, genresParam, init])

  useEffect ( () => {
    if ( reset ) {
      clear();
      setReset(false);
    }
  }, [reset, clear, setReset])

  return (
    <div className="genre-wrapper">
      <div className="genre-cloud">
        {genres.map( (genre) => {
          return <button key={genre.id} className="genre" data-id={genre.id} onClick={handleClick}>{genre.name}</button>
        })}
      </div>
    </div>
  )
}

export default GenresCloud;