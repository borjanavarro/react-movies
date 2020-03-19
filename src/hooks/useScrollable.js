import {useState, useCallback, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {matchPath} from 'react-router';

const padding = 20;

function useScrollable() {
  const [styles, setStyles] = useState({top: 0});
  const history = useHistory();

  const handleScroll = useCallback( () => {
    const filters = document.querySelector('.filters');
    const pageContainer = document.querySelector('.page-container');
    const content = document.querySelector('.content');

    const startPosition = content.offsetParent.offsetTop - padding;
    const filtersHeight = filters.offsetHeight;
    const limitPosition = startPosition + pageContainer.offsetHeight - padding;
    
    if ( window.scrollY + filtersHeight < limitPosition) {
      if ( window.scrollY > startPosition ) {
        setStyles({top: window.scrollY - startPosition})
      } else {
        setStyles({top: 0});
      }
    } else {
      setStyles({top: limitPosition - filtersHeight - startPosition})
    }
  }, [])

  const onRouteChange = useCallback( (route) => {
    const match = matchPath(route.pathname, {
      path: "/detail/:movieId",
      exact: true
    });
    if ( match ) window.scroll(0, 0);
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);

    return window.removeEventListener('scroll', handleScroll);
  }, [handleScroll])

  useEffect (() => {
    history.listen(onRouteChange);

    return history.listen(onRouteChange);
  }, [history, onRouteChange])

  return styles;
}

export default useScrollable;