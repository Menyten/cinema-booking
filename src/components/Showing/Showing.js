import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Auditorium from '../Auditorium';
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
    
    //this.addOne = this.addOne.bind(this);
  }

  /**
  *
  * Function that counts adult, kid and retired together.
  *
  */

 get countAll() {
  return this.state.countAdult + this.state.countKid + this.state.countRetired;
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

  /**
  *
  * Function that runs when u click on adding a ticket for adult, kid or retired.
  *
  */

  addOne = e => {
    console.log("heeej")
    if (this.state.countAdult + this.state.countKid + this.state.countRetired >= 8) {
      alert('You can not choose more than 8 tickets');
      return;
    }if (e.target.className.includes('add-adult')) {
      this.setState({ countAdult : this.state.countAdult + 1  });
    } else if (e.target.className.includes('add-kid')) {
      this.setState({ countKid : this.state.countKid + 1});
    } else if (e.target.className.includes('add-retired')) {
      this.setState({ countRetired : this.state.countRetired + 1});
    }
    if (this.countAll > 0) {
      this.bookButton = true;
    }
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
      this.setState({countAdult : this.state.countAdult - 1});
    } else if (e.target.className.includes('remove-kid') && this.state.countKid > 0) {
      this.setState({countKid : this.state.countKid - 1});
    } else if (e.target.className.includes('remove-retired') && this.state.countRetired > 0) {
        this.setState({countRetired : this.state.countRetired - 1});
      
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
            <button type="button" className="btn btn remove-kid remove-one selectButton selectButton1"onClick={this.removeOne}>-</button>
            <span className="adult">{this.state.countKid}</span>
            <button type="button" className="btn btn add-kid add-one selectButton selectButton2" onClick={this.addOne}>+</button>
          </Col>
          <Col className='mb-1' sm='12' md='4'>
            <h4>Pensionär (85kr)</h4>
            <button type="button" className="btn btn remove-retired remove-one selectButton selectButton1"onClick={this.removeOne}>-</button>
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
            <Auditorium seatClick={this.seatClick} auditorium={auditorium} />
          </Col>
        </Row>

      </Container>
    )
  }
}
