import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import icon from '../../img/icon.svg';

function Header() {
  
  return (
    <header>
      <Container>
        <Row>
          <Col>
            <div className="img-container">
              <img src={icon} alt=""/>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;