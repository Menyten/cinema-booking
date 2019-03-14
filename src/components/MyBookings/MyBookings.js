import React from 'react';
import HistoryBookings from '../HistoryBookings/index';
import CurrentBookings from '../CurrentBookings/index';
import { Row, Col } from 'reactstrap';


const MyBookings = (props) => {

  return (
    <Row>
      <Col md="6" sm="12"><HistoryBookings /></Col>
      <Col md="6" sm="12"><CurrentBookings /></Col>
    </Row>);

};

export default MyBookings;
