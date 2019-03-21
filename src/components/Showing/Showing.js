import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Auditorium from '../Auditorium';
import Seat from '../Seat';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import './showing.scss';
import REST from "../../REST";
import App from '../../App';

class Booking extends REST { }
class Login extends REST {
  async delete() {
    this._id = 1;
    return super.delete();
  }
}

export default class Showing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenSeats: [],
      countAdult: 0,
      countKid: 0,
      countRetired: 0,
      bookingInfo: {},
      individualSeats: false,
    }
    this.listenForSeatsChosen();
    this.compareSocketSeatsWithAudiotirumSeats = this.compareSocketSeatsWithAudiotirumSeats.bind(this);
    this.fullPriceAdult = 0;
    this.fullPriceChild = 0;
    this.fullPriceOld = 0;
    this.ticketPriceAdult = 85;
    this.ticketPriceKid = 65;
    this.ticketPriceSenior = 75;
    this.seatClick = this.seatClick.bind(this);
    this.createBooking = this.createBooking.bind(this);
    this.toggleIndividualTrueOrFalse = this.toggleIndividualTrueOrFalse.bind(this);
    this.toggle = this.toggle.bind(this);
    this.countTotalPrice();
    this.seatsBySeatNumber = {};
    this.seatLayout = this.createSeatLayout();
    this.socketBookedSeats = [];
  }




  createSeatLayout() {
    let seats = [];
    let row = 1;
    let seatNum = 1;
    console.log('this.props.auditorium[0].seatsPerRow', this.props.auditorium[0].seatsPerRow.length)
    for (let numberOfSeatsInTheRow of this.props.auditorium[0].seatsPerRow) {
      let seatsInRow = [];
      while (seatsInRow.length < numberOfSeatsInTheRow) {
        let seat = {
          row: row,
          seatNum: seatNum,
        }
        seatsInRow.push(seat);
        this.seatsBySeatNumber[seatNum] = seat
        console.log('this.seatsBySeatNumber[seatNum]', this.seatsBySeatNumber[seatNum])
        seatNum++;
      }
      seats.push(seatsInRow);
      row++;
    }
    console.log('seat', seats)
    return seats;
  }

  get countAll() {
    return this.state.countAdult + this.state.countKid + this.state.countRetired;
  }

  toggleIndividualTrueOrFalse() {
    console.log('hej')
    !this.state.individualSeats ? this.setState({ individualSeats: true }) : this.setState({ individualSeats: false });
  }

  seatClick(e) {
    if (this.state.chosenSeats.length >= this.countAll) {
      this.setState({ chosenSeats: [] })
      for (let seat in this.seatsBySeatNumber) {
        this.seatsBySeatNumber[seat].toBeBooked = false;
      }
    }
    if (this.individualSeats) {
      return;
    } else if (this.state.chosenSeats.length < this.countAll) {

      let clickedSeat = {
        row: e.currentTarget.getAttribute('data-row') * 1,
        seatNum: e.currentTarget.getAttribute('data-seat') * 1,
      }

      if (this.state.chosenSeats.length) {
        for (let seat in this.state.chosenSeats) {
          if (this.state.chosenSeats[seat].seatNum == clickedSeat.seatNum) {
            console.log(this.state.chosenSeats[seat].seatNum);
            this.seatsBySeatNumber[clickedSeat.seatNum].toBeBooked = false;
            this.setState({ chosenSeats: this.state.chosenSeats.filter(seat => seat.seatNum !== clickedSeat.seatNum) })
          } else {
            this.seatsBySeatNumber[clickedSeat.seatNum].toBeBooked = true;
            this.setState({ chosenSeats: [...this.state.chosenSeats, clickedSeat] });
          }
        }
      } else {
        this.seatsBySeatNumber[clickedSeat.seatNum].toBeBooked = true;
        this.setState({ chosenSeats: [...this.state.chosenSeats, clickedSeat] });
      }
    }
  }

  async createBooking() {

    let userId = await Login.find();
    console.log("user Id", userId);
    const booking = await new Booking({
      "showTimeDetails": this.props.showtime._id,
      "userId": userId,
      "seats": this.state.chosenSeats.map(seat => seat.seatNum),
      "totalPrice": this.countTotalPrice()
    });
    let bookingInfo = await booking.save();
    this.setState({ bookingInfo });
    this.toggle();
    console.log("booking info", bookingInfo);


    /* let modalData = {
       ({
        bookingNum: bookingInfo.bookingNum,
        seats: bookingInfo.seats,
        auditorium: this.props.auditorium[0].name,
        totalPrice: bookingInfo.totalPrice,
        film: bookingInfo.showTimeDetails.film
      })
     
    } */

    //console.log(modalData);
    //this.state.modal = new Modal(modalData);


    /* this.modal = new Modal(modalData);
    this.render();
    $(this.baseEl).find('#bookingModal').modal({ show: true }); */

  }

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
      console.log('number', number)
      this.seatsBySeatNumber[number].toBeBooked = true;
      if (!this.state.chosenSeats.includes(this.seatsBySeatNumber[number])) {
        this.state.chosenSeats.push(this.seatsBySeatNumber[number]);
        this.updateChosenSeatsSocket();
      }
    }
    this.setState(state => this)
  }

  updateChosenSeatsSocket() {
    App.socket.emit('choosing seats', {
      chosenSeats: this.state.chosenSeats,
      showing: this.props.showtime._id
    })
  }

  listenForSeatsChosen() {
    App.socket.on('seats chosen', message => {
      this.socketBookedSeats = [...this.socketBookedSeats, message.chosenSeats[0]];
      this.compareSocketSeatsWithAudiotirumSeats();
    })
  }

  compareSocketSeatsWithAudiotirumSeats() {
    for (let socketSeat of this.socketBookedSeats) {
      for (let seat in this.seatsBySeatNumber) {
        console.log(socketSeat)
        console.log(seat)
        if(socketSeat.seatNum === this.seatsBySeatNumber[seat].seatNum) {
          this.seatsBySeatNumber[seat].toBeBooked = false;
          this.seatsBySeatNumber[seat].booked = true;
          console.log('WHGIEHRGIEHRFJKWHGERHUJGHJ');
          console.log(this.seatsBySeatNumber);
          return;
        }
      }
    }
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
        this.setState({ chosenSeats: this.state.chosenSeats.slice(1) });
        return;
      }
    }
  }

  countTotalPrice() {
    let fullPriceAdult = this.state.countAdult * this.ticketPriceAdult;
    let fullPriceChild = this.state.countKid * this.ticketPriceKid;
    let fullPriceOld = this.state.countRetired * this.ticketPriceSenior;
    let totalPrice = fullPriceAdult + fullPriceChild + fullPriceOld;
    return totalPrice;
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
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
            <button className="bookButton" onClick={this.createBooking}> Slutför bokning</button>
          </Col>


          <Col className='text-md-left' sm='12' md='6'>
            <button className="individualSeats individualButton" onClick={this.toggleIndividualTrueOrFalse} >Välj separata stolar</button>
          </Col>
        </Row>

        <Row className='mt-4'>

        </Row>

        <Row className='mt-5'>
          <Col sm='12'>
            <Auditorium
              auditorium={auditorium}
              seatClick={this.seatClick}
              countAll={this.countAll}
              chosenSeats={this.state.chosenSeats}
              seatLayout={this.seatLayout}
              individualSeats={this.state.individualSeats}

            />
          </Col>
        </Row>

        <Modal className="text-light" isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}> Bokningsnummer: {this.state.bookingInfo.bookingNum}</ModalHeader>
          <ModalBody>
            <p><i className="fas fa-door-open"></i> Salong: {this.props.auditorium[0].name} </p>
            <p><i className="fas fa-film"></i> Film: {this.props.showtime.film}</p>
            <p><i className="fas fa-couch"></i> Platser:{this.state.bookingInfo.seats} </p>
            <p><i className="fas fa-coins"></i> Pris: {this.state.bookingInfo.totalPrice}kr</p>
          </ModalBody>
          <ModalFooter>
            <Button type="button" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>

      </Container>
    )
  }

}