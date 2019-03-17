import './auditorium.scss';
import React, { Component } from 'react';
import Seat from '../Seat'

class Auditorium extends Component {
  constructor(props) {
    super(props);
    this.createSeatLayout = this.createSeatLayout.bind(this);
  }

  createSeatLayout() {
    let seats = [];
    let seatsBySeatNumber = {};
    let row = 1;
    let seatNum = 1;

    for (let numberOfSeatsInTheRow of this.props.auditorium[0].seatsPerRow) {
      let seatsInRow = [];
      while (seatsInRow.length < numberOfSeatsInTheRow) {
        let seat = <Seat row={row} seatNum={seatNum} key={seatNum} seatClick={this.props.seatClick} countAll={this.props.countAll} />
        seatsInRow.push(seat);
        seatsBySeatNumber[seatNum] = seat;
        seatNum++;
      }
      seats.push(<div key={row}>{seatsInRow}</div>);
      row++;
    }
    console.log(seats);
    return seats;
  }

  render() {
    const { auditorium } = this.props;
    return (
      <div>
        <h5>{auditorium[0].name}</h5>
        {this.createSeatLayout()}
      </div>
    )
  }
  
};

export default Auditorium;