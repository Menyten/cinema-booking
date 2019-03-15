import React, { Component } from 'react';
import './Seat.scss';

class Seat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booked: false,
      toBeBooked: false,
      row: this.props.row,
      seatNum: this.props.seatNum
    }
  }

  render() {
    const { row, seatNum, seatClick } = this.props;
    return (
      <div
        className={`seat ${this.state.toBeBooked ? 'active' : ''}`}
        data-row={row}
        data-seat={seatNum}
        onClick={seatClick}
      />
    );
  }
};

export default Seat;
