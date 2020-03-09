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
        <Row>
          <Col lg={3} >
            <Filters />
          </Col>
          <Col lg={9}>
            {children}
          </Col>
        </Row>
      </Container>
    <Footer />
  </>
  )
}

export default Layout;