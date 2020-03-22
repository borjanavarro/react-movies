import {useState, useCallback, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {matchPath} from 'react-router';

const padding = 20;
const LG_WIDTH = 1199;

function useScrollable() {
  const [styles, setStyles] = useState({top: 0});
  const [enable, setEnable] = useState(false);
  const history = useHistory();

  const handleScroll = useCallback( () => {
    if ( enable ) {
      const filters = document.querySelector('.filters');
      const pageContainer = document.querySelector('.page-container');
      const content = document.querySelector('.content');

      const startPosition = content.offsetParent.offsetTop;
      const filtersHeight = filters.offsetHeight;
      const limitPosition = startPosition + pageContainer.offsetHeight - padding;
      
      if ( window.scrollY + filtersHeight + padding < limitPosition) {
        if ( window.scrollY > startPosition - padding ) {
          setStyles({top: padding + 'px', position: 'fixed' })
        } else {
          setStyles({top: startPosition, position: 'absolute'});
        }
      } else {
        setStyles({top: limitPosition - filtersHeight, position: 'absolute'})
      }
    }
  }, [enable])

  const handleResize = () => {
    if ( window.innerWidth < LG_WIDTH ) {
      setEnable(false);
    } else {
      setEnable(true);
    }
  }

  const onRouteChange = useCallback( (route) => {
    const match = matchPath(route.pathname, {
      path: "/detail/:movieId",
      exact: true
    });
    if ( match ) window.scroll(0, 0);
    handleScroll();
  }, [handleScroll])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize, true);

    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize)
    }
  }, [handleScroll])

  useEffect (() => {
    history.listen(onRouteChange);

    return history.listen(onRouteChange);
  }, [history, onRouteChange])

  return styles;
}

export default useScrollable;