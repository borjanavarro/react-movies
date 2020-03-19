import React, {useEffect, useCallback} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {matchPath} from 'react-router';

import icon from '../../img/icon.svg';

function Header() {
  const history = useHistory();

  function showFilters(e) {
    const filters = document.querySelector('.filters-wrapper');
    const pageContainer = document.querySelector('.page-container');

    e.target.classList.toggle('show');
    filters.classList.toggle('show');
    // filters.style.top = (window.scrollY) + 'px';
    pageContainer.classList.toggle('stop-scrolling');
    
    if ( e.target.classList.contains('show') ) {
      e.target.innerHTML = 'X';

    } else {
      e.target.innerHTML = 'Filters';
    }
  }

  const onRouteChange = useCallback( (route) => {
    const match = matchPath(route.pathname, {
      path: "/detail/:movieId",
      exact: true
    });
    if ( match ) {
      const filtersBtn = document.querySelector('.filters-btn');
      filtersBtn.classList.add('hidden');
    }
  }, [])

  useEffect (() => {
    history.listen(onRouteChange);
    onRouteChange(history.location);

    return history.listen(onRouteChange);
  }, [history, onRouteChange])
  
  return (
    <header>
      <Container>
        <Row>
          <Col>
            <nav>
              <div className="img-container">
                <img src={icon} alt=""/>
              </div>
              <button className="filters-btn" onClick={showFilters}>Filters</button>
            </nav>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;