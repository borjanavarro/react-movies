import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import FiltersContext from '../../contexts/Filters';

function Filters() {
  const {filters, filtersDispatch} = useContext(FiltersContext);
  const [styles, setStyles] = useState({top: 0});
  const history = useHistory();

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

  const handleChange = (event) => {
    const value = event.target.value;
    const allowedChars = new RegExp(/^[a-z0-9| ]*$/i);

    if ( allowedChars.test(value) ) {
      history.push('/?q=' + encodeURI(value));
      filtersDispatch({search: value, type: 'CHANGE_SEARCH'});
    }
    // podria poner algun tipo de validación
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <aside className="filters" style={styles}>
      <h3>Filters</h3>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder="Search" value={filters.search} onChange={handleChange} />
      </form>
    </aside>
  );
}

export default Filters;