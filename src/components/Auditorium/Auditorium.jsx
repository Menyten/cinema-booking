import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Seat from '../Seat';

const Auditorium = () => {
  return (
    <Container>
      <Row className='mt-5'>
      </Row>
      <Row className='mt-4 pt-3'>
        <Col className='text-center' sm='12'><h2>Välj antal biljetter</h2></Col>
        <Col className='mb-1' sm='12' md='4'>
          <h4>Vuxna (85kr)</h4>
          <button type="button" class="btn btn remove-adult remove-one selectButton selectButton1">-</button>
          <span className="adult"></span>
          <button type="button" class="btn btn add-adult add-one selectButton selectButton2">+</button>
        </Col>
      </Row>
      <Row className='mt-4'></Row>
      <Row className='mt-5'></Row>
    </Container>
  )
};

export default Auditorium;