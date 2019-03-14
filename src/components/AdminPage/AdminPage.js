import React from 'react';
import './AdminPage.scss';
import { Container, Row, Col, Button } from 'reactstrap';

const AdminPage = () => {
  
  return (
    <Container>
      <h1 className="frontParagraph adminText mt-3">Välkommen till Adminsidan</h1>
      <Row className="mt-3">
        <Col md="4">
          <Button className="adminButton">Ta bort filmvisningar</Button>
        </Col>
        <Col md="4">
          <Button className="adminButton">Skapa filmvisning</Button>
        </Col>
        <Col md="4">
          <Button className="adminButton">Ändra filmvisning</Button>
        </Col>
      </Row>
    </Container>
  )

}

export default AdminPage;