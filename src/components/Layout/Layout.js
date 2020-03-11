import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Header from '../Header';
import Footer from '../Footer';
import Filters from '../Filters';

function Layout({children}) {
  return (
    <>
    <Header />
    <Container>
      <div className="page-container">
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