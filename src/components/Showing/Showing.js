import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Auditorium from '../Auditorium';
import Seat from '../Seat';
import './showing.scss';

export default class Showing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenSeats: [],
      countAdult: 0,
      countKid: 0,
      countRetired: 0,
    }
    /* this.seatClick = this.seatClick.bind(this); */
    /* this.pushSeat = this.pushSeat.bind(this); */
    this.seatsBySeatNumber = {};
    this.seatLayout = this.createSeatLayout();
  }

  createSeatLayout() {
    let seats = [];
    let row = 1;
    let seatNum = 1;
    console.log('this.props.auditorium[0].seatsPerRow', this.props.auditorium[0].seatsPerRow.length)
    for (let numberOfSeatsInTheRow of this.props.auditorium[0].seatsPerRow) {
      let seatsInRow = [];
      while (seatsInRow.length < numberOfSeatsInTheRow) {
        //let seat = <Seat row={row} seatNum={seatNum} key={seatNum} /* seatClick={this.props.seatClick} */ countAll={this.props.countAll} />
        let seat = {
          row: row,
          seatNum: seatNum,
        }
        seatsInRow.push(seat);
        this.seatsBySeatNumber[seatNum] = seat
        console.log('this.seatsBySeatNumber[seatNum]', this.seatsBySeatNumber[seatNum])
        seatNum++;
      }
      // seats.push(<div key={row}>{seatsInRow}</div>);
      seats.push(seatsInRow);
      row++;
    }
    console.log('seat', seats)
    return seats;
  }

  get countAll() {
    return this.state.countAdult + this.state.countKid + this.state.countRetired;
  }

  /* seatClick(e) {
    let clickedSeat = e.currentTarget.getAttribute('data-seat');
    if (this.state.chosenSeats.includes(clickedSeat)) {
      this.setState(prevState => { return { chosenSeats: prevState.chosenSeats.filter(seat => seat !== clickedSeat) } })
    } else {
      console.log('currentTarget', e.currentTarget);
      console.log(clickedSeat)
      this.setState(prevState => {
        return { chosenSeats: prevState.chosenSeats.concat([clickedSeat]) }
      })
    }
  } */

  addOne = e => {
    console.log("heeej")
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

    setTimeout(() => this.selectBestSeats(), 0)

  }

  selectBestSeats() {
    let amount = this.countAll;
    let selected = this.props.auditorium[0].bestSeats.slice(0, amount);
    for (let number of selected) {
      this.seatsBySeatNumber[number].toBeBooked = true;
      if (!this.state.chosenSeats.includes(this.seatsBySeatNumber[number])) {
        this.state.chosenSeats.push(this.seatsBySeatNumber[number]);
      }
    }
    this.setState(state => this)
  }

  removeOne = e => {
    if (this.countAll <= 0) {
      alert('You should choose one ticket');
      return;
    }
    if (e.target.className.includes('remove-adult') && this.state.countAdult > 0) {
      this.setState({ countAdult: this.state.countAdult - 1 });
      this.removeBookedSeat();
    } else if (e.target.className.includes('remove-kid') && this.state.countKid > 0) {
      this.setState({ countKid: this.state.countKid - 1 });
      this.removeBookedSeat();
    } else if (e.target.className.includes('remove-retired') && this.state.countRetired > 0) {
      this.setState({ countRetired: this.state.countRetired - 1 });
      this.removeBookedSeat();
    }
    if (this.countAll === 0) {
      this.bookButton = false;
    }
  }

  removeBookedSeat() {
    for (let row in this.seatsBySeatNumber) {
      if (this.seatsBySeatNumber[row].toBeBooked) {
        this.seatsBySeatNumber[row].toBeBooked = false;
        this.setState({ chosenSeats: this.state.chosenSeats.slice(1)});
        return;
      }
    }
  }

  emptyChosenSeats() {
    this.setState({ chosenSeats: [] });
    this.setState({ toBeBooked: false });
    this.forceUpdate();
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
            <Auditorium auditorium={auditorium} /* seatClick={this.seatClick} */ countAll={this.countAll} chosenSeats={this.state.chosenSeats} seatLayout={this.seatLayout} />
          </Col>
        </Row>

      </Container>
    )
  }

  selectSeat() {

  }

}
