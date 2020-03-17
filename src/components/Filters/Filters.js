import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import moviesApi from '../../services/moviesApi';
// import FiltersContext from '../../contexts/Filters';
import YearsSlider from '../YearsSlider';

const today = new Date();
const yearsDefaultValues = [today.getFullYear() - 100, today.getFullYear()]

function Filters() {
  // const {filters, filtersDispatch} = useContext(FiltersContext);
  const [styles, setStyles] = useState({top: 0});
  const [genres, setGenres] = useState([]);
  const history = useHistory();
  const [minYear, setMinYear] = useState(yearsDefaultValues[0]);
  const [maxYear, setMaxYear] = useState(yearsDefaultValues[1]);
  const params = new URLSearchParams(useLocation().search);
  const movieSearch = params.get('movie');
  const castSearch = params.get('cast');
  const genresSearch = params.get('genres');
  const yearsSearch = params.get('years');
  const [movieInput, setMovieInput] = useState('');
  const [castInput, setCastInput] = useState('');

  const handleScroll = useCallback( () => {
    const footer = document.querySelector('footer');
    const filters = document.querySelector('.filters');
    const pageContainer = document.querySelector('.page-container');

    const filtersPadding = 20;
    const filtersStartPosition = pageContainer.offsetTop - filtersPadding;
    let filtersHeight = filters.offsetHeight + filtersPadding;
    const scrolldownLimit = footer.offsetTop - filtersPadding;

    if ( window.scrollY + filtersHeight < scrolldownLimit) {
      if ( window.scrollY > filtersStartPosition ) {
        setStyles({top: window.scrollY - filtersStartPosition})
      } else {
        setStyles({top: 0});
      }
    }
  }, [])

  useEffect( () => {
    window.addEventListener('scroll', handleScroll, true);

    return window.removeEventListener('scroll', handleScroll);
  }, [handleScroll])

  const resetGenres = useCallback( (ids) => {
    const genres = document.querySelectorAll('.genre-cloud .genre');
    
    genres.forEach( genre => genre.classList.remove('selected') );

    if ( ids ) {
      let genresIds = genresSearch.split(',');
      genresIds = genresIds.map( id => parseInt(id) );

      genres.forEach( genre => {
        if ( genresIds.includes(parseInt(genre.dataset.id)) ) genre.classList.add('selected');
      });
    }
  }, [genresSearch])

  const getGenres = useCallback( async () => {
    const genres = await moviesApi.getAllGenres();
    setGenres(genres.genres);
    if ( genresSearch ) {
      resetGenres(true);
    }
  }, [genresSearch, resetGenres]);

  useEffect ( () => {
    getGenres();
  }, [getGenres])

  useEffect ( () => {
    if ( movieSearch ) {
      setMovieInput(movieSearch);
    }
    if ( castSearch ) {
      setCastInput(castSearch);
    }
    if ( yearsSearch ) {
      let years = yearsSearch.split('-');
      years = years.map( year => parseInt(year) );
      setMinYear(years[0]);
      setMaxYear(years[1]);
    }
  }, [movieSearch, castSearch, yearsSearch])

  const validateSearch = (value) => {
    const allowedChars = new RegExp(/^[a-z0-9| ]*$/i);

    return allowedChars.test(value);
  }

  const movieChange = (e) => {
    const value = e.target.value;
    
    if ( validateSearch(value) ) {
      clearOtherFilters('movie');
      setMovieInput(value);
      history.push('/?movie=' + encodeURI(value));
    }
  }

  const castChange = (e) => {
    const value = e.target.value;
    
    if ( validateSearch(value) ) {
      clearOtherFilters('cast');
      setCastInput(value);
      history.push('/?cast=' + encodeURI(value));
    }
  }

  const genreClick = (e) => {
    const genreId = e.currentTarget.dataset.id;
    let newGenres = genresSearch ? genresSearch.split(',') : [];

    if ( e.currentTarget.classList.contains('selected') ) {
      newGenres = newGenres.filter( genre => parseInt(genre) !== parseInt(genreId));
    } else {
      newGenres.push(genreId);
    }
    e.currentTarget.classList.toggle('selected');
    clearOtherFilters('discover');
    params.delete('cast');
    params.delete('movie');
    params.set('genres', newGenres.join(','));
    history.push('/?' + params.toString() );
  }

  const clearOtherFilters = (focused) => {
    if ( focused === 'discover' ) {
      setCastInput('');
      setMovieInput('');
    } else {
      resetGenres(false);
      setMinYear(yearsDefaultValues[0]);
      setMaxYear(yearsDefaultValues[1]);

      if ( focused === 'movie') {
        setCastInput('');
      } else if ( focused === 'cast' ) {
        setMovieInput('');
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const sliderOnChange = (values) => {
    setMinYear(values[0]);
    setMaxYear(values[1]);
    clearOtherFilters('discover');
    params.delete('cast');
    params.delete('movie');
    params.set('years', values[0] + '-' + values[1]);
    history.push('/?' + params.toString() );
  }

  return (
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
        <div className="years-slider">
          <label htmlFor="years">
            from &nbsp;
            <span className="min-year">{minYear}</span>
            &nbsp; to &nbsp;
            <span className="max-year">{maxYear}</span>
          </label>
          <YearsSlider minYear={minYear} maxYear={maxYear} onChangeCallback={sliderOnChange} />
        </div>
        <div className="genre-wrapper">
          <div className="genre-cloud">
            {genres.map( (genre, i) => {
              return <button key={genre.id} className="genre" data-id={genre.id} onClick={genreClick}>{genre.name}</button>
            })}
          </div>
        </div>
      </form>
    </aside>
  );
}

export default Filters;