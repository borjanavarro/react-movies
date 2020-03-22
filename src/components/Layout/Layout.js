import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './styles.scss';

import Header from '../Header';
import Footer from '../Footer';
import Filters from '../Filters';

const LG_WIDTH = 1199;

function Layout({children, title, titleClass}) {
  const [wrapperTop, setWrapperTop] = useState({top: 0});

  useEffect (() => {
    const content = document.querySelector('.content');
    setWrapperTop({top: window.innerWidth < LG_WIDTH ? 0 : content.offsetParent.offsetTop});
  }, [titleClass])
  
  return (
    <>
    <Filters wrapperTop={wrapperTop} />
    <Header />
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