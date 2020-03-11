import React, { useEffect, useState, useCallback, useContext } from 'react';

import FiltersContext from '../../contexts/Filters';

function Filters() {
  const {setSearch} = useContext(FiltersContext);
  const [styles, setStyles] = useState({top: 0});

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
    setSearch(event.target.value);
  }

  return (
    <div className="filters" style={styles}>
      <h3>Filters</h3>
      <form action="" onChange={handleChange}>
        <input type="text" placeholder="Search" />
      </form>
    </div>
  );
}

export default Filters;