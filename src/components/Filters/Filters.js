import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import useScrollable from '../../hooks/useScrollable';
import YearsSlider from '../YearsSlider';
import GenresCloud from '../GenresCloud';

function Filters() {
  const [mounted, setMounted] = useState(false);
  const [resetChilds, setResetChilds] = useState(false);
  const [focused, setFocused] = useState('');
  const styles = useScrollable(mounted);
  const [movieInput, setMovieInput] = useState('');
  const [castInput, setCastInput] = useState('');
  const params = new URLSearchParams(useLocation().search);
  const movieSearch = params.get('movie');
  const castSearch = params.get('cast');
  const history = useHistory();

  useEffect( () => {
    setMounted(true);
  }, [])

  useEffect ( () => {
    if ( movieSearch ) setMovieInput(movieSearch);
    if ( castSearch ) setCastInput(castSearch);
  }, [movieSearch, castSearch])

  useEffect ( () => {
    if ( resetChilds ) {
      setResetChilds(false);
      if ( focused !== 'movie' ) setMovieInput('');
      if ( focused !== 'cast' ) setCastInput('');
    }
  }, [resetChilds, focused])

  const validateSearch = useCallback( (value) => {
    const allowedChars = new RegExp(/^[a-z0-9| ]*$/i);
    return allowedChars.test(value);
  }, [])

  const movieChange = (e) => {
    const value = e.target.value;
    
    if ( validateSearch(value) ) {
      setFocused('movie');
      setResetChilds(true);
      setMovieInput(value);
      history.push('/?movie=' + encodeURI(value));
    }
  }

  const castChange = (e) => {
    const value = e.target.value;
    
    if ( validateSearch(value) ) {
      setFocused('cast');
      setResetChilds(true);
      setCastInput(value);
      history.push('/?cast=' + encodeURI(value));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="filters-wrapper">
      <aside className="filters" style={styles}>
        <h5>Search by</h5>
        <form action="" onSubmit={handleSubmit}>
          <input type="text" placeholder="Movie ..." value={movieInput} onChange={movieChange} />
          <div className="separator">
            <p>OR</p>
          </div>
          <input type="text" placeholder="Cast ..." value={castInput} onChange={castChange} />
          <div className="separator discover">
            <p>OR DISCOVER</p>
          </div>
          <YearsSlider
            reset={resetChilds && focused !== 'discover'}
            setReset={setResetChilds}
            setFocused={setFocused}
          />
          <GenresCloud
            reset={resetChilds && focused !== 'discover'}
            setReset={setResetChilds}
            setFocused={setFocused}
            parentMounted={mounted}
          />
        </form>
      </aside>
    </div>
  );
}

export default Filters;