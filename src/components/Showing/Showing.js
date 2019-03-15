import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Auditorium from '../Auditorium';
import './showing.scss';
import REST from '../../REST';

class Booking extends REST {}


export default class Showing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenSeats: [],
      takenSeats: [],
      bestSeats:[],
      seats: [],
      countAdult: 0,
      countKid: 0,
      countRetired: 0,
    }
    this.pushChosenSeats = this.pushChosenSeats.bind(this);
    this.selectBestSeats = this.selectBestSeats.bind(this);
  }
  async componentDidMount() {
    await this.getAuditorium()
  }
  /**
  *
  * Function that counts adult, kid and retired together.
  *
  */

  get countAll() {
    return this.state.countAdult + this.state.countKid + this.state.countRetired;
  }

  pushChosenSeats(seat) {
    this.setState({ chosenSeats: [...this.state.chosenSeats, seat] })
  }

  async getAuditorium() {
   
    this.auditorium = this.props.auditorium;

    /**
    *
    * Takes all the bookings 
    *
    */
    let allBookings = await Booking.find(`.find({showTimeDetails: "${this.props.showtime._id}"})`);
   
    /**
    *
    * Looping busy seats and store these so we can mark which ones that are taken.
    *
    */

    for (const booking of allBookings) {
      let seats = booking.seats;

      for (const seatNum of seats) {
        this.state.takenSeats.push(Number(seatNum));
      }
    }

    this.state.bestSeats = this.props.auditorium.bestSeats.filter((seatNumber) => {
      return !this.state.takenSeats.includes(seatNumber);

    })

    
    for (const seat of this.props.auditorium.bestSeats) {
        if (this.state.takenSeats.indexOf(seat.seatNum) == -1) {
          continue;
        } else {
          seat.booked = true;
        }
    }

    //this.availableSeats = this.auditorium.seats;
    //this.auditorium.currentShowing = this;
    this.setState(state => this.state)
  }

  selectBestSeats() {
    let amount = this.countAll;
    let selected = this.auditorium.bestSeats.slice(0, amount);
    for (let number of selected) {
      this.auditorium.seatsBySeatNumber[number].toBeBooked = true;
      if (!this.chosenSeats.includes(this.auditorium.seatsBySeatNumber[number])) {
        this.chosenSeats.push(this.auditorium.seatsBySeatNumber[number]);
      }
    }

  }

  /**
  *
  * Function that runs when u click on adding a ticket for adult, kid or retired.
  *
  */

  addOne = e => {
    if (this.state.countAdult + this.state.countKid + this.state.countRetired >= 8) {
      alert('You can not choose more than 8 tickets');
      return;
    } if (e.target.className.includes('add-adult')) {
      this.setState({ countAdult: this.state.countAdult + 1 });
    } else if (e.target.className.includes('add-kid')) {
      this.setState({ countKid: this.state.countKid + 1 });
    } else if (e.target.className.includes('add-retired')) {
      this.setState({ countRetired: this.state.countRetired + 1 });
    }
    if (this.countAll > 0) {
      this.bookButton = true;
    }
    this.selectBestSeats();
  }

  /**
  *
  * Function that removes a ticket on kid adult or retired when clicked.
  *
  */

  removeOne = e => {
    if (this.countAll <= 0) {
      alert('You should choose one ticket');
      return;
    }
    if (e.target.className.includes('remove-adult') && this.state.countAdult > 0) {
      this.setState({ countAdult: this.state.countAdult - 1 });
    } else if (e.target.className.includes('remove-kid') && this.state.countKid > 0) {
      this.setState({ countKid: this.state.countKid - 1 });
    } else if (e.target.className.includes('remove-retired') && this.state.countRetired > 0) {
      this.setState({ countRetired: this.state.countRetired - 1 });

    }
    if (this.countAll === 0) {
      this.bookButton = false;
    }
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
            <button type="button" className="btn btn remove-adult remove-one selectButton selectButton1" onClick={this.removeOne}>-</button>
            <span className="adult">{this.state.countAdult}</span>
            <button type="button" className="btn btn add-adult add-one selectButton selectButton2" onClick={this.addOne}>+</button>
          </Col>
          <Col className='mb-1' sm='12' md='4'>
            <h4>Barn (65kr)</h4>
            <button type="button" className="btn btn remove-kid remove-one selectButton selectButton1" onClick={this.removeOne}>-</button>
            <span className="adult">{this.state.countKid}</span>
            <button type="button" className="btn btn add-kid add-one selectButton selectButton2" onClick={this.addOne}>+</button>
          </Col>
          <Col className='mb-1' sm='12' md='4'>
            <h4>Pensionär (85kr)</h4>
            <button type="button" className="btn btn remove-retired remove-one selectButton selectButton1" onClick={this.removeOne}>-</button>
            <span className="adult">{this.state.countRetired}</span>
            <button type="button" className="btn btn add-retired add-one selectButton selectButton2" onClick={this.addOne}>+</button>
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
            <Auditorium pushChosenSeats={this.pushChosenSeats} auditorium={auditorium} />
            
          </Col>
        </Row>

      </Container>
    )
  }
}
