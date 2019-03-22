import React, { Component } from 'react';
import './Seat.scss';

class Seat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row: this.props.row,
      seatNum: this.props.seatNum
    }
  }

  render() {
    const { row, seatNum, toBeBooked, booked } = this.props;
    return (
      <div
        className={`seat ${toBeBooked ? 'active' : ''} ${booked ? 'booked' : ''}`}
        data-row={row}
        data-seat={seatNum}
        onClick={(e) =>   this.props.individualSeats ? this.props.seatClick(e) : '' }
      />
    );
  }

};

export default Seat;
