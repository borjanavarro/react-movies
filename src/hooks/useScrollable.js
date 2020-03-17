import {useState, useCallback, useEffect, useRef} from 'react';

const padding = 20;

function useScrollable(parentMounted) {
  const [styles, setStyles] = useState({top: 0});

  const container = useRef();
  const startPosition = useRef();
  const filtersHeight = useRef();

  const handleScroll = useCallback( () => {
    if ( parentMounted ) {
      const limitPosition = container.current.offsetHeight - padding;
      
      if ( window.scrollY + filtersHeight.current < limitPosition) {
        if ( window.scrollY > startPosition.current ) {
          setStyles({top: window.scrollY - startPosition.current})
        } else {
          setStyles({top: 0});
        }
      }
    }
  }, [parentMounted])

  useEffect( () => {
    if ( parentMounted ) {
      const wrapper = document.querySelector('.filters-wrapper');
      const filters = document.querySelector('.filters');
      container.current = document.querySelector('.page-container');

      startPosition.current = wrapper.getBoundingClientRect().top - padding;
      filtersHeight.current = filters.offsetHeight;
    }
  }, [parentMounted])

  useEffect( () => {
    window.addEventListener('scroll', handleScroll, true);

    return window.removeEventListener('scroll', handleScroll);
  }, [handleScroll])

  return styles;
}

export default useScrollable;