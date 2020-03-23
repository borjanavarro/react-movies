import {useState, useCallback, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {matchPath} from 'react-router';

const padding = 20;
const LG_WIDTH = 992;

function useScrollable(mounted) {
  const [topPosition, setTopPosition] = useState();
  const [enabled, setEnabled] = useState(false);
  const [display, setDisplay] = useState(false);
  const history = useHistory();

  const handleScroll = useCallback( () => {
    if ( enabled ) {
      const filters = document.querySelector('.filters');
      const content = document.querySelector('.content');
      const footer = document.querySelector('footer');

      const startPosition = content.offsetParent.offsetTop;
      const filtersHeight = filters.offsetHeight;
      const limitPosition = footer.offsetTop - padding;
      
      if ( window.scrollY + filtersHeight + padding < limitPosition) {
        if ( window.scrollY > startPosition - padding ) {
          setTopPosition({top: padding + 'px', position: 'fixed' })
        } else {
          setTopPosition({top: startPosition, position: 'absolute'});
        }
      } else {
        setTopPosition({top: limitPosition - filtersHeight, position: 'absolute'})
      }
    }
  }, [enabled])

  const handleResize = useCallback(() => {
    handleScroll();

    if ( window.innerWidth < LG_WIDTH ) {
      setEnabled(false);
    } else {
      setEnabled(true);
    }
  }, [handleScroll])

  const onRouteChange = useCallback( (route) => {
    const match = matchPath(route.pathname, {
      path: "/detail/:movieId",
      exact: true
    });
    if ( match ) window.scroll(0, 0);
    handleScroll();
  }, [handleScroll])

  useEffect(() => {
    if ( mounted ) {
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize, true);

      handleResize();
      handleScroll();
      setDisplay(true);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [handleScroll, handleResize, mounted])

  useEffect (() => {
    history.listen(onRouteChange);

    return history.listen(onRouteChange);
  }, [history, onRouteChange])

  return {topPosition, display};
}

export default useScrollable;