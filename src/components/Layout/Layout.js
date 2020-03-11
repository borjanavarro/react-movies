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
            <aside>
              <Filters />
            </aside>
          </Col>
          <Col lg={8}>
            <main>
              {children}
            </main>
          </Col>
        </Row>
      </div>
    </Container>
    <Footer />
  </>
  )
}

export default Layout;