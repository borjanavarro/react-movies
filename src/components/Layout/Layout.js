import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Header from '../Header';
import Footer from '../Footer';
import Filters from '../Filters';

function Layout({children, title}) {
  return (
    <>
    <Header />
    <Container>
      <div className="page-container">
        {title ? (
          <div className="title">
            <h1>Results for <i>"{title[0]}"</i></h1>
            <h5>Searched in {title[1]}</h5>
            <h5>Approximately {title[2]} results</h5>
          </div>
        ) : ''}
        <Row>
          <Col lg={4} >
              <Filters />
          </Col>
          <Col lg={8}>
            {children}
          </Col>
        </Row>
      </div>
    </Container>
    <Footer />
  </>
  )
}

export default Layout;