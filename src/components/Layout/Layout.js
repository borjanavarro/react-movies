import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Header from '../Header';
import Footer from '../Footer';
import Filters from '../Filters';

function Layout({children, title, titleClass}) {
  const [wrapperTop, setWrapperTop] = useState({top: 0});

  useEffect (() => {
    const content = document.querySelector('.content');
    const header = document.querySelector('header');
    setWrapperTop({top: window.innerWidth < 1199 ? 0 : content.offsetParent.offsetTop - header.offsetHeight});
  }, [titleClass])
  
  return (
    <>
    <Header />
    <Filters wrapperTop={wrapperTop} />
    <Container>
      <div className="page-container">
        <div className={'title ' + (titleClass ? titleClass : '')}>
          {<h1>Results for <i>"{title[0] ? title[0] : 0}"</i></h1>}
          {<h5>Searched in {title[1] ? title[1] : ''}</h5>}
          {title[2] ? <h5>Approximately {title[2]} results</h5> : <h5>0 results</h5>}
        </div>
        <Row>
          <Col lg={{ span: 8, offset: 4 }}>
            <div className="content">
              {children}
            </div>
          </Col>
        </Row>
      </div>
    </Container>
    <Footer />
    </>
  )
}

export default Layout;