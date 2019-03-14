import React, { Component } from 'react';
import './Seat.scss';

class Seat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booked: false,
      toBeBooked: false
    }
    this.toggleChosenSeat = this.toggleChosenSeat.bind(this);
  }

  toggleChosenSeat(e) {
    this.setState({ toBeBooked: !this.state.toBeBooked ? true : false });
    return e.currentTarget.getAttribute('data-seat')
  }

  render() {
    const { row, seatNum, pushChosenSeats } = this.props;
    return (
      <div
        className={`seat ${this.state.toBeBooked ? 'active' : ''}`}
        data-row={row}
        data-seat={seatNum}
        onClick={(e) => { pushChosenSeats(this.toggleChosenSeat(e)) }}
      />
    );
  }
};

export default Seat;
