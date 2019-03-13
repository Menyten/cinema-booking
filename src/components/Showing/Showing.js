import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Auditorium from '../Auditorium';
import './showing.scss';

export default class Showing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenSeats: [],
    }
    this.pushChosenSeats = this.pushChosenSeats.bind(this);
  }

  seatClick(e) {
    console.log(e.currentTarget);
    /* let seat = e.currentTarget;
    let myIndex = seats.index(e.currentTarget);
    for (let i = myIndex; i < myIndex + this.currentShowing.countAll; i++) {
      let seat = this.seatsBySeatNumber[seats.eq(i).attr('data-seat')];
      seat.toBeBooked = seat.toBeBooked ? false : true;
      this.currentShowing.chosenSeats.push(seat); */
    // }
  }

  pushChosenSeats(seat){
    this.setState({ chosenSeats: [...this.state.chosenSeats, seat] })
    console.log('this.state', this.state.chosenSeats);
  }

  render() {
    const { auditorium } = this.props;
    return (
      <Container className='text-center'>

        <Row className='mt-5'>
          {/* Info om filmen kommer här */}
        </Row>

        <Row className='mt-4 pt-3'>
          <h2 className='col-sm-12' >Välj antal biljetter</h2>
          <Col className='mb-1' sm='12' md='4'>
            <h4>Vuxna (85kr)</h4>
            <button type="button" className="btn btn remove-adult remove-one selectButton selectButton1">-</button>
            <span className="adult">0</span>
            <button type="button" className="btn btn add-adult add-one selectButton selectButton2">+</button>
          </Col>
          <Col className='mb-1' sm='12' md='4'>
            <h4>Barn (65kr)</h4>
            <button type="button" className="btn btn remove-kid remove-one selectButton selectButton1">-</button>
            <span className="adult">0</span>
            <button type="button" className="btn btn add-kid add-one selectButton selectButton2">+</button>
          </Col>
          <Col className='mb-1' sm='12' md='4'>
            <h4>Pensionär (85kr)</h4>
            <button type="button" className="btn btn remove-retired remove-one selectButton selectButton1">-</button>
            <span className="adult">0</span>
            <button type="button" className="btn btn add-retired add-one selectButton selectButton2">+</button>
          </Col>

          <Col className='text-md-right' sm='12' md='6'>
            <button className="bookButton" >Slutför bokning</button>
          </Col>
          <Col className='text-md-left' sm='12' md='6'>
            <button className="individualSeats individualButton">Välj separata stolar</button>
          </Col>
        </Row>

        <Row className='mt-4'>

        </Row>

        <Row className='mt-5'>
          <Col sm='12'>
            <Auditorium pushChosenSeats={this.pushChosenSeats}  auditorium={auditorium} />
          </Col>
        </Row>

      </Container>
    )
  }
}
