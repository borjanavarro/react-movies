import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import moviesApi from '../../services/moviesApi';
import FiltersContext from '../../contexts/Filters';
import YearsSlider from '../YearsSlider';

function Filters() {
  const {filters, filtersDispatch} = useContext(FiltersContext);
  const [styles, setStyles] = useState({top: 0});
  const [labelStyles, setLabelStyles] = useState({left: 0});
  const [genres, setGenres] = useState([]);
  const history = useHistory();
  const [maxYear, setMaxYear] = useState();
  const [minYear, setMinYear] = useState();

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

  const getGenres = useCallback( async () => {
    const genres = await moviesApi.getAllGenres();
    setGenres(genres.genres);
  }, []);

  useEffect ( () => {
    getGenres();
  }, [getGenres])

  const handleChange = (e) => {
    const value = e.target.value;
    const allowedChars = new RegExp(/^[a-z0-9| ]*$/i);

    if ( allowedChars.test(value) ) {
      history.push('/?q=' + encodeURI(value));
      filtersDispatch({search: value, type: 'CHANGE_SEARCH'});
    }
    // podria poner algun tipo de validación
  }

  const genreClick = (e) => {
    const genreId = e.currentTarget.dataset.id;
    e.currentTarget.classList.toggle('selected');
    // añadir o quitar en filtros
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <aside className="filters" style={styles}>
      {/* <h3>Filters</h3> */}
      <form action="" onSubmit={handleSubmit}>
        <div className="genre-cloud">
          {genres.map( (genre, i) => {
            return <button key={genre.id} className="genre" data-id={genre.id} onClick={genreClick}>{genre.name}</button>
          })}
        </div>
        <input type="text" placeholder="Movie ..." value={filters.search} onChange={handleChange} />
        <input type="text" placeholder="Casting ..." />
        <div className="years-slider">
          <label htmlFor="years">
            from &nbsp;
            <span className="min-year">{minYear}</span>
            &nbsp; to &nbsp;
            <span className="max-year">{maxYear}</span>
          </label>
          <YearsSlider setMinYear={setMinYear} setMaxYear={setMaxYear} />
        </div>
      </form>
    </aside>
  );
}

export default Filters;